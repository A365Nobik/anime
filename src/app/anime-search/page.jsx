import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalAnime from "../../components/ModalAnime";

export default function Page() {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [headerBg, setHeaderBg] = useState(false);
  const [searchData, setSearchData] = useState(null);
  async function findAnimeName() {
    const value = inputRef.current.value;
    navigate(`/result?q=${encodeURIComponent(value)}`);
  }
  function handleModalClick(element) {
    setSelectedAnime(element);
    setModal(true);
  }
  useEffect(() => {
    const findAnime = async () => {
      const response = await fetch(
        `${apiUrl}/anime?filter[text]=${searchParams.get("q")}`
      );
      if (response.ok) {
        const json = await response.json();
        setSearchData(json.data);
      }
    };
    findAnime();
  }, []);
  useEffect(() => {
    document.querySelector("body").classList.add("overflow-hidden");
  }, []);
  console.log(searchData);
  return (
    <>
      <header
        onMouseEnter={() => setHeaderBg(true)}
        onMouseLeave={() => setHeaderBg(false)}
        className={`sticky flex justify-between items-center w-full p-4 text-[#EAEFEF] z-1000 transition-colors ${
          headerBg ? " bg-gray-800" : ""
        }`}
      >
        <h1 className="text-4xl font-medium">
          Result Of Find For {searchParams.get("q")}
        </h1>
        <a className="text-4xl font-medium" href="/">
          Home
        </a>
        <div className="flex justify-center items-center">
          <h1 className="mr-10 text-3xl font-medium">Search An Anime</h1>
          <div
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`flex justify-center items-center gap-2 ${
              focus ? " bg-[#F5C45E]" : " bg-orange-500"
            }  p-1 text-3xl rounded-lg transition-colors`}
          >
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  findAnimeName();
                }
              }}
              ref={inputRef}
              type="text"
              placeholder="Anime Name"
              className="outline-0 w-200 bg-[#EAEFEF] p-0.5 placeholder:text-[#333446] text-[#333446] placeholder:font-medium font-medium focus:border-purple-500  rounded-sm"
            />
            <button
              onClick={findAnimeName}
              className="hover:scale-110 active:scale-90 transition-transform "
            >
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
      </header>
      <main>
        <ul className="grid grid-cols-10 gap-2  justify-center items-center mt-35">
          {searchData && searchData.length > 0 ? (
            searchData.map((element) => {
              return (
                <li key={element.id}>
                  <div
                    className="flex flex-col justify-center items-center transition-transform hover:scale-110 cursor-pointer"
                    onClick={() => handleModalClick(element)}
                  >
                    <span className="flex flex-col items-start justify-center">
                      <img
                        className="w-50 h-65 rounded-lg"
                        src={element.attributes.posterImage.original}
                        alt="posterImage"
                      />
                      <h1 className="text-lg text-center text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {element.attributes.canonicalTitle.length > 15
                          ? element.attributes.canonicalTitle.slice(0, 15) +
                            "..."
                          : element.attributes.canonicalTitle}
                      </h1>
                    </span>
                  </div>
                </li>
              );
            })
          ) : (
            ""
          )}
        </ul>
        {searchData===undefined || searchData===null ?(
                      <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
              <h1 className=" r">Anime Data Is Loading</h1>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </span>
        ):""}
        {searchData?.length === 0 ? (
          <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
            <h1 className=" r">
              Can`t Find Anime With Name {searchParams.get("q")}
            </h1>
          </span>
        ) : (
          ""
        )}
        {modal ? (
          <span className="flex justify-center items-center relative bottom-100 w-screen h-screen">
            <ModalAnime setModal={setModal} anime={selectedAnime} />
          </span>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
