import {CotterAccessToken} from "cotter-token-js";
const {Pool} = require('pg');
const connectionString = process.env.PG_CONNECTION_STRING;
const pool = new Pool({
    connectionString,
});

export default async (req, res) => {
    // Check that the authorization header exists
    if (!("authorization" in req.headers)) {
        res.statusCode = 401;
        res.end("Authorization header missing");
    }

    // Extract the token string
    const auth = await req.headers.authorization;
    const bearer = auth.split(" ");
    const token = bearer[1];

    try {
        // Decode the Cotter JWT, "decoded.payload.identifier" is the user's email
        const decoded = new CotterAccessToken(token);

        // Get design_projects by clients.email
        // Query credit: https://www.garysieling.com/blog/postgres-join-on-an-array-field/
        const query = `select design_projects.*
                       from design_projects
                                join clients on clients.id = ANY (design_projects.client)
                       where clients.email like $1;`;
        const {rows} = await pool.query(query, [decoded.payload.identifier]);

        // Respond with results
        res.statusCode = 200;
        res.json(rows);
    } catch (e) {
        // Handle any errors
        console.log(e);
        res.statusCode = 500;
        res.end("Server error. Something went wrong.");
    }
}
