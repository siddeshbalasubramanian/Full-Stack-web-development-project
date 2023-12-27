import os
from flask import Flask
from application.config import LocalDevelopmentConfig, StageConfig
from flask_login import LoginManager, login_manager
from flask_security import Security, SQLAlchemySessionUserDatastore, SQLAlchemyUserDatastore
from application.database import db, User,Admin
from application import workers
from flask_restful import Api
from flask_cors import CORS
from flask_login import LoginManager, login_manager
from flask_caching import Cache


app=None
api=None
celery=None
cache=None

def create_app():
    app = Flask(__name__)
    if os.getenv('ENV', "development") == "production":
        app.logger.info("currently no production config is setup")
        raise Exception("currently no production config is setup")
    elif os.getenv('ENV', "development") == "stage":
        app.logger.info("starting Local Development")
        app.config.from_object(StageConfig)
    else:
        app.logger.info("starting Local Development")
        app.config.from_object(LocalDevelopmentConfig)

    api=Api(app)
    db.init_app(app)
    app.app_context().push()

    celery = workers.celery
    celery.conf.update(
        broker_url=app.config["CELERY_BROKER_URL"],
        result_backend=app.config["CELERY_RESULT_BACKEND"]
    )
   
    celery.Task = workers.ContextTask
    cache=Cache(app)
    app.app_context().push()
    CORS(app)
    
    return app,api,celery,cache

app,api,celery,cache=create_app()





from application.controllers import *
from application.tasks import *

from application.api import UserAPI,BookingDeleteAPI, VenueAPI,YourBookingAPI, ShowAPI, ShowCreateAPI,ShowEditAPI, BookingAPI,BookingAddAPI, VenueExportAPI, VenueDeleteAPI, ShowDeleteAPI, VenueEditAPI, ShowDeleteEditAPI

#api.add_resource(UserAPI, '/api/user', '/api/user/<string:username>')

    
api.add_resource(VenueAPI, '/api/venue/<string:username>','/api/delete/<string:username>/<int:venueid>')
api.add_resource(YourBookingAPI, '/api/yourbooking/<string:username>/')
api.add_resource(BookingAPI, '/api/booking/<string:username>/')
api.add_resource(BookingAddAPI, '/api/bookingadd/<string:username>/<int:venueid>')


api.add_resource(ShowAPI, '/api/<int:venueid>/show', '/api/show/<int:showid>')
api.add_resource(ShowCreateAPI, '/api/<int:venueid>')

api.add_resource(VenueExportAPI, "/api/export/<int:venueid>")
api.add_resource(BookingDeleteAPI, "/api/booking_delete_api/<int:bookingid>")
api.add_resource(VenueDeleteAPI, "/api/deck_delete_api/<int:venueid>")
api.add_resource(ShowDeleteAPI, "/api/show_delete_api/<int:showid>")
api.add_resource(VenueEditAPI, "/api/venue_edit_api/<int:venueid>")
api.add_resource(ShowEditAPI, "/api/show_edit_api/<int:showid>")
api.add_resource(ShowDeleteEditAPI,"/api/card_delete_edit/<string:venuename>/<int:showid>")


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "adminlogin"

@login_manager.user_loader
def load_user(adminid):
    return Admin.query.get(int(adminid))






if __name__=="__main__":
    app.run(debug=True)