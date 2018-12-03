/*
Projeto de como ficaria o banco em uma nova versao do projeto em que o level seria uma tabela diferente.
NAO USAR POR ENQUANTO.
*/

CREATE TABLE IF NOT EXISTS `level` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` int(10) NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `triggers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level_id` int(10) NOT NULL,
  `trigger` varchar(40) NOT NULL,
  `time_elapsed` int NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (level_id) REFERENCES level(id) ON DELETE CASCADE  
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `trigger` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(40) NOT NULL,  
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `score` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `point` int NOT NULL,
  `level_id` int(10) NOT NULL,
  `level_completed` int NOT NULL,
  `time_elapsed` int NOT NULL,
  `life` int NOT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (level_id) REFERENCES level(id) ON DELETE CASCADE  
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
