from typing import Union
from random import choice

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

origins = [
    "http://localhost:3000",  # Frontend
    "http://127.0.0.1:3000",  # Sometimes you may use 127.0.0.1 instead of localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # Allow all headers
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


class UserData(BaseModel):
    participants: str
    prices: str

@app.post("/test/")
def test(request: UserData):
    participants = request.participants.split('\n')
    prices = int(request.prices)
    winners = []
    error = ""
    if len(participants) < prices:
        error = "Error: Number of prices exceeds number of participants."
        return {
            "winners": winners,
            "error": error
        }
    i = 0
    while i < prices:
        winner = choice(participants)
        if winner not in winners:
            winners.append(winner)
            i += 1
    return {
        "winners": winners,
        "error": error
    }
