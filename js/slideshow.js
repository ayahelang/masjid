let wallpapers = [];

let currentWallpaper = 0;

async function loadWallpapers(){

    const res =
    await fetch(
    "data/wallpapers.json"
    );

    wallpapers =
    await res.json();

    changeWallpaper();

    setInterval(
        changeWallpaper,
        10000
    );

}

function changeWallpaper(){

    const img =
    document.getElementById(
    "wallpaper"
    );

    img.src =
    wallpapers[currentWallpaper];

    currentWallpaper++;

    if(
        currentWallpaper >=
        wallpapers.length
    ){
        currentWallpaper = 0;
    }

}
