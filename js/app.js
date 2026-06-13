let config = {};

async function loadConfig(){

const saved =
localStorage.getItem(
"silverhawkMasjid"
);

if(saved){

config =
JSON.parse(saved);

renderConfig();

return;

}

const response =
await fetch(
"data/config.json"
);

config =
await response.json();

renderConfig();

}

function renderConfig() {

    document.getElementById("masjidName")
        .innerText =
        config.masjid.nama;

    document.getElementById("masjidAddress")
        .innerText =
        config.masjid.alamat;

    document.getElementById("logo")
        .src =
        config.masjid.logo;

    document.getElementById("runningText")
        .innerText =
        config.runningText.join(" • ");

    document.getElementById("announcement")
        .innerHTML =
        config.announcement
        .map(item => `<p>${item}</p>`)
        .join("");

}

function updateClock() {

    const now = new Date();

    document.getElementById("clock")
        .innerText =
        now.toLocaleTimeString("id-ID");

    document.getElementById("date")
        .innerText =
        now.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

setInterval(updateClock, 1000);

updateClock();

loadConfig().then(() => {

    loadPrayerTimes();

    loadHijri();

    loadWallpapers();

    autoRefreshPrayer();

});
