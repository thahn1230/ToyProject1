from fastapi import FastAPI
from mangum import Mangum
from endpoints import router

app = FastAPI()

# Import and use the CORSMiddleware from fastapi.middleware
from fastapi.middleware.cors import CORSMiddleware

# Configure CORS settings
origins = [
    '*',
    # "http://localhost",
    # "http://localhost:3000",  # Example frontend development server
    # "https://yourdomain.com"  # Add your production domain here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router from endpoints.py
app.include_router(router)

handler = Mangum(app)
