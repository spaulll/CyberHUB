function active() {
    pathname = window.location.pathname;
    pathname = pathname.replace("/","")
    var a = document.getElementById(pathname)
    if (a.className === "menuitems") {
        a.className += " active";
    }
}
active();
document.getElementsByClassName("field").forEach(function(node) {
    node.onchange = node.oninput = function() {
        node.style.width = node.scrollWidth+'rem';
    };
});
function responsive() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function email_leak() {
    var d = document.forms["form"]["email"].value;
    console.log(d);
    data = postData("localhost:5000/api/email-breach", d);
    console.log(data);
    document.getElementById("jsonData").innerHTML = data;
}