import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";
import Error from "./ui/Error";

export default function TodoList() {
    const filter = useSelector((state) => state.filter);
    const { data: Todos, isLoading, isError } = useGetTodosQuery(filter);

    // decide what to render
    let content = null;

    if (isLoading) {
        content = "Loading...";
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && Todos?.length === 0) {
        content = <Error message="No todos found!" />;
    }

    if (!isLoading && !isError && Todos?.length > 0) {
        content = (
            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
                {Todos?.map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
            </div>
        );
    }

    return content;
}
