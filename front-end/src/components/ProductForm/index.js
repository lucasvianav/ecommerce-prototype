import React, {useState, useContext, useEffect, useRef} from 'react';
import $ from 'jquery';

import './index.css';
import '../css/bootstrap.css'

import { DataContext } from '../../Context';
import Modais from './Modais';
import OpCampo from './OpCampo';

function ProductForm(props){
  const context = useContext(DataContext);
  const categories = context.categories;

  /*States da pagina */
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");

  /*States dos valores inseridos*/
  const [imagens, setImagens] = useState([]);
  const [selectedImg, setSelectedImg] = useState({});
  const [altImg, setAltImg] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [descontoProduto, setDescontoProduto] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("nova");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  /*States para alterar o valores de categorias existentes*/
  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [firstUpdate, setFirstUpdate] = useState(false);

  /*States dos modais */
  const [modalImg, setModalImg] = useState(false);
  const [modalImgProps, setModalImgProps] = useState({src: '', alt: ''});
  const [modalInfo, setModalInfo] = useState(false);

  const [opcoes, setOpcoes] = useState([{}]);
  const [opValid, setOpValid] = useState(true);
  const ref = useRef(null);
  
  useEffect( () => {
    if(props.mode === "view"){
      const descr = "<ul>" + props.description.ul.map((item, index) => {return(item)+";"}) + "</ul>\n<ol>" +
                    props.description.ol.map((item, index) => {return(index+item)}) + "</ol>\n" + props.description.txt;
      setImagens(props.img);
      setNomeProduto(props.name);
      setPrecoProduto(props.price.full);
      setTipo(props.type);
      setCategoria(props.category);
      setDescricao(descr);
      setTitle("Produto " + props.name);
      setAction("Salvar");
    }
    if(props.mode === "new"){
      setAction("Cadastrar");
      setTitle("");
    }
  }, []);

  useEffect(() => {
    setArrayCategorias([]);
    var vet = [];
    categories.map((it) => {
      if (it.parent === tipo){
        vet.push(it.name);
      }
    })
    setArrayCategorias(vet);
    if(firstUpdate){
      setCategoria(categoria);
      setFirstUpdate(false);
    }
  }, [tipo]);


  useEffect(()=>{
    if(categoria === "nova"){
      $('#groupNovaCategoria').addClass('d-block');
      $('#groupNovaCategoria').removeClass('d-none');
    }else{
      $('#groupNovaCategoria').addClass('d-none');
      $('#groupNovaCategoria').removeClass('d-block');
    }
  },[categoria]);

  const addImage = () => {
    if(typeof selectedImg.name !== "undefined"){
      if(altImg !== ""){
        var novo = {};
        novo.small = URL.createObjectURL(selectedImg);
        novo.alt = altImg;
        setImagens([...imagens, novo]);
      }
    }else{
      $('#imagem').addClass('is-invalid');
    }
    if(altImg === ""){
        $('#altImg').addClass('is-invalid');
    }
  } 

  const removeImg = (index) => {
      var vet = [...imagens];
      vet.splice(index, 1)
      setImagens(vet);
  } 

  const atualizaAlt = (index, nAlt) => {
    var vet = [...imagens];
    vet[index].alt = nAlt;
    setImagens(vet);
  }

  const removeOp = (index) => {
    var vet = [...opcoes];
    vet.splice(index, 1)
    setOpcoes(vet);
    
  }

  const attOp = (e) => {
    var vet = [...opcoes];
    vet[e.index] = e.dado;
    setOpcoes(vet);
  }

  const validateFields = (e) => {
    var flag = 0;
    if(imagens.length === 0){
      $('#imagensInseridas').addClass('is-invalid');
      flag = 1;
    }
    if(nomeProduto === ""){
      $('#nomeProduto').addClass('is-invalid');
      flag = 1;
    }
    if(precoProduto === ""){
      $('#precoProduto').addClass('is-invalid');
      flag = 1;
    }
    if(tipo === ""){
      $('#tipo').addClass('is-invalid');
      flag = 1;
    }
    var cat;
    if(categoria === "nova"){
      if(novaCategoria === ""){
        $('#novaCategoria').addClass('is-invalid');
        flag = 1;
      }else{
        cat = novaCategoria;
      }
    }else{
      cat = categoria;
    }
    if(descricao === ""){
      $('#descricao').addClass('is-invalid');
      flag = 1;
    }
    opcoes.map((op, index) => {
      if(op.valid === false){
        setOpValid(false);
        flag = 1;
      }
    });
    
    if(flag === 0){ 
      var exportData = {}
      exportData.images = imagens;
      exportData.name = nomeProduto;
      exportData.price = precoProduto;
      exportData.type = tipo;
      exportData.category = cat;
      exportData.options = opcoes;
      console.log("Realizando Cadastro...");
      console.log(exportData);
    }
  }

  return(
    <>
      <h3>{title}</h3>
      <form>
        <div id="cadastroProduto" style={{width: '97%'}}>
          <div className="form-row" id="rowPreVenda">
            <div className="col-12 d-flex justify-content-end mb-2 pr-1">
                <div className="custom-control custom-switch mr-2">
                    <input type="checkbox" className="custom-control-input" id="preVenda" />
                    <label className="custom-control-label" for="preVenda">Pré Venda</label>
                </div>
            </div>
          </div>
          <div className="form-row mb-4" id="rowImagens">
            <div className="col-12 m-0">
              <p>Imagens: *</p>
              <div id="imagensInseridas" className="d-flex border p-3 bg-white rounded">
                  {imagens.map((it, index) =>{
                    return (
                      <div className="div-miniImagem" key={index}>
                        <button type="button" className="excluir-imagem"
                          onClick={()=>{removeImg(index)}}
                        >X</button>
                        <img src={it.small} alt={it.alt} className="miniImagem"
                        onClick={(event)=>{
                          var obj = {};
                          obj.src = it.small;
                          obj.alt = it.alt;
                          obj.index = index;
                          setModalImgProps(obj);
                          setModalImg(true);
                        }}/>
                      </div>
                    );
                  })}
                  <em>{(imagens.length == 0) ? "Nenhuma Imagem Adicionada" : ""}</em>
              </div>
            </div>
            <div className="input-group">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="imagem"
                  filename={selectedImg.name} 
                  onClick={(event) => {$('#imagem').removeClass('is-invalid')}}
                  onChange={(event) => {
                    if(typeof event.target.files[0] !== "undefined"){
                      setSelectedImg(event.target.files[0]);
                    }else{
                      setSelectedImg({});
                    }
                    }}/>
                <label className="custom-file-label" for="imagem" data-browse="Procurar">{
                  (typeof selectedImg.name === "undefined") ? "Escolha uma Imagem..." : selectedImg.name
                }</label>
              </div>
              <input type="text" className="form-control" id="altImg" 
                placeholder="Adicione uma descrição a imagem..."
                value={altImg} 
                onChange={(event) => {setAltImg(event.target.value)}}
                onClick={(event) => {$('#altImg').removeClass('is-invalid')}}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => {addImage()}}>Adicionar</button>
              </div>
            </div>              
          </div>
          <div className="form-row mb-3" id="rowNomePreco">
            <div className="form-group col-md-6 col-sm-12">
              <label for="nomeProduto">Nome do Produto: *</label>
              <input type="text" className="input-control form-control" id="nomeProduto" 
                placeholder="Digite o nome do produto" style={{borderRadius: '15px'}}
                value={nomeProduto} 
                onChange={(event) => {setNomeProduto(event.target.value)}}
              />
            </div>
            <div className="form-group col-md-3 col-sm-6">
              <label for="precoProduto">Preço: *</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">R$</div>
                </div>
                <input type="number" className="input-control form-control" id="precoProduto"  
                  placeholder="0,00"
                  value={precoProduto} 
                  onChange={(event) => {setPrecoProduto(event.target.value)}}
                  />
              </div>
            </div>
            <div className="form-group col-md-3 col-sm-6">
              <label for="descontoProduto">Desconto:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">%</div>
                </div>
                <input type="number" className="input-control form-control" id="descontoProduto"  
                  placeholder="00"
                  value={descontoProduto} 
                  onChange={(event) => {setDescontoProduto(event.target.value)}}
                  />
                </div>
            </div>
          </div>
          <div className="form-row mb-3" id="rowTipoCategoria">
            <div className="form-group col-md-3 col-sm-6">
              <label for="categoria">Tipo: *</label>
              <select className="custom-select" id="tipo"
                value={tipo}
                onChange={(event) => {setTipo(event.target.value)}}
              >
                  <option value="" disabled="true">Selecione</option>
                  <option value="PR">Produtos</option>
                  <option value="EV">Eventos</option>
              </select>
          </div>
            <div className="form-group col-md-3 col-sm-6">
                <label for="categoria">Categoria: *</label>
                <select className="custom-select" id="categoria"
                value={categoria}
                onChange={(event) => {setCategoria(event.target.value)}}
              >
                  <option value="nova">Nova</option>
                  {arrayCategorias.map((cat, index)=>{
                    return(
                      <option value={cat} key={index}>{cat}</option>
                    );
                  })}
                </select>
            </div>
            <div className="form-group col-md-6 col-sm-12" id="groupNovaCategoria">
                <label for="novaCategoria">Nome da Nova Categoria: *</label>
                <input type="text" className="input-control form-control" id="novaCategoria"
                  placeholder="Digite o Nome da Nova Categoria"
                  value={novaCategoria}
                  onChange={(event) => {setNovaCategoria(event.target.value)}}
                />
            </div>
          </div>
          <div className="form-row mb-3" id="rowDescricao" >
            <div className="form-group col-12">
              <label for="descricao">Descrição: *</label> 
              <button type="button" className="btn-clear" onClick={()=>{setModalInfo(true)}}> 
                <i className="fas fa-info-circle"></i> 
              </button>
              <textarea className="form-control" id="descricao" rows="5"
                value={descricao}
                onChange={(event) => {setDescricao(event.target.value)}}
              ></textarea>
            </div>
          </div>
          <div id="camposOpcoes">

            {opcoes.map((op, index)=>{
              return (
                <OpCampo key={index} removable={index === 0 ? false : true} index={index}
                  onRemove={(e) => {removeOp(index)}} onChange={(e) => {attOp(e)}}
                  id={"optionFields"+index} valid={opValid}
                />
              )
            })}

          </div>
            <button type="button" className="btn btn-outline-secondary"
              onClick={(event) => {setOpcoes([...opcoes, {}])}}
            >Adicionar Campo de Opções</button>

          <div className="row justify-content-end mb-2 mr-2 pr-1">
              <button type="button" className="btn btn-success"
                onClick={(e)=>{validateFields(e)}}
              >{action}</button>
          </div>
        </div>
      </form>
      <Modais.ModalImg
        show={modalImg}
        src = {modalImgProps.src}
        alt = {modalImgProps.alt}
        index = {modalImgProps.index}
        value = {{set: false, new: ''}}
        onSave = {(e) => {
          if (e.set === true) {
            atualizaAlt(e.index, e.new)
        }}}
        onHide={() => {setModalImg(false)}}
      />
      <Modais.ModalInfo
        show={modalInfo}
        onHide={() => {setModalInfo(false)}}
      > 
        <h3>Como Montar a Descrição de um Produto?</h3>
        <p>
          Você pode adicionar texto e listas à descrição do seu produto. Para inserir um texto basta digita-lo no campo descrição. 
          Para adicionar listas é necessário coloca-las dentro de tags
        </p>
        <ul>
          <li>Lista enumerada insira a tag <strong>&lt;ol&gt;</strong> [itens separados por ; ] <strong>&lt;/ol&gt;</strong> <br /></li>
          <li>Lista te tópicos insira a tag <strong>&lt;ul&gt;</strong> [itens separados por ; ] <strong>&lt;/ul&gt;</strong></li>
        </ul>
      </Modais.ModalInfo>
    </>
  );
}


export default ProductForm;