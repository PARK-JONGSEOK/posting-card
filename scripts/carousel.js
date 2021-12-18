window.addEventListener("load", function () {
  var carousels = document.getElementsByClassName("carousel");
  // Register carousel event.
  for (var i = 0; i < carousels.length; i++) {
    addEventToCarousel(carousels[i]);
  }
});

function addEventToCarousel(carouselElement) {
  var ulElement = carouselElement.querySelector("ul");
  var liElements = ulElement.querySelectorAll("li");

  // Adjust the width.
  var liWidth = liElements[0].clientWidth;
  var adjustedWidth = liElements.length * liWidth;

  ulElement.style.width = adjustedWidth + "px";

  // Register slide button event.
  var slideButtons = carouselElement.querySelectorAll(".slide");
  for (var i = 0; i < slideButtons.length; i++) {
    slideButtons[i].addEventListener(
      "click",
      createListenerSlide(carouselElement)
    );
  }
}

function createListenerSlide(carouselElement) {
  return function (event) {
    var clickedButton = event.currentTarget;
    var liElements = carouselElement.querySelectorAll("li");
    var liCount = liElements.length;
    var currentIndex = carouselElement.attributes.data.value;

    // Check Slide Button
    if (
      clickedButton.className.includes("right") &&
      currentIndex < liCount - 1
    ) {
      currentIndex++;
      scrollDiv(carouselElement, currentIndex);
    } else if (clickedButton.className.includes("left") && currentIndex > 0) {
      currentIndex--;
      scrollDiv(carouselElement, currentIndex);
    }
    // Indicate Update
    updateIndicator(carouselElement, currentIndex);

    // Show Slide Button
    updateSlideButtonVisible(carouselElement, currentIndex, liCount);

    // Index Update
    carouselElement.attributes.data.value = currentIndex;
  };
}

function scrollDiv(carouselElement, nextIndex) {
  var scrollabe = carouselElement.querySelector("div");
  var liWidth = scrollabe.clientWidth;
  var newLeft = liWidth * nextIndex;

  scrollabe.scrollTo({ left: newLeft, behavior: "smooth" });
}

function updateIndicator(carouselElement, currentIndex) {
  var indicators = carouselElement.querySelectorAll("footer > div");
  for (var i = 0; i < indicators.length; i++) {
    if (currentIndex == i) {
      indicators[i].className = "active";
    } else {
      indicators[i].className = "";
    }
  }
}

function updateSlideButtonVisible(carouselElement, currentIndex, liCount) {
  var left = carouselElement.querySelector(".slide-left");
  var right = carouselElement.querySelector(".slide-right");
  if (currentIndex > 0) {
    left.style.display = "block";
  } else {
    left.style.display = "none";
  }

  if (currentIndex < liCount - 1) {
    right.style.display = "block";
  } else {
    right.style.display = "none";
  }
}
