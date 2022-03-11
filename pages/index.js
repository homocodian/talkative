import { collection, query, where } from "firebase/firestore";
import Head from "next/head";
import { useCollection } from "react-firebase-hooks/firestore";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Record from "../components/Record";
import Spinner from "../components/Spinner";
import { db } from "../config/firebase";

export default function Home() {
  const [meetingRecords, loading, _] = useCollection(
    query(collection(db, "meetings"), where("meetingClosed", "==", true))
  );
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Talkative video conferencing and chat app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Navbar />
        <main className="w-full">
          <Header />
          <div style={{ height: `calc(100vh - 56px)`, overflowY: "auto" }}>
            {loading || !meetingRecords?.docs?.length ? (
              <Spinner showLoader={loading} />
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 w-full px-4 pt-10 py-4">
                {meetingRecords.docs.map((record) => (
                  <Record
                    key={record.id}
                    id={record.id}
                    title={record.data().meetingTitle}
                    timestamp={record.data().createdAt}
                    duration={record.data().duration}
                    totalPersons={record.data().persons.length}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
