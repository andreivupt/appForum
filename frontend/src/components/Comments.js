import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../services/api';
import Nav from "./Nav";

const Comments = () => {
	const [commentsList, setCommentsList] = useState([]);
	const [description, setComment] = useState("");	
	const navigate = useNavigate();
	const { id } = useParams();

	const handleSubmitComment = async (e) => {
		e.preventDefault();
        
		const data = {
            description,
            idUser: localStorage.getItem('@auth:user'),
            idPost: id
        }
        
        const response = await api.post('/comment/create', data);
        
        if (response.data.success) {
            setComment('')
            alert('Comentário criado');
        } else {
            alert('Não foi criado comentário');
            navigate('/dashboard');
        }        
	};

	useEffect(() => {
		const fetchComments = async () => {
            const response = await api.get('/comments/' + id);
            
            if (response.data.success) {                
                console.log(response.data.data);
                setCommentsList(response.data.data);
            } else {
                alert('Não foi criado comentário');
                navigate('/dashboard');
            }		
		};
		fetchComments();
	});

	return (
		<>
		<Nav />
		<main className='replies'>			
			<form className='modal__content' onSubmit={ handleSubmitComment }>
				<label htmlFor='reply'>Novo comentário</label>
				<textarea
					rows={5}
					value={ description }
					onChange={(e) => setComment(e.target.value)}
					type='text'
					name='reply'
					className='modalInput'
				/>

				<button className='modalBtn'>SALVAR</button>
			</form>

			<div className='thread__container'>
				{commentsList.map(( comment ) => (                    
					<div className='thread__item' key={ comment.id }>                        
						<p>{ comment.description }</p>
						<div className='react__container'>
							<p style={{ opacity: "0.5" }}>by { comment.name }</p>
						</div>
					</div>
				))}
			</div>
		</main>
		</>
	);
};

export default Comments;