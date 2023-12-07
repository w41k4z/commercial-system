import React, { useEffect, useState } from 'react'
import '../../../assets/purchase_order/css/Billing-Table-with-Add-Row--Fixed-Header-Feature.css'
import Details from './Details'

const Validation = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [purchase_orders, setPurchaseOrders] = useState([])

  useEffect(() => {
    if (isLoad === false) {
      fetch('http://localhost:5034/api/purchase_order')
        .then((response) => response.json())
        .then((data) => {
          setIsLoad(true)
          setPurchaseOrders(data)
        })
        .catch((error) => {
          alert(error)
        })
    }
  })

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const [purchase_order, setPurchaseOrder] = useState(NaN)
  const [purchase_order_details, setPurchaseOrderDetails] = useState([])
  const seeDetails = (id_purchase_order) => {
    fetch('http://localhost:5034/api/purchase_order/' + id_purchase_order)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseOrder(data)
      })
      .catch((error) => {
        alert(error)
      })
    fetch('http://localhost:5034/api/purchase_order_details/' + id_purchase_order)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseOrderDetails(data)
      })
      .catch((error) => {
        alert(error)
      })
    openModal()
  }
  return (
    <div id="form-content" className="multisteps-form__content shadow p-4 rounded bg-white">
      <Details
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        purchase_order={purchase_order}
        purchase_order_details={purchase_order_details}
      />
      <div id="input-grp-double" className="card shadow-sm mb-2 db-graph">
        <div className="card-header p-2">
          <h6 className="text-white m-0 font-md">Validation de bon de commande</h6>
        </div>
        <div className="card-body">
          <div className="box-bg">
            <div className="col-12 col-md-11 m-auto">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>
                      <strong>Référence</strong>
                    </th>
                    <th>
                      <strong>Details</strong>
                    </th>
                    <th>
                      <strong>Valider</strong>
                    </th>
                    <th>
                      <strong>Envoyer</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchase_orders.map((purchase_order, index) => {
                    return (
                      <tr key={index}>
                        <td>{purchase_order.reference}</td>
                        <td>
                          <button
                            style={{ display: 'block', backgroundColor: '#8d8080' }}
                            className="m-auto text-light btn"
                            onClick={() => seeDetails(purchase_order.id)}
                          >
                            See
                          </button>
                        </td>
                        <td>
                          <button
                            style={{ display: 'block', backgroundColor: '#79b320' }}
                            className="m-auto text-light btn"
                          >
                            Valider
                          </button>
                        </td>
                        <td>
                          <button
                            style={{ display: 'block', backgroundColor: 'green' }}
                            className="m-auto text-light btn"
                          >
                            Envoyer
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Validation
