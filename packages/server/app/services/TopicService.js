const _ = require("lodash");
const db = require("@app/models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class TopicService {
  /**
   * returns category by ids
   *
   * @param  {[type]}
   * @return {[type]}
   */
  async getTopicsOfPosts(postIds) {
    let topics = null;
    await db.sequelize
      .query(
        `select topics.*, post_topic.post_id from topics
          left join post_topic on post_topic.topic_id = topics.id
          where post_topic.post_id in (:postIds)`,
        {
          replacements: {
            postIds
          }
        }
      )
      .spread((results, metadata) => {
        topics = _.groupBy(results, function(row) {
          return row.post_id;
        });

        topics = Object.keys(topics).map(key => topics[key]);
      });

    return topics;
  }
}

module.exports = TopicService;
