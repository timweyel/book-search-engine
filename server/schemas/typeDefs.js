// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type Book {
      bookId: String
      authors: [String]
      description: String
      image: String
      link: String
      title: String
  }

  type Query {
    book: [Book]
  }
`;

// export the typeDefs
module.exports = typeDefs;