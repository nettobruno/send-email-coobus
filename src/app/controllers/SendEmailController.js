const nodemailer = require('nodemailer');
require('dotenv/config');

class SendEmailController {
  async store(req, res) {
    const { name, lastName, email, state, phone, message, date } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nome não informado' });
    }

    if (!lastName) {
      return res.status(400).json({ message: 'Sobrenome não informado' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email não informado' });
    }

    if (!state) {
      return res.status(400).json({ message: 'Estado não informado' });
    }

    if (!phone) {
      return res.status(400).json({ message: 'Número de celular não informado' });
    }

    if (!message) {
      return res
        .status(400)
        .json({ message: 'Conteúdo da mensagem não informado' });
    }

    if (!date) {
      return res
        .status(400)
        .json({ message: 'Data não informada' });
    }

    var transporter = nodemailer.createTransport({
      host: process.env.HOST,      
      service: 'Outlook',
      secure: false,         
      port: process.env.PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
      requireTLS: true,
    });

    let mailOptions = {
      from: '"Contato CooBUS " <' + process.env.EMAIL + '>',
      to: process.env.EMAIL,
      subject: 'Contato CooBUS',
      html: '<b>Nome:</b> ' + name + ' ' + lastName +
            '<br><b>E-mail:</b> ' + email + 
            '<br><b>Estado:</b> ' + state + 
            '<br><b>Celular:</b> ' + phone + 
            '<br><b>Mensagem:</b> ' + message +
            '<br><b>Data:</b> ' + date 
    };

    let mailOptionsClient = {
      from: '"Contato CooBUS " <' + process.env.EMAIL + '>',
      to: email,
      subject: 'Contato CooBUS',
      html: 'Recebemos sua mensagem. Aguarde, logo entraremos em contato :)'
    };

    await transporter.sendMail(mailOptions, (error) => {
      transporter.sendMail(mailOptionsClient, (error) => {
        if (error) {
            return res
            .status(400)
            .json({ message: 'Algum erro ocorreu, tente novamente mais tarde'  });
        }
      });


      if (error) {
        return res
          .status(400)
          .json({ message: 'Algum erro ocorreu, tente novamente mais tarde'  });
      }

      return res.status(200).json({ message: 'Email enviado com sucesso' });
    });
  }
}

module.exports = new SendEmailController();
