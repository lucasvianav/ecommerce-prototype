import React, {useState, useContext, useEffect} from 'react';
import $ from 'jquery';
import {Nav, Collapse} from 'react-bootstrap';
import ProductCardPanel from './ProductCardPanel';
import ProductForm from '../ProductForm';
import UsersPanel from './UsersPanel';
import OrdersPanel from '../OrdersPanel';
import FilterDiv from './FilterDiv';

import { DataContext } from '../../Context';

import '../css/bootstrap.css';
import './index.css';

function AdmAccount(props){

    const context = useContext(DataContext);
    const categories = context.categories;

    const [ativo, setAtivo] = useState(false);
    const [inativo, setInativo] = useState(false);
    const [novoProd, setNovoProd] = useState(false);
    const [pedidos, setPedidos] = useState(true);
    const [usuarios, setUsuarios] = useState(false);

    const [filter, setFilter] = useState("none");
    const [arrayCategorias, setArrayCategorias] = useState([]);

    const [selectedFilter1, setSelectedFilter1] = useState([]);
    const [selectedFilter2, setSelectedFilter2] = useState([]);
    const [selectedFilter3, setSelectedFilter3] = useState([]);
    const [selectedFilter4, setSelectedFilter4] = useState([]);

    useEffect( () => {
        var vet = [];
        categories.forEach((category, index) => {
            vet.push(category.name);
        })
        setArrayCategorias(vet);
    }, [categories])

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
        <main className='adm'>
            <h1 className='panel-title'>Página do Adiministrador</h1>
            <div className="content-box">
                <div className="row">
                    <div className="col-sm-12">
                        <section id="loginInfo" className="d-md-flex no-space d-xs-none d-sm-none">
                            <h2>Olá, {context.getCurrentAccount().name}!</h2>
                            <p><strong>Email: </strong>{context.isLogged.email}</p>
                            {/* <button id="altSenha" className="btn void-btn">Alterar Senha</button> */}
                        </section>
                    
                        <section id="funcoes" className="d-flex rounded shadow-sm mt-3 p-2">
                                <Nav fill variant="tabs" defaultActiveKey="/home">
                                    <Nav.Item>
                                    <button className="nav-link active ml-0 mr-0" id="tabPedidos" onClick={() => {showPedidos();}} 
                                    aria-controls="pedidos" aria-expanded={pedidos}>
                                        Pedidos
                                    </button>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
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
                                    <div id="pedidos" className="p-2 bg-flex tabcontent">
                                        <div className="d-flex justify-content-end" style={{width: '100%'}}>
                                            <h6 className="align-right mt-2 text-right">
                                                <i className="fas fa-search pointer" onClick={() =>{setFilter("search")}}></i>
                                                <i className="fas fa-filter pointer" onClick={() =>{setFilter("filter")}}></i>
                                                < FilterDiv show={filter} onHide={() => setFilter("none")} 
                                                    onChange={(event) => {setSelectedFilter1(event)}}
                                                    seletores={[{title: "Situação", property: "situation", labels:["Aguardando Aprovação","Pagamento Aprovado","Pronto para Retirada","Finalizado"], values: ["AA", "PA", "PPR", "FF"] }]} 
                                                />
                                            </h6>
                                        </div>
                                        <OrdersPanel type='admin'filter={selectedFilter1}/>
                                </div>
                                </Collapse>
                                <Collapse in={ativo}>
                                    <div id="produtosAtivos" className="p-2 bg-flex tabcontent" >
                                        <div className="d-flex justify-content-end" style={{width: '100%'}}>
                                            <h6 className="align-right mt-2 text-right">
                                                <i className="fas fa-search pointer" onClick={() =>{setFilter("search")}}></i>
                                                <i className="fas fa-filter pointer" onClick={() =>{setFilter("filter")}}></i>
                                                < FilterDiv show={filter} onHide={() => setFilter("none")} 
                                                    onChange={(event) => {setSelectedFilter2(event)}}
                                                    seletores={[{title: "Categorias", property:"category", labels: arrayCategorias , values: arrayCategorias}]} 
                                                />
                                            </h6>
                                        </div>
                                        <ProductCardPanel type="visivel" filter={selectedFilter2} />
                                    </div>
                                </Collapse>
                                <Collapse in={inativo}>
                                    <div id="produtosInativos" className="p-2 bg-flex tabcontent">
                                        <div className="d-flex justify-content-end" style={{width: '100%'}}>
                                            <h6 className="align-right mt-2 text-right">
                                                <i className="fas fa-search pointer" onClick={() =>{setFilter("search")}}></i>
                                                <i className="fas fa-filter pointer" onClick={() =>{setFilter("filter")}}></i>
                                                < FilterDiv show={filter} onHide={() => setFilter("none")} 
                                                    onChange={(event) => {setSelectedFilter3(event)}}
                                                    seletores={[{title: "Categorias", property:"category", labels: arrayCategorias , values: arrayCategorias}]} 
                                                />
                                            </h6>
                                        </div>
                                        <ProductCardPanel type="invisible" filter={selectedFilter3} />
                                    </div>
                                </Collapse>
                                <Collapse in={novoProd}>
                                    <div id="produtoNovo" className="pt-4 pl-4 pb-3 bg-flex tabcontent">
                                        <ProductForm mode="new"/>
                                </div>
                                </Collapse>
                                <Collapse in={usuarios}>
                                    <div id="usuarios" className="p-2 bg-flex tabcontent">
                                        <div className="d-flex justify-content-end" style={{width: '100%'}}>
                                            <h6 className="align-right mt-2 text-right">
                                                <i className="fas fa-search pointer" onClick={() =>{setFilter("search")}}></i>
                                                <i className="fas fa-filter pointer" onClick={() =>{setFilter("filter")}}></i>
                                                < FilterDiv show={filter} onHide={() => setFilter("none")} 
                                                    onChange={(event) => {setSelectedFilter4(event)}}
                                                    seletores={[{title: "Tipo de usuário", property: "type", labels:["Cliente","Administrador"], values: ["client","admin"]}]} 
                                                />
                                            </h6>
                                        </div>
                                        <UsersPanel filter={selectedFilter4} />
                                </div>
                                </Collapse>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdmAccount;