import React, {useContext} from 'react';

import ProductForm from '../ProductForm';
import { DataContext } from '../../Context';

export default function ProductEdit(props) {

    const context = useContext(DataContext);
    const data = context.data;

    const {tab, base, id} = props.match.params;  

    console.log(tab);
    console.log(base);
    console.log(id);
    console.log(data);

    return(
        <>
          <main>
            <div className="content-box">
              {data.map((item, index) => {
                if(id === item.id){
                  return(
                    <ProductForm {...item} mode="view"/>
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