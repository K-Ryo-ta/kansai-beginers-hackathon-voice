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
    user: User   #評価したユーザー
    userId: str
    video: Video  #評価された動画(これから評価されたユーザーを探す)
    videoId: str
    host_userId: str
    hosvideoId: str
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
    theme = await db.theme.find_unique(where={"id": theme_id})
    await db.disconnect()
    return theme


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
            'url': input.url,
            'thumbnail': input.thumbnail,
            'user': {
                'connect': {'id': input.user_id}
            },
            'theme': {
                'connect': {'id': input.theme_id}
            },
        })
    await db.disconnect()
    return 
    
# 動画のせつめいをとる
@app.get("/video/description/{video_id}")
async def get_video_description(id:str):
    db = Prisma()
    await db.connect()
    video = await db.video.find_first(where={"id": id})
    await db.disconnect()
    return 
    
#指定した動画を表示する
@app.get("/video/{filename}")
async def get_video(filename:str):
    return FileResponse(f"uploads/{filename}")

#保存してある動画の全てを取る
@app.get("/video")
async def get_video():
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
@app.get("/login")
async def login(login: Login):
    db = Prisma()
    await db.connect()
    user = await db.user.find_unique(where={"email" == input.email})
    correct_password = user.password

    if input.password == correct_password:
        return "OK"
    else:
        return "fail"




@app.post("/evaluate/{video_id}")
async def create_evaluate(evaluation: Evaluation):
    db = Prisma()
    await db.connect()
    evalation = await db.evaluation.create(
        data={
            userId: evaluate.userId,
            videoId: evaluate.videoId,
            fit: evaluate.fit,
            creativity: evaluate.creativity,
            comprehensibility: evaluate.comprehensibility,
            moved: evaluate.moved,
            editing: evaluate.editing
        }
    )
    await db.disconnect()

# 動画に評価(Evaluation)機能を実装したい
# ブラウザ側で点数をつけるバーがある(スライドすると1-100の値を入れることができる)
# 項目が5つあって、配列[20, 30, 40, 50, 60]などで受け取る予定
# ある人が動画に点数をつける(評価する)→評価した点数をデータベース(dev.db)に保存する
# また他の人が動画に点数をつける(評価する)→点数をデータベース(dev.db)に保存する
# 最終的に、評価した人全員の点数を、平均値(合計の点数 / 評価した人数)としてブラウザ画面に表示させたい
class Evaluation(BaseModel):
    fit: int
    creativity: int
    comprehensibility: int
    moved: int
    editing: int

# 動画を評価する
@app.post("/evaluation")
async def create_evaluation():
    db = Prisma()
    await db.connect()
    
    return

# 評価した点数を表示させる
@app.get("/evaluation/{evaluation_id}")
async def evaluation(input: Evaluation):
    db = Prisma()
    await db.connect()
    
    return 

