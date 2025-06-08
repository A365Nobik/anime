import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
export default function Header({ page }) {
  const [headerBg, setHeaderBg] = useState(false);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [pageH1, setPageH1] = useState(``);
  let navigate = useNavigate();

  async function findAnimeName() {
    const value = inputRef.current.value;
    navigate(`/result?q=${value}`);
  }
  useEffect(() => {
    switch (page) {
      case "home": {
        setPageH1("Welcome To Anime Hub");
        break;
      }
      case "search": {
        setPageH1(`Result For ${searchParams.get("q")}`);
        break;
      }
      case "info": {
        setPageH1(`Info About ${searchParams.get("q").length>40?searchParams.get("q").slice(0,10)+`...`:searchParams.get("q")}`);
        break;
      }
    }
  }, [page, searchParams]);
  return (
    <>
      <header
        onMouseEnter={() => setHeaderBg(true)}
        onMouseLeave={() => setHeaderBg(false)}
        className={` sticky flex  justify-between items-center w-full p-4 text-[#EAEFEF] z-1000 transition-colors duration-500  delay-100 max-md:p-2 max-sm:justify-center  ${
          headerBg ? " bg-gray-800" : ""
        } `}
      >
        <h1 className="text-4xl font-medium text-center max-xl:text-2xl max-lg:text-xl max-md:w-35 max-sm:hidden max-md:hidden">{pageH1}</h1>
        {page !== "home" ? (
          <>
            <a className="text-4xl font-medium max-xl:text-2xl max-lg:text-xl max-lg:mr-2.5" href="/">
              Home
            </a>
          </>
        ) : (
          ""
        )}
        <div className="flex justify-center items-center">
          <h1 className="mr-5 text-3xl font-medium max-xl:text-2xl max-lg:text-xl max-lg:mr-2.5 max-s:mr-0 max-s:text-center max-m:hidden">Search An Anime</h1>
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
              className="outline-0  bg-[#EAEFEF] p-0.5 placeholder:text-[#333446] text-[#333446] placeholder:font-medium font-medium focus:border-purple-500  rounded-sm header-input 2xl:w-200 max-lg:text-2xl max-lg:p-0 max-md:text-xl max-md:w-50 "
            />
            <button
              onClick={findAnimeName}
              className="hover:scale-110 active:scale-90 transition-transform cursor-pointer max-md: text-2xl"
            >
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
