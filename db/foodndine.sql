-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2023 at 02:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodndine`
--

-- --------------------------------------------------------

--
-- Table structure for table `BOOKING_DETAILS`
--

CREATE TABLE `BOOKING_DETAILS` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `booked_by` varchar(255) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `num_persons` int(11) NOT NULL,
  `special_items` varchar(255) NOT NULL,
  `special_requests` text DEFAULT NULL,
  `booking_status` int(11) NOT NULL,
  `total_amount` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `HOTEL_DETAILS`
--

CREATE TABLE `HOTEL_DETAILS` (
  `hotel_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `hotel_name` varchar(255) NOT NULL,
  `price_per_person` decimal(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LOCATIONS`
--

CREATE TABLE `LOCATIONS` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SPECIAL_ITEMS`
--

CREATE TABLE `SPECIAL_ITEMS` (
  `special_item_id` int(11) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_price` decimal(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USER_DETAILS`
--

CREATE TABLE `USER_DETAILS` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USER_DETAILS`
--

INSERT INTO `USER_DETAILS` (`user_id`, `full_name`, `email`, `mobile`, `password_hash`, `role`, `created_at`, `gender`) VALUES
(3, 'Pradeep', 'pradeep2001eee@gmail.com', '8766876876', '$2y$10$nxcjmDgrnrSqmT98B6hkUOh5.3bwsG3fQr4Py1I3dARjHkIJLAio.', 0, '2023-11-26 05:56:00', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BOOKING_DETAILS`
--
ALTER TABLE `BOOKING_DETAILS`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `HOTEL_DETAILS`
--
ALTER TABLE `HOTEL_DETAILS`
  ADD PRIMARY KEY (`hotel_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `LOCATIONS`
--
ALTER TABLE `LOCATIONS`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `SPECIAL_ITEMS`
--
ALTER TABLE `SPECIAL_ITEMS`
  ADD PRIMARY KEY (`special_item_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `USER_DETAILS`
--
ALTER TABLE `USER_DETAILS`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_unique` (`email`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BOOKING_DETAILS`
--
ALTER TABLE `BOOKING_DETAILS`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `HOTEL_DETAILS`
--
ALTER TABLE `HOTEL_DETAILS`
  MODIFY `hotel_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `LOCATIONS`
--
ALTER TABLE `LOCATIONS`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SPECIAL_ITEMS`
--
ALTER TABLE `SPECIAL_ITEMS`
  MODIFY `special_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USER_DETAILS`
--
ALTER TABLE `USER_DETAILS`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BOOKING_DETAILS`
--
ALTER TABLE `BOOKING_DETAILS`
  ADD CONSTRAINT `booking_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER_DETAILS` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_details_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `HOTEL_DETAILS` (`hotel_id`) ON DELETE CASCADE;

--
-- Constraints for table `HOTEL_DETAILS`
--
ALTER TABLE `HOTEL_DETAILS`
  ADD CONSTRAINT `hotel_details_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`) ON DELETE CASCADE;

--
-- Constraints for table `SPECIAL_ITEMS`
--
ALTER TABLE `SPECIAL_ITEMS`
  ADD CONSTRAINT `special_items_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `HOTEL_DETAILS` (`hotel_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
