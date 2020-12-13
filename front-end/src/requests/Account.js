import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';

const getAtt = (item, action, context) => {
  item.id = item._id;
  if(action === 'create'){
    context.createAccount(item);
  }
  if(action === 'update'){
    context.updateAccount(item);
  }
}


const AccountsRequests = {
  GetAllAccounts: (props) =>{
      const context = useContext(DataContext);
      useEffect( () => {
        context.deleteAllAccounts();
        console.log("Pegando dados da API (Cupons)");
        api.get("accounts", {crossdomain: true})
        .then((response) => {
          response.data.forEach((item, index) => {
            item.id = item._id;
            console.log(item)
            context.createAccount(item);
          })
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });

      }, [])

      return(<></>);
  },

  InsertAccount: (props) =>{
    const context = useContext(DataContext);
  
    useEffect( () => {
        const data = props.data;
        if (props.send === 'post') {
        console.log("Mandando dados para a API");
        console.log(data)
        props.onChange();
        api.post("accounts", {...data})
          .then((response) => {
            getAtt(response.data, "create", context);
            alert("Usuário inserido com sucesso");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  EditAccount: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const data = props.data;
      const id = props.id;
      if (props.send === 'put') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.put("accounts/id/"+id, {...data})
          .then((response) => {
            api.get("accounts/"+id).then((res) => {
              getAtt(res.data[0], "update", context);
            }).catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
            alert("Usuário atualizado com sucesso!");
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  },

  DeleteAccount: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const id = props.id;
      if (props.send === 'del') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.delete("accounts/"+id)
          .then((response) => {
            context.deleteAccount(id);
            alert("Usuário excluido com sucesso");
            props.history.push('/minhaconta');
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        }
    }, [props])

    return(<></>);
  }
}

export default AccountsRequests