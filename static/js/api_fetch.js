const url = "http://127.0.0.1:5000/api/email-breach";

const jsonDataShow = document.querySelector("#jsonData");
const btn = document.querySelector("#submit");

const getFacts = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    
    const emailInput = document.querySelector("#email").value;
    const data = { "email": emailInput };
    try {
        let response = await fetch(url, {
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
        jsonDataShow.innerText = JSON.stringify(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
};

btn.addEventListener("click", getFacts);
