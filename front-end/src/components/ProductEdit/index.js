import React, {useContext} from 'react';

import ProductForm from '../ProductForm';
import { DataContext } from '../../Context';

export default function ProductEdit(props) {

    const context = useContext(DataContext);
    const data = context.data;

    const {tab, base, id} = props.match.params;  

    return(
        <>
          <main>
            <div className="content-box">
              {data.map((item, index) => {
                if(id === item.id){
                  if(item.colors.length === 0) item.colors.push('VOID');
                  if(item.templates.length === 0) item.colors.push('VOID');
                  if(item.sizes.length === 0) item.colors.push('VOID');
                  
                  var ops = [], ind = 0;
                  item.colors.forEach((color, index) => {
                    item.templates.forEach((template, index) => {
                      item.sizes.forEach((size, index) => {
                          var sku = "" + item.type + "-" + item.id;
                          sku += "-" + color.substring(0, 4).toUpperCase();
                          sku += "-" + template.substring(0, 4).toUpperCase();
                          sku += "-" + size.substring(0, 4).toUpperCase();

                          ops[ind] = {};
                          ops[ind].cor = (color === 'VOID') ? '' : color;
                          ops[ind].modelagem = (template === 'VOID') ? '' : template;
                          ops[ind].tamanho = (size === 'VOID') ? '' : size;
                          ops[ind].estoque = item.stock[sku];
                          ind++;
                        })
                      })
                    })
                  return(
                    <ProductForm {...item} opcoes={ops} mode="view"/>
                  );
                }else{
                  return('');
                }
              })
              }
            </div>
          </main>
        </>
    );
}