import { Schema, models, model } from "mongoose";

//schemat bazy danych mongo, instancja klasy Schema
const userSchema = new Schema({
	name: String,
	avatar: String,
	email: String,
	salary: Number,
	date: String,
	status: String,
});

//tworzenie nowego modelu w mongo
// model("user", userSchema)

//gdy model jest już w bazie:
// models.user

const Users = models.user || model("user", userSchema);

export default Users;
