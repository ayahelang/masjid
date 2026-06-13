let config = {};

async function loadConfig(){

const response =
await fetch("data/config.json");

config = await response.json();

renderConfig();

}

function renderConfig(){

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
.map(item=>`<p>${item}</p>`)
.join("");

}

function updateClock(){

const now = new Date();

document.getElementById("clock")
.innerText =
now.toLocaleTimeString("id-ID");

document.getElementById("date")
.innerText =
now.toLocaleDateString("id-ID",{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
});

}

setInterval(updateClock,1000);

loadConfig();
updateClock();

function renderPrayerTimes(){

const target =
document.getElementById(
"prayerTimes"
);

const prayers = [
"Fajr",
"Dhuhr",
"Asr",
"Maghrib",
"Isha"
];

const labels = {
Fajr:"Subuh",
Dhuhr:"Dzuhur",
Asr:"Ashar",
Maghrib:"Maghrib",
Isha:"Isya"
};

target.innerHTML =
prayers.map(p=>`

<div class="prayer-item">

<span>${labels[p]}</span>

<span>${prayerTimes[p]}</span>

</div>

`).join("");

}

function updateNextPrayer(){

const now = new Date();

const list = [

["Subuh", prayerTimes.Fajr],
["Dzuhur", prayerTimes.Dhuhr],
["Ashar", prayerTimes.Asr],
["Maghrib", prayerTimes.Maghrib],
["Isya", prayerTimes.Isha]

];

for(const item of list){

const [name,time] = item;

const [h,m] =
time.split(":");

const prayerDate =
new Date();

prayerDate.setHours(h);
prayerDate.setMinutes(m);
prayerDate.setSeconds(0);

if(prayerDate > now){

showCountdown(
name,
time,
prayerDate
);

return;

}

}

}

function showCountdown(
name,
time,
prayerDate
){

document.getElementById(
"nextPrayerName"
).innerText = name;

document.getElementById(
"nextPrayerTime"
).innerText = time;

setInterval(()=>{

const now =
new Date();

const diff =
prayerDate-now;

const h =
Math.floor(diff/3600000);

const m =
Math.floor(
(diff%3600000)/60000
);

const s =
Math.floor(
(diff%60000)/1000
);

document.getElementById(
"countdown"
).innerText =
`${h}j ${m}m ${s}d`;

},1000);

}
