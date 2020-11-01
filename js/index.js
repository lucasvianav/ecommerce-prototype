var currentModalId;

function handleEsc(e){
    // 'esc' = 27
    if(e.which === 27) { closeModal(); }
}

function handleWindowClick(e) {
    let modal = document.querySelector('.modal#'+currentModalId)

    // If the modal is open, close it
    if (e.target === modal){ closeModal(); } 
}

function openModal(id){
    let modal = document.querySelector('.modal#'+id)
    let scrollBarWidth = document.body.offsetWidth - document.body.clientWidth;

    // Prevents the body (everything under the modal) to scroll
    document.body.style.overflow = "hidden";
    // Creates a margin to compensate the loss of the scrollbar width, so the document.body won't shift right
    document.body.style.marginRight = scrollBarWidth + "px";

    // Shows the modal
    modal.style.display = "block"

    currentModalId = id
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleWindowClick);
}

function closeModal(){
    let modal = document.querySelector('.modal#'+currentModalId)

    // Lets the body scroll again
    document.body.style.overflow = "auto";
    // Removes the scrollbar-compensation margin
    document.body.style.marginRight = "0px";

    // Hides the modal
    modal.style.display = "none"
    
    // currentModalId = null
    document.removeEventListener("keydown", handleEsc);
    window.removeEventListener("click", handleWindowClick);
}