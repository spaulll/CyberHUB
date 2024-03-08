from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
# Custom modules
from emailBreach import emailBreach
from passBreach import passBreach


app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index')
def index_home():
    return render_template('index.html')

@app.route('/emailleak')
def emailleak():
    return render_template('emailleak.html')

@app.route('/passwordleak')
def passwordleak():
    return render_template('passwordleak.html')

@app.route('/hashid')
def hashid():
    return render_template('hashid.html')

@app.route('/securemessage')
def securemessage():
    return render_template('securemessage.html')

@app.route('/help')
def help():
    return render_template('help.html')

@app.route("/api/email-breach", methods=['GET', 'POST'])
def emailBreachChecker():
    if request.method == 'POST':
        email = request.form.get('email')
        print(f"Received email from the form: {email}")
        
        Data = emailBreach().getBreachInfo(email)           #type: dict

        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")

        return (jsonify(Data).json)
    
    # If it's a GET request or any other method, render the form template
    return jsonify({"error": "Method not allowed"}).json, 405


@app.route("/api/password-breach", methods=['GET', 'POST'])
def passwordBreachChecker():
    if request.method == 'POST':
        password = request.form.get('password')
        
### As of now password is in plaintext, but is has to be only 5 letters of SHA1
### hashed plaintext password.
        
        print(f"Received email from the form: {password}")
        Data = passBreach().isPassBreached(password)        
        
        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")

        return render_template('passwordleak.html', jsonData=jsonify(Data).json)

    # If it's a GET request or any other method, render the form template
    return render_template('passwordleak.html', jsonData=None)

if __name__ == '__main__':
    app.run(debug=True)
