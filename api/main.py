from typing import Union
import os
from fastapi import FastAPI, File, UploadFile,Response, Depends  
from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
# 新しく追加したライブラリ。requirement.txtに追加する必要あり
from datetime import datetime, timedelta
from pydantic import BaseModel
from uuid import UUID, uuid4
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3001",
    "http://localhost:3001/send",
    "http://localhost:3000/video/uploads",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Theme(BaseModel):
    title: str
    description: str
    startDate: datetime
    endDate: datetime

class VideoDescription(BaseModel):
    title: str
    description: str
    url: str   
    thumbnail: str
    theme_id: str
    user_id: str

class Login(BaseModel):
    email: str
    password: str

class User(BaseModel):
    email: str
    password: str
    name: str


class Evaluation(BaseModel):
    userId: str
    videoId: str
    fit: int
    creativity: int
    comprehensibility: int
    moved: int
    editing: int


    
@app.post("/resister")
async def create_user(user: User):
    db = Prisma()
    await db.connect()
    user = await db.user.create(
        data={
            'email': user.email,
            "password":  user.password,
            "name":       user.name,
        }
    )
    await db.disconnect()
    return {f"Hello{user.name}"}

#ユーザ情報漏洩
@app.get("/user")
async def get_user():
    db = Prisma()
    await db.connect()
    users = await db.user.find_many()
    await db.disconnect()
    return users



                                                                      
# テーマを送る
@app.post("/theme/send")
async def create_send_theme(theme: Theme):
    db = Prisma()
    await db.connect()
    theme = await db.theme.create(
        data={
            'title': theme.title,
            'description': theme.description,
            'startDate': theme.startDate,
            'endDate': theme.endDate
        }
    )
    print(theme)
    await db.disconnect()
    return theme


# テーマを表示させる
@app.get("/theme/{theme_id}")
async def get_theme(theme_id: str):
    db = Prisma()
    await db.connect()
    random_id = random.choice(ids) if ids else None
    theme = await db.theme.find_unique(where={"id": theme_id})
    await db.disconnect()
    return theme

@app.get("/theme")
async def get_video():
    db = Prisma()
    await db.connect()
    themes = await db.theme.find_many()
    await db.disconnect()
    return themes


# サムネイルを保存する
@app.post("/thumbnail/upload")
async def create_upload_file(input: UploadFile):
    os.makedirs("thumbnail", exist_ok=True)
    with open(f"thumbnail/{input.filename}", "wb") as buffer:
        buffer.write(input.file.read())
    return {"filename": input.filename}

# 動画を保存する
@app.post("/video/upload")
async def create_upload_file(input: UploadFile):
    os.makedirs("uploads", exist_ok=True)
    with open(f"uploads/{input.filename}", "wb") as buffer:
        buffer.write(input.file.read())
    return {"filename": input.filename}

# 動画の説明やタイトルをほぞんする
@app.post("/video/description")
async def create_video_description(input: VideoDescription):
    db = Prisma()
    await db.connect()
    video = await db.video.create(
        data = {
            'title': input.title,
            'description': input.description,
            'url': input.url,#ファイル名
            'thumbnail': input.thumbnail,
            'user': {
                'connect': {'id': input.user_id}
            },
            'theme': {
                'connect': {'id': input.theme_id}
            },
        })
    await db.disconnect()
    return video
    

# 動画のせつめいをとる
@app.get("/video/description/{video_id}")
async def get_video_description(video_id: str):
    db = Prisma()
    await db.connect()
    video = await db.video.find_first(where={"id": video_id})
    await db.disconnect()
    return video
    
#指定した動画を表示する
@app.get("/video/{filename}")
async def get_video(filename:str):
    return FileResponse(f"uploads/{filename}")

    video_files = [f for f in os.listdir("uploads") if f.endswith(".mp4")]
    return video_files

#保存してある動画の全てを取る
@app.get("/video")
async def get_all_video():
    db = Prisma()
    await db.connect()
    videos = await db.video.find_many()
    await db.disconnect()
    return videos


# #動画を削除する
# @app.delete("/video/{filename}")
# async def delete_video(filename:str):
#     #指定されたファイルを消す
#     os.remove("/upload/{filename}")
#     return {"message": f"{filename} deleted"}

# ログイン機能
@app.post("/login")
async def login(login: Login):
    db = Prisma()
    await db.connect()
    user = await db.user.find_unique(where={"email" :login.email})
    correct_password = user.password

    if login.password == correct_password:
        return "OK"
    else:
        return "fail"



@app.post("/evaluate/send")
async def create_evaluate(evaluation: Evaluation):
    db = Prisma()
    await db.connect()
    eva = await db.evaluation.create(
        data={
            #評価したユーザー
            'user': {
                'connect': {'id': evaluation.userId}
            },
            #評価された動画(これから評価されたユーザーを探す)
            "video": {
                'connect': {'id': evaluation.videoId}
            },
            "fit": evaluation.fit,
            "creativity": evaluation.creativity,
            "comprehensibility": evaluation.comprehensibility,
            "moved": evaluation.moved,
            "editing": evaluation.editing
        }
    )
    await db.disconnect()
    return eva


@app.get("/evaluate/caluculate/{video_id}")
async def get_evaluate(video_id: str):
    db = Prisma()
    await db.connect()
    certain_video_evaluations = await db.evaluation.find_many(where={"videoId": video_id})
    await db.disconnect()
    evaluation_fit = sum(certain_video_evaluations[i].fit for i in range(len(certain_video_evaluations))) / len(certain_video_evaluations)
    evaluation_creativity = sum(certain_video_evaluations[i].creativity for i in range(len(certain_video_evaluations))) / len(certain_video_evaluations)
    evaluation_comprehensibility = sum(certain_video_evaluations[i].comprehensibility for i in range(len(certain_video_evaluations))) / len(certain_video_evaluations)
    evaluation_moved = sum(certain_video_evaluations[i].moved for i in range(len(certain_video_evaluations))) / len(certain_video_evaluations)
    evaluation_editing = sum(certain_video_evaluations[i].editing for i in range(len(certain_video_evaluations))) / len(certain_video_evaluations)
    evaluations = [evaluation_fit, evaluation_creativity, evaluation_comprehensibility, evaluation_moved, evaluation_editing]
    return evaluations
