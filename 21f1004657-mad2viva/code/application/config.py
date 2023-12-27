import os
basedir = os.path.abspath(os.path.dirname(__file__))


class config():
    DEBUG = False
    SQLITE_DB_DIR = None
    SQLALCHEMY_DATABASE_URI = None
    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    REDIS_URL = "redis://localhost:6379"
    CACHE_TYPE= "RedisCache"
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379


class LocalDevelopmentConfig(config):
    SQLITE_DB_DIR = os.path.join(basedir, "../dataBase")
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "ticketshowdb.sqlite3")
    DEBUG = True
    SECRET_KEY = "ASDFGGFD"
    SECRET_PASSWORD_HASH = "bcrypt"
    SECURITY_PASSWORD_SALT = "MY_SECRET"
# allows new registrations to application
    SECURITY_REGISTERABLE = True
# to send automatic registration email to user
    SECURITY_SEND_REGISTER_EMAIL = False

    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    REDIS_URL = "redis://localhost:6379"
    CACHE_TYPE= "RedisCache"
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379


class StageConfig(config):
    SQLITE_DB_DIR = os.path.join(basedir, "../dataBase")
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "ticketshowdb.sqlite3")
    DEBUG = True
    SECRET_KEY = "ASDFGGFD"
    SECRET_PASSWORD_HASH = "brypt"

    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    REDIS_URL = "redis://localhost:6379"
    CACHE_TYPE= "RedisCache"
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
