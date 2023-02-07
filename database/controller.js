import Users from "../model/user"; //używając Users dostajemy się do bazy danych

//===========================================GET===============================================

// controller
//get: http://localhost:3000/api/users
export async function getUsers(req, res) {
	try {
		const users = await Users.find({}); //metoda wyszukuje wszystkich userów z modelu Users i zwraca wszystko

		//gdy nie ma danych w users:
		if (!users) return res.status(404).json({ error: "Data not found" });

		res.status(200).json(users);
	} catch (err) {
		res.status(404).json({ err: "Error while fetching data" });
	}
}

//get danego usera po jego id jako parametr w url
export async function getUser(req, res) {
	try {
		const { userId } = req.query; //pobranie id z query params z url

		if (userId) {
			const user = await Users.findById(userId);
			res.status(200).json(user);
		}

		//gdy będzie błąd:
		res.status(404).json({ error: "User not selecter" });
	} catch (error) {
		res.status(404).json({ error: "Cannot get the user" });
	}
}

//===========================================POST===============================================

//post: http://localhost:3000/api/users
export async function postUser(req, res) {
	try {
		const formData = req.body; //dane z formularza

		if (!formData)
			return res.status(404).json({ error: "Form data not provided" });
		//tworzy nowego usera do przechowywania w bazie
		Users.create(formData, function (err, data) {
			//funkcja się wykona tylko jeśli dane zapiszą się z sukcesem w bazie
			return res.status(200).json(data);
		});
	} catch (err) {
		return res.status(404).json({ err });
	}
}

//===========================================PUT===============================================

//put: http://localhost:3000/api/users/1

export async function putUser(req, res) {
	try {
		const { userId } = req.query; //sprawdzenie ID usera
		const formData = req.body;

		if (userId && formData) {
			const user = await Users.findByIdAndUpdate(userId, formData); //pierwszy argument to które id updatujemy, drugi to jakimi danymi go aktualizujemy
			res.status(200).json(user);
		}
		// jeśli powyższa funkcja się nie wykona to poniższa wyrzuca błąd
		res.status(404).json({ error: "User not selected" });
	} catch (err) {
		res.status(404).json({ err: "Error while updating the user" });
	}
}

//===========================================DELETE===============================================

//delete: http://localhost:3000/api/users/1

export async function deleteUser(req, res) {
	try {
		const { userId } = req.query;

		if (userId) {
			const user = await Users.findByIdAndDelete(userId);
			res.status(200).json({ deleted: userId }); //zwórci tylko id usera a nie wszystkie jego dane, gdy przekaże się tutaj po prostu user, zwrócone zostaną kompletne dane usuniętego usera
		}

		res.status(404).json({ error: "User not selected" });
	} catch (error) {
		res.status(404).json({ error: "Error while deleting the user" });
	}
}
