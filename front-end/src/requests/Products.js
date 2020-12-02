import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';

export default {
  
  GetAllProducts: (props) =>{
      const context = useContext(DataContext);
    
      useEffect( () => {
        console.log("Pegando dados da API");
        api.get("products/all/0", {crossdomain: true})
          .then((response) => {
            response.data.forEach((item, index) => {
              item.id = item._id;
              item.img.path = item.img.file;
              console.log(item);
              context.createProduct(item);
            })
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });

      }, [])

      return(<></>);
  }
}
