import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Editor } from '@tinymce/tinymce-react';
import myContext from '../../../context/data/MyContext';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireDb, storage } from '../../../firebase/FirebaseConfig';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import {
    Button,
    Typography,
} from "@material-tailwind/react";


const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

const EditBlog = () => {
    const { id } = useParams();
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
        thumbnail: ''
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [text, setText] = useState('');


    useEffect(() => {
        const fetchBlog = async () => {
            const docRef = doc(fireDb, 'blogPost', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setBlogs(docSnap.data());
            } else {
                toast.error('Blog not found');
                navigate('/dashboard');
            }
        };
        fetchBlog();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogs((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (content) => {
        setBlogs((prev) => ({
            ...prev,
            content
        }));
    };

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blogs.title || !blogs.category || !blogs.content) {
            toast.error('Please fill all fields');
            return;
        }

        let thumbnailUrl = blogs.thumbnail;
        if (thumbnail) {
            const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
            const snapshot = await uploadBytes(imageRef, thumbnail);
            thumbnailUrl = await getDownloadURL(snapshot.ref);
        }

        const updatedBlog = {
            ...blogs,
            thumbnail: thumbnailUrl
        };

        try {
            await updateDoc(doc(fireDb, 'blogPost', id), updatedBlog);
            toast.success('Blog updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Error updating blog:', error.message);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl py-6">
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? 'linear-gradient(to right, #0093E9, #80D0C7)'
                    : 'linear-gradient(to right, #ff512f, #dd2476)',
                borderBottom: mode === 'dark'
                    ? ' 4px solid rgb(226, 232, 240)'
                    : ' 4px solid rgb(30, 41, 59)'
            }}>
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>
                        <Typography variant="h4" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            Edit Blog
                        </Typography>
                    </div>
                </div>

                <div className="mb-3 flex flex-col items-center">
                    {thumbnail && (
                        <img className="w-full rounded-md mb-3" src={URL.createObjectURL(thumbnail)} alt="thumbnail" />
                    )}
                    <input
                        type="file"
                        className=" placeholder-black w-full rounded-3xl pl-3 pt-2 h-11"
                        style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                        onChange={handleThumbnailChange}
                    />
                </div>

                <div className="mb-3 flex flex-col items-center">
                    <input
                        label="Enter your Title"
                        className={`w-full rounded-3xl p-2.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
                        placeholder="Enter Your Title"
                        style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                        name="title"
                        value={blogs.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 flex flex-col items-center">
                    <input
                        label="Enter your Category"
                        className={`w-full rounded-3xl p-2.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
                        placeholder="Enter Your Category"
                        style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                        name="category"
                        value={blogs.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 flex flex-col items-center">
                    <textarea name="content" cols="30" rows="10" className={`w-full rounded-3xl p-5 resize-none
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        placeholder="Enter Your Content..."
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }} value={stripHtmlTags(blogs.content)} onChange={(e) => handleEditorChange(e.target.value)}>

                    </textarea>

                </div>


                <Button
                    className="w-full mt-5 rounded-3xl font-mukta text-base"
                    onClick={handleSubmit}
                    style={{
                        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                        color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
                    }}
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default EditBlog;
