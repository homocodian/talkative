import { ChevronLeftIcon } from "@heroicons/react/outline";

function MeetingHeader({ meetingsDetails, OpenLeaveMeeting }) {
  return (
    <header className="w-full p-4 border-b-[1.5px] border-gray-200">
      <div className="flex items-center gap-8">
        <button
          className="p-2 rounded-md bg-gray-100"
          aria-label="back"
          onClick={OpenLeaveMeeting}
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        <p className="text-lg text-center truncate">
          {meetingsDetails?.meetingTitle}
        </p>
      </div>
    </header>
  );
}

export default MeetingHeader;
