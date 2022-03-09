import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Record from "../components/Record";
import Spinner from "../components/Spinner";
import { records } from "../utils/records";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>Talktive | Home </title>
        <meta name="description" content="Talktive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Navbar />
        <main className="w-full">
          <Header />
          <div style={{ height: `calc(100vh - 56px)` }}>
            {isLoading || !records.length ? (
              <Spinner isLoading={isLoading} />
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 w-full px-4 pt-12 py-2">
                {records.map((record, index) => (
                  <Record
                    key={index}
                    title={record.title}
                    timestamp={record.timestamp}
                    duration={record.duration}
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
