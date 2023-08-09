# main.py
from fastapi import FastAPI
from mangum import Mangum
from endpoints import router

app = FastAPI()

# Include the router from endpoints.py
app.include_router(router)

handler = Mangum(app)
