import React, { useEffect, useState } from 'react'
import NewArticle from './NewArticle'
import PropTypes from 'prop-types'
import { handleValueNumberFormat, handleInputNumberFormat } from '../NumberFormatter'

const SecondForm = (props) => {
  const {
    setParcelCharges_Props,
    setDiscount_Props,
    setPayment_Props,
    total_HT,
    setTotalHT,
    total_TVA,
    setTotalTVA,
    total_TTC,
    setTotalTTC,
  } = props
  const [newArticles, setArticles] = useState([])
  const update_HT_TVA_TTC = () => {
    var total_HT = 0
    var total_TVA = 0
    var total_TTC = 0
    var allLine = document.getElementsByClassName('article-line')
    for (let i = 0; i < allLine.length; i++) {
      let line = allLine[i]
      var Qte = parseFloat(line.getElementsByClassName('form-control')[2].value.replace(',', ''))
      var HT = parseFloat(line.getElementsByClassName('form-control')[4].value.replace(',', ''))
      var TVA = parseFloat(line.getElementsByClassName('form-control')[5].value.replace(',', ''))
      if (isNaN(Qte) || isNaN(HT) || isNaN(TVA)) continue
      total_HT += Qte * HT
      total_TVA += (Qte * HT * TVA) / 100
      total_TTC += total_HT + total_TVA
    }
    setTotalHT(handleValueNumberFormat(total_HT.toString()))
    setTotalTVA(handleValueNumberFormat(total_TVA.toString()))
    setTotalTTC(handleValueNumberFormat(total_TTC.toString()))
  }
  useEffect(() => {
    if (newArticles.length > 1) {
      update_HT_TVA_TTC()
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
  return (
    <div id="form-content-1" className="multisteps-form__content">
      <div className="col">
        <div className="card shadow-sm mb-2 db-graph">
          <div className="card-header p-2">
            <h6 className="text-white m-0 font-md">Ajouter les articless selon les besoins</h6>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-9 col-xl-9">
                  <div className="box-bg">
                    <div className="row">
                      <div className="col-md-2 col-xl-2 align-self-center font-md text-dark-blue">
                        <label className="col-form-label p-0" htmlFor="table-no">
                          <strong>Devise.:</strong>
                          <br />
                        </label>
                      </div>
                      <div className="col-md-4 col-xl-3">
                        <div className="mb-0 form-group">
                          <select className="form-select form-select-sm font-sm">
                            <option value="1">-- Choisir devise --</option>
                            <option value="1">Ar</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-2 col-xl-2 offset-md-3 offset-xl-4 align-self-center">
                        <button
                          className="btn btn-info btn-sm d-block add-row btn-xs w-100"
                          type="button"
                          onClick={addRow}
                        >
                          <i className="fa fa-plus"></i>
                          <strong>&nbsp;Ajouter</strong>
                        </button>
                      </div>
                      <div className="col-md-1 col-xl-1 align-self-center">
                        <button
                          className="btn btn-danger btn-sm d-block delete-row btn-xs w-100"
                          type="button"
                          onClick={removeRow}
                        >
                          <i className="fa fa-trash-o"></i>
                        </button>
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
                              <strong>Qte</strong>
                            </th>
                            <th className="w-10x">
                              <strong>Date</strong>
                            </th>
                            <th className="w-10x">
                              <strong>Prix HT</strong>
                            </th>
                            <th className="w-10x">
                              <strong>TVA</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="h-15x">
                          {newArticles.map((newArticle, index) => newArticle)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-xl-3">
                  <div className="box-bg">
                    <div className="row text-dark">
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Total HT :</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <input
                            className="number-input form-control form-control-sm font-sm"
                            type="text"
                            disabled
                            value={total_HT}
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Total TVA :</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <input
                            className="number-input form-control form-control-sm font-sm"
                            type="text"
                            disabled
                            value={total_TVA}
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Total TTC :</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <input
                            className="number-input form-control form-control-sm font-sm"
                            type="text"
                            disabled
                            value={total_TTC}
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Frais livraison:</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <input
                            className="form-control form-control-sm font-sm"
                            type="text"
                            name="parcel_charges"
                            onChange={(e) => {
                              setParcelCharges_Props(e.target.value)
                              handleInputNumberFormat(e)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Remise (%) :</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <input
                            className="form-control form-control-sm font-sm"
                            type="text"
                            name="discount"
                            onChange={(e) => {
                              setDiscount_Props(e.target.value)
                              handleInputNumberFormat(e)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 offset-xl-0 align-self-center">
                        <h6 className="mb-0 font-sm">Payement :</h6>
                      </div>
                      <div className="col-xl-7 offset-xl-0 text-end align-self-center">
                        <div className="mb-1 form-group">
                          <select
                            className="form-select form-select-sm font-sm"
                            onChange={(e) => {
                              setPayment_Props(e.target.value)
                            }}
                          >
                            <optgroup label="Mode payement">
                              <option selected="">-- choose --</option>
                              <option value="10">Cash</option>
                              <option value="20">Chèque</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12 offset-xl-0 text-end">
                        <a
                          className="btn btn-info btn-sm d-block mt-3 mb-1 btn-smd w-100"
                          role="button"
                          id="inv_btn-1"
                          href="#/purchase_order/new"
                        >
                          <i className="fa fa-print"></i>
                          <strong>&nbsp;Print Invoice</strong>
                          <br />
                        </a>
                      </div>
                      <div className="col-xl-12 offset-xl-0 text-end">
                        <button
                          className="btn btn-danger btn-sm d-block mt-3 mb-1 btn-smd w-100"
                          type="reset"
                        >
                          <i className="fa fa-remove"></i>
                          <strong style={{ color: 'white' }}>&nbsp;Cancel</strong>
                          <br />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
SecondForm.propTypes = {
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
export default SecondForm
