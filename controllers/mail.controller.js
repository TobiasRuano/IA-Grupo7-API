let nodemailer = require('nodemailer');

exports.sendEmail = async function (data){
    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        //secure: false,
        port:25,
        service: 'hotmail',
        auth: {
            user: 'ruano_t@outlook.com',
            pass: 'xAfLeRRCTDnuBCMsTBNzsCMD'
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'ruano_t@outlook.com',
        to: data.destinatario,
        subject: data.asunto,
        html: data.cuerpo,
    };
    console.log("mail",mailOptions)
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};