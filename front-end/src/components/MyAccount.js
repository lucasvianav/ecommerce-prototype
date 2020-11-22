import React from 'react'

import $, { ready } from 'jquery';
import { Accordion, Card } from 'react-bootstrap';
import './css/bootstrap.css'
import './css/MyAccount.css'
import { DataContext } from '../Context';



class MyAccount extends React.Component {

    static contextType = DataContext

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            bday:'',
            cpf:'',
            cell:'',
        }
        this.hide = this.hide.bind(this);
        this.hideTxt = this.hideTxt.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.handleChange= this.handleChange.bind(this);

    }

    
    hide(){
        var elemento = document.getElementsByClassName('client');
        var campo = document.getElementsByClassName('userField');
        var i; 
        for (i = 0; i< elemento.length; i++){
            if (elemento[i].style.display == "none"){
                elemento[i].style.display = "block";
                campo[i].style.display = "none";
                document.getElementById('enviarDados').style.display = "inline";
                
            }
            else{
                elemento[i].style.display="none";
                campo[i].style.display = "block";
                document.getElementById('enviarDados').style.display = "none";
                
            }    
        }
    }
    
    hideTxt(){
        var elemento = document.getElementsByClassName('userText');
        var aux = document.getElementsByClassName('client');
        var i; 
        for (i = 0; i< elemento.length; i++){
            if (aux[i].style.display == "none"){
                elemento[i].style.display = "block";
            }
            else {
                elemento[i].style.display = "none";
            } 
        }
    }

    editAccount(){
        const {userName, bday, cpf, cell} = this.state

        this.context.editUser(userName, bday, cpf, cell);

    }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
        
    }
    componentDidMount(){
        console.log(this.context);
    }

    render(){
        return(
            <main className="MyAccount">
                <div className="content-box">
                    <h1>Minha Conta</h1>
                    <hr/>
                    <div className="row align-items-top">
                        <div className="col-md-6 col-sm-12 align-self-top">
                            <section id="loginInfo" className="d-flex no-space">
                                <h2>Olá, {this.context.getCurrentAccount().name}! </h2>
                                <p><strong>Email: </strong>{this.context.getCurrentAccount().email}</p>

                                {/*<button id="altSenha" className="btn btn-outline-dark">Alterar Senha</button>*/}

                            </section>
                            <section id="dadosPessoais" className="d-flex">
                                <p></p>
                                <p></p>
                                <form onSubmit={this.editAccount}>
                                <h2>Dados Pessoais</h2>
                                
                                <div className="d-flex justify-content-between">
                                    <p> 
                                        <strong>Nome Completo:</strong>
                                        <div className="userField">
                                        {this.context.getCurrentAccount().name} 
                                        </div>
                                        <input type="text" name="userName" placeholder={this.context.getCurrentAccount().name} className="client hide"
                                        value = {this.state.name} onChange={this.handleChange}></input>
                                    </p>
                                    <p> 
                                        <strong>Data de Nacimento:</strong>
                                        <div className="userField">
                                        {this.context.getCurrentAccount().birthday}
                                        </div>
                                        <input type="date" name="bday" className="client hide" placeholder={this.context.getCurrentAccount().birthday} 
                                        value = {this.state.birthday} onChange={this.handleChange}></input>
                                    </p>

                                </div>
                                <p className="no-space">
                                    <strong>CPF:</strong> 
                                    <div className="userField">
                                    {this.context.getCurrentAccount().cpf}
                                    </div>
                                    <input type="text" name="cpf" placeholder= {this.context.getCurrentAccount().cpf} className="client hide"
                                    value = {this.state.cpf} onChange={this.handleChange}></input>
                                </p>
                                <p>
                                    <strong>Celular:</strong> 
                                    <div className="userField">
                                    {this.context.getCurrentAccount().phoneNumber}
                                    </div>
                                    <input type="text" name="cell" placeholder= {this.context.getCurrentAccount().phoneNumber} className="client hide"
                                    value = {this.state.phoneNumber} onChange={this.handleChange}></input>
                                </p>
                                <p>
                                    <button id="enviarDados" type="submit" className="btn btn-outline-dark mt-0 botao hide" >
                                        Salvar
                                    </button>
                                </p>
                                </form>

                                <button id="editarDados" className="btn btn-outline-dark mt-0 botao" onClick={this.hide}>
                                    Editar
                                </button>

                            </section>
                            
                        </div>
                        <div className="col-md-4 offset-md-1 col-sm-12 align-self-top" >
                            <section id="pedidos" className="mt-2 mb-3">
                                <h2>Pedidos</h2>
                                <div className="d-flex justify-content-end pr-3">
                                    <span><a href="#">Ver todos</a></span>
                                </div>
                                <Accordion id="pedidos" >
                                    <Card>
                                       <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <h5 className="mb-0">
                                                Aguardando Aprovação
                                            </h5>
                                        </Accordion.Toggle>
                                    
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <div className="row justify-content-around no-space">
                                                    <div className="card no-space" style={{width: '45%'}}>
                                                        <img src="img/casaco.jpg" className="card-img-top" alt="Casaco engenharia civil"/>
                                                        <div className="card-body no-space">
                                                        <p className="card-text"><a href="#">Casaco Guindaste</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="card no-space" style={{width: '45%'}}>
                                                        <img src="img/casaco.jpg" className="card-img-top" alt="Casaco engenharia civil"/>
                                                        <div className="card-body no-space">
                                                        <p className="card-text"><a href="#">Casaco Guindaste</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end pr-3">
                                                    <p><a href="#">Ver mais</a></p>
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                            <h5 className="mb-0">
                                                Aguardando Recebimento
                                            </h5>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                Não há nada aqui!
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="2">
                                            <h5 className="mb-0">
                                                Finalizados
                                            </h5>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                Não há nada aqui!
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default MyAccount