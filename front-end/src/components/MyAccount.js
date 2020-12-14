import React from 'react'
import $ from 'jquery'

import { Accordion, Card } from 'react-bootstrap'
import './css/bootstrap.css'
import './css/MyAccount.css'
import { DataContext } from '../Context'
import InputMask from 'react-input-mask'
import OrdersPanel from './OrdersPanel'

import api from '../requests/connection'

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

class MyAccount extends React.Component {

    static contextType = DataContext

    constructor(props, context) {
        super(props, context)

        this.state = {
            phoneNumber: this.context.isLogged.user.phoneNumber,
            currentPassword: '',
            newPassword: '',
            newPasswordConf: ''
        }

        this.togglePhoneNumber = this.togglePhoneNumber.bind(this)
        this.togglePassword = this.togglePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitChange = this.submitChange.bind(this)
        this.submitChange = this.submitChange.bind(this)
    }

    togglePhoneNumber(){
        $('.standard').toggle()
        $('.editing').toggle()

        const { phoneNumber } = this.context.isLogged.user
        this.setState({phoneNumber})
    }

    togglePassword(){
        $('.editingPass').toggle();
        $('.btnPass').toggle();
        $('.error-message').text('')
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})

        if((/password/i).test(name)){ $('.error-message').text('') }
    }

    async submitChange(e){
        if(e.target.id === 'submit-phone'){

            const {_id} = this.context.isLogged.user
            const {phoneNumber} = this.state

            await api.put('/accounts', { _id, updates: { phoneNumber } }).then(r => {
                this.context.updateCurrentAccount()
            })
                .catch(e => console.log(`Ocorreu um erro: ${e}`))
                .then(this.togglePhoneNumber)
        }

        else if(e.target.id === 'submit-password'){
            const {currentPassword, newPassword, newPasswordConf} = this.state
            
            if(newPassword !== newPasswordConf){
                $('.error-message').text("Ambas as senhas devem ser idênticas.")   
                return
            }
        
            else if(!isValidPassword(newPassword)){
                $('.error-message').text("A senha inserida é inválida.")
                return
            }
        
            const { user } = this.context.isLogged

            await api.post('/auth/login', {email: user.email, password: currentPassword}).then(async r => {
                if(r){
                    const { _id } = user

                    await api.put('/accounts', {_id, updates: { password: newPassword }}).then(r => {
                        alert('Sua senha foi atualizada com sucesso!')
                    })
                        .catch(e => {
                            console.log('Ocorreu um erro: ' + e)
                            $('.error-message').text('Ocorreu um erro.')
                        })
                        .then(this.togglePassword)
                    }
                    else{ $('.error-message').text('Ocorreu um erro.') }
                }).catch(e => {
                    $('.error-message').text("A senha atual está incorreta.")
                })
        }
    }

    componentDidMount(){
        $('.pointer').trigger('click')
    }

    render(){
        return(
            <main className="MyAccount">
                <h1 className='panel-title'>Minha Conta</h1>

                {this.props.link ? this.props.link : ''}

                <div className="content-box">
                    <div className="accountContent left-content col-md-5 col-sm-12 align-self-top">
                        <section id="loginInfo" className="d-flex no-space">
                            <div className='account-header'>
                                <h2>Olá, {this.context.isLogged.user.name.replace(/(\S*\s?\S*).*/, '$1')}!</h2>
                                <span><strong>Email: </strong>{this.context.isLogged.user.email}</span>

                                <div className='account-controls'>
                                    <span className="disable-selection text-btn green btnPass" onClick={this.togglePassword}>Alterar senha</span>
                                    <span className='disable-selection text-btn green' onClick={this.context.logout}>Sair</span>
                                </div>
                            </div>

                            <div className="editingPass no-display">
                                <label htmlFor="currentPassword">
                                    Senha atual: *
                                    <input type="password" className="form-control" id="currentPassword" name="currentPassword" onChange={this.handleChange}/> <br/>
                                </label>

                                <label htmlFor="newPassword">
                                    Nova senha: *
                                    <input type="password" title='A senha deve conter pelo menos um número, uma letra minúscula e uma letra maiúscula. Deve possuir entre 8 e 30 caracteres.' className="form-control" id="newPassword" name="newPassword" onChange={this.handleChange}/> <br/>
                                </label>
                                
                                <label htmlFor="newPasswordConf">
                                    Confirme a nova senha: *
                                    <input type="password" title='Esta deve ser igual à sua nova senha.' className="form-control" id="newPasswordConf" name="newPasswordConf" onChange={this.handleChange}/> <br/>
                                </label>

                                <span className="error-message"></span>

                                <div className='button-row'>
                                    <button type="button" className="big-btn void-btn" onClick={this.togglePassword}>Cancelar</button>
                                    <button type="button" className="big-btn full-btn" id='submit-password' onClick={this.submitChange}>
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section id="dadosPessoais" className="d-flex">
                            <h2>Dados pessoais</h2>

                            <div className="d-flex justify-content-between" style={{width: '100%'}}>
                                <div> 
                                    <span><strong>Nome completo:</strong></span> <br/>
                                    <span>{this.context.isLogged.user.name}</span> <br/><br/>
                                </div>
                                <div style={{textAlign: 'right'}}> 
                                    <span><strong>Data de nacimento:</strong></span> <br/>
                                    <span>{this.context.isLogged.user.birthday}</span> <br/><br/>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between" style={{width: '100%'}}>
                                <div>
                                    <span><strong>CPF:</strong></span> <br/>
                                    <span>{this.context.isLogged.user.cpf}</span> <br/><br/>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <span><strong>Celular:</strong></span> <br/>
                                    <span className='standard'>{this.context.isLogged.user.phoneNumber}</span> 
                                    <InputMask mask="+55 (99) 99999-9999" type='text' onChange={this.handleChange} name="phoneNumber" className='editing no-display' value={this.state.phoneNumber} placeholder='(00) 90000-0000'/>

                                    <span className="text-btn green standard" onClick={this.togglePhoneNumber}>Editar celular</span>
                                    <div className='editing-controls'>
                                        <span className="text-btn green no-display editing" onClick={this.togglePhoneNumber}>Cancelar</span>
                                        <span className="text-btn green no-display editing" id='submit-phone' onClick={this.submitChange}>Salvar</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="myOrders" style={{width: '100%'}}>
                        <Accordion id="pedidos">
                            <Card className='accordion-card'>
                                <Accordion.Toggle as={Card.Header} className='pointer' eventKey="0">
                                    <h5 className="pointer disable-selection mb-0">Meus pedidos</h5>
                                </Accordion.Toggle>
                            
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body className='accordion-body'>
                                        <OrdersPanel type='client'/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </section>
                </div>
            </main>
        )
    }
}

export default MyAccount