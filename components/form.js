import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
	return {
		...state, //overrides prev values
		[event.target.name]: event.target.value,
	};
};

const Form = () => {
	const [formData, setFormData] = useReducer(formReducer, {});

	const formId = useSelector((state) => state.app.client.formId);

	return (
		<div className="container mx-auto py-5">
			{/* jeśli jest jakieś id to znaczy że są dane i wtedy update, jeśli formId jest undefined to nie ma danych i wtedy wyświeltamy addUserForm */}
			{formId
				? UpdateUserForm({ formId, formData, setFormData })
				: AddUserForm({ formData, setFormData })}
		</div>
	);
};

export default Form;
