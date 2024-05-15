const toggleSwitch = document.querySelector('#switch');
const toggleText = document.querySelectorAll('.switch-x-toggletext');
const messageInput = document.querySelector('#messageInput');
const submitBtn = document.querySelector('.submit-btn');
const apiUrlen = "http://127.0.0.1:5000/api/massageEncode/encrypt";
const apiUrlden = "http://127.0.0.1:5000/api/massageEncode/decrypt";
let DataDisplay = document.getElementById("jsonDataDisplay");

const fetchDataEN = async (event) => {
  event.preventDefault();
  try {
    let message = messageInput.value;
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
    DataDisplay.innerHTML = "<span> Your encrypted message is: </span> <strong>" + messagep + "</strong>";
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchDataDN = async (event) => {
  event.preventDefault();
  try {
    let message = messageInput.value;
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
    if (responseData.status !== "failed") {
      const messagep = String(atob(responseData.message));
      DataDisplay.innerHTML = "<span> Your decrypted message is: </span> <strong>" + messagep + "</strong>";
    } else {
      DataDisplay.innerHTML = "<span> Decryption failed: </span> <strong>" + responseData.error + "</strong>";
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
};


toggleSwitch.addEventListener('change', () => {
  toggleText.forEach(text => text.classList.toggle('active'));
  const isEncrypt = toggleSwitch.checked;
  messageInput.name = isEncrypt ? 'plain' : 'encrypted';
  messageInput.placeholder = isEncrypt ? 'Your message goes here' : 'Your encrypted message goes here';
});

const handleSubmit = async (event) => {
  event.preventDefault();
  const isEncrypt = toggleSwitch.checked;
  if (isEncrypt) {
    await fetchDataEN(event);
  } else {
    await fetchDataDN(event);
  }
};

submitBtn.addEventListener("click", handleSubmit);

document.addEventListener("DOMContentLoaded", () => {
  const enter = async (event) => {
    if (event.key === "Enter") {
      submitBtn.click();
    }
  };

  document.addEventListener("keydown", enter);
});