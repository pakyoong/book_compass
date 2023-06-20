import './App.css';
import React from 'react';
import Main from './main/main'; // 메인 화면
import Login from './User/Login'; // 로그인 화면
import Signup from './User/User_add'; // 회원가입
import LoginAfter from './main/Login_After'; // 메인 화면(로그인 후)
import User from './User/User'; // 회원 목록 확인
import Book from './Book/Book'; // 도서 목록
import Review from './Review/Review'; // 모든 리뷰 목록
import Author from './Author/Author'; // 작가 목록
import BookReviewList from './Review/BookReviewList'; // 특정 도서에 대한 리뷰 목록
import AuthorBookList from './Book/AuthorBookList'; // 특정 작가에 대한 도서 목록
import AddBook from './Book/Book_add'; // 도서 추가
import EditBook from './Book/Book_edit'; // 도서 편집

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './User/AuthContext';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<h1 className="app-title">Book compass</h1>
					<Routes>
						<Route exact path="/" element={<Main />} />
						<Route exact path="/Login" element={<Login />} />
						<Route exact path="/User/add" element={<Signup />} />
						<Route exact path="/LoginAfter" element={<LoginAfter />} />
						<Route exact path="/User" element={<User />} />
						<Route exact path="/Book" element={<Book />} />
						<Route exact path="/Review" element={<Review />} />
						<Route exact path="/Author" element={<Author />} />
						<Route exact path="/Book/:id/Review" element={<BookReviewList />} />
						<Route exact path="/Author/:name/Books" element={<AuthorBookList />} />
						<Route exact path="/Book/add" element={<AddBook />} />
						<Route exact path="/Book/:id/edit" element={<EditBook />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;