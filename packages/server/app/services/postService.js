const Sequelize = require('sequelize');
const { Post } = require('@app/models');

const Op = Sequelize.Op;

module.exports = {
  /**
   *
   */
  getPostsOfCategories: (categoryId, { first }) => {},

  /**
   *
   */
  getPostsOfCategory: async (categoryId, { first }) => {
    const posts = await Post.paginate({
      limit: first,
      where: {
        category_id: categoryId,
      },
    });

    return posts;
  },
};
