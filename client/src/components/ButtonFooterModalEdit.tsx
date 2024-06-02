interface Props {
	showEditBook: boolean;
	handlerSave: () => void;
	handlerDelete: () => void;
}

export default function ButtonFooterModalEdit({
	showEditBook,
	handlerSave,
	handlerDelete,
}: Props): JSX.Element {
	return (
		<div className="flex flex-row justify-between w-full px-2 py-4 rounded-b order-last">
			<button
				className="bg-red-500 text-white active:bg-red-600 w-full font-bold text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
				onClick={() => handlerDelete()}
			>
				Elimina
			</button>
			{showEditBook === true && (
				<button
					className="bg-emerald-500 text-white active:bg-emerald-600 w-full font-bold text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					type="button"
					onClick={() => handlerSave()}
				>
					Salva
				</button>
			)}
		</div>
	);
}
