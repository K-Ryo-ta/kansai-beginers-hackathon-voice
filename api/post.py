from fastapi import FastAPI, File, UploadFile
import os
from pathlib import PATH
app = FastAPI()

db_name = "dev.db"
db_path = Path(__file__).parent/db_name

def create_user_table():
    con = sqlite3.connct(db_path)
    cur = con.cursor()

@app.post("/video")
async def create_upload_file(input: UploadFile):
    os.makedirs("uploads", exist_ok=True)
    with open(f"uploads/{input.filename}", "wb") as buffer:
        buffer.write(input.file.read())
    
    video = await prisma.video.create(
            data={
                'title': input.filename,
                'description': 'テスト',
                'url': '一旦パス',
                'thumbnail': 'konitiwa',
                'user': {
                    'connect': {'id': user.id}
                },
                'theme': {
                    'connect': {'id': theme.id}
                },
    })
    return {"filename": input.filename}

#動画を表示する
@app.get("/video/{filename}")
async def get_video(filename:str):
    return FileResPonse(f"uploads/{filename}")

#動画を削除する
@app.delete("/video/{filename}")
async def delete_video(filename:str):
    #指定されたファイルを消す
    os.remove("/upload/{filename}")
    return {"message": f"{filename} deleted"}



