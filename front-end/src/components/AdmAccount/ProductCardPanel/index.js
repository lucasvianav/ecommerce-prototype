import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import '../../css/bootstrap.css';
import { DataContext } from '../../../Context'

function ProductCardPanel(props){

    const context = useContext(DataContext);
    const data = context.data;

    const visibilidade = props.type === "visivel" ? true : false;

    const renderProduct  = (item, index) => {
        const tipo = item.type === "PR" ? "Produto" : "Evento";
        const url = "./edit/" + tipo.toLowerCase() + '/' + item.id;

        if(visibilidade === item.visibility){
          $("#vazio").addClass("d-none");
          $("#vazio").removeClass("d-flex");

          return(
              <div className="card p-0" key={index}>
                  <div className="card-body m-0 p-2">
                      <h5 className="card-title">{item.name}</h5>
                      <span className="badge badge-light">{tipo}</span>
                      <span className="badge badge-light">{item.category}</span>
                      <span className="badge badge-light">{item.id}</span>
                      <div className="d-flex justify-content-end">
                          <Link to={url} className="btn btn-link btn-sm mt-2" >Mais Detalhes</Link>
                      </div>
                  </div>
              </div>
          );
        }else{
            return ('');
        }
    }

    return(
        <div>
            <div id="vazio" className="d-flex justify-content-center" style={{height: "60px"}}> 
                <h4>Não há nada aqui!</h4>
            </div>
            <div className="card-columns">
                {data.map(renderProduct)}
            </div>
        </div>
    );
}

export default ProductCardPanel;