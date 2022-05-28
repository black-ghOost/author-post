import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<SinglePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
