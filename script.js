
window.onload = () => {
    document.getElementById("loading").style.display = "none";
};

setInterval(() => {
    const t = new Date();

    const hari = t.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = t.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const jam = t.toLocaleTimeString("id-ID");

    document.getElementById("time").innerHTML =
        `${hari}, ${tanggal} | ${jam}`;
}, 1000);

const day = document.getElementById("ambienceDay");
const night = document.getElementById("ambienceNight");
const hover = document.getElementById("hoverSound");
const click = document.getElementById("clickSound");
const eywa = document.getElementById("eywa");
const btn = document.getElementById("audioControl");

let playing = false;
day.volume = night.volume = 0.4;
eywa.volume = 0.3;


function fade(audio, dir = "in") {
    let vol = dir === "in" ? 0 : audio.volume;
    audio.volume = vol;
    audio.play();

    const step = dir === "in" ? 0.02 : -0.02;
    const fadeInt = setInterval(() => {
        vol += step;
        audio.volume = Math.max(0, Math.min(0.4, vol));
        if (vol <= 0 || vol >= 0.4) clearInterval(fadeInt);
    }, 100);
}


btn.addEventListener("click", () => {
    if (!playing) {
        fade(day, "in");
        eywa.play();
        btn.innerHTML = "🔇";
        playing = true;
    } else {
        fade(day, "out");
        fade(night, "out");
        eywa.pause();
        btn.innerHTML = "🔊";
        playing = false;
    }
});


window.addEventListener("scroll", () => {
    if (!playing) return;

    if (window.scrollY > 500) {
        day.pause();
        fade(night, "in");
    } else {
        night.pause();
        fade(day, "in");
    }
});
 

document.querySelectorAll("a, button, .gallery div").forEach(el => {
    el.addEventListener("mouseenter", () => {
        hover.currentTime = 0;
        hover.play();
    });
    el.addEventListener("click", () => {
        click.currentTime = 0;
        click.play();
    });
});


for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (6 + Math.random() * 6) + "s";
    document.body.appendChild(p);
}


const hour = new Date().getHours();
if (hour >= 18 || hour <= 5) {
    document.body.classList.add("night");
}


const avatar = document.getElementById("avatarTitle");
const easter = document.getElementById("easterText");

avatar.addEventListener("click", () => {
    easter.style.display = "block";
    easter.innerText = "Eywa has connected with you 🌱";
});


for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (6 + Math.random() * 8) + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(p);
}


document.getElementById("avatarTitle").addEventListener("click", () => {
    document.getElementById("content").scrollIntoView({
        behavior: "smooth"
    });
})