function dataFormater (response) {
    let data = "";
    // data += "<img src=\"" + response.LogoPath + "\" alt=\""+ response.Name +"\" style=\"width:10px;height:10px;\" >";
    data += "<li> Name: " + response.Name + " </li>";
    data += "<li> Domain Name: " + response.Domain + " </li>";
    data += "<li> Breached On: " + response.BreachDate + " </li>";
    data += "<li> Affected Emails: " + response.DataClasses[0] + " </li>";
    data += "<li> Affected Phone Numbers: " + response.DataClasses[1] + " </li>";
    return data;
}

const apiUrl = "http://127.0.0.1:5000/api/email-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector("#submit");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        const emailInput = await document.querySelector("#email").value;
        if(emailInput !== "" && emailInput.search("@") !== -1) 
            {
                const data = { "email": emailInput };
                let response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
                console.log(response.status);
                let responseData = await response.json();
                console.log(responseData);
                // Update DOM with response data
                jsonDataDisplay.innerHTML = dataFormater(responseData);
                // jsonDataDisplay.innerHTML = JSON.stringify(responseData);
                //submitBtn.disabled = true; // Disable the submit button
                // document.querySelector("#email").disabled = true;
            }
    } catch (error) {
        console.error('Error:', error);
    }
};

submitBtn.addEventListener("click", fetchData);