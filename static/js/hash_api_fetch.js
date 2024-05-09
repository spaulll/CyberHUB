function dataFormater (response) {
    let data = "";
    // data += "<img src=\"" + response.LogoPath + "\" alt=\""+ response.Name +"\" style=\"width:10px;height:10px;\" >";
    // data += "<li> Name: " + response.Name + " </li>";
    // data += "<li> Domain Name: " + response.Domain + " </li>";
    // data += "<li> Breached On: " + response.BreachDate + " </li>";
    // data += "<li> Affected Emails: " + response.DataClasses[0] + " </li>";
    // data += "<li> Affected Phone Numbers: " + response.DataClasses[1] + " </li>";
    return data;
}

function dataFormater(responseData) {
    let formattedData = responseData.status + ': ';
    formattedData += responseData.types.join(', ');
    return formattedData;
}
const apiUrl = "http://127.0.0.1:5000/api/hash-id";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector("#submit");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        const hashInput = await document.querySelector("#hash").value;
        if(hashInput !== "")
            {
                const data = { "hash": hashInput };
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
                jsonDataDisplay.innerText = dataFormater(responseData);
                // jsonDataDisplay.innerHTML = JSON.stringify(responseData);
                //submitBtn.disabled = true; // Disable the submit button
                // document.querySelector("#password").disabled = true;
            }
    } catch (error) {
        console.error('Error:', error);
    }
};

submitBtn.addEventListener("click", fetchData);