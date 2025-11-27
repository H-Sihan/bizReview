from flask import Blueprint,make_response,jsonify,request
import uuid
from bson import ObjectId

import globals

reviews_bp = Blueprint("reviews_bp", __name__)

businesses = globals.db.biz

@reviews_bp.route("/businesses/<string:b_id>/reviews", methods=['GET'])
def fetch_all_reviews(b_id):
    data_to_return = []
    business = businesses.find_one({ "_id": ObjectId(b_id) }, { "reviews": 1, "_id": 0 })
    
    for review in business['reviews']:
        review['_id'] = str(review['_id'])
        data_to_return.append(review)
    
    return make_response(jsonify(data_to_return), 200)

@reviews_bp.route('/businesses/<string:biz_id>/reviews', methods=['POST'])
def reviewBusiness(biz_id):
    data = request.form
    
    if not data.get("username") or not data.get("comment") or not data.get("star"):
        return make_response(jsonify({"Error":"Missing required field"}), 400)

    try:
        stars = int(data["star"])
        if stars < 1 or stars > 5:
            return make_response(jsonify({"Error":"Stars should be between 1 - 5"}),400)
    except ValueError:
        return make_response(jsonify({"Error":"Stars should be a number"}),400)
    
    business = businesses.find_one({"_id":ObjectId(biz_id)})
    if not business:
        return make_response(jsonify({"Error":"Business not found"}),404)
    
    new_review_id = str(uuid.uuid4())
    new_review = {
        "_id": ObjectId(),
        "username": data.get("username"),
        "comment": data.get("comment"),
        "star": stars
    }
    
    businesses.update_one(
        {"_id":ObjectId(biz_id)},
        {"$push": {"reviews": new_review}}
    )
    
    new_review_link = f"http://127.0.0.1:5000/businesses/{new_review_id}"
    return make_response(jsonify({"url":new_review_link}), 200)