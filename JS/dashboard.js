// stop text selection
document.body.style.userSelect = "none";

//get name from local storage and display it
const username = localStorage.getItem("username");
const nameElem = document.getElementById("name");
nameElem.innerHTML = "Welcome " + username;
let currentAudio;

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

        delayTime.push(400);
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

async function utilityDiv(inner) {
    let delayTime = [];

    checkForDivs(delayTime);

    delay(delayTime[0]).then(() => {
        createDiv(inner);
    });
}

async function getSpotifyData() {
    const clientId = "6ba6777c77804b479512791f7a56caa1";
    const clientSecret = "d19fc6dfd10f4d66a427c31ac93d4b3d";
    const searchQuery = "BTS";
    const limit = 10;
    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=${limit}`;
    let info, list;

    // base64 encode client ID and secret
    const base64Encoded = btoa(`${clientId}:${clientSecret}`);

    let response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${base64Encoded}`
        },
        body: "grant_type=client_credentials"
    })

    response = await response.json();

    info = await fetchData(url, response.access_token);

    list = document.createElement("div");
    list.classList.add("track-list");

    // sort info by highest popularity to lowest
    info.sort((a, b) => {
        return b.popularity - a.popularity;
    });

    for (let i = 0; i < info.length; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("track-item");
        const trackName = document.createElement("span");
        trackName.classList.add("track-name");
        trackName.textContent = `${i+1}. ${info[i].name}`;
        const artistName = document.createElement("span");
        artistName.classList.add("artist-name");
        artistName.textContent = info[i].artists[0].name;
        const previewButton = document.createElement("button");
        previewButton.classList.add("btn", "btn-primary", "rounded-circle", "preview-button");
        const playIcon = document.createElement("i");
        playIcon.classList.add("fas", "fa-play");
        previewButton.appendChild(playIcon);
        previewButton.addEventListener("click", () => {
            const audio = new Audio(info[i].preview_url);
            if (currentAudio && currentAudio.src != audio.src) {
                currentAudio.pause();
                currentAudio.remove();
                currentAudio = audio;
                audio.play();
            } else if (currentAudio && currentAudio.src == audio.src) {
                if (currentAudio.paused) {
                    currentAudio.play();
                } else {
                    currentAudio.pause();
                }
                audio.remove();
                return;
            } else {
                currentAudio = audio;
                audio.play();
            }
        });
        listItem.appendChild(trackName);
        listItem.appendChild(artistName);
        listItem.appendChild(previewButton);
        list.appendChild(listItem);
    }

    utilityDiv(list);
}

function getYouTubeData() {
    utilityDiv(null);
}

function getInstagramData() {
    utilityDiv(null);
}

function getTwitterData() {
    utilityDiv(null); 
}

async function fetchData(url, token) {
    let data = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    data = await data.json();
    data = data.tracks.items;
    return data;
}