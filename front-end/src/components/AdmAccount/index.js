import React, {useState} from 'react';
import $ from 'jquery';
import ProductCardPanel from './productCardPanel';
import {Nav, Collapse, Accordion, Card} from 'react-bootstrap';

import '../bootstrap/css/bootstrap.css';
import './index.css';



function AdmAccount(props){
    const [ativo, setAtivo] = useState(true);
    const [inativo, setInativo] = useState(false);
    const [novoProd, setNovoProd] = useState(false);

    function showProdutosAtivos(){
        setAtivo(true);
        setInativo(false);
        setNovoProd(false);
        $("#tab1").addClass("active");
        $("#tab2").removeClass("active");
        $("#tab3").removeClass("active");
    }

    function showProdutosInativos(){
        setAtivo(false);
        setInativo(true);
        setNovoProd(false);
        $("#tab2").addClass("active");
        $("#tab1").removeClass("active");
        $("#tab3").removeClass("active");
    }

    function showProdutoNovo(){
        setAtivo(false);
        setInativo(false);
        setNovoProd(true);
        $("#tab3").addClass("active");
        $("#tab1").removeClass("active");
        $("#tab2").removeClass("active");
    }

    return(
        <>
            <main>
            <div className="content-box">
                <h1>Página do Adiministrador</h1>
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12 order-first sm-invert-2">
                        <section id="loginInfo" className="d-md-flex no-space d-xs-none d-sm-none">
                            <h2>Olá Adiministrador Fulaninho</h2>
                            <p><strong>Email: </strong>fulaninho@example.com</p>
                            <button id="altSenha" className="btn btn-outline-dark">Alterar Senha</button>
                        </section>
                    
                        <section id="produtosCadastrados" className="d-flex rounded bg-light shadow-sm mt-3 p-2">
                                <Nav justify variant="tabs" defaultActiveKey="/home">
                                    <Nav.Item>
                                    <button className="nav-link active ml-0 mr-0" id="tab1" onClick={() => {showProdutosAtivos();}} 
                                     aria-controls="produtosAtivos" aria-expanded={ativo}>
                                         Produtos Ativos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <button className="nav-link ml-0 mr-0" id="tab2" onClick={() => {showProdutosInativos();}} 
                                     aria-controls="produtosInativos" aria-expanded={inativo}>
                                         Produtos Inativos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <button className="nav-link ml-0 mr-0" id="tab3" onClick={() => {showProdutoNovo();}} 
                                     aria-controls="produtoNovo" aria-expanded={novoProd}>
                                         Novo Produto
                                    </button>
                                    </Nav.Item>
                                </Nav>
                                
                                <Collapse in={ativo}>
                                    <div id="produtosAtivos" className="p-2 bg-white border border-top-0" >
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        <ProductCardPanel type="visivel" />
                                    </div>
                                </Collapse>
                                <Collapse in={inativo}>
                                    <div id="produtosInativos" className="p-2 bg-white border border-top-0">
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        <ProductCardPanel type="invisible" />
                                    </div>
                                </Collapse>
                                <Collapse in={novoProd}>
                                    <div id="produtoNovo" className="p-2 bg-white border border-top-0">
                                        <form>
                                            <div className="form-row justify-content-between mb-3 mt-3">
                                                <div className="custom-file col-md-6 ml-1">
                                                    <input type="file" className="custom-file-input" id="imagem" />
                                                    <label className="custom-file-label" for="imagem">Escolher Imagem</label>
                                                </div>
                                                <div className="custom-control custom-switch col-md-2">
                                                    <input type="checkbox" className="custom-control-input" id="preVenda" />
                                                    <label className="custom-control-label" for="preVenda">Pré Venda</label>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-8">
                                                <label for="nomeProduto">Nome do Produto</label>
                                                <input type="text" className="form-control" id="nomeProduto" />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label for="precoProduto">Preço</label>
                                                    <input type="number" className="form-control" id="precoProduto" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label for="categoria">Categoria</label>
                                                    <select className="custom-select" id="categoria">
                                                        <option selected value="nova">Nova</option>
                                                        <option value="produtos">Produtos</option>
                                                        <option value="eventos">Eventos</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label for="novaCategoria">Nome da Nova Categoria</label>
                                                    <input type="text" className="form-control" id="novaCategoria" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label for="subCategoria">Sub-Categoria</label>
                                                    <select className="custom-select">
                                                        <option selected value="nova">Nova</option>
                                                        <option value="produtos">Produtos</option>
                                                        <option value="eventos">Eventos</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label for="novaSubCategoria">Nome da Nova Sub-Categoria</label>
                                                    <input type="text" className="form-control" id="novaSubCategoria" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label for="descricao">Descrição</label>
                                                    <textarea className="form-control" id="descricao" rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div className="form-row pl-1">
                                                <button type="button" className="btn btn-outline-secondary">Adicionar Campo de Opções</button>
                                            </div>
                                            <div className="form-row justify-content-end mb-2 pr-1">
                                                <button type="button" className="btn btn-success">Cadastrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </Collapse>
                        </section>
                    </div>
                    <div className="col-md-4 offset-md-1 col-sm-12 order-last sm-invert-1">
                    <section id="loginInfoMobile" className="d-flex no-space d-md-none">
                        <h2>Olá Adiministrador Fulaninho</h2>
                        <p><strong>Email: </strong>fulaninho@example.com</p>
                        <button id="altSenha" className="btn btn-outline-dark">Alterar Senha</button>
                    </section>
                    <section id="ultimosPedidos">
                        <h2>Ultimos Pedidos</h2> 
                        <div className="d-flex justify-content-end pr-3">
                            <p><a href="#">Ver todos</a></p>
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
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary mt-3" style={{width: "47%"}}>Pedidos Por Usuários</button>
                            <button type="button" className="btn btn-secondary mt-3" style={{width: "47%"}}>Gerenciar Usuários</button>
                        </div>
                    </section>
                </div>
                </div>
            </div>
            </main>
        </>
    );
}

export default AdmAccount;