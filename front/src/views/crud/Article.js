import React, { useEffect, useState } from 'react'
import Axios from '../../http-client-side/Axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

const Article = () => {
  // HOOKS
  const [articles, setArticles] = useState([])
  const [newArticle, setNewArticle] = useState({ name: '', unit: '' })
  useEffect(() => {
    fetchArticles()
  }, [articles])

  // Method
  const fetchArticles = async () => {
    await Axios.get('/api/articles')
      .then((res) => {
        console.log(res.data)
        setArticles(res.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const handleNewArticleNameChange = (event) => {
    const article = { name: event.target.value, unit: newArticle.unit }
    setNewArticle(article)
  }

  const handleNewArticleUnitChange = (event) => {
    const article = { name: newArticle.name, unit: event.target.value }
    setNewArticle(article)
  }

  // CUD
  const submitNewArticle = async (event) => {
    event.preventDefault()
    await Axios.post('/api/articles', newArticle)
      .then((res) => {
        const allArticles = [...articles]
        allArticles.push(res.data)
        setArticles(allArticles)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste des articles</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Unité</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {articles.map((article, index) => {
                  return (
                    <CTableRow key={article.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{article.name}</CTableDataCell>
                      <CTableDataCell>{article.unit}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color={'danger'}>Delete</CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color={'warning'}>Update</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouveau Article</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="input3" className="col-sm-2 col-form-label">
                  Nom
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    value={newArticle.name}
                    type="text"
                    id="input3"
                    onChange={handleNewArticleNameChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="input4" className="col-sm-2 col-form-label">
                  Unit
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    value={newArticle.unit}
                    type="text"
                    id="input4"
                    onChange={handleNewArticleUnitChange}
                  />
                </CCol>
              </CRow>
              <CButton type="submit" onClick={submitNewArticle}>
                Valider
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Article
