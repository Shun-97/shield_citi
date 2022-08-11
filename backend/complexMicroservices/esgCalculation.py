import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import requests
from os import environ
from invokes import invoke_http
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
CORS(app, supports_credentials=True)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3306/ESD5'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/backEnd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# service classes to use
Portfolio_URL = "http://localhost:5003"
Preference_URL = "http://localhost:5002"
Product_URL = "http://localhost:5001"