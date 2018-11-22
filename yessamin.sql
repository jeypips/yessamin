-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 22, 2018 at 02:27 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yessamin`
--

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `group_description` varchar(255) DEFAULT NULL,
  `privileges` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `group_description`, `privileges`) VALUES
(1, 'Admin', 'Adminitrator', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A747275657D5D7D5D22'),
(2, 'User', 'User', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `description`) VALUES
(1, 'Natasha', 'Natasha'),
(2, 'asd', 'asd');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_categories`
--

CREATE TABLE `suppliers_categories` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers_categories`
--

INSERT INTO `suppliers_categories` (`id`, `suppliers_id`, `name`, `description`) VALUES
(1, 2, 'fg', 'fg');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_discounts`
--

CREATE TABLE `suppliers_discounts` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers_discounts`
--

INSERT INTO `suppliers_discounts` (`id`, `suppliers_id`, `name`, `description`) VALUES
(1, NULL, 'Basic Discount', 'Basic'),
(2, NULL, 'Top Seller Discount', 'Top Seller'),
(3, NULL, 'Outright Discount', 'Outright'),
(4, NULL, 'Special Discount', 'Special'),
(5, NULL, 'SL Discount', 'SL');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_main_categories`
--

CREATE TABLE `suppliers_main_categories` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers_main_categories`
--

INSERT INTO `suppliers_main_categories` (`id`, `suppliers_id`, `name`, `description`) VALUES
(1, 2, 'asd', 'asdd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `groups` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `username`, `password`, `groups`) VALUES
(1, 'John Paul', 'G', 'Balanon', 'admin', 'admin', 1),
(2, 'Sly', 'B', 'Flores', 'sly', 'legend', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers_categories`
--
ALTER TABLE `suppliers_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppliers_id` (`suppliers_id`);

--
-- Indexes for table `suppliers_discounts`
--
ALTER TABLE `suppliers_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppliers_id` (`suppliers_id`);

--
-- Indexes for table `suppliers_main_categories`
--
ALTER TABLE `suppliers_main_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppliers_id` (`suppliers_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `suppliers_categories`
--
ALTER TABLE `suppliers_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `suppliers_discounts`
--
ALTER TABLE `suppliers_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `suppliers_main_categories`
--
ALTER TABLE `suppliers_main_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
