import mongoose from "mongoose";

const connectMongo = async () => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_URI); //łączenie z bazą danych przez mongoose, destrukturyzując connection

		if (connection.readyState == 1) {
			console.log("Database connected");
		}
	} catch (err) {
		return Promise.reject(err); //reject promisa i wyrzucenie błędu jeżeli wystąpi
	}
};

export default connectMongo;
