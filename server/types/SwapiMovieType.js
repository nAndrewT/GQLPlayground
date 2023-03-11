const { GraphQLObjectType, GraphQLString } = require("graphql");

const SwapiMovieType = new GraphQLObjectType({
	name: "Movie",
	fields: () => ({
		title: { type: GraphQLString },
		director: { type: GraphQLString },
		producer: { type: GraphQLString },
		// peoples is not a valid attribute of swapi/films
		// returns null in graphiql
		// peoples: { type: GraphQLString },
	}),
});

module.exports = SwapiMovieType;
