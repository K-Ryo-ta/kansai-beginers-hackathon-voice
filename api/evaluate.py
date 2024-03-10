from typing import Union
import os
from fastapi import FastAPI, File, UploadFile,Response, Depends  
from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
from main.py import User, Video
# 新しく追加したライブラリ。requirement.txtに追加する必要あり
from datetime import datetime, timedelta
from pydantic import BaseModel
from uuid import UUID, uuid4
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters

app = FastAPI()

class Evaluate(BaseModel):
    user: User
    userId:  str
    video:   Video  
    videoId: str
    fit:               int
    creativity:        int
    comprehensibility: int
    moved:             int
    editing:           int

@app.post("/evaluate/{video_id}")
async def create_evaluate(evaluate: Evaluate):
    db = Prisma()
    await db.connect()
    evalate = await db.evaluate.create(
        data={
            user: evaluate.user,
            userId: evaluate.userId,
            video: evaluate.video,
            videoId: evaluate.videoId,
            
            fit: evaluate.fit,
            creativity: evaluate.creativity,
            comprehensibility: evaluate.comprehensibility,
            moved: evaluate.moved,
            editing: evaluate.editing
        }
    )
    await db.disconnect()