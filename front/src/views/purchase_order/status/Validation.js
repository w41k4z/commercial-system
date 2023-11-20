import React, { useState } from 'react'
import '../../../assets/purchase_order/css/Billing-Table-with-Add-Row--Fixed-Header-Feature.css'
import Details from './Details'

const Validation = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const seeDetails = (id_purchase_order) => {
    openModal()
  }
  return (
    <div id="form-content" className="multisteps-form__content shadow p-4 rounded bg-white">
      <Details isOpen={modalIsOpen} onRequestClose={closeModal} />
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
                  <tr>
                    <td>REF202311-10-02</td>
                    <td>
                      <button
                        style={{ display: 'block', backgroundColor: '#8d8080' }}
                        className="m-auto text-light btn"
                        onClick={seeDetails}
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
                  <tr>
                    <td>REF202311-10-05</td>
                    <td>
                      <button
                        style={{ display: 'block', backgroundColor: '#8d8080' }}
                        className="m-auto text-light btn"
                        onClick={seeDetails}
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
