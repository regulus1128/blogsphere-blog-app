import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/MyContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import EditBlog from "../editBlog/EditBlog";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, loading, deleteBlogs } = context;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");

  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("User logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserDisplayName(currentUser.displayName);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    console.log("getAllBlog:", getAllBlog); // Add this line to log getAllBlog
  }, [getAllBlog]);

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-center items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="right">
            <h1
              className="text-center font-mukta text-3xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              {userDisplayName}
            </h1>

            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="text-2xl font-mukta text-center"
            >
              {user ? user.email : "Loading..."}
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-mukta text-xl mt-1 text-center"
            >
              <span>Total Blogs: </span> {getAllBlog.length}
            </h2>
            <div className=" flex gap-2 mt-2">
              <Link to={"/createblog"}>
                <div className=" mb-2">
                  <Button
                    style={{
                      background:
                        mode === "dark"
                          ? "rgb(226, 232, 240)"
                          : "rgb(30, 41, 59)",
                      color: mode === "dark" ? "black" : "white",
                    }}
                    className="px-8 py-2 rounded-3xl w-36 text-sm font-mukta "
                  >
                    Create Blog
                  </Button>
                </div>
              </Link>
              <div className="mb-2">
                <Button
                  onClick={handleLogout}
                  style={{
                    background:
                      mode === "dark"
                        ? "rgb(226, 232, 240)"
                        : "rgb(30, 41, 59)",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  className="px-8 py-2 rounded-3xl w-36 text-sm font-mukta"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Line  */}
        <hr
          className={`border-2
                 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`}
        />

        {/* Table  */}
        <div className="">
          <div className=" container mx-auto px-4 max-w-max my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-3xl">
              {/* table  */}
              <table className="w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                  style={{
                    background: mode === "dark" ? "linear-gradient(to right, #0093E9, #80D0C7)" : "linear-gradient(to right, #ff512f, #dd2476)",
                  }}
                  className="text-base font-mukta"
                >
                  <tr>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      S.No
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Thumbnail
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Title
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Category
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Date
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      
                    </th>
                  </tr>
                </thead>

                {/* tbody  */}
                <tbody>
                    {getAllBlog.map((blog, index) => (
                      <tr
                        key={blog.id}
                        className=""
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                        }}
                      >
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4 font-mukta text-lg"
                        >
                          {index + 1}
                        </td>
                        <th
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          scope="row"
                          className="px-6 py-4 font-medium"
                        >
                          <img
                            className="w-16 rounded-lg"
                            src={blog.thumbnail}
                            alt="thumbnail"
                          />
                        </th>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4 font-mukta text-base"
                        >
                          {blog.title}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4 font-mukta text-base"
                        >
                          {blog.category}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4 mr-3 font-mukta text-base"
                        >
                          {blog.date}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          <Button
                            onClick={() => deleteBlogs(blog.id)}
                            className="px-4 py-1 rounded-3xl mr-1 text-white font-bold h-7 font-mukta  bg-red-600 hover:bg-red-500 w-16"
                          >
                            Delete
                          </Button>
                        </td>
                        <td>

                        <Link to={`/editBlog/${blog.id}`}>
                        <Button
                            className="px-4 py-1 rounded-3xl font-mukta
                            mr-3 text-white font-bold h-7 w-16 bg-green-600 hover:bg-green-500"
                          >
                            Edit
                          </Button>
                  </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
