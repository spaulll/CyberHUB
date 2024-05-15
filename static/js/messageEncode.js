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
    if (responseData.status !== "failed") {
      DataDisplay.innerHTML = messagep;
    }
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
    const messagep = String(atob(responseData.message));  
    if (responseData.status !== "failed") {
      DataDisplay.innerHTML = messagep;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
