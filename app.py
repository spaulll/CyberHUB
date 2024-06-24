from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
import base64
import os
from email_breach import EmailBreach
from pass_breach import PassBreach 
from hash_identifier import HashIdentifier
from encryption_decryption import RSAEncryption
from get_server_ip import get_server_ip       
from get_public_ip import get_public_ip       

app = Flask(__name__)
CORS(app)

# Use environment variable to set server URL and IP retrieval function
environment = os.getenv('ENVIRONMENT', 'development')

if environment == 'production':
    # server_url = 'https://example.com'  # public domain name for CyberHUB goes here.
    server_url = 'http://' + get_public_ip() + ':5000'  # Use public IP for VPS deployment
else:
    # server_url = 'http://localhost:5000'
    server_url = 'http://' + get_server_ip() + ':5000'  # Use local IP for local development


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index')
def index_home():
    return render_template('index.html')

@app.route('/emailleak')
def emailleak():
    return render_template('emailleak.html', server_url=server_url)

@app.route('/passwordleak')
def passwordleak():
    return render_template('passwordleak.html', server_url=server_url)

@app.route('/hashid')
def hashid():
    return render_template('hashid.html', server_url=server_url)

@app.route('/securemessage')
def securemessage():
    return render_template('securemessage.html', server_url=server_url)

@app.route('/help')
def help():
    return render_template('help.html')

@app.route("/api/email-breach", methods=['GET', 'POST'])
def emailBreachChecker():
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        Data = EmailBreach().getBreachInfo(email)
        if Data.get("status", "") == "failed":
            return jsonify(Data), 500
        elif Data.get("is_breached", False):
            return jsonify(Data), 200
        else:
            return jsonify(Data), 404
    return jsonify({"error": "Method not allowed"}), 405

@app.route("/api/password-breach", methods=['GET', 'POST'])
def passwordBreachChecker():
    if request.method == 'POST':
        data = request.json
        password = data.get('password')
        Data = PassBreach().isPassBreached(password)
        return jsonify(Data), 200
    return jsonify({"error": "Method not allowed"}), 405

@app.route("/api/hash-id", methods=['GET', 'POST'])
def hashIdentifier():
    if request.method == 'POST':
        data = request.json
        hash = data.get('hash')
        Data = HashIdentifier().getData(hash)
        return jsonify(Data), 200
    return jsonify({"error": "Method not allowed"}), 405

@app.route("/api/massageEncode/<rValue>", methods=['POST'])
def massageEncode(rValue):
    if request.method == 'POST':
        data = request.json
        plainText = data.get('encodedMassage')
        if rValue == 'encrypt':
            encrypted_message = RSAEncryption().encrypt(plainText)
            return jsonify(encrypted_message), 200
        elif rValue == 'decrypt':
            decoded_message = base64.b64decode(plainText).decode('utf-8')
            decrypted_message = RSAEncryption().decrypt(decoded_message)
            return jsonify(decrypted_message), 200
        else:
            return jsonify({'error': 'Access Forbidden'}), 404
    return jsonify({"error": "Something went wrong"}), 405

if __name__ == '__main__':
    if environment == 'production':
        http_server = WSGIServer(('0.0.0.0', 5000), app)
        http_server.serve_forever()
    else:
        app.run(host='0.0.0.0', port=5000, debug=True)
