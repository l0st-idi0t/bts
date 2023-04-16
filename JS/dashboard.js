//get name from local storage and display it
const username = localStorage.getItem("username");
const nameElem = document.getElementById("name");
nameElem.innerHTML = 'Welcome ' + username;

setTimeout(()=> {
    nameElem.style.transform = "translate(-50%, -600%)";
    nameElem.style.fontSize = "2em";
}, 2000);