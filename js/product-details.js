// Called when the html completes loading
$(function(){
  let slides = $('.large-photo')
  let thumbs = $('.product-photo-thumb')
  
  // Hides all slides
  slides.each(function(){ $(this).hide() })

  // Deactivates all thumbnails and adds events
  // listeners to them in order to control the slides
  for(let i = 0; i < thumbs.length; i++){
    $(thumbs[i]).removeClass('active')
    $(thumbs[i]).bind('click', function(){ showSlides(i) }) // Binds evento to handler
  }

  // Shows the first slide and activates the corresponding thumbnail
  $(slides[0]).show()
  $(thumbs[0]).addClass('active')
})

// Slide of the index currently visible
var currentSlide = 0;

// Shows selected photo and hides all other
function showSlides(n){
  let slides = $(".large-photo")
  let thumbs = $(".product-photo-thumb")

  // Hides the current slide and deactivates it's thumbnail
  $(slides[currentSlide]).hide()
  $(thumbs[currentSlide]).removeClass('active')

  // Sets new current slide index
  if(n >= slides.length){ currentSlide = slides.length }
  else if(n < 0){ currentSlide = 0 }
  else{ currentSlide = n }

  // Shows the current slide and activates it's thumbnail
  $(slides[currentSlide]).show()
  $(thumbs[currentSlide]).addClass('active')
}