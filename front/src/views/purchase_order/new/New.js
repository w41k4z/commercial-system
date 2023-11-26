import React, { useState } from 'react'
import { CRow } from '@coreui/react'
import '../../../assets/purchase_order/css/Multi-step-form.css'
import '../../../assets/purchase_order/css/Billing-Table-with-Add-Row--Fixed-Header-Feature.css'
import '../../../assets/purchase_order/fonts/font-awesome.min.css'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import Axios from 'src/http-client-side/Axios'

const NewPurchaseOrder = () => {
  const [total_HT, setTotalHT] = useState(0)
  const [total_TVA, setTotalTVA] = useState(0)
  const [total_TTC, setTotalTTC] = useState(0)
  const [date_send, setDate_send] = useState()
  const updateDate_Send = (date) => {
    setDate_send(date)
  }
  const [reference, setReference] = useState()
  const updateReference = (ref) => {
    setReference(ref)
  }
  const [id_supplier, setIdSupplier] = useState()
  const updateIdSupplier = (id_supplier) => {
    setIdSupplier(id_supplier)
  }
  const [parcel_charges, setParcelCharges] = useState()
  const updateParcelCharges = (parcel_charges) => {
    setParcelCharges(parcel_charges)
  }
  const [discount, setDiscount] = useState()
  const updateDiscount = (discount) => {
    setDiscount(discount)
  }
  const [payment, setPayment] = useState()
  const updatePayment = (payment) => {
    setPayment(payment)
  }
  const CreatePurchaseOrder = async (event) => {
    event.preventDefault()
    var all_Purchase_Order_Details = CheckBuild_Articles_Purchase_Order_Details()
    var purchaseOrderRequest = {
      PurchaseOrder: {
        DateSend: date_send,
        IdSupplier: id_supplier,
        SumHt: parseFloat(total_HT.replace(',', '')),
        SumVat: parseFloat(total_TVA.replace(',', '')),
        SumTtc: parseFloat(total_TTC.replace(',', '')),
        ParcelCharges: parseFloat(parcel_charges.replace(',', '')),
        Discount: parseFloat(discount.replace(',', '')),
        Payment: payment,
        IdSupplierNavigation: null,
      },
      PurchaseOrderDetails: all_Purchase_Order_Details,
    }
    await Axios.post('/api/purchase_order/save', purchaseOrderRequest)
      .then((res) => {})
      .catch((error) => {
        alert(error)
      })
  }
  const CheckBuild_Articles_Purchase_Order_Details = () => {
    var all = []
    var allLine = document.getElementsByClassName('article-line')
    for (let i = 0; i < allLine.length - 1; i++) {
      let line = allLine[i]
      var id_article = parseInt(
        line.getElementsByClassName('form-control')[0].value.replace(',', ''),
      )
      var description = line.getElementsByClassName('form-control')[1].value
      var Qte = parseFloat(line.getElementsByClassName('form-control')[2].value.replace(',', ''))
      var date_need = line.getElementsByClassName('form-control')[3].value.replace(',', '')
      var HT = parseFloat(line.getElementsByClassName('form-control')[4].value.replace(',', ''))
      var TVA = parseFloat(line.getElementsByClassName('form-control')[5].value.replace(',', ''))
      all.push({
        IdArticle: id_article,
        Quantity: Qte,
        DateNeed: date_need,
        Status: 0,
        SalePrice: HT,
        Vat: TVA,
        Description: description,
        IdArticleNavigation: null,
        IdPurchaseOrderNavigation: null,
      })
    }
    return all
  }
  const DOMstrings = () => {
    return {
      stepsBtnClass: 'multisteps-form__progress-btn',
      stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
      stepsBar: document.querySelector('.multisteps-form__progress'),
      stepsForm: document.querySelector('.multisteps-form__form'),
      stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
      stepFormPanelClass: 'multisteps-form__panel',
      stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
      stepPrevBtnClass: 'js-btn-prev',
      stepNextBtnClass: 'js-btn-next',
      stepSubmitBtnClass: 'js-btn-submit',
    }
  }
  const removeClasses = (elemSet, className) => {
    elemSet.forEach((elem) => {
      elem.classList.remove(className)
    })
  }
  const setActivePanel = (activePanelNum) => {
    removeClasses(DOMstrings().stepFormPanels, 'js-active')

    DOMstrings().stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
        elem.classList.add('js-active')

        setFormHeight(elem)
      }
    })
  }

  const formHeight = (activePanel) => {
    const activePanelHeight = activePanel.offsetHeight

    DOMstrings().stepsForm.style.height = `${activePanelHeight}px`
  }

  const setFormHeight = () => {
    const activePanel = getActivePanel()

    formHeight(activePanel)
  }

  const getActivePanel = () => {
    let activePanel

    DOMstrings().stepFormPanels.forEach((elem) => {
      if (elem.classList.contains('js-active')) {
        activePanel = elem
      }
    })

    return activePanel
  }

  //return exect parent node of the element
  const findParent = (elem, parentClass) => {
    let currentNode = elem
    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode
    }
    return currentNode
  }

  const getActiveStep = (elem) => {
    return Array.from(DOMstrings().stepsBtns).indexOf(elem)
  }

  const setActiveStep = (activeStepNum) => {
    //remove active state from all the state
    removeClasses(DOMstrings().stepsBtns, 'js-active')

    //set picked items to active
    DOMstrings().stepsBtns.forEach((elem, index) => {
      if (index <= activeStepNum) {
        elem.classList.add('js-active')
      }
    })
  }

  const Tree = (e) => {
    const eventTarget = e.target

    if (!eventTarget.classList.contains(`${DOMstrings().stepsBtnClass}`)) {
      return
    }
    const activeStep = getActiveStep(eventTarget)

    setActiveStep(activeStep)

    setActivePanel(activeStep)
  }
  const Btn_Prev_Next = (e) => {
    const eventTarget = e.target
    // if (DOMstrings === null) setDom()

    if (
      !(
        eventTarget.classList.contains(`${DOMstrings().stepPrevBtnClass}`) ||
        eventTarget.classList.contains(`${DOMstrings().stepNextBtnClass}`)
      )
    ) {
      return
    }
    const activePanel = findParent(eventTarget, `${DOMstrings().stepFormPanelClass}`)

    let activePanelNum = Array.from(DOMstrings().stepFormPanels).indexOf(activePanel)

    if (eventTarget.classList.contains(`${DOMstrings().stepPrevBtnClass}`)) {
      activePanelNum--
    } else {
      activePanelNum++
    }
    setActiveStep(activePanelNum)
    setActivePanel(activePanelNum)
  }
  return (
    <CRow>
      <div
        id="multple-step-form-n"
        className="container overflow-hidden"
        style={{
          marginTop: '0px',
          marginBottom: '10px',
          paddingBottom: '300px',
          paddingTop: '57px',
        }}
      >
        <div id="progress-bar-button" className="multisteps-form">
          <div className="row">
            <div className="col-12 ml-auto mr-auto mb-4">
              <div className="multisteps-form__progress">
                <a
                  className="btn multisteps-form__progress-btn js-active"
                  role="button"
                  title="User Info"
                  onClick={Tree}
                >
                  Details
                </a>
                <a
                  className="btn multisteps-form__progress-btn"
                  role="button"
                  title="User Info"
                  onClick={Tree}
                >
                  Articles
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="multistep-start-row" className="row">
          <div id="multistep-start-column" className="col-12 m-auto">
            <form id="main-form" className="multisteps-form__form">
              <div
                id="single-form-next"
                className="multisteps-form__panel shadow p-4 rounded bg-white js-active"
                data-animation="scaleIn"
              >
                <h3 className="text-center multisteps-form__title">Bon de commande</h3>
                <FirstForm
                  setDate_Send_Props={updateDate_Send}
                  setReference_Props={updateReference}
                  setIdSupplier_Props={updateIdSupplier}
                />
                <div id="next-button" className="button-row d-flex mt-4 offset-10">
                  <button
                    className="btn btn btn-primary ml-auto js-btn-next"
                    type="button"
                    title="Next"
                    onClick={Btn_Prev_Next}
                  >
                    Continuer
                  </button>
                </div>
              </div>
              <div
                id="single-form-next-prev"
                className="multisteps-form__panel shadow p-4 rounded bg-white"
                data-animation="scaleIn"
              >
                <h3 className="text-center multisteps-form__title">Articles</h3>
                <SecondForm
                  setParcelCharges_Props={updateParcelCharges}
                  setDiscount_Props={updateDiscount}
                  setPayment_Props={updatePayment}
                  total_HT={total_HT}
                  setTotalHT={setTotalHT}
                  total_TTC={total_TTC}
                  setTotalTTC={setTotalTTC}
                  total_TVA={total_TVA}
                  setTotalTVA={setTotalTVA}
                />
                <div id="next-prev-buttons-1" className="button-row offset-10 d-flex mt-4">
                  <button
                    className="btn btn btn-primary js-btn-prev offset-1"
                    type="button"
                    title="Prev"
                    onClick={Btn_Prev_Next}
                  >
                    Prev
                  </button>
                  <button
                    style={{ color: 'white' }}
                    className="btn btn btn-success ml-auto js-btn-submit offset-1"
                    type="button"
                    title="Next"
                    onClick={CreatePurchaseOrder}
                  >
                    Créer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CRow>
  )
}

export default NewPurchaseOrder
