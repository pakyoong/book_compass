import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const EXPRESS = 'https://book-compass.run.goorm.site';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(EXPRESS + '/Review')
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Review List
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} key={review.ReviewNumber}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Title: {review.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.Rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Content: {review.Content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  User ID: {review.UserID}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Book Number: {review.BookNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Review;
