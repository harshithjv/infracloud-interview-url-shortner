from flask import Flask
from flask import request, redirect
from flask_cors import CORS
from flask import jsonify
import random
import string

app = Flask(__name__)
CORS(app)

urlList = {}

def randomString(stringLength=6):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

def getUrlFromCode(code):
  error = False
  val = ''
  try:
    val = list(urlList.keys())[list(urlList.values()).index(code)]
  except ValueError as e:
    error = True
  return (val, error)

@app.route('/shorten/', methods=["POST"])
def shorten():
    try:
        data = request.json
        url = data['url']
        code = randomString()
        try:
          code = urlList[url]
        except KeyError as e:
          urlList[url] = code

        return jsonify({'shortened': 'http://localhost:5000/u/' + code})
    except Exception as e:
        return "Error" 


@app.route('/u/<code>')
def redirector(code):
  (url, err) = getUrlFromCode(code)
  if err:
    return 'ERROR: URL not shortened on this service. \n Click <a href="http://localhost:3000/">here</a> to shorten'
  return redirect(url)
