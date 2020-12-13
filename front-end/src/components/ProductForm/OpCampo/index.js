import React, {useState, useEffect} from 'react';

import '../index.js';

const OpCampo = (props) => {

    const [template, setModelagem] = useState(props.template);
    const [size, setTamanho] = useState(props.size);
    const [color, setCor] = useState(props.color);
    const [stock, setEstoque] = useState(props.stock);

    useEffect (() => {
      var e = {};

      setModelagem(props.template);
      setTamanho(props.size);
      setCor(props.color);
      setEstoque(props.stock);

      e.index = props.index;

      e.dado = {
        template: template ? template : '',
        size: size ? size : '',
        color: color ? color : '',
        stock: stock ? stock : -1
      }

      props.onChange(e);
    },[])

    useEffect( () => {
      var e = {};
      e.index = props.index;

      e.dado = {
        template: template ? template : '',
        size: size ? size : '',
        color: color ? color : '',
        stock: stock ? stock : -1
      }

      props.onChange(e);
    },[template, size, stock, color])

    return (
      <>
        <div className="form-row mb-3 " id={props.id}>
          <div className="form-group col-3">
            <label htmlFor="categoria">Modelagem: </label>
            <input type="text" className="input-control form-control bg-white" id={"modelagemOp" + props.index}
              value={template} placeholder="Deixe em Branco para Geral"
              onChange={(event) => {setModelagem(event.target.value)}}
            />                
        </div>
        <div className="form-group col-3">
            <label htmlFor="categoria">Tamanho: </label>
            <input type="text" className="input-control form-control bg-white" id={"tamanhoOp"+props.index}
            value={size} placeholder="Deixe em Branco para Geral"
            onChange={(event) => {setTamanho(event.target.value)}}
          />
        </div>
        <div className="form-group col-3">
            <label htmlFor="categoria">Cor: </label>
            <input type="text" className="input-control form-control bg-white" id={"corOp"+props.index}
            value={color} placeholder="Deixe em Branco para Geral"
            onChange={(event) => {setCor(event.target.value)}}
          />
        </div>
        <div className="form-group col-2">
            <label htmlFor="stock">Estoque: </label>
            <input type="number" className="input-control form-control bg-white" id={"estoqueOp"+props.index}
              placeholder="Estoque Da Opção"
              value={stock}
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