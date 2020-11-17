import React from 'react';


import '../../bootstrap/css/bootstrap.css';
import data from '../../../data'

function productCardPanel(props){
    const visibilidade = props.type == "visivel" ? true : false;

    const renderProduct  = (item, index, tipo) => {
        if(visibilidade == item.visibility){
            return(
                <div className="card p-0" key={index}>
                    <div className="card-body m-0 p-2">
                        <h5 className="card-title">{item.name}</h5>
                        <span className="badge badge-light">{item.type}</span>
                        <span className="badge badge-light">{item.category}</span>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-link btn-sm mt-2">Mais Detalhes</button>
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
            <div className="card-columns">
                {data.products.map(renderProduct)}
                {data.events.map(renderProduct)}
            </div>
            <p className="text-right mr-3">
                <a href="#">Ver mais</a>
            </p>
        </div>
    );
}

export default productCardPanel;