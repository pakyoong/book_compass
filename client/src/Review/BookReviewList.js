import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EXPRESS = 'https://book-compass.run.goorm.site';

const BookReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [bookTitle, setBookTitle] = useState(''); // 새로운 상태 변수 추가
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(EXPRESS + `/Book/${id}/Review`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(`데이터를 가져오는 중 오류가 발생했습니다: ${error}`);
      });
      
    // 도서 제목 가져오기
    axios
      .get(EXPRESS + `/Book/${id}/title`)
      .then((response) => {
        setBookTitle(response.data.Title);
      })
      .catch((error) => {
        console.error(`도서 제목을 가져오는 중 오류가 발생했습니다: ${error}`);
      });
  }, [id]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {bookTitle} 의 리뷰 목록
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.ReviewNumber}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  제목: {review.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  평점: {review.Rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  내용: {review.Content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  사용자 ID: {review.UserID}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  도서 번호: {review.BookNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookReviewList;
