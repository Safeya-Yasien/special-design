let getColorFromLocalStorage = localStorage.getItem("color-option");
let getRandomBackgroundFromLocalStorage = localStorage.getItem(
  "random-background-option"
);
let getChoosenBackgroundImgFromLocalStorage = localStorage.getItem(
  "choosen-background-img"
);
let getBulletOptionFromLocalStorage = localStorage.getItem("bullets-option");
let settingsBox = document.querySelector(".settings-box");
let gearIconContainer = document.querySelector(".gear-icon-container");
let gearIcon = document.querySelector(".gear-icon");
let colorsList = document.querySelector(".colors-list");
let colorsListLi = document.querySelectorAll(".colors-list li");
let randomBackground = document.querySelectorAll(".random-background span");
let chooseImgList = document.querySelectorAll(".choose-img img");
let menuIconContainer = document.querySelector(".menu-icon");
let menuBarIcon = document.querySelector(".menu-bar");
let headerLinks = document.querySelector(".header .links");
let landingPage = document.querySelector("#landing-page");
let skillsContainer = document.querySelector(".skills");
let resetOptionButton = document.querySelector(".reset-option");
let navBullets = document.querySelector(".nav-bullets");
let bulletsOption = document.querySelectorAll(".bullets-option span");
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
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
resetOptionButton.addEventListener("click", resetOptions);

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

if (getRandomBackgroundFromLocalStorage !== null) {
  if (getRandomBackgroundFromLocalStorage === "true") {
    backgroundImgOption = true;
    document
      .querySelector(".random-background span.yes")
      .classList.add("active");
  } else {
    backgroundImgOption = false;
    document
      .querySelector(".random-background span.no")
      .classList.add("active");
  }

  document
    .querySelectorAll(".random-background span")
    .forEach((ele) => ele.classList.remove("active"));
}

if (getChoosenBackgroundImgFromLocalStorage !== null) {
  let chosenBgImgUrl = getChoosenBackgroundImgFromLocalStorage;

  chooseImgList.forEach((img) => {
    if (img.src === chosenBgImgUrl) {
      img.classList.add("active");
      landingPage.style.backgroundImage = `url(${chosenBgImgUrl})`;
    }
  });

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

if (getBulletOptionFromLocalStorage !== null) {
  bulletsOption.forEach((span) => {
    span.classList.remove("active");
  });

  if (getBulletOptionFromLocalStorage === "block") {
    navBullets.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

function showMenu() {
  headerLinks.classList.toggle("show-menu");
  menuIconContainer.classList.toggle("active");
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

  localStorage.setItem("choosen-background-img", img.src);

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
      localStorage.setItem("random-background-option", true);
      chooseImgList.forEach((img) => img.classList.remove("active"));
    } else {
      backgroundImgOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("random-background-option", false);
    }
  });
});

bulletsOption.forEach((span) => {
  span.addEventListener("click", (ele) => {
    if (ele.target.dataset.display === "show") {
      navBullets.style.display = "block";

      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";

      localStorage.setItem("bullets-option", "none");
    }

    handleActive(ele);
  });
});

function resetOptions() {
  localStorage.clear();
  window.location.reload();
}

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

window.onscroll = function () {
  let skillsOffsetTop = skillsContainer.offsetTop;
  let skillsOffsetHeight = skillsContainer.offsetHeight;
  let windowInnerHeight = window.innerHeight;
  let windowScrollY = window.pageYOffset;

  let calculation = skillsOffsetTop + skillsOffsetHeight - windowInnerHeight;

  if (windowScrollY > calculation) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
      skill.classList.toggle("active");
    });
  }
};

let galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h2");
      imgHeading.className = "img-heading";

      imgHeading.innerHTML = img.alt;

      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");
    popupImg.className = "popup-img";
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    let closeButton = document.createElement("div");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", closeWindow);

    popupBox.appendChild(closeButton);

    popupOverlay.appendChild(popupBox);

    document.body.appendChild(popupOverlay);
  });
});

function closeWindow() {
  let popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.remove();
}

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (ele) => {
    document.querySelector("." + ele.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
