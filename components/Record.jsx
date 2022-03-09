import { XIcon } from "@heroicons/react/outline";

function Record({ title, timestamp, duration }) {
  return (
    <div className="max-w-2xl w-full p-4 rounded-md shadow-sm bg-white border border-gray-400">
      <div className="flex justify-between items-center mx-1 my-[2px] w-full">
        <p className="text-gray-500 truncate">
          <span className="text-teal-600">{title}</span>
          {` at ${timestamp} duration ${duration} `}
        </p>
        <button className="rounded-full p-1 hover:bg-gray-200 focus:bg-gray-200 cursor-pointer group">
          <XIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default Record;
