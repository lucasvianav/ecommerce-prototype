import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import '../../css/bootstrap.css';
import { DataContext } from '../../../Context'

function ProductCardPanel(props){

    const context = useContext(DataContext);
    const allProducts = context.data;
    const [data, setData] = useState([]);

    const visibilidade = props.type === "visivel" ? true : false;

    useEffect( () => {
      if(data.length === 0){ 
        $("#vazioProduct").removeClass("d-none");
        $("#vazioProduct").addClass("d-flex");
      }else{
        $("#vazioProduct").addClass("d-none");
        $("#vazioProduct").removeClass("d-flex");
      }
    }, [data])

    useEffect( () => {
      var d = [], flag = 0;
      const filters = (typeof props.filter !== "undefined") ? props.filter : [];
      if(filters.length > 0){
        allProducts.forEach((item, index) => {
          filters.forEach((fil, index)=>{
            if(fil.data.length > 0){
              if(fil.data.indexOf(item[fil.title]) + 1){
                d.push(item);
              }else{
                if(d.indexOf(item) >= 0)
                  d.splice(d.indexOf(item), 1);
              }
              flag = 1;
            }
          })
        })
      }
      if(flag === 1){
        setData(d);
      }else{
        setData(context.data);
      }
    }, [props, allProducts, context.data])
    
    const renderProduct  = (item, index) => {
        const tipo = item.type === "PR" ? "Produto" : "Evento";
        const url = "./edit/" + tipo.toLowerCase() + '/' + item.id;

        if(visibilidade === item.visibility){
          return(
              <div className="card p-0" key={index}>
                  <div className="card-body m-0 p-2">
                      <h5 className="card-title">{item.name}</h5>
                      <span className="badge badge-light mr-1">{tipo}</span>
                      <span className="badge badge-light mr-1">{item.category}</span>
                      <span className="badge badge-light mr-1">{item.id}</span>
                      <div className="d-flex justify-content-end">
                          <Link to={url} className="btn text-btn green" >Mais Detalhes</Link>
                      </div>
                  </div>
              </div>
          );
        }
        else{
            return ('');
        }
    }

    return(
        <div>
            <div id={"vazioProduct"} className="d-flex justify-content-center" style={{height: "60px"}}> 
                <h4>Não há nada aqui!</h4>
            </div>
            <div className="card-columns">
                {data.map(renderProduct)}
            </div>
        </div>
    );
}

export default ProductCardPanel;