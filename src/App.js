import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="bg-blue-100 h-screen">
            <div className="grid place-items-center px-6 font-sans">
                <Navbar />

                <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-28">
                    <Header />
                    <hr className="mt-4" />
                    <TodoList />
                    <hr className="mt-4" />
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
