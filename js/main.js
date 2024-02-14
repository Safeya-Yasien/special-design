//
//
//
//
//
//
//

// local storage

let getColorFromLocalStorage = localStorage.getItem("color-option");

if (getColorFromLocalStorage !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    getColorFromLocalStorage
  );

  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.color === getColorFromLocalStorage) {
      ele.classList.add("active");
    }
  });
}

// settings box
let settingsBox = document.querySelector(".settings-box");
let gearIconContainer = document.querySelector(".gear-icon-container");
let gearIcon = document.querySelector(".gear-icon");
let colorsList = document.querySelector(".colors-list");
let colorsListLi = document.querySelectorAll(".colors-list li");
let menuBarIcon = document.querySelector(".menu-bar");
let headerLinks = document.querySelector(".header .links");
let menuIconContainer = document.querySelector(".menu-icon:before");
let landingPage = document.querySelector("#landing-page");

menuBarIcon.addEventListener("click", showMenu);

function showMenu() {
  headerLinks.classList.toggle("show-menu");
}

var landingImages = [
  "images/wallpaper-1.jpg",
  "images/wallpaper-2.jpg",
  "images/wallpaper-3.jpg",
  "images/wallpaper-4.png",
  "images/wallpaper-5.jpg",
  "images/wallpaper-6.jpg",
  "images/wallpaper-7.jpg",
  "images/wallpaper-8.jpg",
  "images/wallpaper-9.jpg",
  "images/wallpaper-10.jpg",
];

gearIconContainer.addEventListener("click", openSettings);

function openSettings() {
  settingsBox.classList.toggle("open-settings");
  gearIcon.classList.toggle("fa-spin");
}

colorsListLi.forEach((li) => {
  li.addEventListener("click", (li) => {
    let datasetColor = li.target.dataset.color;

    document.documentElement.style.setProperty("--main-color", datasetColor);

    localStorage.setItem("color-option", datasetColor);

    li.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });

    li.target.classList.add("active");
  });
});

setInterval(() => {
  let randomNumber = Math.floor(Math.random() * landingImages.length);

  landingPage.style.backgroundImage = `url(${landingImages[randomNumber]})`;
}, 5000);
