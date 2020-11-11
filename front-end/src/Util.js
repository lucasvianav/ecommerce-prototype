import $ from 'jquery'

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.title = function(){
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

Array.prototype.isEmpty = function(){
    return (this.length === 0 || this[0] === undefined)
}

// MODAL BOX CONTROLS
var currentModalId;

function handleEsc(e){
    if(e.key === 'Escape') { closeModal() }
}

function handleWindowClick(e) {
    let modal = document.querySelector('.modal#'+currentModalId)

    // If the modal is open, close it
    if (e.target === modal){ closeModal() } 
}

export function openModal(id){
    let modal = $('.modal#'+id)
    let scrollBarWidth = parseFloat(document.body.offsetWidth - document.body.clientWidth)

    // Prevents the body (everything under the modal) to scroll
    $('html').css('overflow-y', 'hidden')

    // Creates a margin to compensate the loss of the scrollbar width, so the document.body won't shift right
    $('html').css('margin-right', scrollBarWidth + 'px')
    // document.body.style.marginRight = scrollBarWidth + "px";

    // Shows the modal
    modal.show()

    currentModalId = id
    document.addEventListener("keydown", handleEsc)
    window.addEventListener("click", handleWindowClick)
}

function closeModal(){
    let modal = $('.modal#'+currentModalId)

    // Lets the body scroll again
    $('html').css('overflow-y', 'auto')

    // Removes the scrollbar-compensation margin
    $('html').css('margin-right', '0')

    // Hides the modal
    modal.hide()
    
    // currentModalId = null
    document.removeEventListener("keydown", handleEsc);
    window.removeEventListener("click", handleWindowClick);
}