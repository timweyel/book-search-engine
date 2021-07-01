const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models/Book');

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

  Mutation: { 
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError('Wrong password or username');
      }

      const correctPassword = await user.isCorrectPassword(password);
        if(!correctPassword) {
          throw new AuthenticationError('Wrong password or username');
        }
        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (_, args, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: args } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError('Not logged in');
    },
    removeBook: async(_, { bookId }, context) => {
      if(context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          )
          return updatedUser;
        } catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError('Not logged in');
    }
  }
  
};

module.exports = resolvers;