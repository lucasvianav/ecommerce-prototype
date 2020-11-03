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

// String function to title case
String.prototype.title = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// CPF Validation
class CPF {
    constructor() {
        "user_strict"; function r(r) {
            for (var t = null, n = 0; 9 > n; ++n)
                t += r.toString().charAt(n) * (10 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i;
        } function t(r) {
            for (var t = null, n = 0; 10 > n; ++n)
                t += r.toString().charAt(n) * (11 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i;
        } var n = false, i = true; 
        
        this.validate = function (o) {
            for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a.substring(9, 11), v = 0; 10 > v; v++)
                if ("" + u + f == "" + v + v + v + v + v + v + v + v + v + v + v)
                    return n; var c = r(u), e = t(u + "" + c); return f.toString() === c.toString() + e.toString() ? i : n;
        };
    }
}