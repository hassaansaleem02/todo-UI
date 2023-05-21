import "./App.css";
import TodoContent from "./components/TodoContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="m-2 flex justify-center ">
      <div className="w-full h-full md:w-2/4 sm:w-3/4 bg-[#F4F4F4] border border-gray-200 rounded shadow-2xl	 ">
        <div className="mb-5 ">
          <ToastContainer position="top-right" autoClose={2000} theme="colored" />
          <TodoContent />
        </div>
      </div>
    </div>
  );
}

export default App;
