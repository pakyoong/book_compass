import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EXPRESS = 'https://book-compass.run.goorm.site';

const EditBook = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [rating, setRating] = useState('');
	const [publisher, setPublisher] = useState('');
	const [publicationDate, setPublicationDate] = useState('');

	useEffect(() => {
		axios
			.get(`${EXPRESS}/Book/${id}/title`)
			.then((response) => {
				const book = response.data;
				setTitle(book.Title);
				setAuthorName(book.AuthorName);
				setRating(book.Rating);
				setPublisher(book.Publisher);
				setPublicationDate(book.PublicationDate);
			})	
			.catch((error) => {
				console.error(`Error fetching book data: ${error}`);
			});
	}, [id]);

	const handleEditBook = () => {
		axios
			.get(`${EXPRESS}/Author/${authorName}`)
			.then((response) => {
				const author = response.data;
				if (!author) {
					return axios.post(`${EXPRESS}/Author`, {
						AuthorName: authorName,
						Nationality: '',
						BirthYear: null,
					});
				}
				return Promise.resolve();
			})
			.then(() => {
				return axios.put(`${EXPRESS}/Book/${id}/edit`, {
					Title: title,
					AuthorName: authorName,
					Rating: rating,
					Publisher: publisher,
					PublicationDate: publicationDate,
				});
			})
			.then((response) => {
				console.log('도서 수정 성공:', response.data);
				// 도서 수정 성공 시 필요한 처리를 수행하세요.
				navigate('/Book');
			})
			.catch((error) => {
				console.error(`도서 수정 중 오류 발생: ${error}`);
				// 오류 처리를 수행하세요.
			});
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				도서 수정
			</Typography>
			<TextField
				id="title"
				label="도서 제목"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				id="authorName"
				label="작가 이름"
				value={authorName}
				onChange={(e) => setAuthorName(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				id="rating"
				label="평점"
				type="number"
				value={rating}
				onChange={(e) => setRating(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				id="publisher"
				label="출판사"
				value={publisher}
				onChange={(e) => setPublisher(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				id="publicationDate"
				label="출판일"
				type="date"
				value={publicationDate}
				onChange={(e) => setPublicationDate(e.target.value)}
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleEditBook}
				style={{ marginTop: '20px' }}
			>
				도서 수정
			</Button>
		</div>
	);
};

export default EditBook;
