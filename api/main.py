from typing import Union

from fastapi import FastAPI

from prisma import Prisma

app = FastAPI()

@app.get("/")
async def read_root():
    db = Prisma()
    await db.connect()

    found = await db.test_table.find_many(
        where={
        'name': "ryota",
    },
)

    await db.disconnect()
    return {"Hello": found}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
