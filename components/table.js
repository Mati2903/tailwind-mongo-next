import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
	toggleChangeAction,
	updateAction,
	deleteAction,
} from "../redux/reducer";

export default function Table() {
	//ten hook pobiera dane z cache zamiast za każdym razem odpytywać api/ pierwszy argument to klucz queryKey zeby dostać się do pamięci
	//w isLoading będzie wiadomość loadingu
	//w isError jest boolean false lub true o tym czy jest błąd
	//w data będzie response z danymi
	//w error będzie jaki wystąpił błąd
	const { isLoading, isError, data, error } = useQuery("users", getUsers);

	if (isLoading) return <div>Trwa ładowanie...</div>;
	if (isError) return <div>Wystąpił błąd: {error}</div>;

	return (
		<table className="min-w-full table-auto">
			<thead>
				<tr className="bg-gray-800">
					<th className="px-16 py-2">
						<span className="text-gray-200">Imię i nazwisko</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Adres email</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Wypłata</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Data zatrudnienia</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Status</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Akcje</span>
					</th>
				</tr>
			</thead>
			<tbody className="bg-gray-200">
				{data.map((obj, index) => {
					return <Tr {...obj} key={index} />;
				})}
			</tbody>
		</table>
	);
}
//=================================obsługa każdego wiersza tabeli=============================================
function Tr({ _id, name, avatar, email, salary, date, status }) {
	// stan z react redux
	const visible = useSelector((state) => state.app.client.toggleForm);

	const dispatch = useDispatch(); //funkcja do aktualizacji stanu w reducerze

	//funkcja wywoływana na klik buttona Edit w wierszu tabeli
	const onUpdate = () => {
		dispatch(toggleChangeAction(_id));
		if (visible) {
			dispatch(updateAction(_id));
		}
	};

	//funckja wywoływana na klik buttona usuwania
	const onDelete = () => {
		if (!visible) {
			dispatch(deleteAction(_id));
		}
	};

	return (
		<tr className="bg-gray-300 text-center border-y-2 border-gray-400">
			<td className="px-16 py-2 flex flex-row items-center">
				<img
					src={avatar || "#"}
					alt=""
					className="h-8 w-8 rounded-full object-cover"
				/>
				<span className="text-center ml-2 font-semibold">
					{name || "Unknown"}
				</span>
			</td>
			<td className="px-16 py-2">
				<span>{email || "Unknown"}</span>
			</td>
			<td className="px-16 py-2">
				<span>{salary || "Unknown"}</span>
			</td>
			<td className="px-16 py-2">
				<span>{date || "Unknown"}</span>
			</td>
			<td className="px-16 py-2">
				<button>
					<span
						className={`${
							status == "Active" ? "bg-green-500" : "bg-rose-500"
						} text-white px-5 py-1 rounded-full`}
					>
						{status || "Unknown"}
					</span>
				</button>
			</td>
			<td className="px-16 py-2 flex justify-around gap-5">
				<button className="cursor" onClick={onUpdate}>
					<BiEdit size={25} color={"rgb(34,197,94)"} />
				</button>
				<button className="cursor" onClick={onDelete}>
					<BiTrashAlt size={25} color={"rgb(244,63,94)"} />
				</button>
			</td>
		</tr>
	);
}
