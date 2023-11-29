const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');

const server = express();

const upload = multer({ storage: multer.memoryStorage() });

server.post('/email-service', upload.single('proformaPdf'), (req, res) => {
  const pdfFile = req.file;
  const receiverEmail = req.body.receiverEmail;
  const message = req.body.message;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'supplier.x001@gmail.com',
        pass: 'dwyb yjyi dxzh ktrj',
    },
  });

  console.log(pdfFile)

  const mailOptions = {
    from: 'supplier.x001@gmail.com',
    to: 'alainricor@gmail.com',
    subject: 'Proforma',
    text: message,
    attachments: [
      {
        filename: 'proforma.pdf',
        content: pdfFile.buffer,
      },
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('OK');
})


server.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});


//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
