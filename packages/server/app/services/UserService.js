const bcrypt = require('bcrypt');
const firebase = require('firebase');
const jwt = require('jsonwebtoken');

const config = require('@config');
const { User } = require('@app/models');
const { env } = require('@app/utils/helpers');
const { rounds } = require('@config/hashing');
const UserValidator = require('@app/validators/UserValidator');

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

class UserService {
  constructor() {
    this.userValidator = new UserValidator();
  }

  /**
   * logins user
   *
   * @param  {[type]} inputs [description]
   * @return {[type]}        [description]
   */
  async login({ idToken, email, name }) {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    try {
      await firebase.auth().signInWithCredential(credential);

      var firstName = name
        .split(' ')
        .slice(0, -1)
        .join(' ');
      var lastName = name
        .split(' ')
        .slice(-1)
        .join(' ');

      const user = await this.findOrCreateByEmail(email, {
        email: email,
        first_name: firstName,
        last_name: lastName,
      });

      const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: '7d' });

      return token;
    } catch (e) {
      console.log(`error, ${e}`);
    }
  }

  /**
   * find or create user by email
   *
   * @param  {[type]} email    [description]
   * @param  {[type]} defaults [description]
   * @return {[type]}          [description]
   */
  async findOrCreateByEmail(email, defaults) {
    const user = await User.findOrCreate({
      where: {
        email,
      },
      defaults: defaults,
    });

    return user[0];
  }

  /**
   * decodes jwt and extract the id from jwt
   *
   * @param {*} token
   */
  decodeJWT(authorizationHeader) {
    try {
      const token = authorizationHeader.split(' ')[1];
      const { id } = jwt.verify(token, config.jwt.secret);

      return id;
    } catch (err) {}

    return null;
  }
}

module.exports = UserService;
