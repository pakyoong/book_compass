import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EXPRESS = 'https://book-compass.run.goorm.site';

const AddBook = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [rating, setRating] = useState('');
	const [publisher, setPublisher] = useState('');
	const [publicationDate, setPublicationDate] = useState('');

	const handleAddBook = () => {
		axios
			.get(`${EXPRESS}/Author/${authorName}`)
			.then((response) => {
				const author = response.data;
				if (!author) {
					// 새로운 작가인 경우 작가 정보를 추가
					return axios.post(`${EXPRESS}/Author`, {
						AuthorName: authorName,
						Nationality: '',
						BirthYear: null,
					});
				}
				return Promise.resolve();
			})
			.then(() => {
				// 도서 추가 요청
				return axios.post(`${EXPRESS}/Book`, {
					Title: title,
					AuthorName: authorName,
					Rating: rating,
					Publisher: publisher,
					PublicationDate: publicationDate,
				});
			})
			.then((response) => {
				console.log('도서 추가 성공:', response.data);
				navigate('/Book');
			})
			.catch((error) => {
				console.error(`도서 추가 중 오류 발생: ${error}`);
			});
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				도서 추가
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
				onClick={handleAddBook}
				style={{ marginTop: '20px' }}
			>
				도서 추가
			</Button>
		</div>
	);
};

export default AddBook;
