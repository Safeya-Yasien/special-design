//
//
//
//
//
//
//

let getColorFromLocalStorage = localStorage.getItem("color-option");
let settingsBox = document.querySelector(".settings-box");
let gearIconContainer = document.querySelector(".gear-icon-container");
let gearIcon = document.querySelector(".gear-icon");
let colorsList = document.querySelector(".colors-list");
let colorsListLi = document.querySelectorAll(".colors-list li");
let randomBackground = document.querySelectorAll(".random-background span");
let chooseImgList = document.querySelectorAll(".choose-img img");
let menuBarIcon = document.querySelector(".menu-bar");
let headerLinks = document.querySelector(".header .links");
let menuIconContainer = document.querySelector(".menu-icon:before");
let landingPage = document.querySelector("#landing-page");
let backgroundInterval;
let backgroundImgOption = true;

const landingImages = [
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

menuBarIcon.addEventListener("click", showMenu);
gearIconContainer.addEventListener("click", openSettings);

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

function showMenu() {
  headerLinks.classList.toggle("show-menu");
}

function openSettings() {
  settingsBox.classList.toggle("open-settings");
  gearIcon.classList.toggle("fa-spin");
}

colorsListLi.forEach((li) => {
  li.addEventListener("click", (ele) => {
    let datasetColor = ele.target.dataset.color;

    document.documentElement.style.setProperty("--main-color", datasetColor);

    localStorage.setItem("color-option", datasetColor);

    handleActive(ele);
  });
});

chooseImgList.forEach((img) => {
  img.addEventListener("click", () => chooseImg(img));
});

function chooseImg(img) {
  let container = img.parentElement.parentElement;

  container
    .querySelectorAll("img")
    .forEach((ele) => ele.classList.remove("active"));

  img.classList.add("active");

  landingPage.style.backgroundImage = `url(${img.src})`;

  backgroundImgOption = false;
  clearInterval(backgroundInterval);

  let noRandomBackgroundOption = document.querySelector(
    ".random-background .no"
  );
  let yesRandomBackgroundOption = document.querySelector(
    ".random-background .yes"
  );
  noRandomBackgroundOption.classList.add("active");
  yesRandomBackgroundOption.classList.remove("active");
}

randomBackground.forEach((span) => {
  span.addEventListener("click", (ele) => {
    let dataBackground = ele.target.dataset.background;

    handleActive(ele);

    if (dataBackground === "yes") {
      backgroundImgOption = true;
      randomizeWallparImg();
      chooseImgList.forEach((img) => img.classList.remove("active"));
    } else {
      backgroundImgOption = false;
      clearInterval(backgroundInterval);
    }
  });
});

function handleActive(eve) {
  eve.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  eve.target.classList.add("active");
}

function randomizeWallparImg() {
  if (backgroundImgOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * landingImages.length);

      landingPage.style.backgroundImage = `url(${landingImages[randomNumber]})`;
    }, 2000);
  }
}

randomizeWallparImg();
