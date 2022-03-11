import InputRange from "./InputRange";
import {
  VolumeUpIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MeeetingInfo from "./MeetingInfo";

function MeetingControls({ LeaveMeeting, MeetingDetails }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // open modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [value, loading, error] = useDocumentData(
    doc(db, "meetings", MeetingDetails?.id)
  );
  useEffect(() => {
    if (loading || error || !value) return;
    if (value?.meetingClosed) {
      dispatch({ type: "RESET_MEETING" });
    }
  }, [value, loading, error]);
  return (
    <Fragment>
      <div className="w-full flex justify-between items-center border-t-[1.5px] border-gray-200 pt-4">
        {/* left buttons */}
        <div className="flex justify-between items-center gap-4">
          <VolumeUpIcon className="h-5 w-5 text-teal-600" />
          <div className="w-28">
            <InputRange min={0} max={100} step={5} initValue={60} />
          </div>
        </div>
        {/* middle buttons */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-1">
            <button className="p-2 border border-gray-200 rounded bg-teal-600">
              <MicrophoneIcon className="h-5 w-5 text-white" />
            </button>
            <p className="text-sm text-gray-400 capitalize">Mic</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <button className="p-2 border border-gray-200 rounded bg-teal-600">
              <VideoCameraIcon className="h-5 w-5 text-white" />
            </button>
            <p className="text-sm text-gray-400 capitalize">Cam</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <button
              className="p-2 border border-gray-200 rounded bg-teal-600"
              onClick={openModal}
            >
              <InformationCircleIcon className="h-5 w-5 text-white" />
            </button>
            <p className="text-sm text-gray-400 capitalize">info</p>
          </div>
        </div>
        {/* right icon */}
        <div className="flex flex-col justify-center items-center gap-1">
          <button
            className="p-2 border border-gray-200 rounded"
            onClick={LeaveMeeting}
          >
            <LogoutIcon className="h-5 w-5 text-gray-500" />
          </button>
          <p className="text-sm text-gray-400 capitalize">Leave</p>
        </div>
      </div>
      <MeeetingInfo
        isOpen={isOpen}
        closeModal={closeModal}
        MeetingDetails={MeetingDetails}
      />
    </Fragment>
  );
}

export default MeetingControls;
