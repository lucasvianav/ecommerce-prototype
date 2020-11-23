import React from 'react'
import $ from 'jquery'

import { Accordion, Card } from 'react-bootstrap';
import './css/bootstrap.css'
import './css/MyAccount.css'
import { DataContext } from '../Context';
import InputMask from 'react-input-mask'
import OrdersPanel from './OrdersPanel';



class MyAccount extends React.Component {

    static contextType = DataContext

    constructor(props, context) {
        super(props, context)

        this.state = { phoneNumber: this.context.getCurrentAccount().phoneNumber }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }

    toggleEdit(){
        this.setState({phoneNumber: this.context.getCurrentAccount().phoneNumber})
        $('.standard').toggle()
        $('.editing').toggle()
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    submitChange(){
        this.context.updateAccount(this.state.phoneNumber)
        this.toggleEdit()
    }

    componentDidMount(){
        $('.pointer').trigger('click')
    }

    render(){
        return(
            <main className="MyAccount">
                <h1 className='panel-title'>Minha Conta</h1>
                <div className="content-box">
                    <div className="left-content col-md-6 col-sm-12 align-self-top">
                        <section id="loginInfo" className="d-flex no-space">
                            <h2>Olá, {this.context.getCurrentAccount().name}! </h2>
                            <span><strong>Email: </strong>{this.context.getCurrentAccount().email}</span>
                        </section>

                        <section id="dadosPessoais" className="d-flex">
                            <h2>Dados pessoais</h2>

                            <div className="d-flex justify-content-between">
                                <div> 
                                    <span><strong>Nome Completo:</strong></span> <br/>
                                    <span>{this.context.getCurrentAccount().name}</span> <br/><br/>
                                </div>
                                <div style={{textAlign: 'right'}}> 
                                    <span><strong>Data de Nacimento:</strong></span> <br/>
                                    <span>{this.context.getCurrentAccount().birthday}</span> <br/><br/>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <span><strong>CPF:</strong></span> <br/>
                                    <span>{this.context.getCurrentAccount().cpf}</span> <br/><br/>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <span><strong>Celular:</strong></span> <br/>
                                    <span className='standard'>{this.context.getCurrentAccount().phoneNumber}</span> 
                                    <InputMask mask="+55 (99) 99999-9999" type='text' onChange={this.handleChange} name="phoneNumber" className='editing no-display' value={this.state.phoneNumber} placeholder='(00) 90000-0000'/>

                                    <span className="text-btn green standard" onClick={this.toggleEdit}>Editar celular</span>
                                    <div className='editing-controls'>
                                        <span className="text-btn green no-display editing" onClick={this.toggleEdit}>Cancelar</span>
                                        <span className="text-btn green no-display editing" onClick={this.submitChange}>Salvar</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="myOrders">
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