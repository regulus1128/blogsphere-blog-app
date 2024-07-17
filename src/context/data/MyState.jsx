import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';
import { QuerySnapshot, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import { auth } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState(props) {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);
    const [getAllBlog, setGetAllBlog] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log('User details:',user);
            if (user) {
                getAllBlogs(user.uid);
                
            }
            else{
                setGetAllBlog([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const getAllBlogs = (userId) => {
        setLoading(true);

        try {
            const q = query(collection(fireDb, 'blogPost'),
            where('userId', '==', userId),
            orderBy('time'));

            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id })
                });
                setGetAllBlog(blogArray)
                console.log('blogarray: ', blogArray)
                setLoading(false);
            });
            return () => data;
        } 
        catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user) {
            getAllBlogs(user.uid);
        }
    }, [user]);

    const deleteBlogs = async (id) => {
        try {
            await deleteDoc(doc(fireDb, 'blogPost', id))
            setGetAllBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
            toast.success('Blog deleted successfully!');
        } 
        catch (error) {
            toast.error(error);
        }
    }


    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    return (
        <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, getAllBlog, deleteBlogs }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState