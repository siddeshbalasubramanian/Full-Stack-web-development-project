from flask import Blueprint, render_template, request, flash,url_for
from pathlib import Path
import datetime
from flask import current_app as app
from flask_login import login_user, logout_user, current_user
from flask_login.utils import login_required
from application.database import db, User, Admin, Venue, Show, Booking
from werkzeug.utils import redirect
from werkzeug.security import generate_password_hash, check_password_hash
import matplotlib.pyplot as plt
import requests
from application.tasks import *
from time import perf_counter_ns
import PyPDF2
from main import cache
from random import randint

BASE = 'http://127.0.0.1:5000'

@app.route("/help")
@cache.cached(timeout=5)
def help():
    ran = randint(1,1000)
    return f'<h1>the number is {ran}<h1>'

@app.route("/userdashboard/<string:user>")
@cache.cached(timeout=50)
#@login_required
def userdashboard(user):
#    venues = requests.get(BASE+f'/api/booking/{user}')
 #   venues=venues.json()
    #venues=Venue.query.filter_by(username=user).all()
#    for venue in venues:
  #      l=[]
  #      p=[]
   #     shows = Show.query.filter_by(venueid=venue['venueid']).all()
    #    for show in shows:
   #        l.append([show.showname,show.showid])
   #        p.append(show.showid)
   #     venue['shownames']=l
   #     venue['showid']=p
    return render_template("userdashboard_.html",user=user)


@app.route("/admindashboard/<string:user>")
@login_required 
def Admindashboard(user):
#    venues = requests.get(BASE+f'/api/venue/{user}')
#    venues=venues.json()
    #venues=Venue.query.filter_by(username=user).all()
#    for venue in venues:
#        l=[]
#        shows = Show.query.filter_by(venueid=venue['venueid']).all()
#        for show in shows:
#           l.append([show.showname,show.showid])
#        venue['shownames']=l
    return render_template("admindashboard_.html",user=user)




@app.route('/')
def home():
    return render_template('landing.html')


@app.route('/uslogin', methods=["GET", "POST"])
def userlogin():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()
        if user:
            if check_password_hash(user.password, password):
                return redirect(f'/userdashboard/{username}')
            else:
                flash('Password is incorrect.', category='error')
        else:
            flash('Username does not exist.', category='error')

    return render_template('userlogin.html')




@app.route("/usregister", methods=["GET", "POST"])
def userregister():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")

        username_exists = User.query.filter_by(username=username).first()

        if username_exists:
            flash('Username is already in use.', category='message')

        else:
            new_user = User(username=username, password=generate_password_hash(
                password, method='sha256'),email=email)
            db.session.add(new_user)
            db.session.commit()
            return redirect('/uslogin')
    return render_template('userregister.html')


@app.route('/adlogin', methods=["GET", "POST"])
def adminlogin():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")

        user = Admin.query.filter_by(username=username).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                return redirect(f'/admindashboard/{username}')
            else:
                flash('Password is incorrect.', category='error')
        else:
            flash('Username does not exist.', category='error')

    return render_template('adminlogin.html')




@app.route("/adregister", methods=["GET", "POST"])
def adminregister():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")


        username_exists = Admin.query.filter_by(username=username).first()

        if username_exists:
            flash('Username is already in use.', category='message')

        else:
            new_user = Admin(username=username, password=generate_password_hash(
                password, method='sha256'),email=email,active=1)
            db.session.add(new_user)
            db.session.commit()
            return redirect('/adlogin')
    return render_template('adminregister.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')
