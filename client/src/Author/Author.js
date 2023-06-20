import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Button, CardMedia } from '@mui/material';
import axios from 'axios';

const EXPRESS = 'https://book-compass.run.goorm.site';

const Author = () => {
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		axios
			.get(EXPRESS + '/Author')
			.then((response) => {
				setAuthors(response.data);
			})
			.catch((error) => {
				console.error(`Error fetching data: ${error}`);
			});
	}, []);

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Author List
			</Typography>
			<Grid container spacing={4}>
				{authors.map((author) => (
					<Grid item xs={12} sm={6} md={4} key={author.AuthorName}>
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
								<Typography variant="h5" component="div">
									Author: {author.AuthorName}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Nationality: {author.Nationality}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Birth Year: {author.BirthYear}
								</Typography>
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
	);
};

export default Author;