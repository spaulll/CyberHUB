function dataFormater(response) {
    let data = "";
    response.data.forEach(breach => {
        data += "<li>";
        data += "<img src=\"" + breach.LogoPath + "\" alt=\"" + breach.Name + "\">";
        data += "<ul>";
        data += "<li><strong>Name:</strong> " + breach.Name + "</li>";
        data += "<li><strong>Domain Name:</strong> " + breach.Domain + "</li>";
        data += "<li><strong>Breached On:</strong> " + breach.BreachDate + "</li>";
        data += "<li><strong>Description:</strong> " + breach.Description + "</li>";
        data += "<li><strong>Data Classes:</strong> " + breach.DataClasses.join(", ") + "</li>";
        data += "</ul>";
        data += "</li>";
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
