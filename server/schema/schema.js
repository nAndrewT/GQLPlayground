const SwapiMovieType = require("../types/SwapiMovieType.js");
const SwapiPersonType = require("../types/SwapiPersonType.js");
const CountryNewsType = require("../types/CountryNewsType.js");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require("graphql");

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		Movie: {
			type: SwapiMovieType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// fetch address is entered incorrectly (missing "i" after "swap")
				return fetch(`https://swapi.dev/api/films/${args.id}`, {
					headers: { "content-type": "application/json" },
				}).then((res) => res.json());
			},
		},
		Person: {
			type: SwapiPersonType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return fetch(`https://swapi.dev/api/people/${args.id}`, {
					headers: { "content-type": "application/json" },
				}).then((res) => res.json());
			},
		},
		CountryNews: {
			type: CountryNewsType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return fetch(
					`https://newsdata.io/api/1/news?apikey=pub_17860d5d4de387f07197443f4724ec938c4f9&country=${args.id}`,
					{
						headers: {
							API_key: "pub_17860d5d4de387f07197443f4724ec938c4f9",
							"content-type": "application/json",
						},
					}
				).then((res) => res.json());
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
