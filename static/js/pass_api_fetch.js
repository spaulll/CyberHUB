function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateValue(obj, start, end, duration) {
    await delay(1400);
    let startTimestamp = null;
    const step = (timestamp) => {
    if (!startTimestamp) 
        startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
        window.requestAnimationFrame(step);
    }
    };
    window.requestAnimationFrame(step);
}

function dataFormater (jsonDataDisplay,response) {
    if(response.isbreached == "True")
    {
        jsonDataDisplay.innerHTML = "<p id=\"line1\"> " + "The Password has been breached </p> <div id=\"line2container\"><p id=\"line2\"> <span id=\"num\">0</span> times </p></div>";
    }
    if(response.isbreached == "False")
    {
        jsonDataDisplay.innerHTML = "<p id=\"line1\"> " + "The Password hasn't been breached " + "</p><div>";
    }
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
                // console.log(responseData);
                // console.log(typeof(responseData.times));
                // Update DOM with response data
                dataFormater(jsonDataDisplay,responseData);
                const obj = document.getElementById("num");
                animateValue(obj, 0, responseData.times, 3000)
                // jsonDataDisplay.innerHTML = JSON.stringify(responseData);
                //submitBtn.disabled = true; // Disable the submit button
                // document.querySelector("#password").disabled = true;
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