import React, {useState} from 'react';
import $ from 'jquery';
import {Nav, Collapse} from 'react-bootstrap';
import ProductCardPanel from './ProductCardPanel';
import ProductForm from '../ProductForm';

import '../css/bootstrap.css';
import './index.css';

function AdmAccount(props){
    const [ativo, setAtivo] = useState(false);
    const [inativo, setInativo] = useState(false);
    const [novoProd, setNovoProd] = useState(false);
    const [pedidos, setPedidos] = useState(true);
    const [usuarios, setUsuarios] = useState(false);

    function refreshNav(){

    }

    function showProdutosAtivos(){
        setAtivo(true);
        setInativo(false);
        setNovoProd(false);
        setPedidos(false);
        setUsuarios(false);
        $("#tabProdAtivos").addClass("active");
        $("#tabProdInativos").removeClass("active");
        $("#tabNovoProd").removeClass("active");
        $("#tabPedidos").removeClass("active");
        $("#tabUsuarios").removeClass("active");
    }

    function showProdutosInativos(){
        setAtivo(false);
        setInativo(true);
        setNovoProd(false);
        setPedidos(false);
        setUsuarios(false);
        $("#tabProdInativos").addClass("active");
        $("#tabProdAtivos").removeClass("active");
        $("#tabNovoProd").removeClass("active");
        $("#tabPedidos").removeClass("active");
        $("#tabUsuarios").removeClass("active");
    }

    function showProdutoNovo(){
        setAtivo(false);
        setInativo(false);
        setNovoProd(true);
        setPedidos(false);
        setUsuarios(false);
        $("#tabNovoProd").addClass("active");
        $("#tabProdAtivos").removeClass("active");
        $("#tabProdInativos").removeClass("active");
        $("#tabPedidos").removeClass("active");
        $("#tabUsuarios").removeClass("active");
    }
    
    function showPedidos(){
        setAtivo(false);
        setInativo(false);
        setNovoProd(false);
        setPedidos(true);
        setUsuarios(false);
        $("#tabPedidos").addClass("active");
        $("#tabProdAtivos").removeClass("active");
        $("#tabProdInativos").removeClass("active");
        $("#tabNovoProd").removeClass("active");
        $("#tabUsuarios").removeClass("active");
    }

    function showUsuarios(){
        setAtivo(false);
        setInativo(false);
        setNovoProd(false);
        setPedidos(false);
        setUsuarios(true);
        $("#tabUsuarios").addClass("active");
        $("#tabProdAtivos").removeClass("active");
        $("#tabProdInativos").removeClass("active");
        $("#tabNovoProd").removeClass("active");
        $("#tabPedidos").removeClass("active");
    }

    return(
        <>
            <main>
            <div className="content-box">
                <h1>Página do Adiministrador</h1>
                <hr />
                <div className="row">
                    <div className="col-sm-12">
                        <section id="loginInfo" className="d-md-flex no-space d-xs-none d-sm-none">
                            <h2>Olá Adiministrador Fulaninho</h2>
                            <p><strong>Email: </strong>fulaninho@example.com</p>
                            <button id="altSenha" className="btn btn-outline-dark">Alterar Senha</button>
                        </section>
                    
                        <section id="produtosCadastrados" className="d-flex rounded bg-light shadow-sm mt-3 p-2">
                                <Nav fill variant="tabs" defaultActiveKey="/home">
                                    <Nav.Item>
                                    <button className="nav-link active ml-0 mr-0" id="tabPedidos" onClick={() => {showPedidos();}} 
                                     aria-controls="pedidos" aria-expanded={pedidos}>
                                         Pedidos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item clasName="nav-item">
                                    <button className="nav-link ml-0 mr-0" id="tabProdAtivos" onClick={() => {showProdutosAtivos();}} 
                                     aria-controls="produtosAtivos" aria-expanded={ativo}>
                                         Produtos Ativos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <button className="nav-link ml-0 mr-0" id="tabProdInativos" onClick={() => {showProdutosInativos();}} 
                                     aria-controls="produtosInativos" aria-expanded={inativo}>
                                         Produtos Inativos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <button className="nav-link ml-0 mr-0" id="tabNovoProd" onClick={() => {showProdutoNovo();}} 
                                     aria-controls="produtoNovo" aria-expanded={novoProd}>
                                         Novo Produto
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <button className="nav-link ml-0 mr-0" id="tabUsuarios" onClick={() => {showUsuarios();}} 
                                     aria-controls="usuarios" aria-expanded={usuarios}>
                                         Usuários
                                    </button>
                                    </Nav.Item>
                                </Nav>
                                
                                <Collapse in={pedidos}>
                                    <div id="pedidos" className="p-2 bg-white border border-top-0 tabcontent">
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        pedidos
                                   </div>
                                </Collapse>
                                <Collapse in={ativo}>
                                    <div id="produtosAtivos" className="p-2 bg-white border border-top-0 tabcontent" >
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        <ProductCardPanel type="visivel" />
                                    </div>
                                </Collapse>
                                <Collapse in={inativo}>
                                    <div id="produtosInativos" className="p-2 bg-white border border-top-0 tabcontent">
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        <ProductCardPanel type="invisible" />
                                    </div>
                                </Collapse>
                                <Collapse in={novoProd}>
                                    <div id="produtoNovo" className="pt-4 pl-4 pb-3 bg-white border border-top-0 tabcontent">
                                        <ProductForm mode="new"/>
                                   </div>
                                </Collapse>
                                <Collapse in={usuarios}>
                                    <div id="usuarios" className="p-2 bg-white border border-top-0 tabcontent">
                                        <h6 className="align-right mt-2 text-right">
                                            <i className="fas fa-search"></i>
                                            <i className="fas fa-filter"></i>
                                        </h6>
                                        usuarios
                                   </div>
                                </Collapse>
                        </section>
                    </div>
                </div>
            </div>
            </main>
        </>
    );
}

export default AdmAccount;