import React, { useState, useContext } from 'react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import myContext from '../../../context/data/MyContext';
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireDb, storage, auth } from '../../../firebase/FirebaseConfig';





function CreateBlog() {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
        time: Timestamp.now(),
    });

    const [thumbnail, setThumbnail] = useState();

    const [text, setText] = useState('');

    const addPost = async () => {
        if (blogs.title === "" || blogs.category === "" || blogs.content === "" || blogs.thumbnail === "") {
            toast.error('Please Fill All Fields');
        }
        uploadImage();
    }

    const uploadImage = () => {
        if (!thumbnail) return;

        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
        uploadBytes(imageRef, thumbnail).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                try {
                    const user = auth.currentUser;
    
                    if(!user){
                        throw new Error('User not authenticated!');
                    }
    
                    const blogData = {
                        ...blogs,
                        thumbnail: url,
                        userId: user.uid,
                        time: Timestamp.now(),
                        date: new Date().toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: "numeric",
                        }),
                    };
    
                    const productRef = collection(fireDb, "blogPost");
                    await addDoc(productRef, blogData);
                    navigate('/dashboard');
                    toast.success('Post added successfully!');
            }

            catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        });
    });
}

    // console.log("Value: ",);
    // console.log("text: ", text);

    // Create markup function 
    function createMarkup(c) {
        return { __html: c };
    }

    return (
        <div className='container mx-auto max-w-5xl py-6'>
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? 'linear-gradient(to right, #0093E9, #80D0C7)'
                    : 'linear-gradient(to right, #ff512f, #dd2476)',
                borderBottom: mode === 'dark'
                    ? ' 4px solid rgb(226, 232, 240)'
                    : ' 4px solid rgb(30, 41, 59)'
            }}>
                {/* Top Item  */}
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        {/* Dashboard Link  */}
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>

                        {/* Text  */}
                        <Typography
                            variant="h4" className='font-mukta'
                            style={{
                                color: mode === 'dark'
                                    ? 'black'
                                    : 'white'
                            }}
                        >
                            Create blog
                        </Typography>
                    </div>
                </div>

                {/* main Content  */}
                <div className="mb-3 flex flex-col items-center">
                    {/* Thumbnail  */}
                    {thumbnail && <img className="w-full rounded-md mb-3"
                        src={thumbnail
                            ? URL.createObjectURL(thumbnail)
                            : ""}
                        alt="thumbnail"
                    />}

                    {/* Text  */}
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-semibold font-mukta"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                        
                    </Typography>

                    {/* First Thumbnail Input  */}
                    <input
                        type="file"
                        label="Upload thumbnail"
                        className="placeholder-black w-full rounded-3xl 
                        pl-3 pt-2 h-11"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </div>

                {/* Second Title Input */}
                <div className="mb-3 flex flex-col items-center">
                    <input
                        label="Enter your Title"
                       className={`w-full rounded-3xl p-2.5 
                 outline-none ${mode === 'dark'
                 ? 'placeholder-black'
                 : 'placeholder-black'}`}
                        placeholder="Enter Your Title"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="title"
                        value={blogs.title}
                        onChange={(e) => setBlogs({ ...blogs, title: e.target.value})}
                    />
                </div>

                {/* Third Category Input  */}
                <div className="mb-3 flex flex-col items-center">
                    <input
                        label="Enter your Category"
                        className={`w-full rounded-3xl p-2.5 
                 outline-none ${mode === 'dark'
                 ? 'placeholder-black'
                 : 'placeholder-black'}`}
                        placeholder="Enter Your Category"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="category"
                        value={blogs.category}
                        onChange={(e) => setBlogs({ ...blogs, category: e.target.value})}
                    />
                </div>

                {/* Four Editor  */}
                <div className="mb-3 flex flex-col items-center">
                    <textarea
                        className={`w-full rounded-3xl p-5 resize-none
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        placeholder="Enter Your Content..."
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="content"
                        value={blogs.content}
                        onChange={(e) => setBlogs({ ...blogs, content: e.target.value })}
                        rows={10}
                    />
                </div>

                {/* Five Submit Button  */}
                <Button className=" w-full mt-5 rounded-3xl font-mukta text-base"
                onClick={addPost}
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)',
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}
                >
                    Submit
                </Button>

                {/* Six Preview Section  */}
                <div className="mt-3">
                    <h1 className="text-center mb-3 font-mukta text-xl" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>Preview</h1>
                    <div className="content">
                    <div
                        className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === 'dark' ? '[&>h1]:text-black' : '[&>h1]:text-white'}

                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${mode === 'dark' ? '[&>h2]:text-black' : '[&>h2]:text-white'}

                        [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${mode === 'dark' ? '[&>h3]:text-black' : '[&>h3]:text-white'}

                        [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                        ${mode === 'dark' ? '[&>h4]:text-black' : '[&>h4]:text-white'}

                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${mode === 'dark' ? '[&>h5]:text-black' : '[&>h5]:text-white'}

                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${mode === 'dark' ? '[&>h6]:text-black' : '[&>h6]:text-white'}

                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === 'dark' ? '[&>p]:text-[#000000]' : '[&>p]:text-white'}

                        [&>ul]:list-disc [&>ul]:mb-2
                        ${mode === 'dark' ? '[&>ul]:text-black' : '[&>ul]:text-white'}

                        [&>ol]:list-decimal [&>li]:mb-10
                        ${mode === 'dark' ? '[&>ol]:text-black' : '[&>ol]:text-white'}

                        [&>li]:list-decimal [&>ol]:mb-2
                        ${mode === 'dark' ? '[&>ol]:text-black' : '[&>ol]:text-white'}

                        [&>img]:rounded-lg
                        `}
                         dangerouslySetInnerHTML={createMarkup(blogs.content)}>
                    </div>
            </div>
        </div >
            </div >
        </div >
    )
}

export default CreateBlog