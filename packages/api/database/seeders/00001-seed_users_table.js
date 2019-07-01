var _ = require("lodash");
var faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const count = 1000;
    const range = _.range(count);
    const rows = range.map(() => ({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    }));

    return queryInterface.bulkInsert("users", rows, {});
  },

  down: (queryInterface, Sequelize) => {}
};
