import axios from 'axios';
import html2pdf from 'html2pdf.js';
import {Modal} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import logo from 'src/assets/images/soc.png';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProformaView() {

  const [modalVisibility, setModalVisibility] = useState(false)
  const [article, setArticle] = useState([])
  const [articles, setArticles] = useState([])
  const [client, setClient] = useState()
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/clients').then(res => res.data).then(data => {
      console.log(data)
      setClients(data.documents);
    })
  }, [])
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/articles').then(res => res.data).then(data => {
      console.log(data)
      setProducts(data.documents);
    })
  }, [])
  const currentDate = new Date();
  const formatedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

  const hideModal = () => {
    setModalVisibility(false);
  }

  const generatePDF = async () => { 
    const element = document.getElementById('proforma'); 
    const opt = { 
      margin:       1, 
      filename:     'proforma.pdf', 
      image:        { type: 'jpeg', quality: 0.98 }, 
      html2canvas:  { scale: 2 }, 
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' } 
    }; 
    await html2pdf(element, opt).output('blob').then(async (blobFile) => {
      const formData = new FormData();

      console.log(blobFile);

      formData.append('proformaPdf', blobFile);
      formData.append('receiverEmail', client.fields.email.stringValue);
      formData.append('message', 'Réponse à votre demande de proforma');

      await fetch('http://localhost:3001/email-service', {
        method: 'POST',
        body: formData
      }).then(res => {
        alert('OK');
      }).catch(error => {
        alert(error);
      })
    })
  }

  const getClientByEmail = (email) => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < clients.length; index++) {
      if (clients[index].fields.email.stringValue === email) {
        return clients[index];
      }
    }
    return null;
  }

  const getArticleById = (id) => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < products.length; index++) {
      if (products[index].fields.id.integerValue === id) {
        return products[index];
      }
    }
    return null;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div className='d-flex align-items-center'>
          <h6 className='m-0 me-1'>To:</h6>
          <select className='form-select' onChange={e => {
            setClient(getClientByEmail(e.target.value))
          }}>
            <option>Choose</option>
            {clients.map((each, index) => (
                <option key={index} value={each.fields.email.stringValue}>
                  {each.fields.name.stringValue}
                </option>
              ))}
          </select>
        </div>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="mdi:email" />} onClick={generatePDF}>
          Send
        </Button>
      </Stack>

      <div id="proforma" className='p-5'>
        <div className="proforma-header px-5 mb-5" style={{display: "flex", justifyContent: "space-between"}}>
          <div className='left-header d-flex flex-column align-items-center'>
            <div className="proforma-header__logo">
              <img src={logo} alt="logo" height={200} width={180} />
            </div>
            <div className="proforma-header__title">
              <h3 style={{color: "#258aa3"}}>FourniSupp</h3>
            </div>
          </div>
          <div className='right-header'>
            <b><h1 style={{ color: "#258aa3" }}>Proforma</h1></b>
            <p>Numéro de proforma: id-101</p>
            <p>Date de proforma: { formatedDate }</p>
          </div>
        </div>
        <div className='proforma-info mt-5 mb-5 px-5' style={{display: "flex", justifyContent: "space-between"}}>
          {client && (
            <div className="proforma-info__client">
            <h3 style={{ color: "#258aa3" }}>Envoyé à</h3>
            <p className='mt-4'><b>{ client.fields.name.stringValue }</b></p>
            <p>Adresse: <b>Antananarivo</b></p>
            <p>Téléphone: <b>{ client.fields.contact.stringValue }</b></p>
            <p>Email: { client.fields.email.stringValue }</p>
          </div>
          )}
          
          <div className="proforma-info__client">
            <h3 style={{ color: "#258aa3" }}>De</h3>
            <p className='mt-4'><b>Supplier</b></p>
            <p>Adresse: <b>Antananarivo</b></p>
            <p>Téléphone: <b>+261 32 68 180 71</b></p>
            <p>Email: supplier.x01@gmail.com</p>
          </div>
        </div>
        <div className='table-responsive px-5 mt-5'>
          <table className="table table-striped">
            <thead className="px-2 table-bordered table-dark">
                <tr className='text-white'>
                  <th scope="col">#</th>
                  <th scope="col">Designation</th>
                  <th scope="col">PU</th>
                </tr>
            </thead>
            <tbody className="px-2">
              {articles.map((each, index) => (<tr>
              <td>{index + 1}.</td>
                <td>{each.name}</td>
              <td>{each.price}</td>
            </tr>) )}
          </tbody>
            {/* <tfoot>
              <tr>
                  <td>.</td>
                  <td>.</td>
                  <td className='text-primary'>TOTAL : </td>
                  <td>500</td>
              </tr>
          </tfoot> */}
        </table>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <button type='button' className='btn btn-primary' onClick={() => setModalVisibility(true)}>+ Add article</button>
        {modalVisibility && (
          <Modal show onHide={hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor='article'>
                  Nom
                  <select id='article' className='form-select' onClick={e => setArticle(getArticleById(e.target.value))}>
                    <option>Choose</option>
                    {products.map((each, index) => (
                      <option key={index} value={each.fields.id.integerValue}>
                        {each.fields.designation.stringValue}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="d-flex justify-content-end">
              <button
                  type='button'
                  className="btn btn-primary"
                  onClick={(event) => {
                    if (article) {
                      setArticles([...articles, {
                        name: article.fields.designation.stringValue,
                        price: article.fields.unitPrice.integerValue,
                      }]);
                      hideModal();
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </Modal.Body>
          </Modal>
        )} 
      </div>
    </Container>
  );
}
