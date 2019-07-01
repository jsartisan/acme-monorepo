const _ = require('lodash');
const db = require('@app/models');
const Sequelize = require('sequelize');

const { Category } = require('@app/models');

const Op = Sequelize.Op;

class CategoryService {
  /**
   * returns category by ids
   *
   * @param  {[type]}
   * @return {[type]}
   */
  async getCategoriesOfPosts(posts) {
    let categories = await Category.findAll({
      where: {
        id: {
          [Op.in]: posts.map(post => post.category_id),
        },
      },
    });

    return posts.map(post => categories.find(category => category.id === post.category_id));
  }
}

module.exports = CategoryService;
