-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2022 at 04:19 PM
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
-- Schema trinkets
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trinkets` DEFAULT CHARACTER SET utf8mb3 ;
USE `trinkets` ;
-- --------------------------------------------------------
--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'coleccionable'),
(2, 'artesania'),
(3, 'arte');

-- --------------------------------------------------------

--
-- Table structure for table `imgproducts`
--

CREATE TABLE `imgproducts` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `imgproducts`
--

INSERT INTO `imgproducts` (`id`, `name`, `productId`) VALUES
(1, 'prd_1645799376948.jpg', 1),
(2, 'prd_1645799376949.jpeg', 1),
(3, 'prd_1645799437716.jpg', 2),
(4, 'prd_1645799437715.jpg', 2),
(5, 'prd_1645799437717.jpg', 2),
(6, 'prd_1645799548136.jpeg', 3),
(7, 'prd_1645799548136.jpeg', 3),
(8, 'prd_1645799601376.jpeg', 4),
(9, 'prd_1645799601377.jpeg', 4),
(10, 'prd_1645799702061.jpeg', 5),
(11, 'prd_1645799702062.jpeg', 5),
(12, 'prd_1645799785615.jpeg', 6),
(13, 'prd_1645799785615.jpeg', 6),
(14, 'prd_1645799785616.jpeg', 6),
(15, 'prd_1645799845248.jpeg', 7),
(16, 'prd_1645799845249.jpeg', 7),
(17, 'prd_1645799935493.jpeg', 8),
(18, 'prd_1645799935495.jpeg', 8),
(19, 'prd_1645799935496.jpeg', 8),
(20, 'prd_1645799980365.jpeg', 9),
(21, 'prd_1645799980366.jpeg', 9),
(22, 'prd_1645800086484.jpg', 10),
(23, 'prd_1645800086485.jpg', 10),
(24, 'prd_1645800086486.jpeg', 10),
(25, 'prd_1645800152674.jpeg', 11),
(26, 'prd_1645800152675.jpeg', 11),
(27, 'prd_1645800250969.jpeg', 12),
(28, 'prd_1645800250970.jpeg', 12),
(29, 'prd_1645800300741.jpeg', 13),
(30, 'prd_1645800300742.jpeg', 13),
(31, 'prd_1645800387547.jpeg', 14),
(32, 'prd_1645800387547.jpeg', 14),
(33, 'prd_1645800427174.jpg', 15),
(34, 'prd_1645800427175.jpg', 15),
(35, 'prd_1645800491863.jpg', 16),
(36, 'prd_1645800491863.jpg', 16),
(37, 'prd_1645800491864.jpg', 16),
(38, 'prd_1645800636429.jpg', 17),
(39, 'prd_1645800636430.jpg', 17),
(40, 'prd_1645800786130.jpeg', 18),
(41, 'prd_1645800786131.jpeg', 18),
(42, 'prd_1645800878606.jpg', 19),
(43, 'prd_1645800878607.jpg', 19),
(44, 'prd_1645800919748.jpg', 20),
(45, 'prd_1645800919749.jpg', 20),
(49, 'prd_1645801079334.jpg', 21),
(50, 'prd_1645801135830.jpg', 21),
(51, 'prd_1645801156160.jpeg', 21),
(52, 'prd_1645801369649.jpeg', 22),
(53, 'prd_1645801425142.jpeg', 23),
(54, 'prd_1645801425143.jpeg', 23),
(55, 'prd_1645801425143.jpeg', 23),
(56, 'prd_1645801532327.jpg', 24),
(57, 'prd_1645801532328.jpeg', 24),
(58, 'prd_1645801921316.jpg', 25),
(59, 'prd_1645802111619.jpg', 26),
(60, 'prd_1645802153124.jpg', 27),
(62, 'prd_1645802212204.jpg', 29);

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
  `description` text NOT NULL,
  `userSellerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `size`, `price`, `description`, `userSellerId`) VALUES
(1, 'Coso de Mimbre', 2, 2, 850, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 1),
(2, 'Coso de mimbre 2', 2, 3, 1500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 1),
(3, 'Piedra', 1, 1, 4000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 2),
(4, 'Piedrita 2', 1, 1, 6000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 2),
(5, 'Velitas', 2, 1, 1200, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 4),
(6, 'Aire Patagonico', 1, 2, 3500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 5),
(7, 'Aire Patagónico Smart', 1, 2, 5000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 5),
(8, 'Vasija', 2, 3, 3900, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 6),
(9, 'Vasija pequeña', 2, 1, 1200, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 6),
(10, 'Taza Mug', 1, 2, 890, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 7),
(11, 'Taza Mug', 1, 2, 2500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 8),
(12, 'Cuadro', 3, 3, 9900, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 8),
(13, 'Otro Cuadro', 3, 3, 19000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 8),
(14, 'Gnomo Horrible', 1, 2, 20500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 10),
(15, 'Gnomo Horrible 2', 1, 1, 2500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 10),
(16, 'Gnomo Horrible 3', 1, 1, 1500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 10),
(17, 'Canasta', 2, 2, 900, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 11),
(18, 'Piedrita telepática', 1, 1, 60000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 12),
(19, 'Gorro navideño', 1, 2, 500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 13),
(20, 'Otro gorro navideño', 1, 2, 550, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 13),
(21, 'Billetera de cocodrilo', 2, 1, 32000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 14),
(22, 'Piedra mágica', 1, 1, 120, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 15),
(23, 'Piedras mágicas x10', 1, 1, 1100, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 15),
(24, 'Mug Taza', 1, 2, 1500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 15),
(25, 'Moldes de silicona', 2, 2, 3000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 5),
(26, 'Sombrero', 2, 3, 6000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 13),
(27, 'Cactus de adorno', 2, 1, 500, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 13),
(29, 'Planta de oro', 1, 3, 9000, 'Una descripción es la acción y efecto de describir, esto es, de explicar o representar detalladamente por medio del lenguaje los rasgos característicos', 13);

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

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, 'mini'),
(2, 'pequeño'),
(3, 'mediano'),
(4, 'grande'),
(5, 'gigante');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `DNI`, `email`, `password`, `imgUser`, `city`) VALUES
(1, 'Lionel', 'Messi', 11111111, 'messi@mail.com', '$2a$10$EiDCDsKsS6/Y0BsV2AGTD.GNZuS.nQ7tozGS0jchXLlCdutGuv7hu', 'avatar_1645797403596.jpg', 'Rosario'),
(2, 'Ellen', 'Ripley', 22222222, 'ripley@mail.com', '$2a$10$SP0FtIyVyayO6GJhhbJyyuiO/fiRmnY2XgCD.1PiZdQYcn7ud91aG', 'avatar_1645797583661.jpg', 'Nostromo'),
(3, 'Mar', 'Ciano', 33333333, 'marciano@mail.com', '$2a$10$ledjcRKpxDNVhGPbTDvoweZ5Q.DavMsNIGQCrKh.HjNNgAm/ZTO0e', 'avatar_1645797632563.jpg', 'Marte'),
(4, 'Marie', 'Kondo', 44444444, 'mariekondo@mail.com', '$2a$10$FpEsMhByWrIA5B2kmvKYyOcqUHUH/ypGMdiMQD5VZszzyHGSoOb3e', 'avatar_1645797706790.jpg', 'Tokio'),
(5, 'Elon', 'Musk', 55555555, 'elon@mail.com', '$2a$10$JsNDAwMhCNUxnFWrYULmq.SBSwkpKHc47x4NWWEJJ8.N0QrgfA./S', 'avatar_1645797966797.jpg', 'Boca Chica'),
(6, 'David', 'Goggins', 66666666, 'goggins@mail.com', '$2a$10$jjg6XpbuxBfXzkyjv27.JOLLwn3LdA4ZxsaPwAgVNcqwZ1Uwq.ayG', 'avatar_1645798163527.jpg', 'Buffalo'),
(7, 'Valentin', 'Wos', 77777777, 'wos@mail.com', '$2a$10$1o3ki8F5U3qirvWmk9dtI.Kjfd6WNpR9Qg6EPjV9.hxuzX.HZOzzu', 'avatar_1645798308212.jpg', 'Buenos Aires'),
(8, 'Andrew', 'Huberman', 88888888, 'huberman@mail.com', '$2a$10$/2StUfG..ethl6IkRSDVzuRLITt6DGrakfTISjefW53SWXvqmRnCG', 'avatar_1645798410538.jpg', 'Standford University'),
(9, 'Costello', 'Huberman', 99999999, 'costello@mail.com', '$2a$10$MibMFp041duvXid4qoBMzeqml9s.4/gPS3LRFBpjdUsqQvcnssuxS', 'avatar_1645798453875.jpg', 'Huberman Lab Podcast'),
(10, 'Marcos', 'Galperin', 10101010, 'galperin@mail.com', '$2a$10$yaDX.HUzhZkLabf4lPUmU.QMLkbpXNQC7TbvCko/w6FM7BWefECSG', 'avatar_1645798532963.jpg', 'Mercado Libre'),
(11, 'Misio', 'Nero', 12121212, 'misio@mail.com', '$2a$10$sSqLRtfNMEvzQR0blV.6wu2se9crv/k1DiZuqylZXW5gfU/htmNrm', 'avatar_1645798592893.jpg', 'Ruidoooooo'),
(12, 'Charles', 'Xavier', 13131313, 'charles@mail.com', '$2a$10$tZKwsU3WbHIUMqvRgi/.uufjM1INZQjP4s8116.8o5ejDEiTG4uce', 'avatar_1645798634575.jpg', 'Xmen'),
(13, 'Jhonny', 'Rico', 14141414, 'rico@mail.com', '$2a$10$cwRRvStH6QWdqc/972E1Ju5X.fXoYUc.03D1QsPtwpIHxoxAUiEOu', 'avatar_1645798676820.jpg', 'Buenos Aires'),
(14, 'Snoop', 'Dogg', 15151515, 'snoopdogg@mail.com', '$2a$10$snYEZ8ynf.PdaykY5ZoqXeM22LLZnloAstZOZ2bKMNwtU.oFY4dAS', 'avatar_1645798768524.jpg', 'Long Beach'),
(15, 'Thanos', 'Thanos', 16161616, 'thanos@mail.com', '$2a$10$CdfggRWdltZxIWfphhs7mO/08u78Ah7kM0OzukRYftdli3n3XyNxK', 'avatar_1645799089869.jpg', 'Avengers');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userSellerId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`size`) REFERENCES `sizes` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
