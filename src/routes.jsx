import { Route, Routes } from "react-router-dom";
import Home from "./app/home/page";
import NotFound from "./app/NotFound";
import SearchResult from "./app/anime-search/page";
import AnimeInfo from "./app/anime-info/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/result*" element={<SearchResult />}></Route>
      <Route path="/info*" element={<AnimeInfo />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
