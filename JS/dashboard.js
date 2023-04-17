// stop text selection
document.body.style.userSelect = "none";

//get name from local storage and display it
const username = localStorage.getItem("username");
const nameElem = document.getElementById("name");
nameElem.innerHTML = "Welcome " + username;

setTimeout(()=> {
    nameElem.style.fontSize = "2em";
    nameElem.style.transform = "translate(-50%, -600%)";
}, 2000);

setTimeout(()=> {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.visibility = "visible";
    gridContainer.style.opacity = "1";
}, 3000);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkForDivs(delayTime) {
    if (document.getElementsByClassName("info").length > 0) {
        document.getElementsByClassName("info")[0].style.transform = "translate(-50%, -50%) scale(0)";
        setTimeout(() => {
            document.getElementsByClassName("info")[0].remove();
        }, 400);

        delayTime = 400;
    }
}

function createDiv() {
    const div = document.createElement("div");
    div.classList.add("info");
    document.body.appendChild(div);
    div.style.visibility = "visible";
    setTimeout(() => {
        div.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);
}

function getSpotifyData() {
    let delayTime = 0;

    checkForDivs(delayTime);

    delay(delayTime).then(() => {
        createDiv();
    });
}

function getYouTubeData() {
    let delayTime = 0;

    checkForDivs(delayTime);

    delay(delayTime).then(() => {
        createDiv();
    });
}

function getInstagramData() {
    let delayTime = 0;

    checkForDivs(delayTime);

    delay(delayTime).then(() => {
        createDiv();
    });
}

function getTwitterData() {
    let delayTime = 0;

    checkForDivs(delayTime);

    delay(delayTime).then(() => {
        createDiv();
    });   
}