-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname_user` VARCHAR(25) NOT NULL,
  `lastname_user` VARCHAR(25) NOT NULL,
  `dni_user` INT(11) NOT NULL,
  `email_user` VARCHAR(25) NOT NULL,
  `password_user` VARCHAR(4) NOT NULL,
  `avatar_user` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `dni_user_UNIQUE` (`dni_user` ASC) VISIBLE,
  UNIQUE INDEX `email_user_UNIQUE` (`email_user` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`carts` (
  `id_carts` INT(11) NOT NULL,
  `cartscol` VARCHAR(45) NULL DEFAULT NULL,
  `users_id_user` INT(11) NOT NULL,
  PRIMARY KEY (`id_carts`),
  INDEX `fk_carts_users1_idx` (`users_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`users_id_user`)
    REFERENCES `mydb`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categories` (
  `id_cat` INT(11) NOT NULL,
  `name_cat` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_cat`),
  UNIQUE INDEX `id_cat_UNIQUE` (`id_cat` ASC) VISIBLE,
  UNIQUE INDEX `name_cat_UNIQUE` (`name_cat` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sizes` (
  `id_sizes` INT(11) NOT NULL,
  `name_sizes` VARCHAR(45) NOT NULL,
  `products_id_products` INT(11) NOT NULL,
  PRIMARY KEY (`id_sizes`),
  UNIQUE INDEX `id_sizes_UNIQUE` (`id_sizes` ASC) VISIBLE,
  UNIQUE INDEX `name_sizes_UNIQUE` (`name_sizes` ASC) VISIBLE,
  INDEX `fk_sizes_products1_idx` (`products_id_products` ASC) VISIBLE,
  CONSTRAINT `fk_sizes_products1`
    FOREIGN KEY (`products_id_products`)
    REFERENCES `mydb`.`products` (`id_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`products` (
  `id_products` INT(11) NOT NULL,
  `name_products` VARCHAR(45) NOT NULL,
  `description_products` LONGTEXT NOT NULL,
  `price_productos` VARCHAR(45) NOT NULL,
  `categories_id_cat` INT(11) NOT NULL,
  `discount_products` INT(11) NULL DEFAULT NULL,
  `users_id_user` INT(11) NOT NULL,
  `sizes_id_sizes` INT(11) NOT NULL,
  PRIMARY KEY (`id_products`),
  UNIQUE INDEX `idProducts_UNIQUE` (`id_products` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`categories_id_cat` ASC) VISIBLE,
  INDEX `fk_products_users1_idx` (`users_id_user` ASC) VISIBLE,
  INDEX `fk_sizes_id_sizes_idx` (`sizes_id_sizes` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id_cat`)
    REFERENCES `mydb`.`categories` (`id_cat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_sizes1`
    FOREIGN KEY (`sizes_id_sizes`)
    REFERENCES `mydb`.`sizes` (`id_sizes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_users1`
    FOREIGN KEY (`users_id_user`)
    REFERENCES `mydb`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`carts_intermediate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`carts_intermediate` (
  `id_carts_intermediate` INT(11) NOT NULL,
  `carts_id_carts` INT(11) NOT NULL,
  `products_id_products` INT(11) NOT NULL,
  PRIMARY KEY (`id_carts_intermediate`),
  UNIQUE INDEX `id_carts_intermediate_UNIQUE` (`id_carts_intermediate` ASC) VISIBLE,
  INDEX `fk_carts_intermediate_carts1_idx` (`carts_id_carts` ASC) VISIBLE,
  INDEX `fk_carts_intermediate_products1_idx` (`products_id_products` ASC) VISIBLE,
  CONSTRAINT `fk_carts_intermediate_carts1`
    FOREIGN KEY (`carts_id_carts`)
    REFERENCES `mydb`.`carts` (`id_carts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_intermediate_products1`
    FOREIGN KEY (`products_id_products`)
    REFERENCES `mydb`.`products` (`id_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cities` (
  `id_city` INT(11) NOT NULL,
  `name_city` VARCHAR(45) NOT NULL,
  `user_id_user` INT(11) NOT NULL,
  PRIMARY KEY (`id_city`),
  UNIQUE INDEX `nameCity_UNIQUE` (`name_city` ASC) VISIBLE,
  INDEX `fk_City_User1_idx` (`user_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_City_User1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`images` (
  `id_images` INT(11) NOT NULL,
  `href_images` VARCHAR(45) NOT NULL,
  `products_id_products` INT(11) NOT NULL,
  PRIMARY KEY (`id_images`),
  UNIQUE INDEX `id_images_UNIQUE` (`id_images` ASC) VISIBLE,
  INDEX `fk_images_products1_idx` (`products_id_products` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_id_products`)
    REFERENCES `mydb`.`products` (`id_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
