"use strict";

// ::::: GLobal Javascript ::::
// ================================Animate Interaction on Scroll ==================================
JOS.init({
  // disable: false, // Disable JOS gloabaly | Values :  'true', 'false'
  // debugMode: true, // Enable JOS debug mode | Values :  'true', 'false'
  passive: false, // Set the passive option for the scroll event listener | Values :  'true', 'false'

  once: true, // Disable JOS after first animation | Values :  'true', 'false' || Int : 0-1000
  animation: "fade-up", // JOS global animation type | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, spin, revolve, stretch, "my-custom-animation"
  // animationInverse: "static", // Set the animation type for the element when it is scrolled out of view | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, spin, revolve, stretch, "my-custom-animation"
  timingFunction: "ease", // JOS global timing function | Values :  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end', 'steps()', 'cubic-bezier()', 'my-custom-timing-function'
  //mirror : false, // Set whether the element should animate back when scrolled out of view | Values :  'true', 'false'
  threshold: 0, // Set gloabal the threshold for the element to be visible | Values :  0-1
  delay: 0.5, // Set global the delay for the animation to start | Values :  0,1,2,3,4,5
  duration: 0.7, // Set global the duration for the animation playback | Values :  flota : 0-1 & int : 0,1,2,3,4,5

  // startVisible: "true", // Set whether the element should animate when the page is loaded | Values :  'true', 'false' || MS : 0-10000
  scrollDirection: "down", // Set the scroll direction for the element to be visible | Values :  'up', 'down', 'none'
  //scrollProgressDisable: true // disable or enable scroll callback function | Values :  'true', 'false'
  // intersectionRatio: 0.4, // Set the intersection ratio between which the element should be visible | Values :  0-1 (automaticaly set)
  // rootMargin_top: "0%", // Set by which percent the element should animate out (Recommended value between 10% to -30%)
  // rootMargin_bottom: "-50%", // Set by which percent the element should animate out (Recommended value between -10% to -60%)
  rootMargin: "0% 0% 15% 0%", // Set the root margin for the element to be visible | Values :  _% _% _% _%  (automaticaly set)
});
const videoHero = document.getElementById("video-hero");
const videoItems = document.getElementsByClassName("video-item");
const nextBtn = document.getElementsByClassName("next-btn")[0];
const videoTags = document.getElementsByTagName("video");
const aBox = document.querySelector(".loading-percent");

videoHero.addEventListener("mousedown", handleMouseDown);
videoHero.addEventListener("mouseup", handleMouseUp);

const videosLength = videoItems.length;
const loopTime = 8000;
let videoIdx = 0;
let loadPer = 2;
let isDragging = false;
let xPos = 0;

function hideVideos(videoIdx = 0) {
  for (let i = 0; i < videoItems.length; i++) {
    const rmTime = (videoTags[i].duration - videoTags[i].currentTime) * 1000;
    if (videoIdx != i) {
      videoItems[i].style.display = "none";
      videoTags[i].pause();
      if (i > 0 && rmTime < loopTime) {
        videoTags[i].currentTime = 0;
      }
    } else {
      videoItems[i].style.display = "block";
      videoTags[i].play();
    }
  }
}

function loopVideos(offset = 1) {
  let newVideoIndex = (videoIdx + offset) % videosLength;
  videoIdx = Math.max(0, newVideoIndex);
  hideVideos(videoIdx);
}
function updateLoading() {
  aBox.style.cssText = `width:${loadPer}%`;
  loadPer = (loadPer + 0.2) % 100;
}

function moveVideo(offset = 1) {
  loadPer = 2;
  loopVideos(offset);
}

hideVideos(videoIdx);
loopVideos();
setInterval(() => {
  moveVideo();
}, loopTime);
setInterval(() => {
  updateLoading();
}, loopTime / 500);

function handleMouseDown(event) {
  isDragging = true;
  xPos = event.clientX;
}

function handleMouseUp(event) {
  isDragging = false;
  newXPos = event.clientX;
  const dragDistance = newXPos - xPos;
  if (dragDistance > 10) {
    moveVideo(-1);
  } else if (dragDistance < -10) {
    moveVideo();
  }
}

function loadDocumet() {
  // videoHero.style.display = "block";
}

document.getElementsByClassName("how-to")[0].addEventListener("click", () => {
  window.open("https://www.youtube.com/watch?v=KHWTqYHndrc", "_blank");
});

// ======================================== Accordion ======================================
let accordions = document.querySelectorAll(".accordion-item");
accordions.forEach((item) => {
  let label = item.querySelector(".accordion-header");
  label.addEventListener("click", () => {
    accordions.forEach((accordionItem) => {
      accordionItem.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});



//:::::::::::::::::::::::::::::::::::::::::: Template JavaScript ::::::::::::::::::::::::::::::::::

// ========================TF-1 : Brand Slider================================
var brandSlider = new Swiper(".brand-slider", {
  slidesPerView: 2,
  spaceBetween: 105,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});

// Get all tab buttons and content sections
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

// Add click event listeners to tab buttons
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'active' class from all tab buttons and hide all tab content
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Get the data-tab attribute of the clicked button
    const tabId = button.getAttribute("data-tab");
    const correspondingTab = document.getElementById(tabId);

    // Add 'active' class to the clicked button and show the corresponding tab content
    button.classList.add("active");
    correspondingTab.classList.remove("hidden");
  });
});

// ========================TF-1 : Testimonial Slider================================
const testimonialSlider = new Swiper(".testimonial-slider", {
  slidesPerView: 1,
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".testimonial-nav-next",
    prevEl: ".testimonial-nav-prev",
  },
});


