import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(emailData) {
  const { email, username, password, template_id } = emailData;

  const message = {
    from: {
      email: process.env.SENDGRID_FROM_EMAIL
    },
    personalizations: [
      {
        to: [
          {
            email
          }
        ],
        dynamic_template_data: {
          username,
          password
        }
      }
    ],
    template_id
  };

  try {
    await sgMail.send(message);
    console.log('Correo electrónico enviado correctamente.');
  } catch (error) {
    console.error('SendGrid Client Error', error);
  }
}

export default sendEmail;
