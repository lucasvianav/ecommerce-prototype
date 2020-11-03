function initializeScripts(){
    handleFormTabs()
    handleForgotPwButton()

    document.querySelector('#signup-name').onkeydown = handleNameTyping
    document.querySelector('#signup-birthday').onkeydown = formatBirthday
    document.querySelector('#signup-cpf').onkeydown = formatCPF
    // document.querySelector('#signup-rg').onkeydown = formatRG
    document.querySelector('#signup-phoneNumber').onkeydown = formatPhoneNumber
}

// Login --> Criar conta | Criar conta --> Login
function swapTab(){
    const switchers = document.querySelectorAll('.switcher')
    switchers.forEach(item => item.parentElement.classList.remove('active')) // Hides every forms
    this.parentElement.classList.add('active') // Shows the current forms
}

// Adds event listeners to the forms' titles buttons
function handleFormTabs(){
    const switchers = document.querySelectorAll('.switcher')
    switchers.forEach(item => {
        item.addEventListener('click', swapTab)
    })
}

// What happens when the "I forgot my password" is pressed
function handleForgotPwButton(){
    const forgotButton = document.getElementById("forgot-button")

    // Adds event listener to the button
    forgotButton.addEventListener('click', function(){
        // Hides the login form
        let loginForm = this.parentElement.parentElement
        loginForm.style.display = "none"

        let wrapper = this.parentElement.parentElement.parentElement

        // Shows the password recovery form
        let recoveryForm = wrapper.querySelector(".form-recovery")
        recoveryForm.style.display = "block"

        // Adds event listener to swap back
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

// Validates the user data from the signup forms
function validateSignup(forms){
    if(forms === 'signup'){
        let pw = signup.pw
        let pwConf = signup.pwConfirmation
        let error = document.querySelector('#signup').querySelector('.error-message')

        if(pw.value != pwConf.value){
            error.innerHTML = "Ambas as senhas devem ser idênticas."
            pwConf.focus()
            return false
        }

        else{
            error.innerHTML = ""
            return true
        }
    }

    else if(forms === 'fullSignup'){
        // Function to validate birthdate formatted as "dd/mm/yyyy"
        function isValidDate(dateString){
            // First check for the pattern
            if(!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)){ return false }

            // Parse the date parts to integers
            let parts = dateString.split("/")
            let day = parseInt(parts[0], 10)
            let month = parseInt(parts[1], 10)
            let year = parseInt(parts[2], 10)

            // Check the ranges of month and year
            if(year < 1920 || year > (new Date).getFullYear() - 15 || month == 0 || month > 12){ return false }

            // It is not necessary to consider leap years
            let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

            // Check the range of the day
            return (day > 0 && day <= monthLength[month - 1])
        }

        let name = fullSignup.fullName
        let birthday = fullSignup.birthday
        let cpf = fullSignup.CPF
        let phone = fullSignup.phoneNumber
        let error = document.querySelector('#full-signup').querySelector('.error-message')
        
        name.value = name.value.title()

        let dateList = birthday.value.split('/')
        let day = dateList[0]
        let month = dateList[1]
        let year = dateList[2]
        let birthdate = new Date(year, month-1, day)
        
        if(!isValidDate(birthday.value)){
            let errorMsg = "A data de nascimento inserida é inválida"

            if((new Date).getFullYear() - year < 0){
                errorMsg = errorMsg + "... Ou será que já existe uma máquina do tempo?!"
            }

            else if((new Date).getFullYear() - year < 15){ 
                errorMsg = errorMsg + " - você deve possuir ao menos 15 anos para se cadastrar." 
            }

            else if(month == '02' && day == '29'){
                errorMsg = errorMsg + " - 29 de Fevereiro."
            }

            else{
                errorMsg = errorMsg + "."
            }

            error.innerHTML = errorMsg
            birthday.focus()
            return false
        }

        // // VALIDAR CPF
        // else if(){

        // }

        // // VALIDAR CELULAR
        // else if(){

        // }

        else{
            return true
        }

    }

    else{
        alert("O nome do formulário foi passado incorretamente.")
        return false
    }
}

// Prevents user from entering numbers to it's name
function handleNameTyping(e){
    // if a numeric key is numeric, don't allow it
    if(e.key != ' ' && e.key <= 9 && e.key >= 0){
        return false
    }
}

// Turns "DDMMYYYY" into "DD/MM/YYYY" while the user
//  types. Allows only numeric keys to be entered
function formatBirthday(e){
    // if a numeric key is numeric, allow it
    if(e.key != ' ' && e.key <= 9 && e.key >= 0){
        // insets dot and dash where it's needed
        if(e.target.value.length === 2 || e.target.value.length === 5){ 
            e.target.value = e.target.value + "/" 
        }
    }

    // excludes the dots and dashes when needed
    else if(e.key === 'Backspace'){
        if(e.target.value.length === 4 || e.target.value.length === 7){ 
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        }
    }

    // disable alphabetic keys and the delete key
    else if(e.key.length === 1 || e.key === 'Delete'){
        return false
    }
}

// Turns "00000000000" into "000.000.000-00" while the
// user types (automatically inserts dot and dash)
// Allows only numeric keys to be entered
function formatCPF(e){
    // if a numeric key is numeric, allow it
    if(e.key != ' ' && e.key <= 9 && e.key >= 0){
        // insets dot and dash where it's needed
        if(e.target.value.length === 3 || e.target.value.length === 7){ 
            e.target.value = e.target.value + "." 
        }

        else if(e.target.value.length === 11){ 
            e.target.value = e.target.value + "-" 
        }
    }

    // excludes the dots and dashes when needed
    else if(e.key === 'Backspace'){
        if(e.target.value.length === 5 || e.target.value.length === 9 || e.target.value.length === 13){ 
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        }
    }

    // disable alphabetic keys and the delete key
    else if(e.key.length === 1 || e.key === 'Delete'){
        return false
    }
}

function formatRG(e){
    // if a numeric key is numeric, allow it
    if(e.key != ' ' && e.key <= 9 && e.key >= 0){
        // insets dot and dash where it's needed
        if(e.target.value.length === 1 || e.target.value.length === 5){ 
            e.target.value = e.target.value + "." 
        }

        else if(e.target.value.length === 9){ 
            e.target.value = e.target.value + "-" 
        }
    }

    // excludes the dots and dashes when needed
    else if(e.key === 'Backspace'){
        if(e.target.value.length === 3 || e.target.value.length === 7 || e.target.value.length === 11){ 
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        }
    }

    // disable alphabetic keys and the delete key
    else if(e.key.length === 1 || e.key === 'Delete'){
        return false
    }
}

// Turns "00000000000" into "(00) 00000-0000" while the
// user types (automatically inserts parenthesis and dash)
// Allows only numeric keys to be entered
function formatPhoneNumber(e){
    // if a numeric key is numeric, allow it
    if(e.key != ' ' && e.key <= 9 && e.key >= 0){
        // insets dot and dash where it's needed
        if(e.target.value.length === 0){
            e.target.value = "(" + e.target.value
        }

        else if(e.target.value.length === 3){
            e.target.value = e.target.value + ") "
        }
        
        else if(e.target.value.length === 10){ 
            e.target.value = e.target.value + "-" 
        }
    }

    // excludes the dots and dashes when needed
    else if(e.key === 'Backspace'){
        if(e.target.value.length === 12 || e.target.value.length === 2){ 
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        }
        
        else if(e.target.value.length === 6){
            e.target.value = e.target.value.substring(0, e.target.value.length - 2)
        }
    }

    // disable alphabetic keys and the delete key
    else if(e.key.length === 1 || e.key === 'Delete'){
        return false
    }
}

