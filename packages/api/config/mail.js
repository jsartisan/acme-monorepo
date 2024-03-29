const { env } = require("@app/utils/helpers");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | SMTP Host Address
  |--------------------------------------------------------------------------
  |
  | Here you may provide the host address of the SMTP server used by your
  | applications. A default option is provided that is compatible with
  | the Mailgun mail service which will provide reliable deliveries.
  |
  */

  host: env("MAIL_HOST", "smtp.mailtrap.io"),

  /*
  |--------------------------------------------------------------------------
  | SMTP Host Port
  |--------------------------------------------------------------------------
  |
  | This is the SMTP port used by your application to deliver e-mails to
  | users of the application. Like the host we have set this value to
  | stay compatible with the Mailgun e-mail application by default.
  |
  */

  port: env("MAIL_PORT", 587),

  /*
  |--------------------------------------------------------------------------
  | Global "From" Address
  |--------------------------------------------------------------------------
  |
  | You may wish for all e-mails sent by your application to be sent from
  | the same address. Here, you may specify a name and address that is
  | used globally for all e-mails that are sent by your application.
  |
  */

  from: {
    address: "pawan@owneymail.com",
    name: "Pawan from OwneyMail"
  },

  /*
  |--------------------------------------------------------------------------
  | E-Mail Encryption Protocol
  |--------------------------------------------------------------------------
  |
  | Here you may specify the encryption protocol that should be used when
  | the application send e-mail messages. A sensible default using the
  | transport layer security protocol should provide great security.
  |
  */

  encryption: env("MAIL_ENCRYPTION", "tls"),

  /*
  |--------------------------------------------------------------------------
  | SMTP Server Username
  |--------------------------------------------------------------------------
  |
  | If your SMTP server requires a username for authentication, you should
  | set it here. This will get used to authenticate with your server on
  | connection. You may also set the "password" value below this one.
  |
  */

  username: env("MAIL_USERNAME", null),

  /*
  |--------------------------------------------------------------------------
  | SMTP Server Password
  |--------------------------------------------------------------------------
  |
  | Here you may set the password required by your SMTP server to send out
  | messages from your application. This will be given to the server on
  | connection so that the application will be able to send messages.
  |
  */

  password: env("MAIL_PASSWORD"),

  /*
  |--------------------------------------------------------------------------
  | OWNEY Config variables
  |-------------------------------------------------------------------------
  |
  | project key through which we will send emails
  */

  owney: {
    api: env("OWNEY_API"),
    projectKey: env("OWNEY_PROJECT_KEY")
  }
};
