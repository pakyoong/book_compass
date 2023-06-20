import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Button, Container, Box } from '@mui/material';

const EXPRESS = 'https://book-compass.run.goorm.site';

const Login = () => {
	const [ID, setID] = useState('');
	const [PW, setPW] = useState('');
	const [loginStatus, setLoginStatus] = useState('');
	const { setIsLoggedIn, setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const login = () => {
		axios
			.post(EXPRESS + '/Login', {
				ID: ID,
				PW: PW,
			})
			.then((response) => {
				if (response.data.message) {
					setLoginStatus(response.data.message);
				} else if (response.data.user) {
					setLoginStatus('로그인 성공!');
					setIsLoggedIn(true);
					setUser(response.data.user); // Save the user data into the context
					navigate('/LoginAfter');
				} else {
					setLoginStatus('로그인에 실패했습니다. 다시 시도해주세요.');
				}
			})
			.catch((error) => {
				setLoginStatus('로그인에 실패했습니다. 다시 시도해주세요.');
				console.log(error);
			});
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				height: '100vh',
				marginTop: '10vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
				}}
			>
				<Typography variant="h4" gutterBottom>
					로그인
				</Typography>
				<TextField
					label="ID"
					variant="outlined"
					margin="normal"
					onChange={(e) => setID(e.target.value)}
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					margin="normal"
					onChange={(e) => setPW(e.target.value)}
				/>
				<Button variant="contained" color="primary" onClick={login} style={{ marginTop: '20px' }}>
					로그인
				</Button>
				<Typography variant="body1" style={{ marginTop: '20px', color: 'red' }}>
					{loginStatus}
				</Typography>
			</Box>
		</Container>
	);
};

export default Login;