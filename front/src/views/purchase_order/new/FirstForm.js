import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FirstForm = (props) => {
  const { setDate_Send_Props, setReference_Props, setIdSupplier_Props } = props
  const [ref, setRef] = useState('')
  const [date, setDate] = useState(new Date())
  const styleLabel = {
    color: '#448f22',
    display: 'block ruby',
  }
  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const GenerateRef = (e) => {
    const newRef = 'RE' + date + '-' + getRandomInt(10, 99).toString() + '-' + e.target.value
    setRef(newRef.replace('-', ''))
    setReference_Props(ref)
  }

  return (
    <div id="form-content" className="multisteps-form__content">
      <div id="input-grp-double" className="card shadow-sm mb-2 db-graph">
        <div className="card-header p-2">
          <h6 className="text-white m-0 font-md">Information globale</h6>
        </div>
        <div className="card-body">
          <div className="box-bg">
            <div className="col-12 col-md-5 m-auto">
              <div className="form-group mb-3">
                <strong style={styleLabel} className="form-label">
                  Référence
                </strong>
                <input
                  className="form-control multisteps-form__input"
                  value={ref}
                  name="ref"
                  disabled={true}
                />
              </div>
              <div className="form-group mb-3">
                <strong style={styleLabel} className="form-label">
                  Date d` envoie
                </strong>
                <input
                  className="form-control multisteps-form__input"
                  type="date"
                  name="date_send"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    setDate_Send_Props(e.target.value)
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <strong style={styleLabel} className="form-label">
                  Fournisseur
                </strong>
                <select
                  className="form-select multisteps-form__input"
                  type="text"
                  placeholder="House"
                  onChange={(e) => {
                    GenerateRef(e)
                    setIdSupplier_Props(e.target.value)
                  }}
                >
                  <option value="0">Fournisseur R~001</option>
                  <option value="1">Fournisseur R~002</option>
                  <option value="2">Fournisseur R~003</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
FirstForm.propTypes = {
  setDate_Send_Props: PropTypes.func.isRequired,
  setReference_Props: PropTypes.func.isRequired,
  setIdSupplier_Props: PropTypes.func.isRequired,
}
export default FirstForm
