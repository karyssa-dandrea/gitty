const pool = require('../utils/pool');

module.exports = class Post {
  id;
  content;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
  }

  static insert({ content }) {
    return pool
      .query(
        `
            INSERT INTO
            posts (content)
            VALUES
            ($1)
            RETURNING
            *
            `,
        [content]
      )
      .then(({ rows }) => new Post(rows[0]));
  }

  static findAll() {
    return pool
      .query(
        `
          SELECT
          *
          FROM
          posts
          `
      )
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
