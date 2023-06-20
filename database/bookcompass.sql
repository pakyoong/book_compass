DROP DATABASE IF EXISTS book_compass;

CREATE DATABASE IF NOT EXISTS book_compass
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE book_compass;

-- 회원 테이블 생성
CREATE TABLE User (
  ID VARCHAR(50) NOT NULL,	-- ID
  PW VARCHAR(50) NOT NULL,	-- PW
  Nickname VARCHAR(50) NOT NULL, -- 닉네임
  PRIMARY KEY(ID)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 관리자 테이블 생성
CREATE TABLE Admin (
  ID VARCHAR(50) NOT NULL,	-- 관리자 ID
  PW VARCHAR(50) NOT NULL,	-- 관리자 PW
  PRIMARY KEY(ID)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 작가 테이블 생성
CREATE TABLE Author (
  AuthorName VARCHAR(50) NOT NULL ,	-- 작가 이름
  Nationality VARCHAR(50) NOT NULL,	-- 작가 출신 나라
  BirthYear INT,	-- 작가 출신년도
  PRIMARY KEY(AuthorName)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 도서 테이블 생성
CREATE TABLE Book (
  BookNumber INT NOT NULL AUTO_INCREMENT,	-- 도서번호
  Title VARCHAR(50) NOT NULL,	-- 도서 제목
  AuthorName VARCHAR(50) NOT NULL,	-- 작가 이름
  Rating DECIMAL(3, 2) NOT NULL,	-- 평점
  BookImage BLOB,	-- 도서 이미지	
  Publisher VARCHAR(50) NOT NULL,	-- 출판사	
  PublicationDate DATE NOT NULL,	-- 출판일
  PRIMARY KEY(BookNumber),
  FOREIGN KEY (AuthorName) REFERENCES Author(AuthorName) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;
  
  
-- 리뷰 테이블 생성
CREATE TABLE Review (
  ReviewNumber INT NOT NULL AUTO_INCREMENT,	-- 리뷰 번호
  Title VARCHAR(50) NOT NULL,	-- 리뷰 제목
  Rating DECIMAL(3, 2) NOT NULL,	-- 리뷰 평점
  Content VARCHAR(1500) NOT NULL,	-- 리뷰 내용
  UserID VARCHAR(15) NOT NULL,	-- User UserID
  BookNumber INT NOT NULL,	-- 도서 번호
  PRIMARY KEY(ReviewNumber),
  FOREIGN KEY (UserID) REFERENCES User(ID) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (BookNumber) REFERENCES Book(BookNumber) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 댓글 테이블 생성
CREATE TABLE Comment (
  CommentNumber INT NOT NULL AUTO_INCREMENT,	-- 댓글 번호
  Content VARCHAR(500) NOT NULL,	-- 댓글 내용	
  ReviewNumber INT NOT NULL,	-- 리뷰 번호
  PRIMARY KEY(CommentNumber),
  FOREIGN KEY (ReviewNumber) REFERENCES Review(ReviewNumber) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
  
  
show tables;

desc User;

-- 회원 정보 10명 생성
INSERT INTO User (ID, PW, Nickname)
VALUES
	('test123', 'password12','테스트 천사'),
  ('johnsmith', 'JohnSmith123!', 'John Smith'),
  ('emilyjones', 'EmilyJ#456', 'Emily Jones'),
  ('davidwilson', 'DWilson789!', 'David Wilson'),
  ('sarahbrown', 'SaraBrownPW12', 'Sarah Brown'),
  ('michaellee', 'P@sswordML', 'Michael Lee'),
  ('jessicawang', 'WangJessica99', 'Jessica Wang'),
  ('alexturner', 'ATurner007!', 'Alex Turner'),
  ('lucywilliams', 'LucyW123$', 'Lucy Williams'),
  ('danielgreen', 'GreenD@123', 'Daniel Green');
select * from User;

-- 관리자 ID 생성
INSERT INTO Admin (ID, PW)
VALUES
	('admin','pw123');
select * from Admin;


-- 작가 정보 추가
INSERT INTO Author (AuthorName, Nationality, BirthYear)
VALUES
  ('Haruki Murakami', '일본', 1949),
  ('J.K. Rowling', '영국', 1965),
  ('George Orwell', '영국', 1903),
  ('Jane Austen', '영국', 1775),
  ('Ernest Hemingway', '미국', 1899),
  ('Fyodor Dostoevsky', '러시아', 1821),
  ('Gabriel Garcia Marquez', '콜롬비아', 1927),
  ('Stephen King', '미국', 1947),
  ('Agatha Christie', '영국', 1890),
  ('Toni Morrison', '미국', 1931);
select * from Author;


-- 도서 정보 추가
INSERT INTO Book (Title, AuthorName, Rating, Publisher, PublicationDate)
VALUES
  ('Norwegian Wood', 'Haruki Murakami', 4.2, 'Kodansha', '1987-08-04'),
  ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 4.5, 'Bloomsbury', '1997-06-26'),
  ('1984', 'George Orwell', 4.0, 'Secker & Warburg', '1949-06-08'),
  ('Pride and Prejudice', 'Jane Austen', 4.8, 'T. Egerton, Whitehall', '1813-01-28'),
  ('The Old Man and the Sea', 'Ernest Hemingway', 4.3, 'Scribner''s', '1952-09-01'),
  ('Crime and Punishment', 'Fyodor Dostoevsky', 4.6, 'The Russian Messenger', '1866-12-22'),
  ('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 4.4, 'Harper & Row', '1967-06-30'),
  ('The Shining', 'Stephen King', 4.1, 'Doubleday', '1977-01-28'),
  ('Murder on the Orient Express', 'Agatha Christie', 4.2, 'Collins Crime Club', '1934-01-01'),
  ('Beloved', 'Toni Morrison', 4.5, 'Alfred A. Knopf', '1987-09-02');
select * from Book;


-- 리뷰 정보 추가
INSERT INTO Review (Title, Rating, Content, UserID, BookNumber)
VALUES
	-- BookNumber 1에 대한 추가 리뷰
  ('Great Read!', 4.5, 'I really enjoyed reading Norwegian Wood. The story was captivating.', 'johnsmith', 1),
	('Captivating Storyline', 4.6, 'Norwegian Wood had me hooked from the first page. The characters were so well-developed.', 'michaellee', 1),
  ('Beautifully Written', 4.8, 'I was captivated by the lyrical writing style of Norwegian Wood. A must-read!', 'jessicawang', 1),
  ('Emotional Journey', 4.5, 'Reading Norwegian Wood was an emotional rollercoaster. I laughed, I cried, and I couldn''t put it down.', 'sarahbrown', 1),
	-- BookNumber 2에 대한 추가 리뷰
  ('Magical Journey', 4.8, 'Harry Potter and the Sorcerer''s Stone took me on a magical journey through the wizarding world.', 'emilyjones', 2),
	('Enchanting World', 4.7, 'Harry Potter and the Sorcerer''s Stone transported me to a magical world full of wonder and adventure.', 'davidwilson', 2),
  ('Unforgettable Characters', 4.5, 'I fell in love with the characters in Harry Potter and the Sorcerer''s Stone. They felt like friends.', 'emilyjones', 2),
  -- BookNumber 3에 대한 추가 리뷰
  ('Thought-Provoking', 4.2, '1984 made me think about the dangers of totalitarianism and surveillance society.', 'davidwilson', 3),
	('Thought-Provoking Masterpiece', 4.7, '1984 is a thought-provoking masterpiece that makes you question the nature of power and control.', 'lucywilliams', 3),
  ('Hauntingly Relevant', 4.4, 'Reading 1984 gave me chills with its disturbingly accurate depiction of a dystopian society.', 'alexturner', 3),
  ('Eye-Opening', 4.3, 'George Orwell''s 1984 opened my eyes to the dangers of totalitarianism and the importance of freedom.', 'jessicawang', 3),
	-- BookNumber 4에 대한 추가 리뷰
  ('Classic Romance', 4.6, 'Pride and Prejudice is a classic love story with memorable characters.', 'sarahbrown', 4),
	('Timeless Classic', 4.8, 'Pride and Prejudice is a timeless classic that explores themes of love, social class, and self-discovery.', 'sarahbrown', 4),
  ('Unforgettable Characters', 4.6, 'Elizabeth Bennet and Mr. Darcy from Pride and Prejudice will forever be some of my favorite literary characters.', 'danielgreen', 4),
  ('A Delightful Read', 4.5, 'Reading Pride and Prejudice was an absolute delight. Jane Austen''s wit and storytelling are unparalleled.', 'emilyjones', 4),
	-- BookNumber 5에 대한 추가 리뷰
  ('A Tale of Resilience', 4.4, 'The Old Man and the Sea beautifully portrays the struggle and resilience of the human spirit.', 'michaellee', 5),
	('Profound and Moving', 4.6, 'The Old Man and the Sea touched my heart with its profound portrayal of determination and the human spirit.', 'michaellee', 5),
  ('Poetic and Symbolic', 4.7, 'Hemingway''s The Old Man and the Sea is a poetic and symbolic masterpiece that stays with you long after reading.', 'lucywilliams', 5),
  ('A Testament to Resilience', 4.4, 'The Old Man and the Sea reminded me of the power of resilience and the pursuit of one''s passions.', 'davidwilson', 5),
	-- BookNumber 6에 대한 추가 리뷰
  ('Deep Psychological Exploration', 4.7, 'Crime and Punishment delves into the depths of the human psyche with its complex characters.', 'jessicawang', 6),
	('Psychologically Gripping', 4.8, 'Dostoevsky''s Crime and Punishment kept me on the edge of my seat with its psychological depth and moral dilemmas.', 'johnsmith', 6),
  ('Complex Characters', 4.6, 'The characters in Crime and Punishment are so complex and multi-dimensional. Dostoevsky is a master storyteller.', 'jessicawang', 6),
  ('Thought-Provoking Exploration', 4.7, 'Reading Crime and Punishment made me reflect on the nature of guilt, redemption, and the consequences of our actions.', 'emilyjones', 6),
	-- BookNumber 7에 대한 추가 리뷰
  ('Masterpiece of Magical Realism', 4.9, 'One Hundred Years of Solitude is a masterpiece of magical realism that transports you to a vividly imagined world.', 'alexturner', 7),
	('Epic and Imaginative', 4.9, 'One Hundred Years of Solitude is an epic and imaginative journey through generations. A true masterpiece.', 'alexturner', 7),
  ('Magical Realism at Its Finest', 4.7, 'Gabriel Garcia Marquez''s One Hundred Years of Solitude is a prime example of the power of magical realism.', 'sarahbrown', 7),
  ('Surreal and Enchanting', 4.8, 'Reading One Hundred Years of Solitude was like entering a dreamlike world full of enchantment and wonder.', 'danielgreen', 7),
	-- BookNumber 8에 대한 추가 리뷰
  ('Terrifying Thriller', 4.3, 'The Shining kept me on the edge of my seat with its suspenseful and chilling atmosphere.', 'lucywilliams', 8),
	('Thrilling and Intense', 4.5, 'The Shining kept me on the edge of my seat with its chilling atmosphere and suspenseful plot.', 'emilyjones', 8),
  ('Unforgettable Horror', 4.3, 'Stephen King''s The Shining is a horror masterpiece that lingers in your mind long after you finish reading.', 'johnsmith', 8),
  ('Nightmarishly Gripping', 4.6, 'Reading The Shining was a nightmarishly thrilling experience. I couldn''t put it down!', 'michaellee', 8),
	-- BookNumber 9에 대한 추가 리뷰
  ('Intriguing Mystery', 4.2, 'Murder on the Orient Express is a gripping and cleverly plotted mystery.', 'danielgreen', 9),
  ('Intriguing Mystery', 4.4, 'Agatha Christie''s Murder on the Orient Express had me guessing until the very end. A true page-turner!', 'lucywilliams', 9),
  ('Clever Plot Twists', 4.2, 'I was captivated by the cleverly crafted plot twists in Murder on the Orient Express. Agatha Christie is a master of suspense.', 'davidwilson', 9),
  ('Classic Whodunit', 4.5, 'Reading Murder on the Orient Express was like unraveling a classic whodunit mystery. A must-read for mystery lovers!', 'sarahbrown', 9),
	-- BookNumber 10에 대한 추가 리뷰
  ('Powerful and Haunting', 4.7, 'Beloved is a powerful and haunting exploration of slavery and its impact on individuals and communities.', 'johnsmith', 10),
  ('Haunting and Powerful', 4.7, 'Toni Morrison''s Beloved is a haunting and powerful exploration of the legacy of slavery. A truly unforgettable read.', 'jessicawang', 10),
  ('Emotionally Resonant', 4.6, 'Beloved touched my heart with its poignant portrayal of love, loss, and the enduring strength of the human spirit.', 'emilyjones', 10),
  ('Literary Masterpiece', 4.8, 'Reading Beloved was a profound and transformative experience. Toni Morrison''s writing is unparalleled.', 'johnsmith', 10);
select * from Review;
	
-- 댓글 정보 추가
INSERT INTO Comment (Content, ReviewNumber)
VALUES
  ('I totally agree!', 1),
  ('Great review!', 2),
  ('I had the same thoughts.', 3),
  ('I loved this book too.', 4),
  ('Can''t wait to read this book.', 5),
  ('Thanks for the review!', 6),
  ('This book sounds interesting.', 7),
  ('I couldn''t put this book down either!', 8),
  ('This book was a page-turner for sure.', 9),
  ('I''ll have to add this book to my reading list.', 10);
select * from Comment;


SELECT
  r.ReviewNumber,
  r.Title,
  r.Rating,
  r.Content,
  u.Nickname AS WriterName,
  b.Title AS BookTitle
FROM
  Review r
JOIN
  User u ON r.UserID = u.ID
JOIN
  Book b ON r.BookNumber = b.BookNumber;

SELECT
  b.BookNumber,
  b.Title,
  b.AuthorName,
  AVG(r.Rating) AS AverageRating
FROM
  Book b
LEFT JOIN
  Review r ON b.BookNumber = r.BookNumber
GROUP BY
  b.BookNumber;

-- 사용자, 책, 그리고 해당 사용자가 작성한 리뷰에 대한 정보를 얻기 위한 쿼리:
SELECT 
  User.ID AS UserID, 
  User.Nickname AS UserNickname, 
  Book.Title AS BookTitle, 
  Review.Title AS ReviewTitle, 
  Review.Rating AS ReviewRating 
FROM 
  User 
INNER JOIN 
  Review ON User.ID = Review.UserID 
INNER JOIN 
  Book ON Review.BookNumber = Book.BookNumber;

-- 작가, 책, 그리고 해당 책에 대한 리뷰의 평균 평점을 얻기 위한 쿼리:
SELECT 
  Author.AuthorName AS AuthorName, 
  Book.Title AS BookTitle, 
  AVG(Review.Rating) AS AverageRating 
FROM 
  Author 
INNER JOIN 
  Book ON Author.AuthorName = Book.AuthorName 
INNER JOIN 
  Review ON Book.BookNumber = Review.BookNumber 
GROUP BY 
  Author.AuthorName, 
  Book.Title;

-- 책, 리뷰, 그리고 해당 리뷰에 대한 댓글을 얻기 위한 쿼리:
SELECT 
  Book.Title AS BookTitle, 
  Review.Title AS ReviewTitle, 
  Comment.Content AS CommentContent 
FROM 
  Book 
INNER JOIN 
  Review ON Book.BookNumber = Review.BookNumber 
INNER JOIN 
  Comment ON Review.ReviewNumber = Comment.ReviewNumber;
