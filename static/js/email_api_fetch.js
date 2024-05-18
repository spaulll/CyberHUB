function removeAnchorTags(unsafe) {
    return unsafe.replace(/<a[^>]*>[^<]*<\/a>/g, "");
}

function dataFormater(response) {
    if(response.status == "failed"){
        return "<div>" + response.message + "</div>";
    }
    else{
        let data = "";
        response.data.forEach(breach => {
            data += `<div id="topOuter">`;
            data += `<div id="detailsContainer">`;
            data += `<img src="${breach.LogoPath}" alt="${breach.Name}">`;
            data += `<div id="details">`;
            data += `<div><strong>Name:</strong> <div class="resultData">${breach.Name}</div></div>`;
            data += `<div><strong>Domain Name:</strong> <div class="resultData">${breach.Domain}</div></div>`;
            data += `<div><strong>Breached On:</strong> <div class="resultData">${breach.BreachDate}</div></div>`;
            data += `<div><strong>Description:</strong> <div class="resultData" id="desc">${removeAnchorTags(breach.Description)}</div></div>`;
            data += `<div><strong>Data Classes:</strong> <div class="resultData">${breach.DataClasses.join(", ")}</div></div>`;
            data += `</div>`; // close #details
            data += `</div>`; // close #detailsContainer
            data += `</div>`;
            data +="<hr>"
            });
        return data;
    }
}


const apiUrl = "http://127.0.0.1:5000/api/email-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector(".submit-btn");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
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

const enter = async (event) => {
    if (event.key === "Enter") {
        submitBtn.click();
    }
};

document.addEventListener("DOMContentLoaded", enter);
submitBtn.addEventListener("click", fetchData);
