const { Book } = require('../models/Book');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if(context.user) {
            const userData = await User.findOne({}).select('-__v -password');
            return userData;
        }
        throw new AuthenticationError('Not logged in');
    }
  },
  
};

module.exports = resolvers;