import BaseModel from "../components/BaseModel";

const CreateCategory = ({ setCategory, handleCreateCategory, setOpen }) => {
  return (
    <BaseModel>
      <div className="space-y-4 flex flex-col">
        <p className="font-bold uppercase text-[0.8rem]">Category</p>
        <input
           onKeyDown={(e) => {
            e.key === "Enter" && handleCreateCategory();
          }}
          onInput={(e) => {
            setCategory(e.target.value);
          }}
          type="text"
          className="bg-[#F4F4F4] outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          placeholder="Create a category"
        />
        <span className="space-x-2">
          <button
        
            onClick={() => handleCreateCategory()}
            className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
          >
            Create
          </button>
          <button
            onClick={() => setOpen(false)}
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-4 rounded"
          >
            Close
          </button>
        </span>
      </div>
    </BaseModel>
  );
};
export default CreateCategory;
