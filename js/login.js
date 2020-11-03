// Initializes js when the HTML has finished loading
$(function(){
    // Adds event listeners to the forms' titles buttons
    let switchers = document.querySelectorAll('.switcher')
    switchers.forEach(item => item.addEventListener('click', swapTab))
    
    showLoginRecovery()
    handleForgotPw()

    $('#signup-name').on('keydown',handleNameTyping)
    $('#signup-birthday').on('keydown',formatBirthday)
    $('#signup-cpf').on('keydown',formatCPF)
    $('#signup-phoneNumber').on('keydown',formatPhoneNumber)
})

// Login --> Criar conta | Criar conta --> Login
function swapTab(){
    if(!$(this.parentElement).hasClass('active')){
        if($(this).hasClass('switcher-login')){ showLoginRecovery() }
        else{ showSignup() }
        
        $('.form-wrapper.active').removeClass('active')
        $(this.parentElement).addClass('active')
    }
}

// Activates animation to show the login and password recovery (leftmost) 
// forms and hide the signup (leftmost) ones
function showLoginRecovery(){
    $('.form-login').addClass('show-login')
    $('.form-recovery').addClass('show-recovery')
    $('.form-signup').addClass('hide-signup')
    $('.form-full-signup').addClass('hide-full-signup')

    setTimeout(function(){
        $('.form-login').removeClass('show-login')
        $('.form-recovery').removeClass('show-recovery')
        $('.form-signup').removeClass('hide-signup')
        $('.form-full-signup').removeClass('hide-full-signup')

        $('.form-login').css({
            'background-color': '#fff',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.form-recovery').css({
            'background-color': '#fff',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.form-signup').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(-40%, 10px) scaleY(.8)'
        })

        $('.form-full-signup').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(-40%, 10px) scaleY(.7)'
        })

    }, 400)
}

// Activates animation to show the signup (rightmost) forms and hide
// the login and password recovery (leftmost) ones
function showSignup(){
    $('.form-signup').addClass('show-signup')
    $('.form-full-signup').addClass('show-full-signup')
    $('.form-login').addClass('hide-login')
    $('.form-recovery').addClass('hide-recovery')

    setTimeout(function(){
        $('.form-signup').removeClass('show-signup')
        $('.form-full-signup').removeClass('show-full-signup')
        $('.form-login').removeClass('hide-login')
        $('.form-recovery').removeClass('hide-recovery')

        $('.form-signup').css({
            'background-color': '#fff',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.form-full-signup').css({
            'background-color': '#fff',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.form-login').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(40%, 10px) scaleY(1.2)'
        })

        $('.form-recovery').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(40%, 10px) scaleY(1.8)'
        })

    }, 400)
}

// What happens when the "I forgot my password" button is pressed
function handleForgotPw(){
    // Button "I forgot my password"
    let forgotButton = $("#forgot-button")

    // Adds event listener to the button
    forgotButton.on('click', function(){
        let loginForm = $('.form-login')
        let wrapper = this.parentElement.parentElement.parentElement
        let recoveryForm = $(".form-recovery")

        // Reduces the login form's height (animation)
        // Hides the login form and shows the password recovery one
        loginForm.animate(
            { height: 0.62*parseFloat(loginForm.css('height')) + 'px' }, 400, 
            function() {
                loginForm.hide()
                recoveryForm.show()
                
                loginForm.css('height', 'auto')
            }
        )

        // Adds event listener to swap back
        wrapper.querySelector('#recovery-back').addEventListener('click', function(){
            if($(wrapper).hasClass("active")){
                recoveryForm.animate(
                    { height: 0.65*parseFloat(loginForm.css('height')) + 'px' }, 400,
                    function() {
                        recoveryForm.hide()
                        loginForm.show()

                        recoveryForm.css('height', 'auto')
                    }
                )

                this.removeEventListener('click', arguments.callee)
            }
        })
    })
}

// From basic signup to full signup forms
function handleFullSignup(){
    let signupForm = $('.form-signup')
    let wrapper = document.querySelector('.switcher-signup').parentElement
    let fullSignupForm = $(".form-full-signup")

    // Increases the login form's height (animation)
    // Hides the first signup form and shows the full one
    signupForm.animate(
        { height: 1.3*parseFloat(signupForm.css('height')) + 'px' }, 400,
        function(){
            signupForm.hide()
            fullSignupForm.show()
            
            signupForm.css('height', 'auto')
        }
    )

    // Adds event listener to swap back
    wrapper.querySelector('#signup-back').addEventListener('click', function(){
        if($(wrapper).hasClass("active")){
            fullSignupForm.animate(
                { height: 0.7*parseFloat(signupForm.css('height')) + 'px' }, 400,
                function() {
                    fullSignupForm.hide()
                    signupForm.show()

                    fullSignupForm.css('height', 'auto')
                }
            )

            this.removeEventListener('click', arguments.callee)
        }
    })
}

// Validates the user data from the signup forms
function validateSignup(forms){
    if(forms === 'signup'){
        // Gets input data
        let pw = signup.pw
        let pwConf = signup.pwConfirmation

        // Error message element
        let error = document.querySelector('#signup').querySelector('.error-message')

        // Validates the password
        if(pw.value != pwConf.value){
            error.innerHTML = "Ambas as senhas devem ser idênticas."
            pwConf.focus()
        }

        else{
            error.innerHTML = ""
            handleFullSignup()
        }
    }

    else if(forms === 'fullSignup'){
        // Function to validate birthdate formatted as "dd/mm/yyyy"
        function isValidDate(dateString){
            // Parses the date parts to integers
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

        // Gets input data
        let name = fullSignup.fullName
        let birthday = fullSignup.birthday
        let cpf = fullSignup.CPF
        let phone = fullSignup.phoneNumber

        // Error message element
        let error = $('#full-signup .error-message')
        
        name.value = name.value.title()

        // Parses the date
        let parts = birthday.value.split('/')
        let day = parts[0]
        let month = parts[1]
        let year = parts[2]
        let birthdate = new Date(year, month-1, day)

        // Validates the birthdate
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

            error.text(errorMsg)
            birthday.focus()
        }

        // Validates the CPF
        else if(!(new CPF).validate(cpf.value)){
            error.text("O CPF inserido é inválido.")
            cpf.focus()
        }

        // Validates the phonenumber
        if(phone.value.substring(1,2) == '0' || phone.value.substring(1,3) == '10' || phone.value.substring(5,6) != '9'){
            error.text("O número de celular inserido é inválido.")
            phone.focus()
        }

        // If no problem was found
        else{
            error.text("")
            
            // Submits both forms
            $.ajax({
                type: "POST",
                url: $(signup).attr('action'),
                data: $(signup).serialize(),
                success: function(){
                    fullSignup.submit()
                }
            })
        }

    }

    else{
        console.log("O nome do formulário foi passado incorretamente.")
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
