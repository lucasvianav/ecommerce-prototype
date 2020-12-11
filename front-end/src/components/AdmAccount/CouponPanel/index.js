import React, {useContext, useState, useEffect} from 'react';

import { DataContext } from '../../../Context';
import ModalCoupon from './Modal';

import '../../css/bootstrap.css';

const CouponPanel = (props) => {

  const context = useContext(DataContext);
  const allCoupons = context.coupons;
  const [coupons, setCoupons] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({});


  useEffect( () => {
    var d = [], flag = 0;
    const filters = (typeof props.filter !== "undefined") ? props.filter : [];
    if(filters.length > 0){
      allCoupons.forEach((item, index) => {
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
      setCoupons(d);
      console.log(filters);
      console.log(d);
    }else{
      setCoupons(allCoupons);
    }
  }, [props])

  return(
    <>
      <section>
          <table className="table table-hover border rounded">
              <thead>
                <tr>
                  <th scope="col"><span>Código</span></th>
                  <th scope="col"><span>Tipo</span></th>
                  <th scope="col"><span>Valor</span></th>
                  <th className="text-right">
                    <button type="button" className="btn-none" onClick={()=>{setModal(true)}}>
                        <i class="fas fa-plus"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) =>{

                  return (
                    <tr id={"coupon"+index} key={index}>
                        <td><span>{coupon.str}</span></td>
                        <td><span>{(coupon.type === "percentage") ? "Porcentagem" : "Valor cheio"}</span></td>
                        <td><span>{coupon.discount}</span></td>
                        <td className="text-right">
                            <button type="button" className="btn-none">
                                <i class="fas fa-pen"></i>
                            </button>
                            <button type="button" className="btn-none">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
      </section>
      <ModalCoupon
        show={modal}
        value = {{set: false, new: ''}}

        onHide={() => {setModal(false)}}
      />
    </>
  );
}

export default CouponPanel;