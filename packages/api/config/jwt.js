const { env } = require("@app/utils/helpers");

module.exports = {
  secret: env("JWT_SECRET")
};
