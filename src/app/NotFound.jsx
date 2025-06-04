export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-white text-5xl font-medium">Page Not Found!</h1>
        <a className="text-4xl text-orange-500 " href="/">Home Page</a>
      </div>
    </>
  );
}
