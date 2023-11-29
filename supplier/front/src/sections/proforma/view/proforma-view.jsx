import html2pdf from 'html2pdf.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import logo from 'src/assets/images/soc.png';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProformaView() {

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
      formData.append('receiverEmail', 'test@gmail.com');
      formData.append('message', 'Envoie mail with PDF alright');

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>

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
            <p>Date de proforma: 29/11/2023</p>
          </div>
        </div>
        <div className='proforma-info mt-5 mb-5 px-5' style={{display: "flex", justifyContent: "space-between"}}>
          <div className="proforma-info__client">
            <h3 style={{ color: "#258aa3" }}>Envoyé à</h3>
            <p className='mt-4'><b>Client 1</b></p>
            <p>Adresse: <b>Adresse 1</b></p>
            <p>Téléphone: <b>06 00 00 00 00</b></p>
            <p>Email:</p>
          </div>
          <div className="proforma-info__client">
            <h3 style={{ color: "#258aa3" }}>De</h3>
            <p className='mt-4'><b>Moi</b></p>
            <p>Adresse: <b>Adresse 2</b></p>
            <p>Téléphone: <b>06 00 00 00 00</b></p>
            <p>Email:</p>
          </div>
        </div>
        <div className='table-responsive px-5 mt-5'>
          <table className="table table-striped">
            <thead className="px-2 table-bordered table-dark">
                <tr className='text-white'>
                  <th scope="col">QTE</th>
                  <th scope="col">Designation</th>
                  <th scope="col">PU</th>
                  <th scope="col">Montant</th>
                </tr>
            </thead>
          <tbody className="px-2">
            <tr>
              <td>1</td>
              <td>Toaka</td>
              <td>500</td>
              <td>500</td>
            </tr>
          </tbody>
            <tfoot>
              <tr>
                  <td>.</td>
                  <td>.</td>
                  <td className='text-primary'>TOTAL : </td>
                  <td>500</td>
              </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </Container>
  );
}
