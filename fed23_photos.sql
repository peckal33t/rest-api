-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 20, 2024 at 11:10 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fed23_photos`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `title`, `user_id`) VALUES
(2, 'Bruce Wayne Oldest Album', 20),
(3, 'Bruce Album #3', 20);

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'Miles Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Selfie', 19),
(2, 'Miles Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Selfie', 19),
(3, 'Miles Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Selfie', 19),
(4, 'Bruce Wayne concentrated', 'https://upload.wikimedia.org/wikipedia/en/1/19/Bruce_Wayne_%28The_Dark_Knight_Trilogy%29.jpg', 'Looking...', 20),
(8, 'Photo123', 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'aaaaa', 20),
(9, 'Photo11', 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'aaaa11a', 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'petar@anon1337.com', 'secret', 'Petar', 'Gorgievski'),
(2, 'solo@secret.org', 'solo1337', 'Gary', 'McKinnon'),
(3, 'richard@1337.com', 'pryce1337', 'Richard', 'Pryce'),
(4, 'miles@yahoo.com', '$2b$10$VhmvZkqmD0koy4OpnN8gtOhUxVCJpecGwBQ4Lrnn5SUjP/9O8r6v2', 'Miles', 'Morales'),
(5, 'bruce.wayne@outlook.com', '$2b$10$DUrorcn/T1979oktFHbB2OAnh6TNnXyqF7/1odLTv7eJTo7jn.dbS', 'Bruce', 'Wayne');

-- --------------------------------------------------------

--
-- Table structure for table `_albumtophoto`
--

CREATE TABLE `_albumtophoto` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_albumtophoto`
--

INSERT INTO `_albumtophoto` (`A`, `B`) VALUES
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2d7fbfb2-44d6-4a43-a506-d54cb2a6bc43', '5aa64d1e77aea518e9659a96ba5eb748265611754b84001c4afd3c6adac8e53c', '2024-02-11 14:59:56.189', '20240211145956_added_all_models_to_my_schema', NULL, NULL, '2024-02-11 14:59:56.024', 1),
('345eeb27-4f59-406e-94c2-007cf4c01cdb', '91fe38e439ce81c96dfa19e04b26ba4099583ead4b44327bbc8750a24f0713ca', '2024-02-12 22:52:41.965', '20240212225241_edited_user_id_text', NULL, NULL, '2024-02-12 22:52:41.581', 1),
('5b5a2565-226a-480e-8be3-8383fba040ee', 'dbe6c1d5bb29502038cfad021815e56ce0fedc7d6468628be9093f9a4528aa2f', '2024-02-17 00:40:16.415', '20240217004016_user_is_not_null_latest_update', NULL, NULL, '2024-02-17 00:40:16.216', 1),
('a80fe0bc-a154-4562-9146-2a2445aeb45d', 'b805385ddc08127a8a142014120c5881cd083bb19a1721fb3f8b81df15ccd19d', '2024-02-12 18:17:32.746', '20240212181732_edited_user_to_be_optional', NULL, NULL, '2024-02-12 18:17:32.439', 1),
('fa844a05-001a-4ff0-9d08-36e89ed11b40', '0a7c738f3fe5a1f834e8e9a304208b8bdcfe31a7317c75220c1bff94ee3122e8', '2024-02-11 16:09:09.541', '20240211160909_added_relations_to_the_models', NULL, NULL, '2024-02-11 16:09:09.239', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Album_user_id_fkey` (`user_id`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_user_id_fkey` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_albumtophoto`
--
ALTER TABLE `_albumtophoto`
  ADD UNIQUE KEY `_AlbumToPhoto_AB_unique` (`A`,`B`),
  ADD KEY `_AlbumToPhoto_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `_albumtophoto`
--
ALTER TABLE `_albumtophoto`
  ADD CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
