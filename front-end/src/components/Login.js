import React from 'react'
import $ from 'jquery'
import InputMask from 'react-input-mask'
import '../Util'

import './css/Login.css'
import { DataContext } from '../Context'

// Login --> Criar conta | Criar conta --> Login
const swapTab = (e) => {
    const switcher = e.target

    if(!$(switcher.parentElement).hasClass('active')){
        if($(switcher).hasClass('switcher-login')){ showLoginRecovery() }
        else{ showSignup() }
        
        $('.form-wrapper.active').removeClass('active')
        $(switcher.parentElement).addClass('active')
    }
}

// Activates animation to show the login and password recovery (leftmost) 
// forms and hide the signup (leftmost) ones
const showLoginRecovery = () => {
    $('.form-login').addClass('show-login active')
    $('.form-recovery').addClass('show-recovery active')
    $('.form-signup').addClass('hide-signup')
    $('.form-full-signup').addClass('hide-full-signup')

    setTimeout(function(){
        $('.form-login').removeClass('show-login')
        $('.form-recovery').removeClass('show-recovery')
        $('.form-signup').removeClass('hide-signup active')
        $('.form-full-signup').removeClass('hide-full-signup active')

        $('.light-theme .form-login').css({
            'background-color': '#fff',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.light-theme .form-recovery').css({
            'background-color': '#fff',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.light-theme .form-signup').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(-40%, 10px) scaleY(.8)'
        })

        $('.light-theme .form-full-signup').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(-40%, 10px) scaleY(.7)'
        })

        $('.dark-theme .form-login').css({
            'background-color': '#3b3b3b',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.dark-theme .form-recovery').css({
            'background-color': '#3b3b3b',
            'transform': 'translate(35%, -20px) scaleY(1)'
        })

        $('.dark-theme .form-signup').css({
            'background-color': '#25262c',
            'transform': 'translate(-40%, 10px) scaleY(.8)'
        })

        $('.dark-theme .form-full-signup').css({
            'background-color': '#25262c',
            'transform': 'translate(-40%, 10px) scaleY(.7)'
        })

    }, 400)
}

// Activates animation to show the signup (rightmost) forms and hide
// the login and password recovery (leftmost) ones
const showSignup = () => {
    $('.form-signup').addClass('show-signup active')
    $('.form-full-signup').addClass('show-full-signup active')
    $('.form-login').addClass('hide-login')
    $('.form-recovery').addClass('hide-recovery')

    setTimeout(function(){
        $('.form-signup').removeClass('show-signup')
        $('.form-full-signup').removeClass('show-full-signup')
        $('.form-login').removeClass('hide-login active')
        $('.form-recovery').removeClass('hide-recovery active')

        $('.light-theme .form-signup').css({
            'background-color': '#fff',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.light-theme .form-full-signup').css({
            'background-color': '#fff',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.light-theme .form-login').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(40%, 10px) scaleY(1.2)'
        })

        $('.light-theme .form-recovery').css({
            'background-color': '#d7e7f1',
            'transform': 'translate(40%, 10px) scaleY(1.8)'
        })

        $('.dark-theme .form-signup').css({
            'background-color': '#3b3b3b',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.dark-theme .form-full-signup').css({
            'background-color': '#3b3b3b',
            'transform': 'translate(-35%, -20px) scaleY(1)'
        })

        $('.dark-theme .form-login').css({
            'background-color': '#25262c',
            'transform': 'translate(40%, 10px) scaleY(1.2)'
        })

        $('.dark-theme .form-recovery').css({
            'background-color': '#25262c',
            'transform': 'translate(40%, 10px) scaleY(1.8)'
        })

    }, 400)
}

// What happens when the "I forgot my password" button is pressed
const handleForgotPw = () => {
    // Adds event listener to the "I forgot my password" button
    $("#forgot-button").on('click', function(){
        let loginForm = $('.form-login')
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
    })

    // Adds event listener to the "Go back" button
    $('#recovery-back').on('click', () => {
        let recoveryForm = $(".form-recovery")
        let loginForm = $('.form-login')

        recoveryForm.animate(
            { height: 0.65*parseFloat(loginForm.css('height')) + 'px' }, 400,
            function() {
                recoveryForm.hide()
                loginForm.show()

                recoveryForm.css('height', 'auto')
            }
        )
    })
}

const hideFullSignup = () => {
    let signupForm = $('.form-signup')
    let fullSignupForm = $(".form-full-signup")

    fullSignupForm.animate(
        { height: 0.7*parseFloat(signupForm.css('height')) + 'px' }, 400,
        () => {
            fullSignupForm.hide()
            signupForm.show()

            fullSignupForm.css('height', 'auto')
        }
    )
}

const isValidEmail = (email) => {
    /** Email Regex Explanation
     * email format: username@thirdlevel.secondlevel.com, in which "com" is the higher level domain
     * [\\w!#$%&’*+/=?`{|}~^-] - allows all characters as by RFC 5322 (which governs the email messa format)
     * (?:\\.[\\w!#$%&’*+/=?`{|}~^-]+) -  restrict leading, trailing or consecutive dots in the username
     * @(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6} - the domains can contain only lower and uppercase letters as well as digits and must contain at least one dot
     * [a-zA-Z]{2,6} - the higher level domain (last part after the dot) must consist of two to six letter only
     */
    let emailRegex = RegExp("[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}")

    return !(email === "" || email.includes(' ') || !emailRegex.test(email))
}

const isValidPassword = (pw) => {
    /** Password Regex Explanation
     * (?=\S*?[0-9]) - a digit must occur at least once
     * (?=\S*?[a-z]) - a lower case letter must occur at least once
     * (?=\S*?[A-Z]) - an upper case letter must occur at least once
     * \S{8,} - at least 8 characters
     * \S - no whitespace allowed
     */
    let pwRegex = RegExp("(?=\\S*?[0-9])(?=\\S*?[a-z])(?=\\S*?[A-Z])\\S{8,}")

    return !(pw.includes(' ') || !pwRegex.test(pw))
}

const isValidDate = (date) => {
    // Parses the date parts to integers
    let parts = date.split("/")
    let day = parseInt(parts[0], 10)
    let month = parseInt(parts[1], 10)
    let year = parseInt(parts[2], 10)

    // Check the ranges of month and year
    if(date === "" || year < 1920 || year > (new Date()).getFullYear() - 15 || month === 0 || month > 12){ return false }

    // It is not necessary to consider leap years
    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

    // Check the range of the day
    return (day > 0 && day <= monthLength[month - 1])
}

const isValidPhoneNumber = (number) => {
    // +DDI (DDD) 9XXXX-XXXX
    // +00 (00) 90000-0000
    return !(number === "" || number.substring(5,6) === '0' || number.substring(5,7) === '10' || number.substring(9,10) !== '9')
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
        
        this.isValid = function (o) {
            for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a.substring(9, 11), v = 0; 10 > v; v++)
                if ("" + u + f === "" + v + v + v + v + v + v + v + v + v + v + v)
                    return n; var c = r(u), e = t(u + "" + c); return f.toString() === c.toString() + e.toString() ? i : n;
        };
    }
}

class Login extends React.Component {
    static contextType = DataContext

    constructor(props, context){
        super(props, context)

        this.state = {
            signupName: '',
            loginEmail: '',
            signupEmail: '',
            signupPw: '',
            loginPw: '',
            pwConfirmation: '',
            signupBirthday: '',
            signupCPF: '',
            signupPhoneNumber: '',
            recoveryEmail: '',
            darkTheme: this.context.darkTheme
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        // Initializes js when the HTML has finished loading
        $(() => {
            // Adds event listeners to the forms' titles buttons
            $('.switcher').on('click', swapTab)
            
            showLoginRecovery()
            handleForgotPw()

            $('#signup-back').on('click', hideFullSignup)
        })

        $('.light-theme body').css('backgroundColor', '#3b4f65')
        $('.dark-theme body').css('backgroundColor', '#212e3b')

        $('.dark-theme #navbar, .dark-theme .CheckoutHeader').css('backgroundColor', '#0a0d11')
        $('.dark-theme #footer').css('backgroundColor', '#0a0d11')
    }
    
    componentWillUnmount(){
        $('.switcher').off('click', swapTab)
        $('#signup-back').off('click', hideFullSignup)
        $('body').css('backgroundColor', 'inherit')

        $('.dark-theme #navbar, .dark-theme .CheckoutHeader').css('backgroundColor', '')
        $('.dark-theme #footer').css('backgroundColor', '')
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.darkTheme !== this.context.darkTheme){
            this.setState({darkTheme: this.context.darkTheme})

            if(this.context.darkTheme){
                $('.dark-theme body').css('backgroundColor', '#212e3b')
                $('.dark-theme #navbar').css('backgroundColor', '#0a0d11')
                $('.dark-theme #footer').css('backgroundColor', '#0a0d11')

                if($('.form-login').hasClass('active')){
                    $('.dark-theme .form-login').css({'background-color': '#3b3b3b'})
                    $('.dark-theme .form-recovery').css({'background-color': '#3b3b3b'})
                    $('.dark-theme .form-signup').css({'background-color': '#25262c'})
                    $('.dark-theme .form-full-signup').css({'background-color': '#25262c'})
                }
                
                else{
                    $('.dark-theme .form-login').css({'background-color': '#25262c'})
                    $('.dark-theme .form-recovery').css({'background-color': '#25262c'})
                    $('.dark-theme .form-signup').css({'background-color': '#3b3b3b'})
                    $('.dark-theme .form-full-signup').css({'background-color': '#3b3b3b'})
                }
            }

            else{
                $('.light-theme body').css('backgroundColor', '#3b4f65')

                if($('.form-login').hasClass('active')){
                    $('.light-theme .form-login').css({'background-color': '#fff'})
                    $('.light-theme .form-recovery').css({'background-color': '#fff'})
                    $('.light-theme .form-signup').css({'background-color': '#d7e7f1'})
                    $('.light-theme .form-full-signup').css({'background-color': '#d7e7f1'})
                }
                
                else{
                    $('.light-theme .form-login').css({'background-color': '#d7e7f1'})
                    $('.light-theme .form-recovery').css({'background-color': '#d7e7f1'})
                    $('.light-theme .form-signup').css({'background-color': '#fff'})
                    $('.light-theme .form-full-signup').css({'background-color': '#fff'})
                }
            }
        }
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value}) 
    }

    handleSubmit(e){
        e.preventDefault()
        
        const forms = e.target.name.capitalize()
        
        // eslint-disable-next-line
        if(eval('this.validate' + forms + '()')){
            // eslint-disable-next-line
            eval('this.submit' + forms + '()')
        }
    }
    
    validateLogin(){
        const forms = document.querySelector('#login')

        // Input data
        const {loginEmail, loginPw} = this.state

        // Error message element
        let error = $('.error-message', $(forms))

        // Validates the email
        if(!isValidEmail(loginEmail)){
            error.text("O email inserido é inválido.")
            $(forms.loginEmail).focus()
            
            return false
        }
        
        // Validates the password
        else if(!isValidPassword(loginPw)){
            error.text("A senha inserida é inválida.")
            $(forms.loginPw).focus()
            
            return false
        }

        else{
            error.text("")
            return true
        }
    }
    
    validateRecovery(){
        const forms = document.querySelector('#recovery')

        // Input data
        const {recoveryEmail} = this.state

        // Error message element
        let error = $('.error-message', $(forms))

        // Validates the email
        if(!isValidEmail(recoveryEmail)){
            error.text("O email inserido é inválido.")
            $(forms.recoveryEmail).focus()
            
            return false
        }

        else{
            error.text("")
            return true
        }
    }

    validateSignup(){
        const forms = document.querySelector('#signup')

        // Input data
        const {signupEmail, signupPw, pwConfirmation} = this.state

        // Error message element
        let error = $('.error-message', $(forms))

        // Validates the signupEmail
        if(!isValidEmail(signupEmail)){
            error.text("O signupEmail inserido é inválido.")
            $(forms.signupEmail).focus()
            
            return false
        }
        
        // Validates the password
        else if(!isValidPassword(signupPw)){
            error.text("A senha inserida é inválida.")
            $(forms.signupPw).focus()
            
            return false
        }
        
        // Validates the password confirmation
        else if(signupPw !== pwConfirmation){
            error.text("Ambas as senhas devem ser idênticas.")
            $(forms.pwConfirmation).focus()
            
            return false
        }

        else{
            error.text("")
            return true
        }
    }

    validateFullSignup(){
        const forms = document.querySelector('#full-signup')

        // Input data
        const {signupName, signupBirthday, signupCPF, signupPhoneNumber} = this.state

        // Error message element
        let error = $('.error-message', $(forms))
        
        // Title capitalization to the name
        this.setState({signupName: signupName.title()})

        // Validates the name
        if(signupName === "" || signupName.length < 6 || signupName.match(/\d/)){
            error.text('O nome inserido é inválido.')
            $(forms.signupName).focus()
            return false
        }

        // Validates the birthdate
        else if(!isValidDate(signupBirthday)){
            error.text("A data de nascimento inserida é inválida.")
            $(forms.signupBirthday).focus()
            return false
        }

        // Validates the CPF
        else if(!(new CPF()).isValid(signupCPF)){
            error.text("O CPF inserido é inválido.")
            $(forms.signupCPF).focus()
            return false
        }

        // Validates the phonenumber
        else if(!isValidPhoneNumber(signupPhoneNumber)){
            error.text("O número de celular inserido é inválido.")
            $(forms.signupPhoneNumber).focus()
            return false
        }

        // If no problem was found
        else{
            error.text("")
            return true
        }
    }

    submitLogin(){
        // Input data
        const {loginEmail, loginPw} = this.state
        const {accounts} = this.context
        var ehCadastrado = false

        {  
           accounts.map(account=>
                {
                    if(account.email === loginEmail && account.password === loginPw){
                       ehCadastrado = true
                    }
                }
            )
        }

        if(ehCadastrado){
            alert("Usuário Cadastrado")
        }else{
            alert("Senha ou email incorretos")
        }
        
    }

    submitRecovery(){
        
    }

    // Transitions from the basic signup
    // forms to the full signup forms
    submitSignup(){
        let signupForm = $('.form-signup')
        let fullSignupForm = $(".form-full-signup")

        // Increases the login form's height (animation)
        // Hides the first signup form and shows the full one
        signupForm.animate(
            { height: 1.3*parseFloat(signupForm.css('height')) + 'px' }, 400,
            () => {
                signupForm.hide()
                fullSignupForm.show()
                
                signupForm.css('height', 'auto')
            }
        )
    }

    // Submits both signup forms to the server
    submitFullSignup(){
        // // Submits both forms
        // $.ajax({
        //     type: "POST",
        //     url: $(signup).attr('action'),
        //     data: $(signup).serialize(),
        //     success: function(){
        //         fullSignup.submit()
        //     }
        // })

        alert("foi")
    }

    render(){
        return(
            <main className="Login">
                <div id="forms-panel">
                    <div className="form-wrapper active">
                        <button type="button" className="switcher switcher-login">LOGIN</button>

                        <form id="login" action="" onSubmit={this.handleSubmit} className="form form-login active invisible-content" name="login">
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="login-email">Email</label><br/>
                                    <input onChange={this.handleChange} id="login-email" type="email" name="loginEmail" value={this.state.email} required/>
                                </div>

                                <div className="input-block">
                                    <label className='grey' htmlFor="login-password">Senha</label><br/>
                                    <input onChange={this.handleChange} id="login-password" type="password" name="loginPw" value={this.state.pw} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}" minLength="8" maxLength="30" required/>
                                </div>

                                <p id="forgot-button" className="text-btn green disable-selection">Esqueci minha senha</p>
                            </fieldset>

                            <span className="error-message"></span>

                            <button form="login" type="submit" className="big-btn full-btn">Login</button>
                        </form>

                        <form id="recovery" name="recovery" action="" onSubmit={this.handleSubmit} className="form form-recovery invisible-content no-display">
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="recovery-email">Email cadastrado:</label><br/>
                                    <input onChange={this.handleChange} id="recovery-email" name="recoveryEmail" value={this.state.recoveryEmail} type="email" required/>
                                </div>
                            </fieldset>

                            <span className="error-message"></span>

                            <button form="recovery" type="submit" className="big-btn full-btn">Recuperar Senha</button>

                            <p id="recovery-back" className="text-btn green disable-selection">Voltar</p>
                        </form>
                    </div>

                    <div className="form-wrapper">
                        <button type="button" className="switcher switcher-signup">CRIAR CONTA</button>

                        <form id="signup" name="signup" action="" onSubmit={this.handleSubmit} className="form form-signup invisible-content">
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-email">Email</label><br/>
                                    <input onChange={this.handleChange} id="signup-email" type="email" name="signupEmail" value={this.state.email} required/>
                                </div>
                                
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-password">Senha</label><br/>
                                    <input onChange={this.handleChange} 
                                    id="signup-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}" maxLength="30" minLength="8"
                                    title="A senha deve conter pelo menos um número, uma letra minúscula e uma letra maiúscula. Deve possuir entre 8 e 30 caracteres."
                                    type="password" name="signupPw" value={this.state.pw} required
                                    />
                                </div>
                                
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-conf-password">Confirmação de senha</label><br/>
                                    <input onChange={this.handleChange} 
                                    id="signup-conf-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}" 
                                    title="Repita a sua senha." maxLength="30" minLength="8"
                                    type="password" name="pwConfirmation" value={this.state.pwConfirmation} required
                                    />
                                </div>
                            </fieldset>

                            <span className="error-message"></span>
                            
                            <button form="signup" type="submit" className="big-btn void-btn">Continuar</button>
                        </form>

                        <form id="full-signup" name="fullSignup" action="" onSubmit={this.handleSubmit} className="form form-full-signup invisible-content no-display">
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-name">Nome completo</label><br/>
                                    <input onChange={this.handleChange} id="signup-name" name="signupName" value={this.state.name} type="text" minLength="6" required/>
                                </div>
        
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-birthday">Data de nascimento</label><br/>
                                    <InputMask mask="99/99/9999" maskPlaceholder="dd/mm/aaaa" type='text' onChange={this.handleChange} id="signup-birthday" name="signupBirthday" value={this.state.birthday} placeholder="dd/mm/aaaa" title="Idade mínima: 15 anos." required/>
                                </div>
                            </fieldset>
        
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-cpf">CPF</label><br/>
                                    <InputMask mask="999.999.999-99" type='text' onChange={this.handleChange} id="signup-cpf" name="signupCPF" value={this.state.cpf} placeholder='000.000.000-00' required/>
                                </div>
                            </fieldset>
        
                            <fieldset>
                                <div className="input-block">
                                    <label className='grey' htmlFor="signup-phoneNumber">Celular</label><br/>
                                    <InputMask mask="+55 (99) 99999-9999" type='text' onChange={this.handleChange} id="signup-phoneNumber" name="signupPhoneNumber" value={this.state.phoneNumber} placeholder='(00) 90000-0000' required/>
                                </div>
                            </fieldset>

                            <span className="error-message"></span>
        
                            <button form="full-signup" type="submit" className="big-btn full-btn">Registrar</button>

                            <p id="signup-back" className="text-btn green disable-selection">Voltar</p>
                        </form>
                    </div>

                </div>

            </main>
        )
    }
}

export default Login