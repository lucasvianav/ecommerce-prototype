import React, {useState, useEffect} from 'react';
import $ from 'jquery';

import '../../css/bootstrap.css';
import './index.css';

const FilterDiv = (props) => {

  const [seletores, setSeletores] = useState(props.seletores);
  const [selecionados, setSelecionados] = useState([]);

  useEffect( () => {
    setSeletores(props.seletores);
    if (typeof selecionados[0] === 'undefined'){
      var selected = [];
      var se = {};
      props.seletores.forEach((selet, index) => {
        se.title = selet.property;
        se.data = [];
        selected.push(se)
      })
      setSelecionados(selected);
    }
  }, [props]);

  const changeSelecionados = (tg) => {
    var selet = selecionados;
    var strs = tg.value.split("-");
    if($("#"+tg.id).is(":checked")){
      selet.forEach((sel, index) => {
        if(sel.title === strs[0]){
          sel.data.push(strs[1]);
        }
      })
    }else{
      selet.forEach((sel, index) => {
        if(sel.title === strs[0]){
          sel.data.splice(sel.data.indexOf(strs[1]), 1);
        }
      })
    }
    setSelecionados(selet);
  }

  const hideDiv = (e) => {
    props.onChange(selecionados);
    props.onHide();
  }

  return (
    <div className={"filter-div pl-3 pb-3 shadow rouded show-"+props.show}>
      <button className="btn-clear" onClick={(e) => {hideDiv(e)}}>
        <i className="fas fa-times"></i>
      </button>
      <input type="text" className="form-control search mb-3" placeholder="Busca" />
      <div className="seletores mt-2">
        <div className="text-left">
          {
            seletores.map((seletor, index) => {
              return (
                <div key={seletor.title + index}>
                <p style={{display: 'block'}}>
                  {seletor.title}
                </p>
                  <ul className="checkboxes">
                      {
                        seletor.labels.map((selet, index) => {
                          return (
                              <li className='checkbox-container' key={"seletor" + selet + index} title={selet}>
                                <input type="checkbox" value={seletor.property + "-" + seletor.values[index]} id={"seletor-" + seletor.values[index]} 
                                  onChange={(e) => changeSelecionados(e.target)} />
                                  {selet}
                                <label htmlFor={"seletor-" + seletor.values[index]} >
                                </label>
                              </li>
                        )})
                      }
                  </ul> 
                  </div>
              )})
          }
        </div>
      </div>
        <button type="button" className="big-btn full-btn mr-4" onClick={(e) => {hideDiv(e)}}>Aplicar</button>
    </div>
  );
}

export default FilterDiv;