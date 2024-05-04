from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
# Custom modules
from EmailBreach import EmailBreach 
from PassBreach import PassBreach 
from HashIdentifier import HashIdentifier

import sys
print(sys.version) # required by subhasish

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

### API ####

@app.route("/api/email-breach", methods=['GET', 'POST'])
def emailBreachChecker():
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        print(f"Received email from the form: {email}")
        
        # Assuming emailBreach().getBreachInfo(email) is returning some data
        # Replace it with your actual logic
        Data = {"BreachDate": "2022-12-13",
                "DataClasses": ["Email addresses", "Partial phone numbers"],
                "Domain": "gemini.com",
                "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/Gemini.png",
                "Name": "Gemini"}
        # Data=EmailBreach().getBreachInfo(email)
        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")
        print("execution done ")

        return jsonify(Data), 200
    
    # If it's a GET request or any other method, render the form template
    return jsonify({"error": "Method not allowed"}), 405


@app.route("/api/password-breach", methods=['GET', 'POST'])
def passwordBreachChecker():
    if request.method == 'POST':
        #password = request.form.get('password')
        data = request.json
        password = data.get('password')
### As of now password is in plaintext, but is has to be only 5 letters of SHA1
### hashed plaintext password.
        
        print(f"Received email from the form: {password}")
        Data={"massage":"form backend you are successfully getting data view in line no 78"}
        # Data = PassBreach().isPassBreached(password)        
        
        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")
        jsonData=jsonify(Data).json
        return jsonData,200

    # If it's a GET request or any other method, render the form template
    #return render_template('passwordleak.html', jsonData=None)
    return jsonify({"error": "Method not allowed"}), 405


@app.route("/api/hash-id", methods=['GET', 'POST'])
def hashIdentifier():
    if request.method == 'POST':
        #hash = request.form.get('hash')
        data = request.json
        hash = data.get('hash')
### As of now hash is in plaintext, but is has to be only 5 letters of SHA1
### hashed plaintext hash.
        
        print(f"Received email from the form: {hash}")
        Data = HashIdentifier().getData(hash)
        
        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")
        jsonData=jsonify(Data).json
        return jsonData,200

    # If it's a GET request or any other method, render the form template
    #return render_template('passwordleak.html', jsonData=None)
    return jsonify({"error": "Method not allowed"}), 405

@app.route("/api/massageEncode", methods=['GET', 'POST'])
def massageEncode():
    if request.method == 'POST':
        #password = request.form.get('password')
        data = request.json # retrive the jason data which is send from frontend
        cipherText = data.get('encodedMassage') # It retrives the encoded massage out of data
        
        print(f"Received email from the form: {cipherText}")
        
        Data = {"massage": "data received " }
        # Log the data in console
        jsonData=jsonify(Data).json
        return jsonData,200

    # If it's a GET request or any other method, render the form template
    #return render_template('passwordleak.html', jsonData=None)
    return jsonify({"error": "Something went wrong"}), 405



if __name__ == '__main__':
    app.run(debug=True)
