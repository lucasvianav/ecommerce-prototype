import React, {useContext, useState} from 'react';

import { DataContext } from '../../../Context';

import FilterDiv from '../FilterDiv';

import './index.css';
import '../../css/bootstrap.css';

const UsersPanel = (props) => {

  const context = useContext(DataContext);
  const users = context.accounts;

  const [filter, setFilter] = useState("none");

  const seletores = [{
                      title: "Tipo de Usuários",
                      data: ["Cliente", "Administrador"]
                    }]

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
                        <td className="text-right"><i className="fas fa-eye"></i></td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
      </section>
      <nav aria-label="Page navigation" className=" d-flex justify-content-center">
          <ul className="pagination">
          <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              </a>
          </li>
          </ul>
      </nav>
    </>
  );
}

export default UsersPanel;