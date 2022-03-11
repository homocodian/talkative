import Head from "next/head";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div>
      <Head>
        <title>Profile</title>
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
            <p className="text-xl text-gray-400">Profile</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
