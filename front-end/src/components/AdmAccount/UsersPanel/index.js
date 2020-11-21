import React, {useContext, useState} from 'react';

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
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tipo</th>
                  <th className="text-right"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) =>{

                  return (
                    <tr id={"user"+index} key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.accountType}</td>
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