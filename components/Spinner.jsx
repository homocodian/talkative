function Spinner({ isLoading }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        {isLoading ? (
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
          <p className="text-lg text-gray-300">No data show 😞</p>
        )}
      </div>
    </div>
  );
}

export default Spinner;
