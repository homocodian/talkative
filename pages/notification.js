import Head from "next/head";
import Navbar from "../components/Navbar";

function Notification() {
  return (
    <div>
      <Head>
        <title>Notification</title>
        <meta
          name="description"
          content="Talkative video conferencing and chat app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Navbar />
        <main className="w-full">
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-xl text-gray-400">No notification to show</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notification;
