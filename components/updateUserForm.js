import { useEffect, useReducer, useState } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Error from "./error";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, updateUser, getUsers } from "../lib/helper";

const UpdateUserForm = ({ formId, formData, setFormData }) => {
	const queryClient = useQueryClient();

	const { isLoading, isError, data, error } = useQuery(
		["users", formId],
		() => {
			return getUser(formId);
		}
	);

	//funckja updateUser pochodzi z lib/helper i należy do niej przekazać dwa argumenty
	const updateMutation = useMutation(
		(newData) => {
			updateUser(formId, newData);
		},
		{
			onSuccess: async (data) => {
				//funkcja pokaże tylko użytkownika którego updatowano
				// queryClient.setQueryData("users", (old) => {
				// 	[data]
				// })
				//funkcja odświeży całą listę razem z naniesionym updatem
				queryClient.prefetchQuery("users", getUsers);
			},
		}
	);

	if (isLoading) return <div>Ładowanie...</div>;
	if (isError) return <div>Błąd</div>;

	const { name, avatar, salary, date, email, status } = data;
	const [firstname, lastname] = name ? name.split(" ") : formData;

	//funckja wywoływana na klik Buttona update w formularzu
	const handleSubmit = async (e) => {
		e.preventDefault();
		let userName = `${formData.firstname ?? firstname} ${
			formData.lastname ?? lastname
		}`;
		//jeśli w obiekcie data będzie to samo co w formData to assign nadpisze formData wartościami z data np data.name = "Jan", a formData.name = "Tadeusz", to wartość "Jan" zostanie nadpisana przez wartość "Tadeusz""
		let updated = Object.assign({}, data, formData, { name: userName });
		await updateMutation.mutate(updated);
	};

	//wyświetlanie okienka sukcesu po aktualizacji

	if (updateMutation.isSuccess) {
		return <Success message={"Zaaktualizowano dane"} />;
	} else if (updateMutation.isError) {
		return <Error message={"Wystąpił błąd"} />;
	}

	return (
		<form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
			<div className="input-type">
				<input
					type="text"
					name="firstname"
					onChange={setFormData}
					defaultValue={firstname}
					placeholder="Imię"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="lastname"
					onChange={setFormData}
					defaultValue={lastname}
					placeholder="Nazwisko"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="email"
					onChange={setFormData}
					defaultValue={email}
					placeholder="Adres email"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					name="salary"
					onChange={setFormData}
					defaultValue={salary}
					placeholder="Wypłata"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="date"
					name="date"
					onChange={setFormData}
					defaultValue={date}
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
						defaultChecked={status == "Active"}
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
						defaultChecked={status !== "Active"}
						value="Inactive"
						id="radioDefault2"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-5000 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain fliat-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault2" className="inline-block text-gray-800">
						Nieaktywny
					</label>
				</div>
			</div>

			<button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
				Aktualizuj
				<span className="px-1">
					<BiBrush size={24} />
				</span>
			</button>
		</form>
	);
};

export default UpdateUserForm;
