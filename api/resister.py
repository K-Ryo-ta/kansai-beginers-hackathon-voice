from typing import Union
import os
from fastapi import FastAPI, File, UploadFile
from prisma import Prisma
# 新しく追加したライブラリ。requirement.txtに追加する必要あり
from datetime import datetime, timedelta
import uuid
from pydantic import BaseModel

app = FastAPI()


# @app.get("/")
# async def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# #動画をアップロード
# @app.post("/video")
# async def create_upload_file(input: UploadFile):
#     os.makedirs("uploads", exist_ok=True)
#     with open(f"uploads/{input.filename}", "wb") as buffer:
#         buffer.write(input.file.read())
#     return {"filename": input.filename}

# #動画を表示する
# @app.get("/video/{filename}")
# async def get_video(filename:str):
#     return FileResPonse(f"uploads/{filename}")

# #動画を削除する
# @app.delete("/video/{filename}")
# async def delete_video(filename:str):
#     #指定されたファイルを消す
#     os.remove("/upload/{filename}")
#     return {"message": f"{filename} deleted"}

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




