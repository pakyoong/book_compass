import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

import { useContext } from 'react';
import { AuthContext } from '../User/AuthContext';

const EXPRESS = 'https://book-compass.run.goorm.site';

const LoginAfter = (props) => {
	const { user } = useContext(AuthContext) || {};
	const [setPopularBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchAuthorTerm, setSearchAuthorTerm] = useState('');
	const [bookSearchResult, setBookSearchResult] = useState([]);
	const [authorSearchResult, setAuthorSearchResult] = useState([]);

	useEffect(() => {
		axios
			.get(EXPRESS + '/LoginAfter')
			.then((response) => {
				if (response.data.result !== 'error') {
					setPopularBooks(response.data.popularBooks);
				}
			})
			.catch((error) => {
				console.error(`Error fetching data: ${error}`);
			});
	}, []);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleAuthorSearchChange = (event) => {
		setSearchAuthorTerm(event.target.value);
	};

	const handleSearchSubmit = () => {
		axios
			.get(EXPRESS + `/Book/${searchTerm}`)
			.then((response) => {
				setBookSearchResult(response.data);
			})
			.catch((error) => {
				console.error(`Error fetching data: ${error}`);
			});
	};

	const handleAuthorSearchSubmit = () => {
		axios
			.get(EXPRESS + `/Author/${searchAuthorTerm}`)
			.then((response) => {
				setAuthorSearchResult(response.data);
			})
			.catch((error) => {
				console.error(`Error fetching data: ${error}`);
			});
	};

	return (
		<div>
			<Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
				<Typography variant="h3">Welcome, {user ? user.Nickname : 'Guest'}</Typography>
				<Button variant="contained" color="primary" href="/User">
					View User List
				</Button>
				<Button variant="contained" color="primary" href="/Book">
					View All Books
				</Button>
				<Button variant="contained" color="primary" href="/Author">
					View All Authors
				</Button>
				<Button variant="contained" color="primary" href="/Review">
					View All Reviews
				</Button>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
				<TextField
					id="standard-basic"
					label="Search for Books..."
					onChange={handleSearchChange}
					value={searchTerm}
					style={{ marginRight: '10px', flexGrow: 1 }}
				/>
				<Button variant="contained" color="primary" onClick={handleSearchSubmit}>
					Search Books
				</Button>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
				<TextField
					id="standard-basic-author"
					label="Search for Authors..."
					onChange={handleAuthorSearchChange}
					value={searchAuthorTerm}
					style={{ marginRight: '10px', flexGrow: 1 }}
				/>
				<Button variant="contained" color="primary" onClick={handleAuthorSearchSubmit}>
					Search Authors
				</Button>
			</Box>
			<div>
				<h2>Book Search Results</h2>
				<Grid container spacing={2}>
					{bookSearchResult.map((book, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card>
								<CardContent>
									<CardMedia
										component="img"
										image={`/images/book/${book.BookNumber}.jpg`}
										alt={book.Title}
										sx={{
											height: '400px',
											objectFit: 'fill',
											paddingTop: '0',
										}}
									/>
									<Typography variant="h5">{book.Title}</Typography>
									<Typography>Author: {book.AuthorName}</Typography>
									<Typography>Rating: {book.Rating}</Typography>
									<Typography>Publisher: {book.Publisher}</Typography>
									<Typography>Publication Date: {book.PublicationDate}</Typography>
									<Button
										variant="contained"
										color="primary"
										href={`/Book/${book.BookNumber}/Review`}
									>
										Review
									</Button>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
			<div>
				<h2>Author Search Results</h2>
				<Grid container spacing={2}>
					{authorSearchResult.map((author, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card>
								<CardContent>
									<CardMedia
										component="img"
										image={`/images/Author/${author.AuthorName}.jpg`}
										alt={author.AuthorName}
										sx={{
											height: '350px',
											objectFit: 'fill',
											paddingTop: '0',
										}}
									/>
									<Typography variant="h5">{author.AuthorName}</Typography>
									<Typography>Nationality: {author.Nationality}</Typography>
									<Typography>Birth Year: {author.BirthYear}</Typography>
									<Button
										variant="contained"
										color="primary"
										href={`/Author/${author.AuthorName}/Books`}
									>
										Other Books
									</Button>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default LoginAfter;