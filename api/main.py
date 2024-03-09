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
    await db.disconnect()
    return theme

@app.get("/theme/{theme_id}")
async def get_theme(theme_id: str):
    db = Prisma()
    await db.connect()
    theme = await db.theme.find_first(where={"id": theme_id})
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
@app.get("/video/description/{id}")
async def get_video_description(id:str):
    db = Prisma()
    await db.connect()
    video = await db.video.find_first(where={"id": id})
    await db.disconnect()
    return 
    
#動画を表示する
@app.get("/video/{filename}")
async def get_video(filename:str):
    return FileResponse(f"uploads/{filename}")


#動画を削除する
@app.delete("/video/{filename}")
async def delete_video(filename:str):
    #指定されたファイルを消す
    os.remove("/upload/{filename}")
    return {"message": f"{filename} deleted"}


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
