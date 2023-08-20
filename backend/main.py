from fastapi import FastAPI
from mangum import Mangum

from fastapi.middleware.cors import CORSMiddleware

from gptQuery import GPT_Router
from userLogin import LoginRouter
from user import UserRouter

app = FastAPI()

# Configure CORS settings
origins = [
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(GPT_Router)
app.include_router(LoginRouter)
app.include_router(UserRouter)

handler = Mangum(app)
