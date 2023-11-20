import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import '../../../assets/purchase_order/css/Details.css'
import Modal from 'react-modal'
Modal.setAppElement('#root')
const Details = (props) => {
  const { isOpen, onRequestClose } = props
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
            <div className="col-6">
              <h5>Fournisseur</h5>
              <label>adresse : 22 avenue Lapa</label>
              <br />
              <label>e-mail : joeizn@gmail.com</label>
              <br />
              <label>tel : +261 33 45 567 09</label>
              <br />
            </div>
          </div>
          <hr style={{ ...hrStyle }} />
          <div className="row container">
            <table className="col-8 m-auto" id="first-table">
              <tr>
                <td>Date</td>
                <td>
                  <label>10-10-2023</label>
                </td>
              </tr>
              <tr>
                <td>Bon de commande n ~</td>
                <td>
                  <label>REF202310-09-92</label>
                </td>
              </tr>
              <tr>
                <td>Emis par </td>
                <td>
                  <label>...</label>
                </td>
              </tr>
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
                <tr>
                  <td className="w-10x">Cache bouche</td>
                  <td className="w-10x number">100</td>
                  <td className="w-10x">10-11-2023</td>
                  <td className="w-10x number">1 000 Ar</td>
                  <td className="w-10x number">20</td>
                </tr>
                <tr>
                  <td className="w-10x">Papier A4</td>
                  <td className="w-10x number">70</td>
                  <td className="w-10x">10-12-2023</td>
                  <td className="w-10x number">30 000 Ar</td>
                  <td className="w-10x number">20</td>
                </tr>
                <tr>
                  <td className="w-10x">Encre</td>
                  <td className="w-10x number">80</td>
                  <td className="w-10x">12-12-2023</td>
                  <td className="w-10x number">10 000 Ar</td>
                  <td className="w-10x number">20</td>
                </tr>
                <tr>
                  <td colSpan={3} rowSpan={4}></td>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total HT
                  </th>
                  <td className="w-10x number">241 000 Ar</td>
                </tr>
                <tr>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total TVA
                  </th>
                  <td className="w-10x number">48 200 Ar</td>
                </tr>
                <tr>
                  <th className="w-10x number" style={{ ...textRight }}>
                    Frais livraison
                  </th>
                  <td className="w-10x number">60 000 Ar</td>
                </tr>
                <tr>
                  <th className="w-10x" style={{ ...textRight }}>
                    Total TTC
                  </th>
                  <td className="w-10x number">108 200 Ar</td>
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
      <button className="btn btn-danger" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  )
}
Details.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}
export default Details
