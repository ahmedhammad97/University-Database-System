-- Database: `DBCourse`
CREATE DATABASE DBCourse

-- Table structure for table `Course`
CREATE TABLE `Course` (
  `course_id` varchar(6) NOT NULL,
  `course_name` varchar(32) NOT NULL,
  `course_description` varchar(512) NOT NULL,
  `instructor_name` varchar(64) NOT NULL,
  `credit_hours` int(1) NOT NULL,
  `department_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `Department`
CREATE TABLE `Department` (
  `dept_id` int(4) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `User`
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `email` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `department_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Indexes for table `Course`
ALTER TABLE `Course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_name` (`course_name`),
  ADD KEY `department_id` (`department_id`);

-- Indexes for table `Department`
ALTER TABLE `Department`
  ADD PRIMARY KEY (`dept_id`),
  ADD UNIQUE KEY `name` (`name`);

-- Indexes for table `User`
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `department_id` (`department_id`);

-- AUTO_INCREMENT for table `User`
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

-- Constraints for table `Course`
ALTER TABLE `Course`
  ADD CONSTRAINT `course_belongsTo_dept` FOREIGN KEY (`department_id`) REFERENCES `Department` (`dept_id`);

-- Constraints for table `User`
ALTER TABLE `User`
  ADD CONSTRAINT `usr_belongsTo_dept` FOREIGN KEY (`department_id`) REFERENCES `Department` (`dept_id`);

