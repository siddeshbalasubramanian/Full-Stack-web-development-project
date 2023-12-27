from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_security import UserMixin

db=SQLAlchemy()

class Admin(db.Model,UserMixin):
    __tablename__="admin"
    id=db.Column(db.Integer,autoincrement=True,primary_key=True,unique=True)
    username=db.Column(db.String,unique=True,nullable=True)
    password=db.Column(db.String,nullable=True)
    email=db.Column(db.String,nullable=True)
    active=db.Column(db.Integer)
    

class User(db.Model):
    __tablename__="user"
    id=db.Column(db.Integer,autoincrement=True,primary_key=True,unique=True)
    username=db.Column(db.String,unique=True,nullable=True)
    password=db.Column(db.String,nullable=True)
    email=db.Column(db.String,nullable=True)

class Venue(db.Model):
    __tablename__="venue"
    venueid=db.Column(db.Integer,autoincrement=True,primary_key=True,unique=True)
    venuename=db.Column(db.String,nullable=True)
    place=db.Column(db.String, nullable=True)
    location=db.Column(db.String, nullable=True)
    capacity=db.Column(db.Integer, nullable=True)
    username=db.Column(db.String,db.ForeignKey("admin.username"),nullable=True)

class Show(db.Model):
    __tablename__="show"
    showid=db.Column(db.Integer,autoincrement=True,primary_key=True,unique=True)
    showname=db.Column(db.String,nullable=True)
    rating=db.Column(db.Integer,nullable=True)
    timing1=db.Column(db.String,nullable=True)
    timing2=db.Column(db.String,nullable=True)
    tags=db.Column(db.String,nullable=True)
    price=db.Column(db.Integer,nullable=True)
    venueid=db.Column(db.Integer,db.ForeignKey("venue.venueid"),nullable=True)

class Booking(db.Model):
    __tablename__="booking"
    bookingid=db.Column(db.Integer,autoincrement=True,primary_key=True,unique=True)
    number=db.Column(db.Integer,nullable=True)
    username=db.Column(db.String,db.ForeignKey("user.username"),nullable=True)
    price=db.Column(db.Integer,nullable=True)
    total=db.Column(db.Integer,nullable=True)
    venuename=db.Column(db.String,nullable=True)
    timing1=db.Column(db.String,nullable=True)
    timing2=db.Column(db.String,nullable=True)
    showname=db.Column(db.String,nullable=True)

