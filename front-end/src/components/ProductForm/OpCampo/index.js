import React, {useState, useEffect} from 'react';

import '../index.js';

const OpCampo = (props) => {

    const [modelagem, setModelagem] = useState(props.modelagem);
    const [tamanho, setTamanho] = useState(props.tamanho);
    const [cor, setCor] = useState(props.cor);
    const [estoque, setEstoque] = useState(props.estoque);

    useEffect (() => {
      var e = {};

      setModelagem(props.modelagem);
      setTamanho(props.tamanho);
      setCor(props.cor);
      setEstoque(props.estoque);

      e.index = props.index;

      e.dado = {
        template: modelagem ? modelagem : '',
        size: tamanho ? tamanho : '',
        color: cor ? cor : '',
        stock: estoque ? estoque : -1
      }

      props.onChange(e);
    },[])

    useEffect( () => {
      var e = {};
      e.index = props.index;

      e.dado = {
        template: modelagem ? modelagem : '',
        size: tamanho ? tamanho : '',
        color: cor ? cor : '',
        stock: estoque ? estoque : -1
      }

      props.onChange(e);
    },[modelagem, tamanho, estoque, cor])

    return (
      <>
        <div className="form-row mb-3 " id={props.id}>
          <div className="form-group col-3">
            <label htmlFor="categoria">Modelagem: </label>
            <input type="text" className="input-control form-control bg-white" id={"modelagemOp" + props.index}
              value={modelagem} placeholder="Deixe em Branco para Geral"
              onChange={(event) => {setModelagem(event.target.value)}}
            />                
        </div>
        <div className="form-group col-3">
            <label htmlFor="categoria">Tamanho: </label>
            <input type="text" className="input-control form-control bg-white" id={"tamanhoOp"+props.index}
            value={tamanho} placeholder="Deixe em Branco para Geral"
            onChange={(event) => {setTamanho(event.target.value)}}
          />
        </div>
        <div className="form-group col-3">
            <label htmlFor="categoria">Cor: </label>
            <input type="text" className="input-control form-control bg-white" id={"corOp"+props.index}
            value={cor} placeholder="Deixe em Branco para Geral"
            onChange={(event) => {setCor(event.target.value)}}
          />
        </div>
        <div className="form-group col-2">
            <label htmlFor="estoque">Estoque: </label>
            <input type="number" className="input-control form-control bg-white" id={"estoqueOp"+props.index}
              placeholder="Estoque Da Opção"
              value={estoque}
              min='1'
              onChange={(event) => {setEstoque(event.target.value)}}
              required
            />
        </div>
        <div className="form-group col-1 align-content-center">
          <p></p><br />
          {props.removable === true ? <button type="button" 
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