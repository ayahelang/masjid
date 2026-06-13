let config = {};

async function loadConfig(){

    const res =
        await fetch(
        "data/config.json"
        );

    config =
        await res.json();

    fillForm();

}

function fillForm(){

    document
    .getElementById(
    "namaMasjid"
    )
    .value =
    config.masjid.nama;

    document
    .getElementById(
    "alamatMasjid"
    )
    .value =
    config.masjid.alamat;

    document
    .getElementById(
    "runningText"
    )
    .value =
    config.runningText.join(
    "\n"
    );

    document
    .getElementById(
    "announcement"
    )
    .value =
    config.announcement.join(
    "\n"
    );

}

document
.getElementById(
"saveBtn"
)
.addEventListener(
"click",
()=>{

config.masjid.nama =
document
.getElementById(
"namaMasjid"
)
.value;

config.masjid.alamat =
document
.getElementById(
"alamatMasjid"
)
.value;

config.runningText =
document
.getElementById(
"runningText"
)
.value
.split("\n");

config.announcement =
document
.getElementById(
"announcement"
)
.value
.split("\n");

localStorage.setItem(
"silverhawkMasjid",
JSON.stringify(config)
);

alert(
"Data tersimpan"
);

});

document
.getElementById(
"exportBtn"
)
.addEventListener(
"click",
()=>{

const blob =
new Blob(

[
JSON.stringify(
config,
null,
2
)
],

{
type:
"application/json"
}

);

const url =
URL.createObjectURL(
blob
);

const a =
document.createElement(
"a"
);

a.href = url;

a.download =
"config.json";

a.click();

});
