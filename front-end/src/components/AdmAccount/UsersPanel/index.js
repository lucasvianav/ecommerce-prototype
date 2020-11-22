import React, {useContext} from 'react';

import { DataContext } from '../../../Context';

import './index.css';
import '../../css/bootstrap.css';

const UsersPanel = (props) => {

  const context = useContext(DataContext);
  const users = context.accounts;

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