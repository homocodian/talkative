import Head from "next/head";
import { useState } from "react";
import CreateMeeting from "../components/CreateMeeting";
import JoinMeeting from "../components/JoinMeeting";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import MeetingHeader from "../components/MeetingHeader";
import MeetingDuration from "../components/MeetingDuration";
import MeetingControls from "../components/MeetingControls";
import Video from "../components/Video";
import LeaveMeeting from "../components/LeaveMeeting";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Meeting() {
  const [isOpen, setIsOpen] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState("00:00:00");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLeaveMeetingOpen, setIsLeaveMeetinOpen] = useState(false);
  const openLeaveMeeting = () => setIsLeaveMeetinOpen(true);
  const closeLeaveMeeting = () => setIsLeaveMeetinOpen(false);
  const meetingDetails = useSelector((state) => state.meetingReducer);
  const notification = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div>
      <Head>
        <title>Meeting</title>
        <meta
          name="description"
          content="Talkative video conferencing and chat app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Navbar />
        <main className="w-full">
          {meetingDetails.isMeetingStarted ? (
            <div className="h-full px-4">
              <MeetingHeader
                meetingsDetails={meetingDetails}
                OpenLeaveMeeting={openLeaveMeeting}
              />
              <div className="w-full flex justify-between flex-col gap-1">
                <MeetingDuration setDuration={setMeetingDuration} />
                <Video />
                <MeetingControls
                  LeaveMeeting={openLeaveMeeting}
                  MeetingDetails={meetingDetails}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="h-full flex justify-center items-center px-4">
                <div className="flex justify-center items-center gap-8">
                  <button
                    className="capitalize bg-teal-600 hover:bg-teal-700 font-bold text-white px-4 py-2 rounded"
                    onClick={openModal}
                  >
                    new meeting
                  </button>
                  <button
                    className="capitalize border-2 border-teal-600 hover:bg-teal-50 font-bold text-teal-700 px-4 py-2 rounded"
                    onClick={openJoinModal}
                  >
                    join meeting
                  </button>
                </div>
              </div>
              <CreateMeeting
                isOpen={isOpen}
                closeModal={closeModal}
                setDuration={setMeetingDuration}
                title="Tell others about this meeting."
              />
              <JoinMeeting
                isOpen={isJoinModalOpen}
                closeModal={closeJoinModal}
                title="Enter Meeting details."
              />
            </>
          )}
          <LeaveMeeting
            isOpen={isLeaveMeetingOpen}
            closeModal={closeLeaveMeeting}
            title="Leave Meeting ?"
            meetingDuration={meetingDuration}
            meetingDetails={meetingDetails}
          />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
          {notification.isOpen
            ? toast.warn(notification.message, {
                onClose: () => {
                  dispatch({
                    type: "RESET_MESSAGE",
                  });
                },
                delay: 1000,
              })
            : null}
        </main>
      </div>
    </div>
  );
}

export default Meeting;
