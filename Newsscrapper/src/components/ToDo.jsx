import axios from "axios";
import React from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { baseURL } from "./constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <div className=" bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg bg-sky-100 h-36 w-70rounded-lg flex flex-col   overflow-auto ">
      <div className="icons  flex gap-2 mb-3 mt-1 ml-1 relative">
        <  MdModeEdit className=" cursor-pointer text-green-400" onClick={updateToDo} />
        <MdDelete className=" cursor-pointer text-red-900 h-111 focus:outline-none focus:ring focus:ring-violet-300 ... absolute right-1" onClick={deleteTodo} />
      </div>
      <div className="pl-1 break-all overflow-auto">

      {text}
      </div>
    </div>
  );
};

export default ToDo;
