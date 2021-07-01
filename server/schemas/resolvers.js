const { Book } = require('../models/Book');

const resolvers = {
  Query: {
    book: async () => {
      return Book.find({}).sort({ bookId: -1 });
    }
  }
};

module.exports = resolvers;