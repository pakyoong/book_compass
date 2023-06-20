import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, CardMedia } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EXPRESS = 'https://book-compass.run.goorm.site';

const AuthorBookList = () => {
  const [books, setBooks] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(EXPRESS + `/Author/${name}/Books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(`데이터를 가져오는 중 오류가 발생했습니다: ${error}`);
      });
  }, [name]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
				{name} 작가의 도서 목록
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.BookNumber}>
            <Card>
              <CardContent>
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
                <Typography variant="h5" component="div">
                  제목: {book.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  작가: {book.AuthorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  평점: {book.Rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  출판사: {book.Publisher}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  출간일: {book.PublicationDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AuthorBookList;
