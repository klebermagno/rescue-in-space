-- phpMyAdmin SQL Dump
-- version 4.2.1
-- http://www.phpmyadmin.net
--
-- Host: mysql.fisiogames.com
-- Tempo de geração: 18/03/2015 às 12:14
-- Versão do servidor: 5.5.40-log
-- Versão do PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Banco de dados: `fisiogames06`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `score`
--

CREATE TABLE IF NOT EXISTS `score` (
`id` int(10) unsigned NOT NULL,
  `point` int(12) NOT NULL,
  `level` int(12) NOT NULL,
  `level_completed` int(11) NOT NULL,
  `time_elapsed` int(11) NOT NULL,
  `life` int(12) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=332 ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(10) unsigned NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `avatar` int(11) DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=434 ;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `score`
--
ALTER TABLE `score`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `score`
--
ALTER TABLE `score`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=332;
--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=434;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `score`
--
ALTER TABLE `score`
ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

