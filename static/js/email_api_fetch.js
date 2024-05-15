function dataFormater(response) {
    let data = "";
    response.data.forEach(breach => {
        data += "<div>";
        data += "<img src=\"" + breach.LogoPath + "\" alt=\"" + breach.Name + "\" style=\"width:50px;height:50px;\">";
        data += "<ul>";
        data += "<li> Name: " + breach.Name + " </li>";
        data += "<li> Domain Name: " + breach.Domain + " </li>";
        data += "<li> Breached On: " + breach.BreachDate + " </li>";
        data += "<li> Description: " + breach.Description + " </li>";
        data += "<li> Data Classes: " + breach.DataClasses.join(", ") + " </li>";
        data += "</ul>";
        data += "</div>";
    });
    return data;
}

const apiUrl = "http://127.0.0.1:5000/api/email-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector("#submit");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    if (event.key === "Enter") {
        submitBtn.click();
    }
    try {
        const emailInput = await document.querySelector("#email").value;
        if (emailInput !== "" && emailInput.search("@") !== -1) {
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
