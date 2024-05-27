function dataFormater(responseData,Display) {
    if(String(responseData.status)==='success'){
        let formattedData = responseData.types.join(', ');
        let data = `<span> The hash is possibly: </span> <strong id="data">` + formattedData +  "</strong>";
        Display.innerHTML = data;
    }
    else{
        Display.innerHTML = `<span> Can't identify this hash. </span>`;
    }
}

const apiUrl = `http://${serverIp}:5000/api/hash-id`;

    
const jsonDataDisplay = document.querySelector("#jsonDataDisplay");
const submitBtn = document.querySelector(".submit-btn");

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
                dataFormater(responseData,jsonDataDisplay);
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