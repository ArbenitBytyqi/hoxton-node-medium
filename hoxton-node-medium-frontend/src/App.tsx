import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { PostsDetails } from "./pages/PostsDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:id" element={<PostsDetails />} />
      </Routes>
    </div>
  );
}

export default App;
