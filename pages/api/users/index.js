import connectMongo from "../../../database/connection";
import {
	getUsers,
	postUser,
	putUser,
	deleteUser,
} from "../../../database/controller";

export default async function handler(req, res) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection" })
	);

	//type of http request
	const { method } = req;

	//sprawdzenie jaki typ requestu
	switch (method) {
		case "GET":
			getUsers(req, res);
			break;
		case "POST":
			postUser(req, res);
			break;
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
