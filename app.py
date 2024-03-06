from flask import Flask, jsonify, render_template, request
from emailBreach import emailBreach
import json

app = Flask(__name__)
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
        
        # Assuming emailBreach().isBreached(email) returns a JSON-like structure
        data = emailBreach().isBreached(email)

        # Log the data instead of print
        app.logger.info(f"Data type: {type(data)}, Data: {data}")

        # Return information for all entries in the "data" list
        all_entries = []
        for entry in data.get("data", []):
            entry_info = {
                "BreachDate": entry.get("BreachDate", ""),
                "Name": entry.get("Name", ""),
                "Domain": entry.get("Domain", ""),
                "Description": entry.get("Description", ""),
                "LogoPath": entry.get("LogoPath", ""),
                "DataClasses": entry.get("DataClasses", [])
            }
            all_entries.append(entry_info)

        jsonData = jsonify({
            "message": data.get("message", ""),
            "data": all_entries
        })

        return render_template('emailleak.html', jsonData=jsonData.json)
    
    # If it's a GET request or any other method, render the form template
    return render_template('emailleak.html', jsonData=None)

if __name__ == '__main__':
    app.run(debug=True)
