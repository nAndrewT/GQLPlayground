const { GraphQLObjectType, GraphQLString } = require("graphql");

const SwapiPersonType = new GraphQLObjectType({
	name: "Person",
	fields: () => ({
		name: { type: GraphQLString },
		birth_year: { type: GraphQLString },
		eye_color: { type: GraphQLString },
		gender: { type: GraphQLString },
		height: { type: GraphQLString },
		mass: { type: GraphQLString },
	}),
});

module.exports = SwapiPersonType;
