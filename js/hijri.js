async function loadHijri(){

const response =
await fetch(
"https://api.aladhan.com/v1/gToH"
);

const data =
await response.json();

const hijri =
data.data.hijri;

document.getElementById(
"hijri"
).innerText =

`${hijri.day}
${hijri.month.en}
${hijri.year} H`;

}
