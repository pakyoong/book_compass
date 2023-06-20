import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

import dbconf from './conf/auth.js';

const app = express();
const port = 3010;

const db = mysql.createConnection(dbconf);

db.connect();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ result: 'success' });
});

// 로그인
app.post('/Login', (req, res) => {
	const { ID, PW } = req.body;

	const sql = 'SELECT * FROM User WHERE ID = ? AND PW = ?';
	const values = [ID, PW];

	db.query(sql, values, (err, rows) => {
		if (err) {
			console.log(err);
			res.json({ result: 'error' });
		} else if (rows.length > 0) {
			res.json({ user: rows[0] }); // Modify this line
		} else {
			res.json({ message: '로그인에 실패했습니다. 다시 시도해주세요.' });
		}
	});
});

// 회원가입(유저 추가)
app.post('/User', (req, res) => {
	const sql = 'INSERT INTO User (ID, PW, Nickname) VALUES (?, ?, ?)';
	const values = [req.body.ID, req.body.PW, req.body.Nickname];
	db.query(sql, values, (err, result) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json({ result: 'success' });
	});
});

// 로그인 후 메인화면 -> 최신 리뷰와 인기 도서 확인
app.get('/LoginAfter', (req, res) => {
	let sql =
		'SELECT book.id, book.title, book.author, book.thumbnail, COUNT(review.id) as review_count, AVG(review.rating) as avg_rating ' +
		'FROM book LEFT JOIN review ON book.id = review.book_id ' +
		'GROUP BY book.id ' +
		'ORDER BY review_count DESC, avg_rating DESC ' +
		'LIMIT 10; ';

	db.query(sql, (err, result1) => {
		if (err) {
			console.log(err);
			res.json({ result: 'error' });
		} else {
			sql =
				'SELECT review.id, review.content, review.created_at, user.username, book.title ' +
				'FROM review LEFT JOIN user ON review.user_id = user.id ' +
				'LEFT JOIN book ON review.book_id = book.id ' +
				'ORDER BY created_at DESC ' +
				'LIMIT 10; ';

			db.query(sql, (err, result2) => {
				if (err) {
					console.log(err);
					res.json({ result: 'error' });
				} else {
					res.json({ popularBooks: result1, recentReviews: result2 });
				}
			});
		}
	});
});

// 유저(닉네임) 찾기
app.get('/User/:id', (req, res) => {
	const id = req.params.id;
	const sql = 'SELECT * FROM User WHERE Nickname = ?';
	db.query(sql, [id], (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

// 모든 유저 목록
app.get('/User', (req, res) => {
	const sql = 'select * from User';
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

// 회원정보 수정
app.put('/User/:id', (req, res) => {
	const sql = 'UPDATE User SET PW = ?, Nickname = ? WHERE ID = ?';
	const values = [req.body.PW, req.body.Nickname, req.params.id];
	db.query(sql, values, (err, result) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json({ result: 'success' });
	});
});

// 회원 삭제
app.delete('/User/:id', (req, res) => {
	const sql = 'DELETE FROM User WHERE ID = ?';
	db.query(sql, [req.params.id], (err, result) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json({ result: 'success' });
	});
});

// 모든 도서 목록 + 평균 평점
app.get('/Book', (req, res) => {
	const sql =
		'SELECT Book.*, AVG(Review.Rating) as AverageRating FROM Book LEFT JOIN Review ON Book.BookNumber = Review.BookNumber GROUP BY Book.BookNumber';
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

// 도서 검색
app.get('/Book/:query', (req, res) => {
	const query = req.params.query;
	const sql = 'SELECT * FROM Book WHERE Title LIKE ?';
	db.query(sql, [`%${query}%`], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving books');
		} else {
			res.json(rows);
		}
	});
});

// 특정 도서 정보 조회
app.get('/Book/:id/title', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'SELECT * FROM Book WHERE BookNumber = ?';
	db.query(sql, [id], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving book');
		} else {
			if (rows.length > 0) {
				res.json(rows[0]);
			} else {
				res.status(404).send('Book not found');
			}
		}
	});
});

// 도서 추가
app.post('/Book', (req, res) => {
	const sql =
		'INSERT INTO Book (Title, AuthorName, Rating, Publisher, PublicationDate) VALUES (?, ?, ?, ?, ?)';
	const values = [
		req.body.Title,
		req.body.AuthorName,
		req.body.Rating,
		req.body.Publisher,
		req.body.PublicationDate,
	];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error adding book');
		} else {
			res.status(200).send('Book added successfully');
		}
	});
});

// 도서 수정
app.put('/Book/:id/edit', (req, res) => {
	const id = parseInt(req.params.id);
	const sql =
		'UPDATE Book SET Title=?, AuthorName=?, Rating=?, Publisher=?, PublicationDate=? WHERE BookNumber=?';
	const book = [
		req.body.Title,
		req.body.AuthorName,
		req.body.Rating,
		req.body.Publisher,
		req.body.PublicationDate,
		id,
	];
	db.query(sql, book, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error updating book');
		} else {
			res.status(200).send('Book updated successfully');
		}
	});
});

// 도서 삭제
app.delete('/Book/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'delete from Book where BookNumber=?';
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error deleting book');
		} else {
			res.status(200).send('Book deleted successfully');
		}
	});
});

// 모든 리뷰 목록
app.get('/Review', (req, res) => {
	const sql = 'select * from Review';
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

// 리뷰 검색
app.get('/Review/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'select * from Review where ReviewNumber=?';
	db.query(sql, [id], (err, rows) => {
		if (err) {
			res.json({ result: 'error' });
			return console.log(err);
		}
		res.json(rows);
	});
});

// 특정 도서에 대한 리뷰 목록
app.get('/Book/:id/Review', (req, res) => {
	const bookId = req.params.id;
	const query = 'SELECT * FROM Review WHERE BookNumber = ?';
	db.query(query, [bookId], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving book reviews');
		} else {
			res.json(rows);
		}
	});
});

// 특정 도서에 대한 리뷰 추가
app.post('/Book/:id/Review', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'insert into Review (ReviewContent, BookNumber) values (?,?)';
	const Review = [req.body.ReviewContent, id];
	db.query(sql, Review, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error adding review');
		} else {
			res.status(200).send('Review added successfully');
		}
	});
});

// 리뷰 수정
app.put('/Review/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'update Review set ReviewContent=? where ReviewNumber=?';
	const Review = [req.body.ReviewContent, id];
	db.query(sql, Review, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error updating review');
		} else {
			res.status(200).send('Review updated successfully');
		}
	});
});

// 리뷰 삭제
app.delete('/Review/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'DELETE FROM Review WHERE ReviewNumber = ?';
	db.query(sql, [id], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error delete');
		} else {
			res.status(200).send('delete success');
		}
	});
});

// 특정 리뷰에 대한 댓글 목록 확인
app.get('/Review/:id/Comments', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'SELECT * FROM Comment WHERE ReviewId = ?';
	db.query(sql, [id], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving comments');
		} else {
			res.json(rows);
		}
	});
});

// 특정 리뷰에 댓글 추가
app.post('/Review/:id/Comments', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'INSERT INTO Comment (UserId, ReviewId, Content) VALUES (?, ?, ?)';
	const values = [req.body.UserId, id, req.body.Content];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error adding comment');
		} else {
			res.status(200).send('Comment added successfully');
		}
	});
});

// 댓글 삭제
app.delete('/Comments/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const sql = 'DELETE FROM Comment WHERE CommentId = ?';
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error deleting comment');
		} else {
			res.status(200).send('Comment deleted successfully');
		}
	});
});

// 작가 검색
app.get('/Author/:query', (req, res) => {
	const query = req.params.query;
	const sql = 'SELECT * FROM Author WHERE AuthorName LIKE ?';
	db.query(sql, [`%${query}%`], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving authors');
		} else {
			res.json(rows);
		}
	});
});

// 모든 작가 목록 출력
app.get('/Author', (req, res) => {
	const sql = 'SELECT * FROM Author';
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving authors');
		} else {
			res.json(rows);
		}
	});
});

// 특정 작가의 모든 도서 목록
app.get('/Author/:name/Books', (req, res) => {
	const authorName = req.params.name;
	const query = 'SELECT * FROM Book WHERE AuthorName = ?';
	db.query(query, [authorName], (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving books by author');
		} else {
			res.json(rows);
		}
	});
});

// 작가 추가
app.post('/Author', (req, res) => {
	const sql = 'INSERT INTO Author (AuthorName, Nationality, BirthYear) VALUES (?, ?, ?)';
	const values = [req.body.AuthorName, req.body.Nationality, req.body.BirthYear];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error adding author');
		} else {
			res.status(200).send('Author added successfully');
		}
	});
});

// 작가 수정
app.put('/Author/:name', (req, res) => {
	const sql = 'UPDATE Author SET Nationality = ?, BirthYear = ? WHERE AuthorName = ?';
	const values = [req.body.Nationality, req.body.BirthYear, req.params.name];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error updating author');
		} else {
			res.status(200).send('Author updated successfully');
		}
	});
});

// 작가 삭제
app.delete('/Author/:name', (req, res) => {
	const sql = 'DELETE FROM Author WHERE AuthorName = ?';
	db.query(sql, [req.params.name], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error deleting author');
		} else {
			res.status(200).send('Author deleted successfully');
		}
	});
});

// 책, 리뷰, 그리고 해당 리뷰에 대한 댓글 얻기
app.get('/BookReviewComments', (req, res) => {
	const sql =
		'SELECT \
        Book.Title AS BookTitle, \
        Review.Title AS ReviewTitle, \
        Comment.Content AS CommentContent \
        FROM Book \
        INNER JOIN Review ON Book.BookNumber = Review.BookNumber \
        INNER JOIN Comment ON Review.ReviewNumber = Comment.ReviewNumber';

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving book review comments');
		} else {
			res.json(rows);
		}
	});
});

// 사용자, 책, 그리고 해당 사용자가 작성한 리뷰에 대한 정보 얻기
app.get('/UserReviews', (req, res) => {
	const sql =
		'SELECT \
        User.ID AS UserID, \
        User.Nickname AS UserNickname, \
        Book.Title AS BookTitle, \
        Review.Title AS ReviewTitle, \
        Review.Rating AS ReviewRating \
        FROM User \
        INNER JOIN Review ON User.ID = Review.UserID \
        INNER JOIN Book ON Review.BookNumber = Book.BookNumber';

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving user reviews');
		} else {
			res.json(rows);
		}
	});
});

// 작가, 책, 그리고 해당 책에 대한 리뷰의 평균 평점 얻기
app.get('/AuthorBookAvgRating', (req, res) => {
	const sql =
		'SELECT \
        Author.AuthorName AS AuthorName, \
        Book.Title AS BookTitle, \
        AVG(Review.Rating) AS AverageRating \
        FROM Author \
        INNER JOIN Book ON Author.AuthorName = Book.AuthorName \
        INNER JOIN Review ON Book.BookNumber = Review.BookNumber \
        GROUP BY Author.AuthorName, Book.Title';

	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving author book average ratings');
		} else {
			res.json(rows);
		}
	});
});

app.listen(port, () => {
	console.log(`서버 실행됨 (port ${port})`);
});