import React, { useEffect, useState } from 'react'
import NewArticle from './NewArticle'
import PropTypes from 'prop-types'
import '../../assets/purchase_order/css/Multi-step-form.css'
import '../../assets/purchase_order/css/Billing-Table-with-Add-Row--Fixed-Header-Feature.css'
import '../../assets/purchase_order/fonts/font-awesome.min.css'
import { handleValueNumberFormat } from '../NumberFormatter'
import { Preview, print } from 'react-html2pdf'

const DeliveryReceipt = (props) => {
  const [total_HT, setTotalHT] = useState()
  const [newArticles, setArticles] = useState([])
  const update_HT = () => {
    var total_HT = 0
    var allLine = document.getElementsByClassName('article-line')
    for (let i = 0; i < allLine.length; i++) {
      let line = allLine[i]
      var Qte = parseFloat(line.getElementsByClassName('form-control')[2].value.replace(',', ''))
      var HT = parseFloat(line.getElementsByClassName('form-control')[4].value.replace(',', ''))
      if (isNaN(Qte) || isNaN(HT)) continue
      total_HT += Qte * HT
    }
    setTotalHT(handleValueNumberFormat(total_HT.toString()))
  }
  useEffect(() => {
    if (newArticles.length > 1) {
      update_HT()
    }
  }, [newArticles])

  const [articles, setArticlesData] = useState([])
  useEffect(() => {
    fetch('http://localhost:5034/api/purchase_order/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticlesData(data)
      })
  }, [newArticles])

  const addRow = () => {
    setArticles([
      ...newArticles,
      <>
        <NewArticle articles={articles} />
      </>,
    ])
  }
  const removeRow = () => {
    const updateNewArticles = [...newArticles]
    updateNewArticles.splice(-1)
    setArticles(updateNewArticles)
  }
  const redefinedPrint = (pdfName, idContent, temporaryFontSize) => {
    const idPdfContainer = 'pdf-preview'
    const element = document.getElementById(idContent)
    const pdfContainer = document.getElementById(idPdfContainer)
    const originalFontSize = window.getComputedStyle(element).fontSize
    element.style.fontSize = temporaryFontSize
    pdfContainer.innerHTML = ''
    pdfContainer.appendChild(element.cloneNode(true)) // Use cloneNode to avoid moving the original element
    element.style.fontSize = originalFontSize
    print(pdfName, idPdfContainer)
  }
  const HidePrice = () => {
    var to_hiddens = document.getElementsByClassName('hiddenColumns')
    var to_hiddens_array = Array.from(to_hiddens)
    // Alternatively, you can use the spread operator
    // var to_hiddens_array = [...to_hiddens]
    var button = document.getElementById('my-hidden-button')
    if (button.innerHTML.includes('Hide price')) {
      to_hiddens_array.forEach((to_hidden) => {
        to_hidden.style.visibility = 'hidden'
      })
      button.innerHTML = 'Show price'
      console.log(button)
    } else {
      to_hiddens_array.forEach((to_hidden) => {
        to_hidden.style.visibility = 'visible'
      })
      button.innerHTML = 'Hide price'
    }
  }

  return (
    <>
      <Preview id="pdf-preview"></Preview>
      <div className="container" id="print_pdf">
        <div id="form-content-1" className="multisteps-form__content" style={{ padding: '2%' }}>
          <div className="col">
            <div className="card shadow-sm mb-2 db-graph" id="to_pdf">
              <div className="card-header p-2 row">
                <h2 className="text-white m-0 font-md text-center">BON DE RECEPTION</h2>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-12 col-xl-12">
                      <div className="box-bg">
                        <div className="row col-12 m-2">
                          <div className="box-bg col-4 offset-1">
                            <span className="col-6">Bon de livraison</span>
                            <span className="form-group col-6">
                              <input
                                className="form-control form-control-sm font-sm"
                                type="text"
                                placeholder="Copier la référence"
                              />
                            </span>
                          </div>
                          <div className="box-bg col-5 offset-1">
                            Addresse de livraison
                            <br />
                            <span>Magsin demo piscine</span>
                          </div>
                        </div>
                        <div className="table-responsive tbl-wfx mt-1 kot-table">
                          <table className="table table-sm">
                            <thead className="text-dark font-md">
                              <tr className="text-dark-blue">
                                <th className="text-center w-3x">
                                  <strong>#</strong>
                                </th>
                                <th className="w-10x">
                                  <strong>Articles</strong>
                                </th>
                                <th className="w-10x">
                                  <strong>Desc.</strong>
                                </th>
                                <th className="w-10x">
                                  <strong>Qté</strong>
                                </th>
                                <th className="w-10x">
                                  <strong>U</strong>
                                </th>
                                <th className="w-10x hiddenColumns">
                                  <strong>PU achat HT</strong>
                                </th>
                                <th className="w-10x hiddenColumns">
                                  <strong>Total HT</strong>
                                </th>
                              </tr>
                            </thead>
                            {/* <tbody className="h-15x"> */}
                            <tbody>
                              {newArticles.map((newArticle, index) => newArticle)}
                              <tr>
                                <td colSpan={4}></td>
                                <th className="w-10x hiddenColumns">
                                  <strong>Total HT</strong>
                                </th>
                                <td>
                                  <div className="mb-1 form-group">
                                    <input
                                      className="number-input form-control form-control-sm font-sm hiddenColumns"
                                      type="text"
                                      disabled
                                      style={{ textAlign: 'right' }}
                                      value={total_HT}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-2 offset-1 align-self-center">
          <button
            className="btn btn-info btn-sm d-block add-row btn-xs w-100"
            type="button"
            style={{ backgroundColor: 'green' }}
            onClick={addRow}
          >
            <i className="fa fa-plus"></i>
            <strong>&nbsp;Ajouter</strong>
          </button>
        </div>
        <div className="col-1 align-self-center">
          <button
            className="btn btn-danger btn-sm d-block delete-row btn-xs w-100"
            type="button"
            onClick={removeRow}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
        <div className="col-2 offset-5 align-self-center">
          <button
            className="btn btn-info btn-sm d-block add-row btn-xs w-100"
            type="button"
            style={{ backgroundColor: '#00027c' }}
            onClick={HidePrice}
          >
            <i className="fas fa-eye"></i>
            <strong id="my-hidden-button">&nbsp;Hide price</strong>
          </button>
        </div>
        <div className="col-2 offset-9 text-end">
          <a
            className="btn btn-info btn-sm d-block mt-3 mb-1 btn-smd w-100"
            role="button"
            id="inv_btn-1"
            href="#/delivery_receipt/Generate"
            onClick={() => redefinedPrint('Bond-de-reception', 'print_pdf', '10pt')}
          >
            <i className="fa fa-print"></i>
            <strong>&nbsp;Print Invoice</strong>
            <br />
          </a>
        </div>
      </div>
    </>
  )
}
DeliveryReceipt.propTypes = {
  setParcelCharges_Props: PropTypes.func.isRequired,
  setDiscount_Props: PropTypes.func.isRequired,
  setPayment_Props: PropTypes.func.isRequired,
  total_HT: PropTypes.number,
  setTotalHT: PropTypes.func.isRequired,
  total_TVA: PropTypes.number,
  setTotalTVA: PropTypes.func.isRequired,
  total_TTC: PropTypes.number,
  setTotalTTC: PropTypes.func.isRequired,
}
export default DeliveryReceipt
