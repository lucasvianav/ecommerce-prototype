import React, {useContext, useState, useEffect} from 'react';

import { DataContext } from '../../../Context';

import './index.css';
import '../../css/bootstrap.css';

const UsersPanel = (props) => {

  const context = useContext(DataContext);
  const allUsers = context.accounts;
  const [users, setUsers] = useState([]);

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
          <table className="table table-hover border rounded">
              <thead>
                <tr>
                  <th scope="col"><span>Nome</span></th>
                  <th scope="col"><span>Email</span></th>
                  <th scope="col"><span>Tipo</span></th>
                  <th className="text-right"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) =>{

                  return (
                    <tr id={"user"+index} key={index}>
                        <td><span>{user.name}</span></td>
                        <td><span>{user.email}</span></td>
                        <td><span>{user.type}</span></td>
                        <td className="text-right"></td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
      </section>
    </>
  );
}

export default UsersPanel;