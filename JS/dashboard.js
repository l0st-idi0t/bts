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

function createDiv(inner) {
    const div = document.createElement("div");
    div.classList.add("info");
    document.body.appendChild(div);
    div.style.visibility = "visible";
    setTimeout(() => {
        div.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);
    div.appendChild(inner);
}

function getSpotifyData() {
    let delayTime = 0;
    const clientId = "6ba6777c77804b479512791f7a56caa1";
    const clientSecret = "d19fc6dfd10f4d66a427c31ac93d4b3d";
    const searchQuery = "BTS";
    const limit = 10;
    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=${limit}`;
    let info, list;

    // base64 encode client ID and secret
    const base64Encoded = btoa(`${clientId}:${clientSecret}`);

    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${base64Encoded}`
        },
        body: "grant_type=client_credentials"
    })
    .then(response => response.json()).then(data => {
        info = fetchData(url, data.access_token);

        info.then(data => {
            list = document.createElement("ul");
            list.classList.add("track-list");
            for (let i = 0; i < data.tracks.items.length; i++) {
                const track = data.tracks.items[i];
                const listItem = document.createElement("li");
                listItem.classList.add("track-item");
                const trackName = document.createElement("span");
                trackName.classList.add("track-name");
                trackName.textContent = track.name;
                const artistName = document.createElement("span");
                artistName.classList.add("artist-name");
                artistName.textContent = track.artists[0].name;
                const previewButton = document.createElement("button");
                previewButton.classList.add("preview-button");
                previewButton.textContent = "Preview";
                previewButton.addEventListener("click", () => {
                    const audio = new Audio(track.preview_url);
                    audio.play();
                });
                listItem.appendChild(trackName);
                listItem.appendChild(artistName);
                listItem.appendChild(previewButton);
                list.appendChild(listItem);
            }
        });
    })
    .catch(error => {
        console.error("Error getting access token:", error);
    });

    checkForDivs(delayTime);

    delay(delayTime).then(() => {
        createDiv(list);
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

async function fetchData(url, token) {
    let data = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    data = await data.json();
    return data;
}