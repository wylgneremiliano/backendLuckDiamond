const connection = require('../database/connection')
const nodemailer = require('nodemailer');


module.exports = {
    async paymentEmail(request, response) {
        const { email, body, header } = request.body

        try {

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: '',
                port: 587,
                secure: true,
                auth: {
                    user: 'wylgneremiliano@gmail.com',
                    pass: 'ptcvsspo12135'
                }
            });

            let mailOptions = {
                from: 'wylgneremiliano@gmail.com',
                to: email,
                subject: header,
                text: body,
                html: `<p>${body}</p><br/> <img src="cid:luckDiamond" width="100" height="100" class="CToWUd"/>`,
                attachments: [{
                    filename: 'luckDiamond.png',
                    path: './assets/icone.png',
                    cid: 'luckDiamond',

                }]

            };
            const resp = transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return response.status(200).json({ "user": resp, "error": false })
        } catch (error) {
            return response.status(500).json({ "mensagem": "Erro ao enviar email!", "error": true })
        }
    },

}