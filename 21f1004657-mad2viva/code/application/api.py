import os
import flask
import sqlite3
import pandas as pd
from flask import render_template, send_from_directory
from flask_restful import Resource, Api
from flask_restful import fields, marshal_with
from flask_restful import reqparse
from .database import User, db, Venue, Show, Admin, Booking


from flask import current_app as app
import werkzeug
from flask import abort, redirect, url_for
from werkzeug.security import generate_password_hash


user_post_args = reqparse.RequestParser()
user_post_args.add_argument('username')
user_post_args.add_argument('password')


venue_post_args = reqparse.RequestParser()
venue_post_args.add_argument('venuename')
venue_post_args.add_argument('place')
venue_post_args.add_argument('location')
venue_post_args.add_argument('capacity')

show_post_args = reqparse.RequestParser()
show_post_args.add_argument('showname')
show_post_args.add_argument('tags')
show_post_args.add_argument('price')
show_post_args.add_argument('completed_flag')
show_post_args.add_argument('timing1')
show_post_args.add_argument('timing2')

book_post_args = reqparse.RequestParser()
book_post_args.add_argument('number')
book_post_args.add_argument('price')
book_post_args.add_argument('total')
book_post_args.add_argument('venuename')
book_post_args.add_argument('timing1')
book_post_args.add_argument('timing2')
book_post_args.add_argument('showname')
    

class UserAPI(Resource):
    
    def post(self):
        args = user_post_args.parse_args()
        u = User.query.filter_by(username=args['username']).first()
        if u:
            return "User already exists",409

        errors={}
        if len(args['username']) < 6:
            errors["USER001"]="Username is too short"
        if len(args['password']) < 6:
            errors["USER002"]="Password is too short"
        if errors !={}:
            return errors,400
        
        new_user = User(username=args['username'], password = generate_password_hash(args['password'], method='sha256'))
        try:
            db.session.add(new_user)
            db.session.commit()
            db.session.close()
            user=User.query.filter_by(username=args['username']).first()
            return {"id":user.id,"username":user.username,"email":user.email},201
        except:
            return "Internal Server Error",500

    def get(self, username):
        try:
            u = User.query.filter_by(username=username).first()
            if u == None:
                return "User not found",404
            d = Venue.query.filter_by(user=username)
            dn = d.count()
            score=[deck.score for deck in d]
            return{
                "username": u.username,
                "deck_count": dn,
                "score": score
            },200
        except:
            return "Internal Server Error",500

class VenueAPI(Resource):
    
    def post(self, username):
        try:
            args = venue_post_args.parse_args()
            #qd = Venue.query.filter_by(username=username,venuename=args.get('venuename')).first()
            #if qd!=None:
            #    return ("error")
            venue=Venue.query.filter_by(venuename=args['venuename'],username=username,place=args.get('place')).first()
            if venue:
                return "error"
            else:
                d = Venue(venuename = args.get('venuename'), place = args.get('place'), location = args.get('location'), capacity = args.get('capacity'), username = username)
                db.session.add(d)
                db.session.commit()
                venue=Venue.query.filter_by(venuename=args['venuename'],username=username).first()
                return {"id":venue.id,"venuename":venue.venuename,"user":venue.username},201
        except:
            return "Internal Server Error",500

    def get(self, username):
        try:
            u=Admin.query.filter_by(username=username).first()
            if u==None:
                return "User not found",404
            venues = Venue.query.filter_by(username=username).all()
            r=[]
            for venue in venues:
                r.append({'venuename':venue.venuename,'venueid':venue.venueid,'place':venue.place,'location':venue.location,'capacity':venue.capacity})
            return r
        except:
            return "Internal Server Error",500
    
    def delete(self, username,venueid):
        print("line 1------------------------")
        deck_to_delete= Venue.query.filter_by(venueid=venueid, username=username).first()
        print("line 2------------------------")
        db.session.delete(deck_to_delete)
        print("line 3------------------------")
        db.session.commit()
        print("line 4------------------------")
        return redirect('/dashboard')    

class BookingAddAPI(Resource):
    def post(self, username, venueid):
        try:
            #qd = Venue.query.filter_by(venueid=venueid).first()
            #cap=qd.capacity
            #print(cap)
            #print(args.get("number"))
            #print(eval(args.get("number")))
            #capas=int(cap)*int(args.get("number"))
            #qd.capacity=capas
            #print(capas)
            #db.session.commit()
            args = book_post_args.parse_args()
            #if(args.get("number")>0):
            d = Booking(venuename=args.get("venuename"), showname=args.get("showname"), price=args.get("price"), total=args.get("total"), timing1=args.get("timing1"), timing2=args.get("timing2"), number=int(args.get("number")), username=username)
            db.session.add(d)
            db.session.commit()
            #qd = Venue.query.filter_by(venueid=venueid).first()
            #cap=qd.capacity
            #capas=(cap)-args.get("number")
            #qd.capacity=capas
            #db.session.commit()
            return {"status": "success"}
        except:
            return "Internal Server Error",500


class BookingAPI(Resource):

    def get(self, username):
        try:
            u=User.query.filter_by(username=username).first()
            if u==None:
                return "User not found",404
            venues = Venue.query.all()
            r=[]
            for venue in venues:
                r.append({'venuename':venue.venuename,'venueid':venue.venueid,'place':venue.place,'location':venue.location,'capacity':venue.capacity})
            return r
        except:
            return "Internal Server Error",500
        
class YourBookingAPI(Resource):

    def get(self, username):
        try:
            bookings = Booking.query.filter_by(username=username).all()
            r=[]
            for venue in bookings:
                r.append({'bookingid':venue.bookingid,'number':venue.number,'price':venue.price,'total':venue.total,'venuename':venue.venuename,'timing1':venue.timing1,'timing2':venue.timing2,'showname':venue.showname,'username':username})
            return r
        except:
            return "Internal Server Error",500
        
class ShowCreateAPI(Resource):
    
    def post(self, venueid):
        args = show_post_args.parse_args()
        print(args.get('showname'))
        print(venueid)
        new_show = Show(showname=args.get("showname"), tags = args.get("tags"), price=args.get("price"), rating=args.get("completed_flag"), timing1=args.get("timing1"), timing2=args.get("timing2"), venueid=venueid)
        db.session.add(new_show)
        db.session.commit()
        
        # return redirect(f'/review/{deck}')
        return 1

        
class ShowAPI(Resource):
        
    def get(self, venueid):
        try:
            '''
            list = List.query.filter_by(user=username).first()
            if list==None:
                return "List not found",404
                '''
            print("showapi")
            cards = Show.query.filter_by(venueid=venueid).all()
            cl=[]
            if cards is None:
                return "No shows found",404
            else:
                for rc in cards:
                    cl.append({
                        "showid": rc.showid,
                        "showname": rc.showname,
                        "rating": rc.rating,
                        "timing1": rc.timing1,
                        "timing2": rc.timing2,
                        "tags": rc.tags,
                        "price": rc.price,
                        "venueid": rc.venueid,
                    })
            return cl
        except:
            return "Internal Server Error",500

    def put(self, card_id):
        try:
            c=Show.query.filter_by(card_id=card_id).first()
            if c==None:
                return "Card not found",404
            #args=card_put_args.parse_args()
            #c.score = args['score']
            db.session.commit()
            card=Show.query.filter_by(card_id=card_id).first()
            #return {"front":card.front,"back":card.back,"deck":card.deck,"score":card.score},200
        except:
            return "Internal Server Error",500    
        
class VenueExportAPI(Resource):
    # ----   /api/export/<string:deck_name>
    def get(self, venueid):
        print("entered export 1--------------------------")
        connection=sqlite3.connect("dataBase/ticketshowdb.sqlite3")
        print("entered export 2--------------------------")

        cursor=connection.cursor()
        print("entered export 3--------------------------")
 
        query="select * from Show where venueid= '%s'" % venueid

        cursor.execute(query)

        result=cursor.fetchall()
  
        for it in result:
            print(it)
        df=pd.read_sql_query(query,connection)
        print(df)

        df.to_csv('static/CSV/show.csv')
        print("entered export 4--------------------------")
        files=os.listdir('static/CSV')
        for file in files:
           return send_from_directory('static/CSV',file)
        #return {'status':'success'}        

class VenueEditAPI(Resource):
    def post(self, venueid):
        
        args = venue_post_args.parse_args()
        current_venue = Venue.query.filter_by(venueid=venueid).first()
        new_venuename=args['venuename']
        print(new_venuename)
        new_capacity=args['capacity']
        if(new_venuename==None):
            if(new_capacity==0):
                return  {'status':'failure'}
        if(new_capacity==0):
            current_venue.venuename=new_venuename
            db.session.commit()
            return {'status':'success'}
        if(new_venuename==None):
            current_venue.capacity=new_capacity
            db.session.commit()
            return {'status':'success'}

        # deck_to_edit=Deck(deck_name=new_deck_name, user=username)
        current_venue.venuename=new_venuename
        current_venue.capacity=new_capacity
        # db.session.add(deck_to_edit)
        db.session.commit()
        return {'status':'success'}
    
class ShowEditAPI(Resource):
    def post(self, showid):
        print(showid)
        args = show_post_args.parse_args()
        current_show =Show.query.filter_by(showid=showid).first()
        new_showname=args.get('showname')
        print(new_showname)
        new_timing1=args.get('timing1')
        new_timing2=args.get('timing2')
        if(new_showname!=None):
            if(new_timing1==None):
                if(new_timing2==None):
                   current_show.showname=new_showname
                   db.session.commit()
                   return {'status':'success'}
                else:
                   current_show.showname=new_showname
                   current_show.timing2=new_timing2
                   db.session.commit()
                   return {'status':'success'}
            else:
                if(new_timing2==None):
                   current_show.showname=new_showname
                   current_show.timing1=new_timing1
                   db.session.commit()
                   return {'status':'success'}
        else:
            if(new_timing1==None):
                if(new_timing2==None):
                   return {'status':'failure'}
                else:
                   current_show.timing2=new_timing2
                   db.session.commit()
                   return {'status':'success'}
            else:
                if(new_timing2==None):
                   current_show.timing1=new_timing1
                   db.session.commit()
                   return {'status':'success'}
        # deck_to_edit=Deck(deck_name=new_deck_name, user=username)
        current_show.showname=new_showname
        current_show.timing1=new_timing1
        current_show.timing2=new_timing2
        # db.session.add(deck_to_edit)
        db.session.commit()
        return {'status':'success'}
    
class VenueDeleteAPI(Resource):
    def get(self, venueid):
        venue_to_delete= Venue.query.filter_by(venueid=venueid).first()
        print("line delete 2------------------------")
        db.session.delete(venue_to_delete)
        print("line  delete3------------------------")
        db.session.commit()
        print("line delete 4------------------------")
        return redirect('/admindashboard')
    
class ShowDeleteAPI(Resource):
    def get(self, showid):
        print("line delete =1------------------------")
        show_to_delete= Show.query.filter_by(showid=showid).first()
        print("line delete 2------------------------")
        db.session.delete(show_to_delete)
        print("line  delete3------------------------")
        db.session.commit()
        print("line delete 4------------------------")
        return redirect('/admindashboard')
    
class BookingDeleteAPI(Resource):
    def get(self, bookingid):
        print("line delete =1------------------------")
        show_to_delete= Booking.query.filter_by(bookingid=bookingid).first()
        print("line delete 2------------------------")
        db.session.delete(show_to_delete)
        print("line  delete3------------------------")
        db.session.commit()
        print("line delete 4------------------------")
        return redirect('/admindashboard')
    
class ShowDeleteEditAPI(Resource):
    def get(self, venuename,showid):
        show_to_delete=Show.query.filter_by(showid=showid).first()
        db.session.delete(show_to_delete)
        db.session.commit()
        return redirect(f"/admindashboard")
    
    def post(self,venuename, showid):
        args=show_post_args.parse_args()
        show_to_edit=Show.query.filter_by(showid=showid).first()
        print(show_to_edit)
        new_show_price=args['new_price']
        new_show_timing1=args['new_timing1']
        new_show_timing2=args['new_timing2']
        show_to_edit.price=new_show_price
        db.session.commit()
        show_to_edit.back=new_show_timing1
        db.session.commit()
        show_to_edit.back=new_show_timing2
        db.session.commit()
        return redirect(f"/admindashboard")
        