import React, {useState, useEffect} from 'react';
import $ from 'jquery';

import '../index.js';


const OpCampo = (props) => {

    const catTemplate = ['Masculino', 'Feminino'];
    const catTamanhos = ['PP','P','M','G','GG','EG'];

    const [valid, setValid] = useState(props.valid);
    
    const [arrayCategorias, setArrayCategoria] = useState([]); 

    const [tipo, setTipo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");

    useEffect( () => {
      if(tipo === "template"){
        setArrayCategoria(catTemplate);
      }
      else if(tipo === "tamanho"){
        setArrayCategoria(catTamanhos);
      } else{
        setArrayCategoria([]);
      }
    },[tipo])

    useEffect( () => {
      var e = {};
      e.index = props.index;
      e.dado = {};

      if(estoque === "")
        e.dado.valid = false;
      else
        e.dado.valid = true;

      e.dado.tipo = tipo;
      e.dado.categoria = categoria;
      e.dado.estoque = estoque;
      props.onChange(e);
    },[tipo, categoria, estoque])

    useEffect(()=>{
      if(props.valid === false){
        if(estoque === ""){
          $('#estoque'+props.index).addClass('is-invalid');
        }else{
          $('#estoque'+props.index).removeClass('is-invalid');
        }
      }
    })

    return (
      <>
        <div className="form-row mb-3" id={props.id}>
          <div className="form-group col-3">
            <label for="categoria">Tipo de Opção: *</label>
            <select className="custom-select" id="tipo"
              value={tipo}
              onChange={(event) => {setTipo(event.target.value)}}
            >
                <option value="">Geral</option>
                <option value="template">Template</option>
                <option value="tamanho">Tamanho</option>
                <option value="cores">Cores</option>
            </select>
        </div>
          <div className="form-group col-3">
              <label for="categoria">Opção: *</label>
              <select className="custom-select" id="categoria"
              value={categoria}
              onChange={(event) => {setCategoria(event.target.value)}}
            >
                <option value="">Geral</option>
                {arrayCategorias.map((cat, index)=>{
                  return(
                    <option value={cat} key={index}>{cat}</option>
                  );
                })}
              </select>
          </div>
          <div className="form-group col-5" id="groupNovaCategoria">
              <label for="estoque">Estoque: *</label>
              <input type="number" className="input-control form-control" id={"estoque"+props.index}
                placeholder="Digite o Estoque disponivel nessa opção"
                value={estoque}
                onChange={(event) => {setEstoque(event.target.value)}}
              />
          </div>
          <div className="form-group col-1 align-content-center">
            <p></p><br />
            {props.removable == true ? <button type="button" 
              onClick={() => {props.onRemove(props.index)}}
              className="btn-clear">
                <i className="fas fa-trash-alt"></i>
              </button> : ""}
          </div>
        </div>
      </>
    );
}

export default OpCampo;