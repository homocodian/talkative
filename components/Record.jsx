import { XIcon } from "@heroicons/react/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../config/firebase";

function Record({ title, timestamp, duration, totalPersons, id }) {
  const dispatch = useDispatch();
  const deleteRecord = async () => {
    try {
      await deleteDoc(doc(db, "meetings", id));
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          isOpen: true,
          message: "Failed to delete.",
        },
      });
    }
  };
  return (
    <div className="max-w-2xl w-full p-4 rounded-md shadow-sm bg-white border border-gray-400">
      <div className="flex justify-between items-center mx-1 my-[2px] w-full">
        <p className="text-gray-500">
          <span className="text-teal-600">{title}</span>
          {` at ${timestamp.toDate()} duration ${duration} with ${totalPersons} people`}
        </p>
        <button
          className="rounded-full p-1 hover:bg-gray-200 cursor-pointer group"
          onClick={deleteRecord}
        >
          <XIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default Record;
