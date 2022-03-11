import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

function MeetingInfo({ isOpen, closeModal, MeetingDetails }) {
  const text = `Use this code to join meeting in talkative.vercel.app/meeting\nid: ${MeetingDetails.id}\npasscode: ${MeetingDetails.meetingPasscode}`;
  const [value, copy] = useCopyToClipboard();
  return (
    <>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Meeting information
                </Dialog.Title>
                <div className="my-5 flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    Meeting id :{" "}
                    <span className="text-teal-600">{`${MeetingDetails.id}`}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Meeting passcode :{" "}
                    <span className="text-teal-600">{`${MeetingDetails.meetingPasscode}`}</span>
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    type="button"
                    className="uppercase inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                    onClick={closeModal}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="uppercase inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                    onClick={() => copy(text)}
                  >
                    {`${value ? "COPIED!" : "COPY"}`}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MeetingInfo;
