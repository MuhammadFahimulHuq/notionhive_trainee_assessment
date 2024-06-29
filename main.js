import "./style.scss"

// const slide1 = document.getElementsByClassName("slide-card-01")
// const slide2 = document.getElementsByClassName("slide-card-02")
// const slide3 = document.getElementsByClassName("slide-card-03")

document.addEventListener("DOMContentLoaded", function () {
  const blogItemsContainer = document.getElementById("blog-items-container")
  const loadMoreButton = document.getElementById("load-more-button")

  const blogItems = Array.from(
    blogItemsContainer.getElementsByClassName("blog-item")
  )
  let itemsToShow = 3

  function showItems() {
    blogItems.forEach((item, index) => {
      if (index < itemsToShow) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })

    if (itemsToShow >= blogItems.length) {
      loadMoreButton.style.display = "none"
    }
  }

  loadMoreButton.addEventListener("click", function () {
    itemsToShow += 3
    showItems()
  })

  // Initial call to show items
  createDotIndicator(slides, dotCarouselItemsContainer, dotElements)
  createDotIndicator(
    imageItems,
    dotCarouselCardItemsContainer,
    dotCardImageElement
  )
  showItems()
  slider(defaultPoint)
  infiniteSlider()
  infiniteCardImageSlider()
})

//carousel

let centerView = 0
let defaultPoint = 1
const carouselItemsContainer = document.getElementById("carousel")

const slides = Array.from(
  carouselItemsContainer.getElementsByClassName("slide")
)

const prevSlides = function (n) {
  centerView += n
  if (centerView < 0) {
    centerView = slides.length - 1
  }
  slider(centerView)
}
const nextSlides = function (n) {
  centerView += n
  if (centerView >= slides.length) {
    centerView = 0
  }
  slider(centerView)
}

document.querySelector(".prev").addEventListener("click", function () {
  prevSlides(-1)
})

document.querySelector(".next").addEventListener("click", function () {
  nextSlides(1)
})
const slider = function (current) {
  slides.forEach((item, index) => {
    if (index === current) {
      item.style.transform = `translateX(0)`
      item.style.opacity = "1"
      let cardItem = item.querySelector(".card-text-container")
      cardItem.style.display = "block"
    } else if (index === (current - 1 + slides.length) % slides.length) {
      item.style.transform = `translateX(-105%)`
      item.style.opacity = "0.4"
      let cardItem = item.querySelector(".card-text-container")
      cardItem.style.display = "none"
    } else if (index === (current + 1) % slides.length) {
      item.style.transform = `translateX(105%)`
      item.style.opacity = "0.4"
      let cardItem = item.querySelector(".card-text-container")
      cardItem.style.display = "none"
    } else {
      item.style.transform = `translateX(${(index - current) * 105}%)`
      item.style.opacity = "0.4"
      let cardItem = item.querySelector(".card-text-container")
      cardItem.style.display = "none"
    }
  })
  updateDotIndicators(dotElements, centerView, ["active", "in-active"])
}

const dotCarouselItemsContainer =
  document.getElementsByClassName("dot-container")[0]
const dotCarouselCardItemsContainer =
  document.getElementsByClassName("dot-container")[1]

const dotElements = []
const dotCardImageElement = []
const createDotIndicator = function (array, itemsContainer, dotArray) {
  array.forEach((card, index) => {
    const li = document.createElement("li")
    li.classList.add("dot")
    if (index === defaultPoint) {
      li.classList.add("active")
    } else {
      li.classList.add("in-active")
    }
    itemsContainer.appendChild(li)
    dotArray.push(li)
  })
}

const updateDotIndicators = (dotArray, view, color) => {
  dotArray.forEach((dot, index) => {
    if (index === view) {
      dot.classList.add(color[0])
      dot.classList.remove(color[1])
    } else {
      dot.classList.add(color[1])
      dot.classList.remove(color[0])
    }
  })
}

const infiniteSlider = function () {
  setTimeout(() => {
    nextSlides(1)
    infiniteSlider()
  }, 4000)
}

//card carousel
const cardImageSlider = document.getElementsByClassName(
  "carousel-card-image-container"
)[0]

const imageItems = Array.from(
  cardImageSlider.getElementsByClassName("card-image")
)

let imageCurrentView = 0

const cardSlider = function () {
  imageItems.forEach((item, index) => {
    if (index === imageCurrentView) {
      item.style.transform = `translateX(0)`
    } else if (
      index ===
      (imageCurrentView - 1 + slides.length) % slides.length
    ) {
      item.style.transform = `translateX(-100%)`
    } else if (index === (imageCurrentView + 1) % slides.length) {
      item.style.transform = `translateX(100%)`
    } else {
      item.style.transform = `translateX(${(index - imageCurrentView) * 100}%)`
    }
  })
  imageCurrentView += 1
  if (imageCurrentView >= imageItems.length) {
    imageCurrentView = 0
  }
  updateDotIndicators(dotCardImageElement, imageCurrentView, [
    "engaged",
    "in-engaged",
  ])
}

const infiniteCardImageSlider = function () {
  setTimeout(() => {
    cardSlider()
    infiniteCardImageSlider()
  }, 2000)
}

const handleVideoPopUp = (name) => {
  const videoSource = document.getElementById("video-source")
  videoSource.src = "/videos/" + name + ".mp4"
  const videoPopUp = document.getElementById("video-popup")
  videoPopUp.style.display = "block"
}

document
  .getElementById("video-popup-close")
  .addEventListener("click", () => handleCloseVideoPopup())

const videoContainer = document.getElementsByClassName("video-container")[0]

document
  .getElementById("watch-more-button")
  .addEventListener("click", () => handleVideoPopUp("video01"))

videoContainer.addEventListener("click", () => handleVideoPopUp("video01"))

const watch_now = document.getElementsByClassName("video-watch-now")[0]
watch_now.addEventListener("click ", () => handleVideoPopUp("video01"))

const videoPreview = document.getElementsByClassName("video01")[0]
console.log(videoPreview)
let hoverTimeout
videoContainer.addEventListener("mouseenter", () => {
  videoPreview.play()
  hoverTimeout = setTimeout(() => {
    videoPreview.pause()
  }, 3000) // Play for 3 seconds
})
videoContainer.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimeout)
  videoPreview.pause()
})

const handleCloseVideoPopup = () => {
  const videoPopUp = document.getElementById("video-popup")
  videoPopUp.style.display = "none"
}

const contactUsButton = document.querySelectorAll(".contact-us-button")
console.log(contactUsButton)
const contactUsModal = document.getElementById("contact-us-modal")
const contactUsClose = document.getElementById("contact-us-close")
contactUsButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    contactUsModal.style.display = "block"
    document.body.style.overflow = "hidden"
  })
})

contactUsClose.addEventListener("click", () => {
  contactUsModal.style.display = "none"
  document.body.style.overflow = "visible"
})

const slidingNavContainer = document.querySelector(".sliding-navbar")
const hamburger = document.querySelector("#hamburger")
const nav_close_button = document.querySelector("#sliding-navbar-close")

hamburger.addEventListener("click", () => {
  slidingNavContainer.style.display = "block"
})

nav_close_button.addEventListener("click", () => {
  slidingNavContainer.style.display = "none"
})
