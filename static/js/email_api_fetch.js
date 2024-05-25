function dataFormater(response) {
    if(response.status == "failed"){
        return "<div>" + response.message + "</div>";
    }

    else if(response.is_breached == false){
        return `<div>No breach found for ${emailInput}</div>`;
    }

    else{
        let data = `<strong id="caution">!! Please Change your credentials Immediately !!</strong>`;
        response.data.forEach(breach => {
            data += `<div class="topOuter">`;
            data += `<div class="detailsContainer">`;
            data += `<img src="` + breach.LogoPath + `" alt="` + breach.Name + `" onerror="this.src='../static/assets/undifined.png';">`;
            data += `<div class="details">`;
            data += `<div class="name"><strong>Name:</strong> <p class="resultData">` + breach.Name + `</p></div>`;
            data += `<div class="domain"><strong>Domain Name:</strong> <p class="resultData"><a href="https://` + breach.Domain + `">` + breach.Domain + `</a></p></div>`;
            data += `<div class="date"><strong>Breached On:</strong> <p class="resultData">` + breach.BreachDate + `</p></div>`;
            data += `<div class="leak"><strong>Potential Leakage:</strong> <p class="resultData">${breach.DataClasses.join(", ")}</p></div>`;
            data += `</div>`; // close #details
            data += `</div>`; // close #detailsContainer
            data += `</div>`;
            data +="<hr>";
            });
        return data;
    }
}

const emailInput = document.querySelector("#email").value;

const apiUrl = "http://127.0.0.1:5000/api/email-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector(".submit-btn");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        jsonDataDisplay.innerHTML = "<div>Please wait...</div>";
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
            // submitBtn.disabled = true; // Disable the submit button
            // document.querySelector("#email").disabled = true;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const enter = async (event) => {
    if (event.key === "Enter") {
        submitBtn.click();
    }
};

document.addEventListener("DOMContentLoaded", enter);
submitBtn.addEventListener("click", fetchData);
