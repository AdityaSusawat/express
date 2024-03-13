import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const app = express();

const authors = [
  { id: 1, name: "Author 1" },
  { id: 2, name: "Author 2" },
  { id: 3, name: "Author 3" },
  { id: 4, name: "Author 4" },
];

const books = [
  { id: 1, name: "Book 1", authorId: 1 },
  { id: 2, name: "Book 2", authorId: 1 },
  { id: 3, name: "Book 3", authorId: 3 },
  { id: 4, name: "Book 4", authorId: 4 },
  { id: 5, name: "Book 5", authorId: 2 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "it is a book by some author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) }, //don't need resolve since our books have an id field. GraphQL will directly give us the result from there
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "it is an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) }, //don't need resolve since our books have an id field. GraphQL will directly give us the result from there
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query type",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (parent, args) => {
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: GraphQLList(BookType), //List of BookType
      description: "List of books",
      resolve: () => books,
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: "List of authors",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "A single author",
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
    removeAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const indexToBeRemoved = authors.findIndex(
          (author) => author.id === args.id
        );
        const deletedAuthor = authors[indexToBeRemoved];
        authors.splice(indexToBeRemoved, 1);
        return deletedAuthor;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    //we need a graphQL schema in here
    schema: schema,
    graphiql: true, //to access graphQL server without using something like postman
  })
);

app.listen(5000, () => console.log("server running on http://localhost:5000"));
