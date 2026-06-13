let prayerTimes = {};

async function loadPrayerTimes(){

const lat =
config.masjid.latitude;

const lng =
config.masjid.longitude;

const url =
`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=11`;

const response =
await fetch(url);

const data =
await response.json();

prayerTimes =
data.data.timings;

renderPrayerTimes();

}
