const path = require("path");
const _ = require("lodash");
const dotenv = require("dotenv");

dotenv.config(path.resolve(process.cwd(), ".env"));

module.exports = {
  /**
   * loads a specific key from .env
   * if not found, return the defaulValue
   */
  env: function(key, defaultValue) {
    const value = process.env[key];

    if (value) {
      return value;
    }

    return defaultValue;
  },

  /**
   * computes paginated meta
   *
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  computePaginationMeta: ({ page, limit, count }) => {
    return {
      currentPage: page,
      limit,
      total: count
    };
  }
};
