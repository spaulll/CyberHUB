from flask import Flask, jsonify, render_template, request
from emailBreach import emailBreach

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
        
        Data = emailBreach().getBreachInfo(email)           #type: dict

        # Log the data in console
        app.logger.info(f"Data type: {type(Data)}, Data: {Data}")

        return render_template('emailleak.html', jsonData = jsonify(Data).json)
    
    # If it's a GET request or any other method, render the form template
    return render_template('emailleak.html', jsonData=None)

if __name__ == '__main__':
    app.run(debug=True)
