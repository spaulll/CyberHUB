function dataFormater (response) {
    let data = "";
    if(response.isbreached == "True")
    {
        data += "<p> " + "The Password has been breached " + response.times + " times" + "</p>";
    }
    if(response.isbreached == "False")
    {
        data += "<p> " + "The Password hasn't been breached " + "</p>";
    }
    return data;
}

const apiUrl = "http://127.0.0.1:5000/api/password-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector("#submit");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        const passInput = await document.querySelector("#password").value;
        if(passInput !== "")
            {
                const data = { "password": passInput };
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
                console.log(typeof(responseData.isbreached));
                // Update DOM with response data
                jsonDataDisplay.innerHTML = dataFormater(responseData);
                // jsonDataDisplay.innerHTML = JSON.stringify(responseData);
                //submitBtn.disabled = true; // Disable the submit button
                // document.querySelector("#password").disabled = true;
            }
    } catch (error) {
        console.error('Error:', error);
    }
};

submitBtn.addEventListener("click", fetchData);