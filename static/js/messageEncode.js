function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const toggleSwitch = document.querySelector('#switch');
const toggleText = document.querySelectorAll('.switch-x-toggletext');
const messageInput = document.querySelector('#messageInput');
const submitBtn = document.querySelector('.submit-btn');
const submitDisplay = document.querySelector('#submit');
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
    DataDisplay.innerHTML = `<span> Your encrypted message is: </span> <strong id="data">` + messagep + "</strong>"+` <svg id="copyButton" class="copy-btn" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="copiedtext" id="copied">Copied!</span>`;
    document.getElementById('copyButton').addEventListener('click', function() {
      const message = document.getElementById('data').innerText;
      if (message) {
        navigator.clipboard.writeText(message).then(function() {
          var popup = document.getElementById("copied");
          popup.classList.toggle("show");
        }, function() {
          alert('Failed to copy message');
        });
      }
    });
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
    const DataDisplay = document.getElementById('jsonDataDisplay'); // Fix reference to DataDisplay

    if (responseData.status !== "failed") {
      const messagep = String(atob(responseData.message));
      const escapedMessage = escapeHtml(messagep);
      DataDisplay.innerHTML = "<span> Your decrypted message is: </span> <strong id='data'>" + escapedMessage + "</strong>" + ` <svg id="copyButton" class="copy-btn" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="copiedtext" id="copied">Copied!</span>`;

      const copyButton = document.getElementById('copyButton');
      copyButton.addEventListener('click', function() {
        const messaged = document.getElementById('data').innerText;
        if (messaged) {
          navigator.clipboard.writeText(messaged).then(function() {
            var popup = document.getElementById("copied");
            popup.classList.toggle("show");
          }, function() {
            alert('Failed to copy message');
          });
        }
      });
    } else {
      DataDisplay.innerHTML = "<span> Decryption failed: </span> <strong>" + responseData.error + "</strong>";
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

toggleSwitch.addEventListener('change', () => {
  toggleText.forEach(text => text.classList.toggle('active'));
  const isEncrypt = toggleSwitch.checked;
  if (isEncrypt) {
    submitDisplay.innerHTML="Encrypt";
  } else {
    submitDisplay.innerHTML="Decrypt";
  }
  messageInput.name = isEncrypt ? 'plain' : 'encrypted';
  messageInput.placeholder = isEncrypt ? 'Your message goes here' : 'Your encrypted message goes here';
});

const handleSubmit = async (event) => {
  event.preventDefault();
  const isEncrypt = toggleSwitch.checked;
  if (isEncrypt) {
    submitDisplay.innerHTML="Encrypt";
    await fetchDataEN(event);
  } else {
    submitDisplay.innerHTML="Decrypt";
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
  const isEncrypt = toggleSwitch.checked;
  if (isEncrypt) {
    submitDisplay.innerHTML="Encrypt";
  } else {
    submitDisplay.innerHTML="Decrypt";
  }
});