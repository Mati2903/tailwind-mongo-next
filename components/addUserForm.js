import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Error from "./error";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";

const AddUserForm = ({ formData, setFormData }) => {
	const queryClient = useQueryClient();

	const addMutation = useMutation(addUser, {
		onSuccess: () => {
			queryClient.prefetchQuery("users", getUsers);
		},
	}); //żeby postować nowe dane do backendu

	const handleSubmit = (e) => {
		e.preventDefault();
		//if no value in form data; object.keys po to, że formData nie zwraca null ani undefined więc nie można sprawdzić tego na zasadnie false !
		if (Object.keys(formData).length == 0) return console.log("No form data");

		let { firstname, lastname, email, salary, date, status } = formData;

		//skondensowanie imienia i nazwiska w jedną zmienną name bo taka jest w modelu Mongo w model/user.js
		const model = {
			name: `${firstname} ${lastname}`,
			avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
				Math.random() * 100
			)}.jpg`,
			email,
			salary,
			date,
			status: status ?? "Active",
		};

		addMutation.mutate(model);
	};

	if (addMutation.isLoading) return <div>Ładowanie...</div>;
	if (addMutation.isError) return <Error message={addMutation.error.message} />;
	if (addMutation.isSuccess) return <Success message={"Dodano użytkownika"} />;

	return (
		<form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
			<div className="input-type">
				<input
					type="text"
					name="firstname"
					onChange={setFormData}
					placeholder="Imię"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="lastname"
					onChange={setFormData}
					placeholder="Nazwisko"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="email"
					onChange={setFormData}
					placeholder="Adres email"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="salary"
					onChange={setFormData}
					placeholder="Wypłata"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="date"
					name="date"
					onChange={setFormData}
					placeholder="Data"
					className="border px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			{/* --------------------------------------- */}
			<div className="flex gap-10 items-center">
				<div className="form-check">
					<input
						type="radio"
						name="status"
						onChange={setFormData}
						value="Active"
						id="radioDefault1"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-5000 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain fliat-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault1" className="inline-block text-gray-800">
						Aktywny
					</label>
				</div>
				<div className="form-check">
					<input
						type="radio"
						name="status"
						onChange={setFormData}
						value="Inactive"
						id="radioDefault2"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-5000 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain fliat-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault2" className="inline-block text-gray-800">
						Nieaktywny
					</label>
				</div>
			</div>

			<button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
				Dodaj
				<span className="px-1">
					<BiPlus size={24} />
				</span>
			</button>
		</form>
	);
};

export default AddUserForm;
