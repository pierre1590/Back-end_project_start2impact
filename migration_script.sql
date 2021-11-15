-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: authentication_example
-- Source Schemata: authentication
-- Created: Mon Nov 15 20:33:49 2021
-- Workbench Version: 8.0.24
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema authentication_example
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `authentication_example` ;
CREATE SCHEMA IF NOT EXISTS `authentication_example` ;

-- ----------------------------------------------------------------------------
-- Table authentication_example.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `authentication_example`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
