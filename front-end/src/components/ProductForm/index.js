import React, {useState, useContext, useEffect} from 'react';
import Resizer from "react-image-file-resizer";
import $ from 'jquery';

import './index.css';
import '../css/bootstrap.css'

import { DataContext } from '../../Context';
import Modais from './Modais';
import OpCampo from './OpCampo';

import ProductsRequests from '../../requests/Products';

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
  const [displayPrice, setDisplayPrice] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("nova");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [urlGen, setUrlGen] = useState({});

  /*States para alterar o valores de categorias existentes*/
  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [firstUpdate, setFirstUpdate] = useState(false);

  /*States dos modais */
  const [modalImg, setModalImg] = useState(false);
  const [modalImgProps, setModalImgProps] = useState({src: '', alt: ''});
  const [modalInfo, setModalInfo] = useState(false);

  const [opcoes, setOpcoes] = useState([]);

  /*State da API*/
  const [req, setReq] = useState({});
  
  useEffect( () => {
    if(props.mode === "view"){
      const descr = "<ul>" + props.description.ul.map((item, index) => {return(item)+";"}) + "</ul>\n<ol>" +
                    props.description.ol.map((item, index) => {return(index+item)}) + "</ol>\n" + props.description.txt;
      setImagens(props.img);
      setNomeProduto(props.name);
      setPrecoProduto(props.price.full);
      setDisplayPrice(props.price.sale);
      setTipo(props.type);
      setCategoria(props.category);
      setDescricao(descr);
      setTitle(props.name + ' | ID: ' + props.id);
      setAction("Salvar");
      setOpcoes(props.opcoes); 
      setVisibility(props.visibility)
    }
    if(props.mode === "new"){
      setAction("Cadastrar");
      setOpcoes([{}]);
      setTitle("");
    }
  }, []);

  useEffect(() => {
    setArrayCategorias([]);
    var vet = [];
    categories.map((it, index) => {
      if (it.parent === tipo){
        vet.push(it.name);
      }
      return '';
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

  useEffect( () => {
    if(urlGen.index !== undefined){
      var imgs = imagens;
      imgs[urlGen.index].file = urlGen.url;
      setImagens(imgs);
      console.log(imgs);
    }
  },[urlGen])

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 800, 800, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'base64', 300, 300
    );
  });

  const addImage = async () => {
    if(typeof selectedImg.name !== "undefined"){
      if(altImg !== ""){
        var novo = {};
        novo.path = URL.createObjectURL(selectedImg);
        novo.alt = altImg;
        novo.file = await resizeFile(selectedImg);
        console.log(novo.file);
        setImagens([...imagens, novo]);
      }
    }else{
      $('#imagem').addClass('is-invalid');
      $('#imagem')[0].focus()
    }
    if(altImg === ""){
        $('#altImg').addClass('is-invalid');
        $('#altImg')[0].focus()
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

  const validateFields = (e, action) => {
    var flag = 0;
    $('.is-invalid').removeClass('is-invalid')

    if(imagens.length === 0){
      $('#imagensInseridas').addClass('is-invalid');
      $('#imagensInseridas')[0].focus()
      flag = 1;
    }
    if(nomeProduto === ""){
      $('#nomeProduto').addClass('is-invalid');
      $('#nomeProduto')[0].focus()
      flag = 1;
    }
    if(precoProduto === ""){
      $('#precoProduto').addClass('is-invalid');
      $('#precoProduto')[0].focus()
      flag = 1;
    }
    if(displayPrice === "" || parseFloat(displayPrice) > parseFloat(precoProduto)){
      $('#displayPrice').addClass('is-invalid');
      $('#displayPrice')[0].focus()
      flag = 1;
    }
    if(tipo === ""){
      $('#tipo').addClass('is-invalid');
      $('#tipo')[0].focus()
      flag = 1;
    }
    var cat;
    if(categoria === "nova"){
      if(novaCategoria === ""){
        $('#novaCategoria').addClass('is-invalid');
        $('#novaCategoria')[0].focus()
        flag = 1;
      }else{
        cat = novaCategoria;
      }
    }else{
      cat = categoria;
    }
    if(descricao === ""){
      $('#descricao').addClass('is-invalid');
      $('#descricao')[0].focus()
      flag = 1;
    }

    if(opcoes.some(item => item.stock === -1)){
      console.log('é necessário definir o estoque')
      flag = 1
    }
    
    if(flag === 0){ 
      let ul = descricao.match(/<ul>(.*)<\/ul>/s)
      let ol = descricao.replace(/<ul>.*<\/ul>/s, '').match(/<ol>(.*)<\/ol>/s)
      let txt = descricao.replace(/<ul>.*<\/ul>/s, '').replace(/<ol>.*<\/ol>/s, '')

      const description = {
        ul: ul ? ul[1].split(';').map(item => item.replace(/^[\s\n]*/, '')).filter(item => item !== '') : [],
        ol: ol ? ol[1].split(';').map(item => item.replace(/^[\s\n]*/, '')).filter(item => item !== '') : [],
        txt: txt ? txt.replace(/^[\s\n]*/, '') : ''
      }

      const newId = props.mode === 'view' ? props.id : context.getId(tipo)

      let colors = []
      let sizes = []
      let templates = []
      let stock = []

      for(let item of opcoes){
          if(item.template !== '' && !templates.includes(item.template)){ templates.push(item.template) }
          if(item.color !== '' && !colors.includes(item.color)){ colors.push(item.color) }
          if(item.size !== '' && !sizes.includes(item.size)){ sizes.push(item.size) }
          stock.push([item.template, item.color, item.size, item.stock])
      }
      
      console.log(imagens);

      var exportData = {
        name: nomeProduto,
        type: tipo,
        id: newId,
        visibility: visibility,
        category: cat,
        description: description,
        templates: templates,
        sizes: sizes,
        colors: colors,
        price: {full: parseFloat(precoProduto), sale: parseFloat(displayPrice)},
        img: imagens,
        stock: stock
      }
      
      if(action === 'Salvar'){
        context.updateProduct(exportData)
        alert('O produto foi atualizado com sucesso.')
      }

      else if(action === 'Cadastrar'){
        var r = {};
        r.send = "post";
        r.data = exportData;
        setReq(r);
        //context.createProduct(exportData)
        setImagens([])
        setSelectedImg({})
        setAltImg("")
        setNomeProduto("")
        setPrecoProduto("")
        setDisplayPrice("")
        setTipo("")
        setCategoria("nova")
        setNovaCategoria("")
        setDescricao("")
        setVisibility(true)
        setOpcoes([{}])
      }

    }
  }

  const deleteProduct = () => {
    if(window.confirm('O produto não poderá ser recuperado. Você tem certeza que deseja excluí-lo?')){ 
      context.deleteProduct(props.id) 
      props.history.push('/minhaconta')
    }
  }

  return(
    <>
      <ProductsRequests.InsertProduct {...req} onChange={()=>{setReq({})}}/>
      <h3>{title}</h3>
      <form id='product-form'>
        <div id="cadastroProduto" style={{width: '97%'}}>
          <div className="form-row" id="rowVisibility">
            <div className="col-12 d-flex justify-content-end mb-2 pr-1">
                <div className="custom-control custom-switch mr-2">
                    <input type="checkbox" className="custom-control-input green-radio-input" id="visibility" onChange={e => setVisibility(e.target.checked)} checked={visibility}/>
                    <label className="custom-control-label green-radio-label" htmlFor="visibility">Produto visível</label>
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
                        <img src={it.path} alt={it.alt} className="miniImagem"
                        onClick={(event)=>{
                          var obj = {};
                          obj.src = it.path;
                          obj.alt = it.alt;
                          obj.index = index;
                          setModalImgProps(obj);
                          setModalImg(true);
                        }}/>
                      </div>
                    );
                  })}
                  <em>{(imagens.length === 0) ? "Nenhuma Imagem Adicionada" : ""}</em>
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
                <label className="custom-file-label" htmlFor="imagem" data-browse="Procurar">{
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
                <button className="btn void-btn" type="button" onClick={() => {addImage()}}>Adicionar</button>
              </div>
            </div>              
          </div>
          <div className="form-row mb-3" id="rowNomePreco">
            <div className="form-group col-md-6 col-sm-12">
              <label htmlFor="nomeProduto"><span>Nome do Produto: *</span></label>
              <input type="text" className="input-control form-control" id="nomeProduto" 
                placeholder="Digite o nome do produto" style={{borderRadius: '15px', width: 'calc(100% - 4.5rem)'}}
                value={nomeProduto} 
                onChange={(event) => {setNomeProduto(event.target.value)}}
              />
            </div>
            <div className="form-group col-md-3 col-sm-6">
              <label htmlFor="precoProduto"><span>Preço cheio (sem desconto): *</span></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white"><span>R$</span></div>
                </div>
                <input type="number" className="input-control form-control" id="precoProduto"  
                  placeholder="0,00"
                  value={precoProduto} 
                  onChange={(event) => {setPrecoProduto(event.target.value)}}
                  />
              </div>
            </div>
            <div className="form-group col-md-3 col-sm-6">
              <label htmlFor="displayPrice">Preço de venda (com desconto):</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white"><span>R$</span></div>
                </div>
                <input type="number" className="input-control form-control" id="displayPrice"  
                  placeholder="0,00"
                  value={displayPrice} 
                  onChange={(event) => {setDisplayPrice(event.target.value)}}
                  />
                </div>
            </div>
          </div>
          <div className="form-row mb-3" id="rowTipoCategoria">
            <div className="form-group col-md-3 col-sm-6">
              <label htmlFor="categoria">Tipo: *</label>
              <select className="custom-select" id="tipo"
                value={tipo}
                onChange={(event) => {setTipo(event.target.value)}}
              >
                  <option value="" disabled={true}>Selecione</option>
                  <option value="PR">Produtos</option>
                  <option value="EV">Eventos</option>
              </select>
          </div>
            <div className="form-group col-md-3 col-sm-6">
                <label htmlFor="categoria">Categoria: *</label>
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
                <label htmlFor="novaCategoria">Nome da Nova Categoria: *</label>
                <input type="text" className="input-control form-control" id="novaCategoria"
                  placeholder="Digite o Nome da Nova Categoria"
                  value={novaCategoria} style={{borderRadius: '15px', width: 'calc(100% - 4.5rem)'}}
                  onChange={(event) => {setNovaCategoria(event.target.value)}}
                />
            </div>
          </div>
          <div className="form-row mb-3" id="rowDescricao" >
            <div className="form-group col-12">
              <label htmlFor="descricao">Descrição: *</label> 
              <button type="button" className="btn-clear" onClick={()=>{setModalInfo(true)}}> 
                <i className="fas fa-info-circle"></i> 
              </button>
              <textarea className="form-control" id="descricao" rows="5"
                value={descricao} placeholder="Digite a Descrição do Seu Produto"
                onChange={(event) => {setDescricao(event.target.value)}}
              ></textarea>
            </div>
          </div>

          <div id="camposOpcoes">
            {
            opcoes.map((op, index)=>{
              return (
                <OpCampo key={index} removable={index === 0 ? false : true} index={index}
                  onRemove={(e) => {removeOp(index)}} onChange={(e) => {attOp(e)}} value={opcoes}
                  id={"optionFields"+index} {...opcoes[index]}
                />
                )
              })
            }

          </div>
          <button type="button" className="btn void-btn"
          onClick={(event) => {setOpcoes([...opcoes, {}])}}
          >Adicionar Campo de Opções</button>

          <div className="row justify-content-end mb-2 mr-2 pr-1">
              {
                !(action === 'Salvar') ? '' :
                <>
                  <button type='button' onClick={deleteProduct} className='kk big-btn void-btn'>Excluir</button>
                  <button type='button' onClick={() => props.history.push('/minhaconta')} className='kk big-btn void-btn'>Cancelar</button>
                </>
              }
              <button type="button" className="kk big-btn full-btn"
                onClick={(e)=>{validateFields(e, action)}}
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
        <ul className='bullet-list'>
          <li><span>Lista enumerada insira a tag <strong>&lt;ol&gt;</strong> [itens separados por ; ] <strong>&lt;/ol&gt;</strong> <br /></span></li>
          <li><span>Lista te tópicos insira a tag <strong>&lt;ul&gt;</strong> [itens separados por ; ] <strong>&lt;/ul&gt;</strong></span></li>
        </ul>
      </Modais.ModalInfo>
    </>
  );
}


export default ProductForm;