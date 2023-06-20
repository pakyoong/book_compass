import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { Typography, Container, Box } from '@mui/material';

const Main = () => {
	const navigate = useNavigate();

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					marginTop: '16vh',
				}}
			>
				<Typography
					variant="h3"
					component="h3"
					gutterBottom
					style={{ fontWeight: 'bold', color: '#000000' }}
					sx={{ marginBottom: '30px' }}
				>
					독서 나침반
				</Typography>
				<Typography variant="h5" component="h5" gutterBottom>
					책의 세계로 떠나는 가장 빠른 나침반!
				</Typography>
				<Typography variant="h5" component="h5" gutterBottom>
					독서 나침반과 함께 펼치는 새로운 독서의 세계!
				</Typography>
				<Typography variant="h5" component="h5" gutterBottom>
					<Typography variant="inherit">
						책에 대한 리뷰를 작성하고 확인할 수 있는 도서 리뷰 사이트!
					</Typography>
				</Typography>
				<Button
					variant="contained"
					onClick={() => navigate('/Login')}
					style={{ marginTop: '20px', fontSize: '1.5rem', padding: '16px 24px' }}
					className="large-button"
				>
					로그인
				</Button>
				<Button
					variant="contained"
					onClick={() => navigate('/User/add')}
					style={{ marginTop: '20px', fontSize: '1.5rem', padding: '16px 24px' }}
					className="large-button"
				>
					회원가입
				</Button>
			</Box>
		</Container>
	);
};

export default Main;