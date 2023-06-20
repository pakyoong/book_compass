import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Button, Box, CardMedia } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EXPRESS = 'https://book-compass.run.goorm.site';

const Book = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(EXPRESS + '/Book')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          Book List
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/Book/add" sx={{ marginRight: '30px' }}>
          Add Book
        </Button>
      </Box>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.BookNumber}>
            <Card>
              <CardMedia
                component="img"
                image={`/images/book/${book.BookNumber}.jpg`}
                alt={book.Title}
                sx={{
                  height: '400px', 
                  objectFit: 'fill',
									paddingTop: '0'
                }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Title: {book.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.AuthorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {book.Rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publisher: {book.Publisher}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publication Date: {book.PublicationDate}
                </Typography>
                <Button variant="contained" color="primary" href={`/Book/${book.BookNumber}/Review`}>
                  Review
                </Button>
								<Button variant="contained" color="primary" href={`/Book/${book.BookNumber}/edit`}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Book;
