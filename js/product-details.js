var currentSlide = 0;

// Shows selected photo and hides all other
function showSlides(n) {
  let slides = document.getElementsByClassName("large-photo");
  let thumbs = document.getElementsByClassName("product-photo-thumb");

  if (n >= slides.length){ currentSlide = slides.length }
  else if (n < 0){ currentSlide = 0 }
  else{ currentSlide = n }

  for(let photo of slides){
    photo.style.display = "none"
  }

  for(let thumbnail of thumbs){
    thumbnail.classList.remove('active')
  }

  slides[currentSlide].style.display = "inline-block"
  thumbs[currentSlide].classList.add('active')
}

// Adds events listeners to the thumbnails in order to control the slides
// Called when the page completes loading
function initSlides(){
  showSlides(0)

  let thumbs = document.getElementsByClassName("product-photo-thumb")

  for(let i = 0; i < thumbs.length; i++){
    thumbs[i].addEventListener('click', function(){
      showSlides(i)
    })
  }
}
