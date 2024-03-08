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
        data = request.json
        email = data.get('email')
        print(f"Received email from the form: {email}")
        
        # Assuming emailBreach().getBreachInfo(email) is returning some data
        # Replace it with your actual logic
        """Data = {"BreachDate": "2022-12-13",
                "DataClasses": ["Email addresses", "Partial phone numbers"],
                "Domain": "gemini.com",
                "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/Gemini.png",
                "Name": "Gemini"}"""
        Data=emailBreach().getBreachInfo(email)
        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")
        print(f"execution done ")

        return jsonify(Data), 200
    
    # If it's a GET request or any other method, render the form template
    return jsonify({"error": "Method not allowed"}), 405


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
