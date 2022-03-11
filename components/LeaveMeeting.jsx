import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

function LeaveMeeting({
  isOpen,
  closeModal,
  title,
  meetingDetails,
  meetingDuration,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // close or leave meeting
  const leaveMeeting = async () => {
    setLoading(true);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: "nice7878",
        id: meetingDetails.id,
        duration: meetingDuration,
      }),
    };
    const data = await fetch("/api/endMeeting", requestOption).then((res) =>
      res.json()
    );
    setLoading(false);
    closeModal();
    if (data?.success) {
      dispatch({
        type: "RESET_MEETING",
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,30%)]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="mt-2">
                <p className="text-lg text-red-500">{title}</p>
              </div>
              {loading ? (
                <div className="my-4 flex justify-center items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style={{ fill: "#6b7280" }}
                    className="animate-spin"
                  >
                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
                  </svg>
                </div>
              ) : (
                <div className="mt-8 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="capitalize inline-flex justify-center px-4 py-2 text-sm font-bold text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={leaveMeeting}
                    className="capitalize inline-flex justify-center px-4 py-2 text-sm font-bold text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  >
                    Leave
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LeaveMeeting;
