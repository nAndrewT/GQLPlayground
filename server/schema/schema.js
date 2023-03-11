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
			async resolve(parent, args, context, info) {
				try {
					// fetch address is entered incorrectly (missing "i" after "swap")
					const response = await fetch(
						`https://swapi.dev/api/films/${args.id}`,
						{
							headers: { "content-type": "application/json" },
						}
					);
					const film = await response.json();
					//npm-function(response,film)/////////////////////////////////////////////////////
					const responseObj = {
						argId: args.id,
						alias: info.path.key,
						parentNode: info.fieldName,
						originResp: film,
						originRespStatus: response.status,
						originRespMessage: response.statusText,
					};

					console.log("RESPONSE OBJECT: ", responseObj);

					fetch("http://localhost:3000/originalRespReceiver", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: JSON.stringify(responseObj),
					})
						.then((data) => {
							return data.json();
						})
						.then((resp) => {
							console.log("originresp: ", resp);
						});
					return film;
				} catch (err) {
					console.error("Error fetching movie:", err);
					throw new Error("Unable to fetch movie");
				}
			},
		},
		// Person: {
		// 	type: SwapiPersonType,
		// 	args: { id: { type: GraphQLString } },
		// async resolve(parent, args, context, info) {
		// 	try{

		// 	return fetch(`https://swapi.dev/api/people/${args.id}`, {
		// 		headers: { "content-type": "application/json" },
		// 	})
		// },
		// },
		CountryNews: {
			type: CountryNewsType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args, context, info) {
				return fetch(
					`https://newsdata.io/api/1/news?apikey=pub_17860d5d4de387f07197443f4724ec938c4f9&country=${args}`,
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
