import React, {useContext, useState, useEffect} from 'react';

import { DataContext } from '../../../Context';

import ModalUser from './Modal';

import AccountsRequests from '../../../requests/Account'

import '../../css/bootstrap.css';

const UsersPanel = (props) => {

  const context = useContext(DataContext);
  const allUsers = context.accounts;
  const [users, setUsers] = useState(context.accounts);

  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({id:"", email: "", phoneNumber: "", type: "", birthday:"", cpf:"", name:""});

  const [req, setReq] = useState({});

  useEffect( () => {
    var d = [], flag = 0;
    const filters = (typeof props.filter !== "undefined") ? props.filter : [];
    if(filters.length > 0){
      allUsers.forEach((item, index) => {
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
      setUsers(d);
      console.log(filters);
      console.log(d);
    }else{
      setUsers(allUsers);
    }
  }, [props])

  return(
    <>
    <section>
      <AccountsRequests.DeleteAccount {...req} onChange={()=>{setReq({})}}/>
      <AccountsRequests.EditAccount {...req} onChange={()=>{setReq({})}}/>

        <table className="table table-hover border rounded">
            <thead>
              <tr>
                <th scope="col"><span>Nome</span></th>
                <th scope="col"><span>Email</span></th>
                <th scope="col"><span>Telefone</span></th>
                <th scope="col"><span>Tipo</span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(users !== undefined) ? users.map((user, index) =>{

                return (
                  <tr id={"user"+index} key={index}>
                      <td><span>{user.name}</span></td>
                      <td><span>{user.email}</span></td>
                      <td><span>{user.phoneNumber}</span></td>
                      <td><span>{user.type}</span></td>
                      <td className="text-right"><span>
                          <button className="btn-none" onClick={() => {
                            var properties = {
                              id: user.id, 
                              name: user.name,
                              cpf: user.cpf, 
                              type: user.type, 
                              email: user.email, 
                              phoneNumber: user.phoneNumber, 
                              birthday: user.birthday
                            };
                            setModalProps(properties);
                            setModal(true);
                          }}>
                            <i className="fa fa-eye grey"></i>
                          </button>
                        </span>
                      </td>
                  </tr>
                );
              }) : ""}
            </tbody>
        </table>
        
    </section>
    <ModalUser
      show={modal}
      value = {modalProps}
      onSave={(event) => {
        if(event.set === true){
          var r = {};
          r.send = event.send;
          r.id = event.id;
          r.email = event.email;
          r.data = event.data;
          r.contaAtual = event.contaAtual;
          setReq(r);
        }
      }}
      onHide={() => {setModal(false)}}
    />
  </>
  );
}

export default UsersPanel;