import React, {useContext} from 'react';

import ProductForm from '../ProductForm';
import { DataContext } from '../../Context';
import { Redirect } from 'react-router-dom';

export default function ProductEdit(props) {

    const context = useContext(DataContext);
    const data = context.data;

    const {base, id} = props.match.params;  

    const product = data.find(item => item.id === id)

    if(!['product', 'produto', 'event', 'evento'].includes(base) || !product){ 
      return <Redirect to='/'/>
    }
    
    let ops = []
    let sku = product.type + '-' + product.id
    
    if(product.type === 'PR'){
      const colors = (!product.colors.isEmpty()) ? product.colors : [false]
      const templates = (!product.templates.isEmpty()) ? product.templates : [false]
      const sizes = (!product.sizes.isEmpty()) ? product.sizes : [false]

      colors.forEach(color => {
        templates.forEach(template => {
          sizes.forEach(size => {
              sku = product.type + '-' + product.id
              sku += color ? '-' + color.substring(0,4).toUpperCase() + '-' : '-VOID-'
              sku += template ? template.substring(0,4).toUpperCase() + '-' : 'VOID-'
              sku += size ? size : 'VOID'

              ops.push({
                cor: color ? color : '',
                modelagem: template ? template : '',
                tamanho: size ? size : '',
                estoque: product.stock[sku]
              })
          })
        })
      })
    }

    else{
      ops.push({
        cor: '',
        modelagem: '',
        tamanho: '',
        estoque: product.stock[sku]
      })
    }
      
    return(
        <>
          <main>
            <div className="content-box">
              <ProductForm {...product} {...props} opcoes={ops} mode="view"/>
            </div>
          </main>
        </>
    );
}