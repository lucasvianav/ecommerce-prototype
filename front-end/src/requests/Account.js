import React, {useEffect, useContext} from 'react';

import { DataContext } from '../Context';

import api from './connection';

const getAtt = (item, action, context) => {
  item.id = item._id;
  if(action === 'update'){
    context.updateAccount(item);
  }
}


const AccountsRequests = {
  EditAccount: (props) =>{
    const context = useContext(DataContext);

    useEffect( () => {
      const data = props.data;
      const id = props.id;
      if (props.send === 'put') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.put("accounts/", {"id":id, "updates":{...data}})
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
      const email = props.email;
      const contaAtual = props.contaAtual;
      if (props.send === 'del') {
        console.log("Mandando dados para a API");
        props.onChange();
        api.delete("accounts/"+email)
          .then((response) => {
            context.deleteAccount(email);
            alert("Usuário excluido com sucesso");
            if(contaAtual){
              context.logout();
            }
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