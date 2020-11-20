import React from 'react';
import $ from 'jquery';
import { Accordion, Card } from 'react-bootstrap';

import './index.css';
import '../css/bootstrap.css';

class MyAccount extends React.Component {
    render(){
        return(
            <main className="MyAccount">
                <div className="content-box">
                    <h1>Minha Conta</h1>
                    <hr/>
                    <div className="row align-items-top">
                        <div className="col-md-6 col-sm-12 align-self-top">
                            <section id="loginInfo" className="d-flex no-space">
                                <h2>Olá, Fulaninho!</h2>
                                <p><strong>Email: </strong>fulaninho@example.com</p>
                                <button id="altSenha" className="btn btn-outline-dark">Alterar Senha</button>
                            </section>
                            <section id="dadosPessoais" className="d-flex">
                                <h2>Dados Pessoais</h2>
                                <div className="d-flex justify-content-between">
                                    <p><strong>Nome Completo: </strong>Fulaninho de Souza</p>
                                    <p><strong>Data de Nacimento: </strong>00/00/00</p>
                                </div>
                                <p className="no-space"><strong>CPF: </strong>000.000.000.00</p>
                                <button id="editarDados" className="btn btn-outline-dark mt-0">Editar</button>
                            </section>
                            <section id="endereco">
                                <h2>Endereços</h2>    
                                <Card>
                                    <div className="card-body no-space">
                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                Minha Casa
                                            </h5>
                                            <p>
                                                <i className="fas fa-pen"></i>
                                            </p>
                                        </div>
                                        <p><strong>CEP: </strong>0000-000</p>
                                        <p>Rua dos fulaninho <strong>N </strong>0<strong> - </strong> Apto 0</p>
                                        <div className="d-flex justify-content-between no-space">
                                            <p><strong>Bairo: </strong>Jardim dos Fulanos</p>
                                            <p><strong>Cidade: </strong>São Carlos-SP</p>
                                        </div>
                                    </div>
                                </Card>
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
                                                        <img src="img/casaco.jpg" className="card-img-top" alt="Casaco engenharia civíl"/>
                                                        <div className="card-body no-space">
                                                        <p className="card-text"><a href="#">Casaco Guindaste</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="card no-space" style={{width: '45%'}}>
                                                        <img src="img/casaco.jpg" className="card-img-top" alt="Casaco engenharia civíl"/>
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
                            <section id="cartoes">
                                <h2>Cartões</h2>
                                <Card>
                                    <div className="card-body no-space">
                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                <i className="fab fa-cc-mastercard"></i>
                                                Cartão: Meu Cartão
                                            </h5>
                                            <p>
                                                <i className="fas fa-times"></i>
                                            </p>
                                        </div>
                                        <p> 
                                            Final: 0000 <br/>
                                            CPF: 000.000.000-00
                                        </p>
                                    </div>
                                </Card>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default MyAccount