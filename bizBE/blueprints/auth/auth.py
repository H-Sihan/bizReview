from flask import Blueprint, request, make_response, jsonify
from decorators import jwt_required

import bcrypt
import jwt
import globals
import datetime

auth_bp = Blueprint("auth_bp", __name__)

blacklist = globals.db.blacklist
users = globals.db.users

@auth_bp.route('/login', methods=['GET'])
def login():
    auth = request.authorization
    if auth:
        user = users.find_one({"username":auth.username})
        if user is not None:
            if bcrypt.checkpw(bytes(auth.password, 'UTF-8'), user['password']):
                token = jwt.encode({
                    'user':auth.username,
                    'admin':user['admin'],
                    'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30)
                }, globals.SECRET_KEY, algorithm='HS256')
                return make_response(jsonify({'token':token}),200)
            else:
                return make_response(jsonify({'message':'invalid password'}),401)
        else:
            return make_response(jsonify({'message':'invalid username'}),401)
        
    return make_response(jsonify({'message':'authentication required'}),401)


#----------------------------- LOGOUT ------------------------------------  
@auth_bp.route('/logout', methods=['GET'])
@jwt_required
def logout():
    token = request.headers['x-access-token']
    blacklist.insert_one({"token":token})
    return make_response(jsonify({"message":"logout successful"}), 200)