import {CotterValidateJWT} from "cotter-node";
import Airtable from "airtable";

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASE);

export default async (req, res) => {
    const { projectId } = req.query;

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
        // Check that the JWT is valid
        const valid = await CotterValidateJWT(token);
        if (!valid) {
            res.statusCode(403);
            res.end("Authentication token invalid");
        }

        // Update project complete status
        await base('Design projects')
            .update([{"id": projectId, "fields": {"Complete": true}}]);

        // Respond with a 204
        res.statusCode = 204;
        res.end();
    } catch (e) {
        // Handle any errors
        console.log(e);
        res.statusCode = 500;
        res.end("Server error. Something went wrong.");
    }
}
