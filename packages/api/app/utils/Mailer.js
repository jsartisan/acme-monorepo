const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const { isEmpty, isArray } = require('lodash');

const { host, port, username, password, from } = require('@config/mail');

class Mailer {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === '465',
      auth: {
        user: username,
        pass: password,
      }
    });

    this.send = this.send.bind(this);
  }

  /**
   * sends mail
   *
   * renders ejs template and send it
   *
   * @param {*} options
   */
  send({ to, subject, template, data = {}, ...rest }) {

    const options = {
      to,
      subject
    };

    // if `to` is an array, join them with ','
    if (isArray(rest.to)) {
      options.to = options.to.join(',');
    }

    // if `bcc` is an array, join them with ','
    if (isArray(rest.bcc)) {
      options.bcc = options.bcc.join(',');
    }

    // if there is no from in options, use defaults
    if (isEmpty(rest.from)) {
      if (isEmpty(from.address) && isEmpty(from.name)) {
        throw new Error('"from" is not defined in environment or given in options')
      }

      options.from = `${from.name} <${from.address}>`;
    }

    const emailTemplate = path.resolve(`./views/emails/${template}.ejs`);

    ejs.renderFile(
      emailTemplate,
      data,
      (err, html) => {
        if(err) return err;;

        options.html = html;

        this.transporter.sendMail(options)
          .then(data => data)
          .catch(error => error)
      }
    );

  }
}

module.exports = Mailer;
