-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2022 at 04:25 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trinkets`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(1) NOT NULL,
  `name` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Table structure for table `imgproducts`
--

CREATE TABLE `imgproducts` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `category` int(1) NOT NULL,
  `size` int(1) NOT NULL,
  `price` int(11) NOT NULL,
  `description` TEXT NOT NULL,
  `userSellerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(1) NOT NULL,
  `name` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `DNI` int(8) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `imgUser` varchar(30) DEFAULT 'default.svg',
  `city` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgproducts`
--
ALTER TABLE `imgproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userSellerId` (`userSellerId`),
  ADD KEY `category` (`category`,`size`),
  ADD KEY `size` (`size`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `imgproducts`
--
ALTER TABLE `imgproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imgproducts`
--
ALTER TABLE `imgproducts`
  ADD CONSTRAINT `imgproducts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userSellerId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`size`) REFERENCES `sizes` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;





























--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, 'mini'),
(2, 'pequeño'),
(3, 'mediano'),
(4, 'grande'),
(5, 'gigante');


--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'coleccionable'),
(2, 'artesania'),
(3, 'arte');




--
-- Dumping data for table `users`
--

insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (1, 'Gertrudis', 'Scrine', '50-340-119', 'gscrine0@rediff.com', 'Zulu', 'https://robohash.org/porroestquaerat.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (2, 'Sandor', 'Rickman', '35-496-419', 'srickman1@va.gov', 'Tetum', 'https://robohash.org/quibusdamatquesit.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (3, 'Jeremie', 'Alderton', '24-818-651', 'jalderton2@ycombinator.com', 'Quechua', 'https://robohash.org/molestiaeutincidunt.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (4, 'Claresta', 'Olman', '37-181-856', 'colman3@nationalgeographic.com', 'Amharic', 'https://robohash.org/enimharumfacere.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (5, 'Javier', 'Spinage', '08-430-924', 'jspinage4@mapy.cz', 'Swati', 'https://robohash.org/quisnonoccaecati.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (6, 'Basilio', 'Boatswain', '90-983-000', 'bboatswain5@narod.ru', 'Azeri', 'https://robohash.org/cumqueenimaut.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (7, 'Antonin', 'Vesty', '87-879-762', 'avesty6@howstuffworks.com', 'Khmer', 'https://robohash.org/ameteiusdolor.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (8, 'Artemis', 'Harden', '53-585-169', 'aharden7@bbb.org', 'Chinese', 'https://robohash.org/autaspernaturvel.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (9, 'Frazier', 'Sainsbury-Brown', '94-903-921', 'fsainsburybrown8@disqus.com', 'Malagasy', 'https://robohash.org/temporibusarchitectomagnam.png?size=50x50&set=set1', 'Una Ciudad');
insert into users (id, firstName, lastName, DNI, email, password, imgUser, city) values (10, 'Morie', 'Dailly', '09-372-176', 'mdailly9@squidoo.com', 'Tetum', 'https://robohash.org/remdistinctioet.png?size=50x50&set=set1', 'Una Ciudad');



--
-- Dumping data for table `products`
--


insert into products (id, name, category, size, price, description, userSellerId) values (1, 'Rubber', 3, 3, 903, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 1);
insert into products (id, name, category, size, price, description, userSellerId) values (2, 'Vinyl', 1, 4, 7762, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 3);
insert into products (id, name, category, size, price, description, userSellerId) values (3, 'Glass', 2, 3, 4973, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 9);
insert into products (id, name, category, size, price, description, userSellerId) values (4, 'Glass', 1, 2, 5177, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 10);
insert into products (id, name, category, size, price, description, userSellerId) values (5, 'Plastic', 2, 5, 5859, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 2);
insert into products (id, name, category, size, price, description, userSellerId) values (6, 'Rubber', 3, 4, 5581, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 6);
insert into products (id, name, category, size, price, description, userSellerId) values (7, 'Glass', 1, 1, 2257, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 10);
insert into products (id, name, category, size, price, description, userSellerId) values (8, 'Plexiglass', 1, 1, 1148, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 8);
insert into products (id, name, category, size, price, description, userSellerId) values (9, 'Steel', 1, 1, 4913, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 4);
insert into products (id, name, category, size, price, description, userSellerId) values (10, 'Steel', 2, 3, 7349, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 3);
insert into products (id, name, category, size, price, description, userSellerId) values (11, 'Plexiglass', 1, 1, 2122, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 9);
insert into products (id, name, category, size, price, description, userSellerId) values (12, 'Stone', 1, 4, 3865, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 7);
insert into products (id, name, category, size, price, description, userSellerId) values (13, 'Plastic', 1, 5, 178, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 6);
insert into products (id, name, category, size, price, description, userSellerId) values (14, 'Steel', 1, 5, 7292, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 2);
insert into products (id, name, category, size, price, description, userSellerId) values (15, 'Granite', 3, 4, 5844, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 5);
insert into products (id, name, category, size, price, description, userSellerId) values (16, 'Rubber', 2, 2, 2546, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 7);
insert into products (id, name, category, size, price, description, userSellerId) values (17, 'Vinyl', 1, 4, 3967, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 6);
insert into products (id, name, category, size, price, description, userSellerId) values (18, 'Glass', 1, 3, 5344, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 8);
insert into products (id, name, category, size, price, description, userSellerId) values (19, 'Granite', 3, 3, 9939, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 9);
insert into products (id, name, category, size, price, description, userSellerId) values (20, 'Steel', 2, 5, 4375, 'La descripción también se puede definir como la representación verbal de los rasgos propios de un objeto. Al describir una persona, un animal, un sentimiento, etc. Se expresan aquellas características que hacen peculiar a lo descrito, y lo diferencia de otros objetos de otra o de la misma clase.', 3);








--
-- Dumping data for table `imgproducts`
--



insert into imgproducts (id, name, productId) values (1, 'https://robohash.org/doloresisteut.png?size=400x400&set=set1', 16);
insert into imgproducts (id, name, productId) values (2, 'https://robohash.org/autdoloremquesint.png?size=400x400&set=set1', 1);
insert into imgproducts (id, name, productId) values (3, 'https://robohash.org/providentipsaat.png?size=400x400&set=set1', 3);
insert into imgproducts (id, name, productId) values (4, 'https://robohash.org/reprehenderitperspiciatisodit.png?size=400x400&set=set1', 13);
insert into imgproducts (id, name, productId) values (5, 'https://robohash.org/excepturiinventoreexercitationem.png?size=400x400&set=set1', 6);
insert into imgproducts (id, name, productId) values (6, 'https://robohash.org/repellatnondolore.png?size=400x400&set=set1', 12);
insert into imgproducts (id, name, productId) values (7, 'https://robohash.org/officiisrerumipsa.png?size=400x400&set=set1', 8);
insert into imgproducts (id, name, productId) values (8, 'https://robohash.org/utveritatisnemo.png?size=400x400&set=set1', 5);
insert into imgproducts (id, name, productId) values (9, 'https://robohash.org/quiablanditiisfacilis.png?size=400x400&set=set1', 15);
insert into imgproducts (id, name, productId) values (10, 'https://robohash.org/velitaliquidreprehenderit.png?size=400x400&set=set1', 18);
insert into imgproducts (id, name, productId) values (11, 'https://robohash.org/pariaturadipiscivel.png?size=400x400&set=set1', 5);
insert into imgproducts (id, name, productId) values (12, 'https://robohash.org/nostrumharumet.png?size=400x400&set=set1', 11);
insert into imgproducts (id, name, productId) values (13, 'https://robohash.org/praesentiumeligendiipsam.png?size=400x400&set=set1', 4);
insert into imgproducts (id, name, productId) values (14, 'https://robohash.org/nonnullaet.png?size=400x400&set=set1', 12);
insert into imgproducts (id, name, productId) values (15, 'https://robohash.org/quiducimussunt.png?size=400x400&set=set1', 10);
insert into imgproducts (id, name, productId) values (16, 'https://robohash.org/adipiscicumeveniet.png?size=400x400&set=set1', 8);
insert into imgproducts (id, name, productId) values (17, 'https://robohash.org/utsedmolestiae.png?size=400x400&set=set1', 19);
insert into imgproducts (id, name, productId) values (18, 'https://robohash.org/vitaedoloressuscipit.png?size=400x400&set=set1', 9);
insert into imgproducts (id, name, productId) values (19, 'https://robohash.org/nihiloptioeum.png?size=400x400&set=set1', 20);
insert into imgproducts (id, name, productId) values (20, 'https://robohash.org/omnisidveniam.png?size=400x400&set=set1', 17);
insert into imgproducts (id, name, productId) values (21, 'https://robohash.org/iustoquisvero.png?size=400x400&set=set1', 16);
insert into imgproducts (id, name, productId) values (22, 'https://robohash.org/temporeutpossimus.png?size=400x400&set=set1', 7);
insert into imgproducts (id, name, productId) values (23, 'https://robohash.org/repellendusdictaveritatis.png?size=400x400&set=set1', 10);
insert into imgproducts (id, name, productId) values (24, 'https://robohash.org/repellendusenima.png?size=400x400&set=set1', 6);
insert into imgproducts (id, name, productId) values (25, 'https://robohash.org/adebitisnecessitatibus.png?size=400x400&set=set1', 5);
insert into imgproducts (id, name, productId) values (26, 'https://robohash.org/quiatotamet.png?size=400x400&set=set1', 11);
insert into imgproducts (id, name, productId) values (27, 'https://robohash.org/blanditiissedconsectetur.png?size=400x400&set=set1', 10);
insert into imgproducts (id, name, productId) values (28, 'https://robohash.org/voluptatemexplicaboeveniet.png?size=400x400&set=set1', 17);
insert into imgproducts (id, name, productId) values (29, 'https://robohash.org/repudiandaeeoslaudantium.png?size=400x400&set=set1', 20);
insert into imgproducts (id, name, productId) values (30, 'https://robohash.org/nequenonexcepturi.png?size=400x400&set=set1', 19);
insert into imgproducts (id, name, productId) values (31, 'https://robohash.org/porronecessitatibusvoluptas.png?size=400x400&set=set1', 9);
insert into imgproducts (id, name, productId) values (32, 'https://robohash.org/advoluptatemeum.png?size=400x400&set=set1', 17);
insert into imgproducts (id, name, productId) values (33, 'https://robohash.org/voluptasvoluptatemaut.png?size=400x400&set=set1', 6);
insert into imgproducts (id, name, productId) values (34, 'https://robohash.org/magninatusquisquam.png?size=400x400&set=set1', 19);
insert into imgproducts (id, name, productId) values (35, 'https://robohash.org/officiiseadolorem.png?size=400x400&set=set1', 14);
insert into imgproducts (id, name, productId) values (36, 'https://robohash.org/autullampariatur.png?size=400x400&set=set1', 9);
insert into imgproducts (id, name, productId) values (37, 'https://robohash.org/nobissuscipitassumenda.png?size=400x400&set=set1', 2);
insert into imgproducts (id, name, productId) values (38, 'https://robohash.org/occaecatiautemquae.png?size=400x400&set=set1', 14);
insert into imgproducts (id, name, productId) values (39, 'https://robohash.org/quismaximesequi.png?size=400x400&set=set1', 10);
insert into imgproducts (id, name, productId) values (40, 'https://robohash.org/ipsumconsecteturconsequuntur.png?size=400x400&set=set1', 10);




