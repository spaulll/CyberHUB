const apiUrl = "http://127.0.0.1:5000/api/email-breach";

const jsonDataDisplay = document.querySelector("#jsonData");
const submitBtn = document.querySelector("#submit");

const fetchData = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        const emailInput = await document.querySelector("#email").value;
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
        jsonDataDisplay.innerText = JSON.stringify(responseData);
        //submitBtn.disabled = true; // Disable the submit button
        // document.querySelector("#email").disabled = true;
    } catch (error) {
        console.error('Error:', error);
    }
};

submitBtn.addEventListener("click", fetchData);
