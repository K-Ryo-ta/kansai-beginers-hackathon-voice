from typing import Union
import os
from fastapi import FastAPI, File, UploadFile
from prisma import Prisma
# 新しく追加したライブラリ。requirement.txtに追加する必要あり
from datetime import datetime, timedelta
import uuid
from pydantic import Basemodel

app = FastAPI()

@app.get("/")
async def read_root():
    db = Prisma()
    await db.connect()

# ランダムなメールアドレスを生成する
    random_email = f"{uuid.uuid4()}@example.com"
    user = await db.user.create(
        data={
            'email': random_email,  # ランダムなメールアドレスを使用
            'password': '12345',
            'name': 'ryota',
        }
    )

    start_date = datetime.now()
    end_date = start_date + timedelta(days=7)
    theme = await db.theme.create(
        data={
            'title': 'konitiwa',
            'description': 'konitiwa',
            'startDate': start_date,
            'endDate': end_date,
        }
    )

    video = await db.video.create(
        data={
            'title': 'konitiwa',
            'description': 'konitiwa',
            'url': 'konitiwa',
            'thumbnail': 'konitiwa',
            'user': {
                'connect': {'id': user.id}
            },
            'theme': {
                'connect': {'id': theme.id}
            },
        }
    )

    

    evaluation = await db.evaluation.create(
        data={
            'user': {
                'connect': {'id': user.id}
            },
            'video': {
                'connect': {'id': video.id}
            },
            'fit': 1,
            'creativity': 1,
            'comprehensibility': 1,
            'moved': 1,
            'editing': 1,
        }
    )

    userfound = await db.user.find_many(
        include={
            "videos": True
        }
    )
    videofound = await db.video.find_many(
        include={
            'user': True,
            'theme': True,
            'evaluations': True,
        }
    )
    themefound = await db.theme.find_many(
        include={
            'videos': True,
        }
    )
    evaluationfound = await db.evaluation.find_many(
        include={
            'user': True,
            'video': True,
        }
    )


    await db.disconnect()
    return {
    "Users": userfound, 
    "Videos": videofound, 
    "Themes": themefound, 
    "Evaluations": evaluationfound,
    # "QQQ":"aaa"
}
