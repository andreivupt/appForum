import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { api } from '../services/api';

const Home = () => {
    const [post, setPost] = useState("");
    const [postsList, setPostsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem('@auth:token')) {
                navigate("/");
            } else {
                console.log("Autenticado");
            }
        };
        checkUser();
    }, [navigate]);

    const fetchData = async () => {
        const response = await api.get('/posts');
        console.log(response.data.data);
        setPostsList(response.data.data);
    }
    
    fetchData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            post,
            userId: localStorage.getItem("@auth:user")
        }

        const response = await api.post('/post/create', data);
        
        if (response.data.success) {            
            alert('Post criado com sucesso!');            
        } else {
            alert('Post não criado!')
        }
    };

    return (
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'>Criar um POST</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Título / Descrição</label>
                        <input
                            type='text'
                            name='description'
                            required
                            value={ post }
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </div>
                    <button 
                        className='homeBtn'>
                        CRIAR POST
                    </button>
                </form>

                <div className='thread__container'>
                    {postsList.map((post) => (
                        <div className='thread__item' key={post.id}>
                            <p>{post.description}</p>
                            <div className='react__container'>
                                {/* <Likes numberOfLikes={2} threadId={post.id} />
                                <Comments
                                    numberOfComments={thread.replies.length}
                                    threadId={thread.id}
                                    title={thread.title}
                                /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Home;