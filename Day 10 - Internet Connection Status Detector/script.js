const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor() {
    bgColor.classList.add("online");
}

async function connectionStatus() {
    try {
        const fetchResults = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Cognitive_bias_codex_en.svg/760px-Cognitive_bias_codex_en.svg.png?time=' + (new Date()).getTime());
        image.src = "./images/online.png";
        setColor();
        return fetchResults.status >= 200 && fetchResults.status < 300;
    } catch (error) {
        console.log(error);
        statusDisplay.textContent = "OOPS! Your internet connection is down...";
        image.src = "./images/offline.png";
        bgColor.classList.remove("online");
    }
}

// MONITOR CONNECTION
setInterval(async () => {
    const result = await connectionStatus();
    if (result) {
        statusDisplay.textContent = "You are ONLINE!";
        setColor();
    }
}, 5000);

//  SET CONNECTION WHEN PAGE LOADS
window.addEventListener("load", async (event) => {
    if (connectionStatus()) {
        statusDisplay.textContent = "You are ONLINE!";
    } else {
        statusDisplay.textContent = "You are OFFLINE!";
    }
})