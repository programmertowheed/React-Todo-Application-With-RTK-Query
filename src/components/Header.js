import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useGetTodosQuery,
} from "../features/api/apiSlice";

export default function Header() {
    const { data: Todos } = useGetTodosQuery();
    const [addTodo, {}] = useAddTodoMutation();
    const [editTodo, {}] = useEditTodoMutation();
    const [deleteTodo, {}] = useDeleteTodoMutation();

    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (input) {
            addTodo({
                text: input,
                completed: false,
            });
            setInput("");
        }
    };

    // handle all todo incomplete to complete
    const completeHadler = () => {
        Todos.forEach((t) => {
            const id = t.id;
            const newTodo = { ...t, completed: true };
            editTodo({ id, data: newTodo });
        });
    };

    // handle all todo complete to incomplete
    const inCompleteHadler = () => {
        Todos.forEach((t) => {
            const id = t.id;
            const newTodo = { ...t, completed: false };
            editTodo({ id, data: newTodo });
        });
    };

    const clearHeandler = () => {
        Todos.forEach((t) => {
            const id = t.id;
            deleteTodo(id);
        });
    };

    const actionType = () => {
        const newTodos = Todos || [];
        const newArr = newTodos.filter((t) => t.completed === false);
        const bolValue = newArr.length === 0;
        return bolValue;
    };

    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={submitHandler}
            >
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                {actionType() ? (
                    <li
                        className="flex space-x-1 cursor-pointer"
                        onClick={inCompleteHadler}
                    >
                        {/* <img
                            className="w-4 h-4"
                            src={tickImage}
                            alt="Complete"
                        /> */}
                        <span>Incomplete All Tasks</span>
                    </li>
                ) : (
                    <li
                        className="flex space-x-1 cursor-pointer"
                        onClick={completeHadler}
                    >
                        <img
                            className="w-4 h-4"
                            src={tickImage}
                            alt="Complete"
                        />
                        <span>Complete All Tasks</span>
                    </li>
                )}
                <li className="cursor-pointer" onClick={clearHeandler}>
                    Clear completed
                </li>
            </ul>
        </div>
    );
}
