const submitBtn = document.querySelector("button[type='submit']");
const apiUrl = "http://127.0.0.1:5000/api/massageEncode";

const fetchDataEN = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
        let message = document.getElementById("massageInput").value;
        let cipherText = btoa(message);
        console.log(cipherText);
        // let plainText = ;
        // console.log(plainText);

        const data = { "encodedMassage": cipherText };

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
        returnTxtHold = responseData["massage"]
        decodeResult = atob(returnTxtHold)
        console.log(decodeResult);
        // Update DOM with response data
        //jsonDataDisplay.innerText = JSON.stringify(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
};

function fetchDataEncrypt() {
    submitBtn.addEventListener("click", fetchDataEN);
}

function fetchDataDecrypt() {

}

let wait = document.addEventListener("DOMContentLoaded", function () {
    try {
        const encryptRadio = document.getElementById("encrypt");
        const decryptRadio = document.getElementById("decrypt");
        const submitBtn = document.querySelector("button[type='submit']");

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