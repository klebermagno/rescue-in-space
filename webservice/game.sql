-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Máquina: localhost
-- Data de Criação: 29-Jan-2015 às 18:55
-- Versão do servidor: 5.6.12-log
-- versão do PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Base de Dados: `game`
--
CREATE DATABASE IF NOT EXISTS `game` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `game`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `score`
--

CREATE TABLE IF NOT EXISTS `score` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `point` int(12) NOT NULL,
  `level` int(12) NOT NULL,
  `lifes` int(12) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `avatar` int(11) DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `avatar`, `creation`) VALUES
(1, 'Rosa', 'F', NULL, '2015-01-29 18:06:46'),
(2, 'Pedro', 'M', NULL, '2015-01-29 18:06:51'),
(3, 'Maria', 'F', NULL, '2015-01-29 18:06:55'),
(4, 'Paulo', 'M', NULL, '2015-01-29 18:07:01');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;


