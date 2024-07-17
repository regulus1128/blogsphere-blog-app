import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/MyState";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import EditBlog from "./pages/admin/editBlog/EditBlog";

function App() {
  return (
    <>
    <div>
      <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster/>
      </Router>
      </MyState>
    </div>
    </>
  )
}

export default App
