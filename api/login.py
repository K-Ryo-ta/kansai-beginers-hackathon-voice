from typing import Union
import os
from fastapi import FastAPI, File, UploadFile
from prisma import Prisma
# 新しく追加したライブラリ。requirement.txtに追加する必要あり
from datetime import datetime, timedelta
import uuid
from pydantic import Basemodel
from pydantic import BaseModel
app = FastAPI()



class Login(BaseModel):
    email: str
    password: str

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


class SessionData(BaseModel):
    username: str

    from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters

cookie_params = CookieParameters()

# Uses UUID
cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=True,
    secret_key="DONOTUSE",
    cookie_params=cookie_params,
)