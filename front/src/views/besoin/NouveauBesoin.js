import React, { useState, useEffect } from 'react'
import Axios from '../../http-client-side/Axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

const NouveauBesoin = () => {
  // HOOKS
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetchArticles()
  }, [])
  const [rows, setRows] = useState([{ id: 0, articleId: -1, quantity: 0, motif: '' }])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newDepartmentNeed, setNewDepartmentNeed] = useState({})

  // Method
  const fetchArticles = async () => {
    await Axios.get('/api/articles')
      .then((res) => {
        // console.log(res.data)
        setArticles(res.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const addnewline = () => {
    console.log('add new line')
    const newRow = {
      id: currentIndex + 1,
      articleId: -1,
      quantity: 0,
      motif: '',
    }
    setRows([...rows, newRow])
    setCurrentIndex(currentIndex + 1)
  }

  const updateLine = (index, articleId, quantity, motif) => {
    console.log('update line ' + index)
    const newRow = { id: index, articleId, quantity, motif }
    const newRows = rows.map((row) => (row.id === index ? newRow : row))
    setRows(newRows)
  }

  const deleteLine = (id) => {
    const newRows = rows.filter((row) => row.id !== id)
    setRows(newRows)
  }

  // const submitNewDepartmentNeed = async (e) => {

  // }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouveau Besoin</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Date de creation
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="date"
                    id="datedecreation"
                    onChange={(e) => {
                      setNewDepartmentNeed({ ...newDepartmentNeed, dateCreation: e.target.value })
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Date de besoin
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="date"
                    id="datedebesoin"
                    onChange={(e) => {
                      setNewDepartmentNeed({ ...newDepartmentNeed, dateBesoin: e.target.value })
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="articles" className="col-sm-2 col-form-label">
                  Articles
                </CFormLabel>
                <CCol sm={10}>
                  <CButton color={'success'} onClick={addnewline}>
                    Ajouter
                  </CButton>
                </CCol>
              </CRow>
              {rows.map((row, index) => (
                <div key={index}>
                  <CRow className="mb-3">
                    <CCol></CCol>
                    <CCol sm={3}>
                      <CFormLabel htmlFor="nomarticle">Article</CFormLabel>
                      <CFormSelect
                        id="inputState"
                        onChange={(e) => {
                          updateLine(row.id, e.target.value, row.quantity, row.motif)
                        }}
                      >
                        <option>Choose</option>
                        {articles.map((article) => {
                          return (
                            <option key={article.id} value={article.id}>
                              {article.name}
                            </option>
                          )
                        })}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="quantitearticle">Quantite</CFormLabel>
                      <CFormInput
                        type="number"
                        id="quantitearticle"
                        value={row.quantity}
                        onChange={(e) => {
                          updateLine(row.id, row.articleId, e.target.value, row.motif)
                        }}
                      />
                    </CCol>
                    <CCol sm={5}>
                      <CFormLabel htmlFor="motif">Motif</CFormLabel>
                      <CFormTextarea
                        id="motif"
                        rows={2}
                        value={row.motif}
                        onChange={(e) => {
                          updateLine(row.id, row.articleId, row.quantity, e.target.value)
                        }}
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel>Action</CFormLabel>
                      <CButton color={'danger'} onClick={() => deleteLine(row.id)}>
                        Delete
                      </CButton>
                    </CCol>
                  </CRow>
                </div>
              ))}
              <CButton type="submit">Valider</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NouveauBesoin
