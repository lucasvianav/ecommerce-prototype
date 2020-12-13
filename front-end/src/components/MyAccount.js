import React from 'react'
import $ from 'jquery'

import { Accordion, Card } from 'react-bootstrap';
import './css/bootstrap.css'
import './css/MyAccount.css'
import { DataContext } from '../Context';
import InputMask from 'react-input-mask'
import OrdersPanel from './OrdersPanel';

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

const submitEdit = async (state, account) =>{
    const {lastPass, newPass1, newPass2} = state;
    var flag = true;
    
    if(newPass1 !== newPass2){
        alert("Ambas as senhas devem ser idênticas.")   
        flag = false;         
    }

    if(!isValidPassword(newPass1)){
        alert("A senha deve conter uma letra maiúscula, minúscula e um número ente 8 e 30 caracteres")
        flag = false;
    }

        var res = null;
        await api.post('/auth/login', {email: account.email, password: lastPass})
        .then(response =>{
            res = response;
        })
        .catch((err)=>{
            alert("Senha atual incorreta");
            flag = false;
        })
        

    if(flag && res != null){
        api.put("accounts/", {"id":account._id, "updates":{password: newPass1}})
          .then((response) => {
            alert("Senha atualizada com sucesso!");
            $('.editingPass').toggle();
            $('.btnPass').toggle();
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }
}

const submitEditPhone = (state, context) => {
    const {phoneNumber} = state;
    const account = context.isLogged.user;

    api.put("accounts/", {"id":account._id, "updates":{phoneNumber}})
    .then((response) => {
        context.updatePhone({id: context.isLogged.user._id, phoneNumber: state.phoneNumber});
        alert("Telefone atualizado com sucesso!");
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
}

class MyAccount extends React.Component {

    static contextType = DataContext

    constructor(props, context) {
        super(props, context)

        this.state = { phoneNumber: this.context.isLogged.user.phoneNumber, 
                        lastPass:"", newPass1: "", newPass2:"", req:{} }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.togglePass = this.togglePass.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    toggleEdit(){
        $('.standard').toggle()
        $('.editing').toggle()
    }

    togglePass(){
        $('.editingPass').toggle();
        $('.btnPass').toggle();
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    async submitChange(){
        try{
            await api.put('/accounts', {_id: this.context.isLogged.user._id, updates: {phoneNumber: this.state.phoneNumber}})
                .then(r => this.context.updateCurrentAccount())
        }

        finally{ this.toggleEdit() }
    }

    componentDidMount(){
        $('.pointer').trigger('click')
    }

    render(){
        return(
            <main className="MyAccount">
                <h1 className='panel-title'>Minha Conta</h1>
                <div className="content-box">
                    <div className="left-content col-md-5 col-sm-12 align-self-top">
                        <section id="loginInfo" className="d-flex no-space">
                            <h2>Olá, {this.context.isLogged.user.name}! </h2>
                            <span><strong>Email: </strong>{this.context.isLogged.user.email}</span>
                            <div className="col-md-6 offset-md-8 pt-3">
                                <button className="btn btn-secondary btnPass"
                                onClick={this.togglePass}
                                >Alterar Senha</button>
                            </div>
                            <div className="editingPass border p-3 mt-3 no-display">
                                <label htmlFor="lastPass">Senha Atual:</label>
                                <input type="password" className="form-control" id="lastPass" name="lastPass" onChange={this.handleChange}/> <br/>

                                <label htmlFor="newPass1">Nova Senha:</label>
                                <input type="password" className="form-control" id="newPass1" name="newPass1" onChange={this.handleChange}/> <br/>
                                <label htmlFor="newPass2">Confirme a Nova Senha:</label>
                                <input type="password" className="form-control" id="newPass2" name="newPass2" onChange={this.handleChange}/> <br/>

                                <button type="button" className="btn btn-danger mt-1"
                                onClick={this.togglePass} style={{width: '30%'}}
                                >Cancelar</button>

                                <button type="button" className="btn btn-success mt-1 ml-2"
                                onClick={() => {submitEdit(this.state, this.context.isLogged.user)}} style={{width: '30%'}}
                                >Salvar</button>
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

                                    <span className="text-btn green standard" onClick={this.toggleEdit}>Editar celular</span>
                                    <div className='editing-controls'>
                                        <span className="text-btn green no-display editing" onClick={this.toggleEdit}>Cancelar</span>
                                        <span className="text-btn green no-display editing" 
                                            onClick={(e) => {
                                                submitEditPhone(this.state, this.context);
                                                this.toggleEdit();
                                        }}>Salvar</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-6">
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
                </div>
            </main>
        )
    }
}

export default MyAccount