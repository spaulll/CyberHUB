const submitBtn = document.querySelector("button[type='submit']");
const apiUrlen = "http://127.0.0.1:5000/api/massageEncode/encrypt";
const apiUrlden = "http://127.0.0.1:5000/api/massageEncode/decrypt";

let DataDisplay = document.getElementById("jsonDataDisplay");

const fetchDataEN = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        let message = document.getElementById("massageInput").value;
        let cipherText = btoa(message);
        console.log(cipherText);

        const data = { "encodedMassage": cipherText };

        let response = await fetch(apiUrlen, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        });
        console.log(response.status);
        let responseData = await response.json();
        console.log(responseData);

        const messagep = String(responseData.message);
        DataDisplay.innerHTML = messagep;
    } catch (error) {
        console.error('Error:', error);
    }
};

const fetchDataDN = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        let message = document.getElementById("massageInput").value;
        let cipherText = btoa(message);
        console.log(cipherText);

        const data = { "encodedMassage": cipherText };

        let response = await fetch(apiUrlden, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        });
        console.log(response.status);
        let responseData = await response.json();
        console.log(responseData);

        const messagep = String ( atob (responseData.message) );
        DataDisplay.innerHTML = messagep;
    } catch (error) {
        console.error('Error:', error);
    }
};

function fetchDataEncrypt() {
    submitBtn.addEventListener("click", fetchDataEN);
}

function fetchDataDecrypt() {
    // Implement your decrypt functionality here if needed
    submitBtn.addEventListener("click", fetchDataDN);
}

document.addEventListener("DOMContentLoaded", function () {
    try {
        const encryptRadio = document.getElementById("encrypt");
        const decryptRadio = document.getElementById("decrypt");

        // Event listener for radio buttons
        encryptRadio.addEventListener("change", handleRadioChange);
        decryptRadio.addEventListener("change", handleRadioChange);

        // Event listener for submit button
        submitBtn.addEventListener("click", handleSubmit);

        function handleRadioChange() {
            // Enable or disable submit button based on radio button selection
            submitBtn.disabled = !(encryptRadio.checked || decryptRadio.checked);
        }

        async function handleSubmit(event) {
            // Prevent default form submission behavior
            event.preventDefault();

            // Check if one of the radio buttons is selected
            if (encryptRadio.checked) {
                // Call encrypt function
                await fetchDataEncrypt();

            } else if (decryptRadio.checked) {
                // Call decrypt function
                await fetchDataDecrypt();

            } else {
                // If neither radio button is selected, do nothing
                console.log("Please select an option.");
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});

const enter = async (event) => {
    if (event.key === "Enter") {
        submitBtn.click();
    }
};

document.addEventListener("DOMContentLoaded", enter);