const menu = document.getElementById("MainMenuBurger");
const menuOverlay = document.getElementById("MainMenuOverlay");

menu.addEventListener("click", () => {
    if (!menuOverlay.classList.contains("is-active")) {
        menuOverlay.classList.add("is-active");
    } else {
        menuOverlay.classList.remove("is-active");
    }
});

const translatables = document.getElementsByClassName("jst");
const originalLang = {};

function getTranslation(text) {
    return library[text] ? library[text] : library[text.toLowerCase()];
}

function updateLanguage() {
    let language = localStorage.getItem("language") ?? "en";

    for (let i = 0; i < translatables.length; i++) {
        let translatable = translatables[i];
        if (language !== "en") {
            let translated = getTranslation(translatable.innerText);
            originalLang[i] = translatable.innerText;
            if (translated) 
                translatable.innerText = translated;
        } else if (originalLang[i]) {
            translatable.innerText = originalLang[i];
        }
    }
}

updateLanguage();

const languageSwitchers = document.getElementsByClassName("lang");

function updateLanguageClass(i) {
    if (!languageSwitchers[i].classList.contains("is-active")) {
        !languageSwitchers[i].classList.add("is-active");
        for (let x = 0; x < languageSwitchers.length; x++) {
            if (x == i) continue;
            languageSwitchers[x].classList.remove("is-active");
        }
    }
}

for (let i = 0; i < languageSwitchers.length; i++) {
    let language = localStorage.getItem("language") ?? "en";
    if (languageSwitchers[i].getAttribute("data-lang") == language) {
        updateLanguageClass(i);    
    }

    languageSwitchers[i].addEventListener("click", (e) => {
        let caller = e.target || e.srcElement;
        let lang = caller.getAttribute("data-lang");
        localStorage.setItem("language", lang);
        updateLanguageClass(i);
        updateLanguage();
    });
}

const inverter = document.getElementById("inverter");

if (inverter) {
    inverter.addEventListener("click", () => {
        if (document.body.classList.contains("invert"))
            document.body.classList.remove("invert")
        else
            document.body.classList.add("invert");
    });
}

// const wrapper = document.querySelector("body>.container");

// document.addEventListener("mousemove", (e) => {
//     let max = window.screen.width / 2;
//     let deg = -(max - e.clientX) / max * 20;
//     wrapper.style.transform = `rotateY(${deg}deg)`;
// });

