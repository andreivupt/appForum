import React, { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comment";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { api } from '../services/api';

const Home = () => {
    const [post, setPost] = useState("");
    const [image, setImage] = useState();
    const [postsList, setPostsList] = useState([]);
    const navigate = useNavigate();
    const images = 'http://localhost:3001/uploads/';

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem('@auth:token')) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);

    const fetchData = async () => {
        const response = await api.get('/posts');        
        setPostsList(response.data.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        //e.preventDefault();
        
        let formData = new FormData();
        //formData.append('image', image.data);        
        
        formData.append('post', post);
        formData.append('userId', localStorage.getItem("@auth:user"));
        formData.append('file', image);
        
        console.log(formData);
        const response = await api.post('/post/create', formData);
        
        if (response.data.success) {    
            setPost('')        
            alert('Post criado com sucesso!');
            fetchData();         
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

                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            multiple={false}
                            onChange={ (e) => setImage(e.target.files[0]) } 
                        />

                    </div>
                    <button 
                        className='homeBtn'>
                        CRIAR POST
                    </button>
                </form>

                <div className='thread__container'>
                    {postsList.map((post) => {                        
                        return <>
                            <div className='thread__item' key={ post.id }>
                                <p>{ post.description }</p>
                                <div className='react__container'>
                                    <Likes 
                                        numberOfLikes={ post.likes } 
                                        postId={ post.id }
                                        setPostsList={ setPostsList }
                                    />
                                    <Comments
                                        numberOfComments={ post.comments }
                                        postId={ post.id }
                                        title={ post.description }
                                    />
                                </div>
                            </div>
                            
                            { post.image ? 
                            <div className='thread__item'>                                    
                                <img src={ images + post.image} alt="img" height={100} width={100}/>
                            </div> :
                            <div></div>
                        }
                        
                        </>;
                    })}
                </div>
            </main>
        </>
    );
};

export default Home;