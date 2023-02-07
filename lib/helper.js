const BASE_URL = "http://localhost:3000";

//funckja zwróci wszystkich userów
export const getUsers = async () => {
	const response = await fetch(`${BASE_URL}/api/users`);
	const json = await response.json();

	return json;
};

//funkcja zwróci pojedynczy obiekt - jednego usera na podstawie id usera
export const getUser = async (userId) => {
	const response = await fetch(`${BASE_URL}/api/users/${userId}`);
	const json = await response.json();
	//jeśli jest taki obiekt, zwróci go, jeśli nie, return zwróci pusty obiekt
	if (json) return json;
	return {};
};

//post nowego usera
export async function addUser(formData) {
	try {
		//opcje fetcha nadpisujące domyślny GET, żeby wysłać POST
		const Options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		};

		const response = await fetch(`${BASE_URL}/api/users`, Options);
		const json = await response.json();
		return json;
	} catch (error) {
		return error;
	}
}

//update usera
export async function updateUser(userId, formData) {
	//opcje fetcha nadpisujące domyślny GET, żeby wysłać PUT
	const Options = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	};

	const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
	const json = await response.json();
	return json;
}

//delete usera
export async function deleteUser(userId) {
	//opcje fetcha nadpisujące domyślny GET, żeby wysłać DELETE
	const Options = {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	};

	const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
	const json = await response.json();
	return json;
}
