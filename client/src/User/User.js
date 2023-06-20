import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const EXPRESS = 'https://book-compass.run.goorm.site';

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(EXPRESS + '/User')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                User List
            </Typography>
            <Grid container spacing={4}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.ID}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Nickname: {user.Nickname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {user.ID}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default User;
