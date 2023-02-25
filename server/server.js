const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schema.js");

const PORT = 3900;

app.get("/", (req, res) => {
	return res.status(200).send("<h1>GQL PLAYGROUND<h1>");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
		extensions: ({ document, variables, operationName, result }) => {
			console.log("result data: ", result);
			fetch("http://localhost:3000/queryRespReceiver", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify({ schema: schema, queryResp: result }),
			})
				.then((data) => {
					return data.json();
				})
				.then((resp) => {
					console.log("resp: ", resp);
				});
		},
	})
);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
