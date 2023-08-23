from sqlalchemy import create_engine

db_config = {
    "host": "toyproj.c7moz5ojgl82.us-east-2.rds.amazonaws.com",
    "port": 3306,
    "user": "admin",
    "password": "asdfasdf",
    "database": "db",
}


# toyProj DB에 연결
def create_db_connection():
    db_name = db_config["database"]
    db_url = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    engine = create_engine(db_url)

    try:
        connection = engine.connect()
        if connection:
            print(f"Successfully connected to database {db_name}")
            return engine
        else:
            print("Failed to create connection")
            exit()
    except Exception as e:
        print(
            f"An error occurred when trying to connect to database {db_name}: {str(e)}"
        )
        exit()
