import connectMongo from "../../../database/connection";
import { getUser, putUser, deleteUser } from "../../../database/controller";

export default async function handler(req, res) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection" })
	);

	//type of http request
	const { method } = req;

	switch (method) {
		case "GET":
			getUser(req, res);
			break;
		//case put i delete są takie same jak w pliku index, bo te funkcje też używają ID usera w query params w url
		case "PUT":
			putUser(req, res);
			break;
		case "DELETE":
			deleteUser(req, res);
			break;

		default: //pozwalamy tylko na takie cztery metody http
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method $(method) not allowed`);
			break;
	}
}
