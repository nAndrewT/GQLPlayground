const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const CountryNewsType = new GraphQLObjectType({
	name: "CountryNews",
	fields: () => ({ results: { type: GraphQLString } }),
});

module.exports = CountryNewsType;
