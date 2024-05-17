function active() {
    pathname = window.location.pathname;
    pathname = pathname.replace("/","")
    if (pathname === "") {
        pathname = "index"
    }
    var a = document.getElementById(pathname)
    if (a.className === "menuitems") {
        a.className += " active";
    }
}
active();
function responsive() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
