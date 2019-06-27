const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const Sequelize = require("sequelize");
const withPagination = require("sequelize-cursor-pagination");

const { env } = require("@config/app");
const config = require("@config/database.js")[env];

const { limit: default_limit } = require("@config/pagination");
const { computePaginationMeta } = require("@app/utils/helpers");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/**
 * recursively iterate over every models
 * and add to db
 *
 * @return {[type]} [description]
 */
const loadModels = () => {
  const basename = path.basename(module.filename);

  // importing models
  fs.readdirSync(path.join(__dirname))
    .filter(file => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach(file => {
      const model = sequelize["import"](path.join(__dirname, file));
      db[model.name] = model;
    });

  // calling associate methond
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }

    const options = {
      methodName: "paginate",
      primaryKeyField: "id"
    };

    withPagination(options)(db[modelName]);
  });
};

/**
 * creates mysql connection
 *
 * @return {[type]} [description]
 */
const connect = () => {
  loadModels();

  sequelize
    .authenticate()
    .then(() => {
      console.log("📚 Connection has been established successfully. 📘");
    })
    .catch(err => {
      console.log("😞 Unable to connect to the database:", err);
    });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

connect();

module.exports = db;
