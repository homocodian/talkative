function Video() {
  return (
    <div className="flex-grow my-4 rounded-md bg-gray-200">
      <div className="grid"></div>
      <video
        src="/assets/sample.mp4"
        autoPlay
        style={{ maxHeight: "356px" }}
        muted
      ></video>
    </div>
  );
}

export default Video;
