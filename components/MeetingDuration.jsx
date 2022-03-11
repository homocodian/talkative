import { VideoCameraIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

function MeetingDuration({ setDuration }) {
  const { hours, minutes, seconds } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    setDuration(`${hours}:${minutes}:${seconds}`);
  }, [hours, minutes, seconds]);

  return (
    <div className="w-full flex justify-between items-start p-4">
      <div className="flex items-center gap-4">
        <VideoCameraIcon className="h-5 w-5 text-red-500" />
        <p className="text-sm text-gray-400">{`${hours}:${minutes}:${seconds}`}</p>
      </div>
      <button className="flex items-center gap-2">
        <div className="p-px bg-green-500 rounded">
          <PlusSmIcon className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm text-green-500">inivite people</p>
      </button>
    </div>
  );
}

export default MeetingDuration;
