from application.workers import celery
from jinja2 import Template
from datetime import datetime
from flask_sse import sse
import datetime
from json import dumps
from httplib2 import Http
from celery.schedules import crontab
from application.database import db, User, Admin, Venue, Show, Booking
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.message import EmailMessage
from email import encoders
import smtplib
import os
from weasyprint import HTML

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    #sender.add_periodic_task(crontab(second=50), task1.s(), name='after every 18:30 minutes:everyday')
    sender.add_periodic_task(10.0, task2.s(), name='warning was sent')
    sender.add_periodic_task(20.0, task4.s(), name='mail was sent')
    
def webhook(user):
    url='https://chat.googleapis.com/v1/spaces/AAAAFKFH6Yw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=X0rRRc6pRwW0apyu9oQSJ2WzL6zFQuMZbxfNAMB2KvY%3D'
    bot_message= {
        'text':'hello '+user+'  pls, look into your bookings and view the future shows'
    }
    message_headers = {'Content_Type':'application/json; charset=UTF-8'}
    http_obj= Http()
    response = http_obj.request(
        uri=url,
        method='POST',
        headers=message_headers,
        body=dumps(bot_message),
    )
    print(response)

@celery.task()
def task1():
    users=User.query.all()
    for user in users:
        webhook(user.username)


@celery.task
def task2():

    SENDER = "siddesh21@iiserb.ac.in"
    PASSWORD = "rilehxlkapfgoehr"

    def send_email(recipient, subject, body):
        msg = EmailMessage()
        msg.set_content(body)
        msg["Subject"] = subject
        msg["From"] = SENDER
        msg["To"] = recipient
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(SENDER, PASSWORD)
        server.send_message(msg)
        server.quit()

    body = "This is the gentle remainder to know about your bookings and to view the future shows in our Ticket Booking App"
    #print("entered send123--------------------------")
    #send_email("siddesh21@iiserb.ac.in",subject="Quote of the Day", body=body)
    users=User.query.all()
    for user in users:
    #    print(user.username)
        mail=str(user.email)
        send_email(recipient="siddesh21@iiserb.ac.in", subject="FROM THE Ticket Booking APP TO "+user.username, body=body)

@celery.task
def task3(user,showname):

    SENDER = "siddesh21@iiserb.ac.in"
    PASSWORD = "rilehxlkapfgoehr"

    def send_email(recipient, subject, body):
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = SENDER
        msg["To"] = recipient
        msg.set_content(body)
        pdf=open('static/'+user.username+'.pdf', 'rb')
        file_data= pdf.read()
        file_name=user.username
        msg.add_attachment(file_data, maintype='application', subtype='pdf', filename=file_name)
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(SENDER, PASSWORD)
        server.send_message(msg)
        server.quit()


    body = "this is the monthly report"
    #print("entered send123--------------------------")
    #send_email("siddesh21@iiserb.ac.in",subject="Quote of the Day", body=body)
    send_email(user.email, subject="YOUR MONTHLY REPORT OF YOUR SHOW :"+showname, body=body)

@celery.task
def task4():
    with open('./templates/email.html','r') as f:
        template = Template(f.read())
    books=[]
    admins=Admin.query.all()
    for admin in admins:
        venues=Venue.query.filter_by(username=admin.username).all()
        for venue in venues:
            venuename=venue.venuename
            capacity=venue.capacity
            shows=Show.query.filter_by(venueid=venue.venueid).all()
            for show in shows:
                showname=show.showname
                timing1=show.timing1
                timing2=show.timing2
                bookings=Booking.query.filter_by(venuename=venuename,showname=showname,timing1=timing1,timing2=timing2).all()
                print(bookings)
                templatee=template.render(admin=admin,timing1=timing1,timing2=timing2,bookings=bookings,capacity=capacity,venuename=venuename,showname=showname)
                html=HTML(string=templatee)
                filename = str(admin.username) + ".pdf"
                content=html.write_pdf(target='static/'+filename)
                task3(admin,showname)