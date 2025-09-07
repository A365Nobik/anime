import unkPage from "../../assets/unkPage.png"

export default function NotFound() {
  return (
    <>
      <div className="loaded flex flex-col justify-center items-center h-screen">
        <h1 className="text-white text-5xl font-medium">Page Not Found!</h1>
        <img  className="w-64 h-54 m-1" src={unkPage} alt="" />
        <a className="text-4xl text-orange-500 " href="/">
          Home Page
        </a>
      </div>
    </>
  );
}
