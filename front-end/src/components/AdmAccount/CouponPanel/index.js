import React, {useContext, useState, useEffect} from 'react';

import { DataContext } from '../../../Context';
import ModalCoupon from './Modal';

import CouponsRequests from '../../../requests/Coupons';

import '../../css/bootstrap.css';

const CouponPanel = (props) => {

  const context = useContext(DataContext);
  const allCoupons = context.coupons;
  const [coupons, setCoupons] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({id:"", str: "", type: "", discount: 0});
  const [modalType, setModalType] = useState("");

  const [req, setReq] = useState({});

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
    }else{
      setCoupons(allCoupons);
    }
  }, [props])

  const excluiCupon = (id) => {
    if(window.confirm('O produto não poderá ser recuperado. Você tem certeza que deseja excluí-lo?')){
      var r = {};
      r.send = "del";
      r.id = id;
      setReq(r);
    }
  }

  return(
    <>
      <section>
        <CouponsRequests.InsertCoupon {...req} onChange={()=>{setReq({})}}/>
        <CouponsRequests.EditCoupon {...req} onChange={()=>{setReq({})}}/>
        <CouponsRequests.DeleteCoupon {...req} onChange={()=>{setReq({})}}/>
          <table className="table table-hover border rounded">
              <thead>
                <tr>
                  <th scope="col"><span>Código</span></th>
                  <th scope="col"><span>Tipo</span></th>
                  <th scope="col"><span>Valor</span></th>
                  <th className="text-right">
                    <button type="button" className="btn-none" 
                      onClick={()=>{
                        setModalProps({id:"", str: "", type: "", discount: 0});
                        setModalType("create");
                        setModal(true);
                      }}>
                        <i className="fas fa-plus grey"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(coupons !== undefined) ? coupons.map((coupon, index) =>{
                  if(coupon.id !== "" && coupon.id !== undefined)
                    return (
                      <tr id={"coupon"+index} key={index}>
                          <td><span>{coupon.str}</span></td>
                          <td><span>{(coupon.type === "percentage") ? "Porcentagem" : "Valor absoluto"}</span></td>
                          <td><span>{coupon.discount}</span></td>
                          <td className="text-right">
                              <button type="button" className="btn-none" 
                                onClick={(e)=>{
                                  setModalProps({
                                    id: coupon.id, 
                                    str: coupon.str, 
                                    type: coupon.type, 
                                    discount: coupon.discount
                                  });
                                  setModalType("update");
                                  setModal(true);
                                }}>
                                  <i className="fas fa-pen grey"></i>
                              </button>
                              <button type="button" className="btn-none"
                                onClick={(e)=>{
                                  excluiCupon(coupon.id)
                                }}
                              >
                                  <i className="fas fa-trash grey"></i>
                              </button>
                          </td>
                      </tr>
                    );
                  else
                    return("");
                }) : ""}
              </tbody>
          </table>
      </section>
      <ModalCoupon
        show={modal}
        type={modalType}
        value = {modalProps}
        onSave={(event) => {
          if(event.set === true){
            var r = {};
            r.send = event.send;
            r.id = event.id;
            r.data = event.data;
            setReq(r);
          }
        }}
        onHide={() => {setModal(false)}}
      />
    </>
  );
}

export default CouponPanel;