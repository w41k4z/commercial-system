import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../../../assets/purchase_order/css/Details.css'
import Modal from 'react-modal'
import PurchaseOrder_conf from '../conf/Dict'
Modal.setAppElement('#root')
const Details = (props) => {
  const { isOpen, onRequestClose, purchase_order, purchase_order_details } = props
  const primaryColor = {
    color: 'rgb(78, 166, 175)',
  }
  const hrStyle = {
    color: 'green',
    borderColor: 'green',
    borderRadius: '12pt',
    border: 'solid',
    borderStyle: 'double',
    opacity: '100%',
  }
  const textRight = {
    textAlign: 'right',
  }
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-40%, -10%)',
    },
  }
  const handleOpen = () => {
    var modalElements = document.querySelector(
      '.ReactModal__Overlay.ReactModal__Overlay--after-open',
    )
    modalElements.style.position = 'absolute'
    modalElements.style.backgroundColor = 'rgba(0, 0, 0, .8)'
    modalElements.style.height = '2000px'
    // ReactModal__Content ReactModal__Content--after-open
    var modalContent = document.querySelector(
      '.ReactModal__Content.ReactModal__Content--after-open',
    )
    modalContent.style.width = '70%'
    modalContent.style.transform = 'translate(-40%, -90%)'
  }
  // Real content
  const [company, setCompany] = useState()
  useEffect(() => {
    fetch('http://localhost:5034/api/company')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCompany(data)
      })
  }, [purchase_order, purchase_order_details])
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Details"
    >
      <div>
        <div className="container shadow p-4 rounded bg-white">
          <button
            className="btn btn-primary"
            onClick={handleOpen}
            style={{
              position: 'fixed',
            }}
          >
            voir
          </button>
          <h1 style={{ ...primaryColor }} className="text-center">
            Bon de commande
          </h1>
          <hr style={{ ...hrStyle }} />
          <div className="row">
            <div className="col-4 offset-2">
              <h5>Mon Entreprise</h5>
              <label>adresse : 22 avenue Lapa</label>
              <br />
              <label>e-mail : joeizn@gmail.com</label>
              <br />
              <label>tel : +261 33 45 567 09</label>
              <br />
            </div>
            {purchase_order.idSupplierNavigation && (
              <div className="col-6">
                <h5>Fournisseur : {purchase_order.idSupplierNavigation.name}</h5>
                <label>adresse : {purchase_order.idSupplierNavigation.address}</label>
                <br />
                <label>e-mail : {purchase_order.idSupplierNavigation.email}</label>
                <br />
                <label>tel : {purchase_order.idSupplierNavigation.phoneNumber}</label>
                <br />
              </div>
            )}
          </div>
          <hr style={{ ...hrStyle }} />
          <div className="row container">
            <table className="col-8 m-auto" id="first-table">
              <thead>
                <tr>
                  <td>Date</td>
                  <td>
                    <label>{purchase_order.dateSend}</label>
                  </td>
                </tr>
                <tr>
                  <td>Bon de commande n ~</td>
                  <td>
                    <label>{purchase_order.reference}</label>
                  </td>
                </tr>
                <tr>
                  <td>Emis par </td>
                  <td>
                    <label>...</label>
                  </td>
                </tr>
                <tr>
                  <td>Payement </td>
                  <td>
                    <label>{PurchaseOrder_conf[purchase_order.payment]}</label>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <hr style={{ ...hrStyle }} />
          <div className="row container">
            <table className="table table-bordered table-sm">
              <thead className="text-dark font-md">
                <tr className="text-dark-blue">
                  <th className="w-10x">Articles</th>
                  <th className="w-10x">Qte</th>
                  <th className="w-10x">Date</th>
                  <th className="w-10x">Prix HT</th>
                  <th className="w-10x">TVA</th>
                </tr>
              </thead>
              <tbody>
                {purchase_order_details.map((purchase_order_detail, index) => {
                  return (
                    <tr key={index}>
                      <td className="w-10x">
                        {purchase_order_detail.idArticleNavigation.name}
                        {'      '}
                        {purchase_order_detail.idArticleNavigation.unit}
                      </td>
                      <td className="w-10x number">{purchase_order_detail.quantity}</td>
                      <td className="w-10x number">{purchase_order_detail.dateNeed}</td>
                      <td className="w-10x number">{purchase_order_detail.salePrice} Ar</td>
                      <td className="w-10x number">{purchase_order_detail.vat}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan={3} rowSpan={4}></td>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total HT
                  </th>
                  <td className="w-10x number">{purchase_order.sumHt} Ar</td>
                </tr>
                <tr>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total TVA
                  </th>
                  <td className="w-10x number">{purchase_order.sumVat} Ar</td>
                </tr>
                <tr>
                  <th className="w-10x number" style={{ ...textRight }}>
                    Frais livraison
                  </th>
                  <td className="w-10x number">{purchase_order.parcelCharges} Ar</td>
                </tr>
                <tr>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total TTC
                  </th>
                  <td className="w-10x number">{purchase_order.sumTtc} Ar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style={{ ...hrStyle }} />
          <div className="row container">
            <table className="col-4 m-auto text-center">
              <tr>
                <th colSpan={2} className="text-center">
                  Signature
                </th>
              </tr>
              <tr>
                <td>Finance</td>
                <td>DAF</td>
              </tr>
              <tr>
                <td>................</td>
                <td>................</td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <br />
      </div>
      <button className="btn btn-danger text-white" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  )
}
Details.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  purchase_order: PropTypes.any,
  purchase_order_details: PropTypes.array,
}
export default Details
