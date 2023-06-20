import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Button, Container, Box } from '@mui/material';

const EXPRESS = 'https://book-compass.run.goorm.site';

const UserAdd = () => {
	const [ID, setID] = useState('');
	const [PW, setPW] = useState('');
	const [nickname, setNickname] = useState('');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

	const signUp = () => {
		// Check if ID, PW, or nickname is empty
		if (!ID || !PW || !nickname) {
			setMessage('All fields must be filled out.');
			return; // If any field is empty, stop executing the function
		}

		axios
			.post(EXPRESS + '/User', {
				ID: ID,
				PW: PW,
				Nickname: nickname,
			})
			.then((response) => {
				if (response.data.result === 'success') {
					setMessage('Successfully registered. You can now log in.');
					navigate('/login');
				} else {
					setMessage(response.data.message);
				}
			})
			.catch((error) => {
				setMessage('There was an error processing your request.');
				console.error(error);
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
					회원가입
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
				<TextField
					label="Nickname"
					variant="outlined"
					margin="normal"
					onChange={(e) => setNickname(e.target.value)}
				/>
				<Button variant="contained" color="primary" onClick={signUp} style={{ marginTop: '20px' }}>
					가입하기
				</Button>
				<Typography variant="body1" style={{ marginTop: '20px', color: 'red' }}>
					{message}
				</Typography>
			</Box>
		</Container>
	);
};

export default UserAdd;