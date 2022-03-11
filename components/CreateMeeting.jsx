import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateMeeting({
  isOpen,
  closeModal,
  title,
  setDuration,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    title: "",
  });

  const onChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: "nice7878",
        displayName: info.name,
        meetingTitle: info.title,
      }),
    };

    // reset states
    setInfo({
      name: "",
      title: "",
    });
    setDuration("00:00:00");

    // create meeting
    const meetingDetails = await fetch(
      "/api/createMeeting",
      requestOptions
    ).then((res) => res.json());

    //  check if meeting created
    if (meetingDetails?.error) {
      setLoading(false);
      closeModal();
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          isOpen: true,
          message: meetingDetails.message,
        },
      });
    } else {
      setLoading(false);
      closeModal();
      dispatch({
        type: "MEETING_DETAILS",
        payload: meetingDetails,
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
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="my-8">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={info.title}
                      onChange={onChange}
                      placeholder="Meeting title"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="my-8">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={info.name}
                      onChange={onChange}
                      placeholder="Others will see you as"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mt-4 flex justify-end items-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="capitalize inline-flex justify-center px-4 py-2 text-sm font-bold text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                    >
                      {loading ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          style={{ fill: "#6b7280" }}
                          className="animate-spin"
                        >
                          <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
                        </svg>
                      ) : (
                        "Next"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
