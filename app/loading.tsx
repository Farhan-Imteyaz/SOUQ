import "./globals.css";
const Loading = () => {
  return (
    <div className="w-screen h-screen bg-white fixed inset-0 flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;

const Spinner = () => {
  return (
    <svg className="spinner" viewBox="0 0 40 40" width="40" height="40">
      <circle
        className="spinner-track"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
      />
      <circle
        className="spinner-car"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
};
