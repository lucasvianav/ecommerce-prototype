import React, {useState} from 'react';

import '../../css/bootstrap.css';
import './index.css';

const FilterDiv = (props) => {

  const [seletores, setSeletores] = useState(props.seletores);

  return (
    <div className={"filter-div pl-3 pb-3 shadow rouded show-"+props.show}>
      <button className="btn-clear" onClick={props.onHide}>
        <i className="fas fa-times"></i>
      </button>
      <input type="text" className="form-control search" placeholder="Busca" />
      <div className="seletores mt-2">
        <div className="text-left">
          {
            seletores.map((seletor, index) => {
              return (
                <>
                <p style={{display: 'block'}}>
                  {seletor.title}
                </p>
                  <ul className="checkboxes">
                      {
                        seletor.data.map((selet, index) => {
                          return (
                              <li className='checkbox-container' key={"seletor" + index} title={selet}>
                                <input type="checkbox" value="" id={selet} />
                                <label for={selet} >
                                  {selet}
                                </label>
                              </li>
                        )})
                      }
                  </ul> 
                  </>
              )})
          }
        </div>
      </div>
    </div>
  );
}

export default FilterDiv;