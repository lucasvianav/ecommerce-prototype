function swapTab(){
    const switchers = document.querySelectorAll('.switcher')
    switchers.forEach(item => item.parentElement.classList.remove('active'))
    this.parentElement.classList.add('active')
}

function handleFormTabs(){
    const switchers = document.querySelectorAll('.switcher')
    switchers.forEach(item => {
        item.addEventListener('click', swapTab)
    })
}

function handleForgotPwButton(){
    const forgotButton = document.getElementById("forgot-button")
    forgotButton.addEventListener('click', function(){
        let loginForm = this.parentElement.parentElement
        loginForm.style.display = "none"

        let wrapper = this.parentElement.parentElement.parentElement

        let recoveryForm = wrapper.querySelector(".form-recovery")
        recoveryForm.style.display = "block"
        recoveryForm.classList.add("active")

        wrapper.querySelector(".switcher-login").removeEventListener('click', swapTab)
        
        wrapper.querySelector(".switcher-login").addEventListener('click', function(){
            if(wrapper.classList.contains("active") === true){
                recoveryForm.style.display = "none"
                loginForm.style.display = "block"
                this.removeEventListener('click', arguments.callee)
            }
        })
        
        wrapper.querySelector(".switcher-login").addEventListener('click', swapTab)
    })
}