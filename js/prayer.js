let prayerTimes = {};

let countdownInterval;

async function loadPrayerTimes() {

    if (!navigator.geolocation) {

        alert(
            "Browser tidak mendukung GPS"
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;

            loadLocationName(
lat,
lng
);

            const url =
                `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=11`;

            const response =
                await fetch(url);

            const data =
                await response.json();

            prayerTimes =
                data.data.timings;

            renderPrayerTimes();

            updateNextPrayer();

        },

        (error) => {

            console.error(error);

        }

    );

}

function getNextPrayerName() {

    const now = new Date();

    const prayers = [

        ["Subuh", prayerTimes.Fajr],
        ["Dzuhur", prayerTimes.Dhuhr],
        ["Ashar", prayerTimes.Asr],
        ["Maghrib", prayerTimes.Maghrib],
        ["Isya", prayerTimes.Isha]

    ];

    for (const prayer of prayers) {

        const [name, time] = prayer;

        const [h, m] =
            time.split(":");

        const prayerDate =
            new Date();

        prayerDate.setHours(h, m, 0, 0);

        if (prayerDate > now) {
            return name;
        }

    }

    return "Subuh";

}

function renderPrayerTimes() {

    const nextPrayer =
        getNextPrayerName();

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

        Fajr: "Subuh",
        Dhuhr: "Dzuhur",
        Asr: "Ashar",
        Maghrib: "Maghrib",
        Isha: "Isya"

    };

    target.innerHTML =
        prayers.map(p => `

<div class="prayer-item ${nextPrayer===labels[p] ? 'active-prayer' : ''}">

<span>${labels[p]}</span>

<span>${prayerTimes[p]}</span>

</div>

`).join("");

}

function updateNextPrayer() {

    const now =
        new Date();

    const list = [

        ["Subuh", prayerTimes.Fajr],
        ["Dzuhur", prayerTimes.Dhuhr],
        ["Ashar", prayerTimes.Asr],
        ["Maghrib", prayerTimes.Maghrib],
        ["Isya", prayerTimes.Isha]

    ];

    for (const item of list) {

        const [name, time] = item;

        const [h, m] =
            time.split(":");

        const prayerDate =
            new Date();

        prayerDate.setHours(h, m, 0, 0);

        if (prayerDate > now) {

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
) {

    document.getElementById(
        "nextPrayerName"
    ).innerText = name;

    document.getElementById(
        "nextPrayerTime"
    ).innerText = time;

    clearInterval(
        countdownInterval
    );

    countdownInterval =
        setInterval(() => {

            const now =
                new Date();

            const diff =
                prayerDate - now;

            if (diff <= 0) {

                clearInterval(
                    countdownInterval
                );

                updateNextPrayer();

                return;

            }

            const h =
                Math.floor(diff / 3600000);

            const m =
                Math.floor(
                    (diff % 3600000) / 60000
                );

            const s =
                Math.floor(
                    (diff % 60000) / 1000
                );

            document.getElementById(
                "countdown"
            ).innerText =
                `${h}j ${m}m ${s}d`;

        }, 1000);

}

function autoRefreshPrayer() {

    const now =
        new Date();

    const nextDay =
        new Date();

    nextDay.setHours(
        24,
        0,
        0,
        0
    );

    const delay =
        nextDay - now;

    setTimeout(() => {

        loadPrayerTimes();

        autoRefreshPrayer();

    }, delay);

}
