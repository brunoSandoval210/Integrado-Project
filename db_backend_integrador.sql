-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2024 a las 05:07:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_backend_integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `status` tinyint(4) DEFAULT 1,
  `cita_id` bigint(20) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `horario_id` bigint(20) DEFAULT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `status_appointment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`status`, `cita_id`, `date_register`, `date_update`, `horario_id`, `user_register`, `user_update`, `usuario_id`, `status_appointment`) VALUES
(1, 1, '2024-10-26 20:36:05', '2024-10-27 05:45:47', 1, NULL, NULL, 1, NULL),
(1, 2, '2024-10-26 20:36:05', '2024-10-26 20:54:46', 2, NULL, NULL, 8, NULL),
(1, 3, '2024-10-26 20:36:05', '2024-10-26 20:54:46', 3, NULL, NULL, 11, NULL),
(1, 9, '2024-10-27 17:20:35', '2024-10-27 17:20:35', 6, NULL, NULL, 14, 'CONFIRMADA'),
(1, 10, '2024-10-27 18:57:42', '2024-10-27 18:57:42', 7, NULL, NULL, 14, 'CONFIRMADA'),
(1, 11, '2024-10-28 22:32:28', '2024-10-28 22:32:28', 9, NULL, NULL, 14, 'CONFIRMADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_historial_medico`
--

CREATE TABLE `detalle_historial_medico` (
  `cita_id` bigint(20) NOT NULL,
  `historial_medico_id` bigint(20) NOT NULL,
  `detalle` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_historial_medico`
--

INSERT INTO `detalle_historial_medico` (`cita_id`, `historial_medico_id`, `detalle`) VALUES
(1, 1, 'dfsdfdsfds');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especializacion`
--

CREATE TABLE `especializacion` (
  `status` tinyint(4) DEFAULT 1,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `especializacion_id` bigint(20) NOT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especializacion`
--

INSERT INTO `especializacion` (`status`, `date_register`, `date_update`, `especializacion_id`, `user_register`, `user_update`, `nombre`) VALUES
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 1, NULL, NULL, 'CARDIOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 2, NULL, NULL, 'DERMATOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 3, NULL, NULL, 'ENDOCRINOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 4, NULL, NULL, 'GASTROENTEROLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 5, NULL, NULL, 'GINECOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 6, NULL, NULL, 'HEMATOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 7, NULL, NULL, 'NEFROLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 8, NULL, NULL, 'NEUROLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 9, NULL, NULL, 'OFTALMOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 10, NULL, NULL, 'ONCOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 11, NULL, NULL, 'OTORRINOLARINGOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 12, NULL, NULL, 'PEDIATRIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 13, NULL, NULL, 'PSIQUIATRIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 14, NULL, NULL, 'REUMATOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 15, NULL, NULL, 'TRAUMATOLOGIA'),
(1, '2024-10-26 20:05:50', '2024-10-26 20:05:50', 16, NULL, NULL, 'UROLOGIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_medico`
--

CREATE TABLE `historial_medico` (
  `status` tinyint(4) DEFAULT 1,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `historial_medico_id` bigint(20) NOT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_medico`
--

INSERT INTO `historial_medico` (`status`, `date_register`, `date_update`, `historial_medico_id`, `user_register`, `user_update`, `usuario_id`) VALUES
(1, '2024-10-27 05:44:51', '2024-10-27 05:44:51', 1, 0, NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `fecha` date DEFAULT NULL,
  `hora_fin` time(6) DEFAULT NULL,
  `hora_inicio` time(6) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `horario_id` bigint(20) NOT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `status_schedule` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`fecha`, `hora_fin`, `hora_inicio`, `status`, `date_register`, `date_update`, `horario_id`, `user_register`, `user_update`, `usuario_id`, `status_schedule`) VALUES
('2024-10-25', '12:00:00.000000', '11:30:00.000000', 1, '2024-10-26 20:54:08', '2024-10-27 02:24:04', 1, NULL, NULL, 4, NULL),
('2024-09-25', '10:30:00.000000', '10:00:00.000000', 1, '2024-10-26 20:54:08', '2024-10-27 02:24:04', 2, NULL, NULL, 6, NULL),
('2024-11-25', '15:30:00.000000', '15:00:00.000000', 1, '2024-10-26 20:54:38', '2024-10-27 02:24:04', 3, NULL, NULL, 9, NULL),
('2023-10-01', '10:00:00.000000', '09:00:00.000000', 1, '2024-10-27 02:41:29', '2024-10-27 16:35:32', 6, NULL, NULL, 6, 'LIBRE'),
('2024-10-27', '11:00:00.000000', '10:00:00.000000', 1, '2024-10-27 18:57:01', '2024-10-27 18:57:01', 7, NULL, NULL, 4, 'LIBRE'),
('2024-10-28', '09:30:00.000000', '09:00:00.000000', 1, '2024-10-28 22:21:29', '2024-10-28 22:21:29', 8, NULL, NULL, 4, 'LIBRE'),
('2024-10-28', '10:00:00.000000', '09:30:00.000000', 1, '2024-10-28 22:29:16', '2024-10-28 22:29:16', 9, NULL, NULL, 4, 'LIBRE'),
('2024-10-28', '10:30:00.000000', '10:00:00.000000', 1, '2024-10-28 22:30:40', '2024-10-28 22:30:40', 10, NULL, NULL, 4, 'LIBRE'),
('2024-10-28', '11:00:00.000000', '10:30:00.000000', 1, '2024-10-28 22:30:53', '2024-10-28 22:30:53', 11, NULL, NULL, 4, 'LIBRE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reprogramaciones`
--

CREATE TABLE `reprogramaciones` (
  `fecha_anterior` date NOT NULL,
  `hora_fin` time(6) DEFAULT NULL,
  `hora_inicio` time(6) DEFAULT NULL,
  `nueva_fecha` date NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `cita_id` bigint(20) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reprogramacion_id` bigint(20) NOT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reprogramaciones`
--

INSERT INTO `reprogramaciones` (`fecha_anterior`, `hora_fin`, `hora_inicio`, `nueva_fecha`, `status`, `cita_id`, `date_register`, `date_update`, `reprogramacion_id`, `user_register`, `user_update`, `motivo`) VALUES
('2024-10-28', '11:30:00.000000', '11:00:00.000000', '2024-10-28', NULL, 11, '2024-10-28 23:35:42', '2024-10-28 23:35:42', 13, NULL, NULL, 'tuvo problemas'),
('2024-10-28', '12:00:00.000000', '11:30:00.000000', '2024-10-28', NULL, 11, '2024-10-28 23:36:34', '2024-10-28 23:36:34', 14, NULL, NULL, 'tuvo problemas'),
('2024-10-28', '12:30:00.000000', '12:00:00.000000', '2024-10-28', NULL, 11, '2024-10-28 23:36:51', '2024-10-28 23:36:51', 15, NULL, NULL, 'tuvo problemas'),
('2024-10-28', '13:00:00.000000', '12:30:00.000000', '2024-10-28', NULL, 11, '2024-10-28 23:37:03', '2024-10-28 23:37:03', 16, NULL, NULL, 'tuvo problemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `status` tinyint(4) DEFAULT 1,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rol_id` bigint(20) NOT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`status`, `date_register`, `date_update`, `rol_id`, `user_register`, `user_update`, `nombre`) VALUES
(1, '2024-10-26 18:35:24', '2024-10-26 18:35:24', 1, NULL, 1, 'ROLE_ADMIN'),
(1, '2024-10-26 18:35:24', '2024-10-26 18:35:24', 2, NULL, NULL, 'ROLE_USER'),
(1, '2024-10-26 18:35:24', '2024-10-26 18:35:24', 3, NULL, NULL, 'ROLE_DOCTOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `status` tinyint(4) DEFAULT 1,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dni` varchar(8) DEFAULT NULL,
  `especializacion_id` bigint(20) DEFAULT NULL,
  `rol_id` bigint(20) DEFAULT NULL,
  `user_register` bigint(20) DEFAULT NULL,
  `user_update` bigint(20) DEFAULT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `numero_colegiatura` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`status`, `date_register`, `date_update`, `dni`, `especializacion_id`, `rol_id`, `user_register`, `user_update`, `usuario_id`, `apellido`, `email`, `nombre`, `username`, `password`, `numero_colegiatura`) VALUES
(1, '2024-10-26 20:00:18', '2024-10-26 20:00:18', '60871996', NULL, 1, NULL, NULL, 1, 'sandoval', 'bruno.sandoval210@gmail.com', 'bruno', 'bruno.sandoval210@gmail.com', '$2a$10$lNaoihFiT9j4exbvB8Xt2u2VeI1FN7DBlquEkTdXwTa0DT8I36yRO', NULL),
(1, '2024-10-26 20:10:08', '2024-10-26 20:10:08', '12345678', NULL, 1, NULL, NULL, 2, 'Doe', 'john.doe@example.com', 'John', 'john.doe@example.com', '$2a$10$amUEOYE0y4pQMJv4G.VmcO9du1bMNr5vQwBVf7tZb3HG3zpHWbKxa', NULL),
(0, '2024-10-26 20:10:15', '2024-10-26 20:10:15', '87654321', NULL, 2, NULL, NULL, 3, 'Smith', 'jane.smith@example.com', 'Jane', 'jane.smith@example.com', '$2a$10$zdN4c8m8ls5u.ob/tMcAOOxFjmZ7JkO2TrrVSwXpqWT/VvPqHgXFK', NULL),
(1, '2024-10-26 20:10:23', '2024-10-26 20:10:23', '98765432', 4, 3, NULL, NULL, 4, 'Brown', 'alice.brown@example.com', 'Alice', 'alice.brown@example.com', '$2a$10$LYRmk57ffwWnR4eLXNTyaegDwnkLZLxra4ZXLe9WMV7CvT1Rfgbge', NULL),
(0, '2024-10-26 20:10:31', '2024-10-26 20:10:31', '45678912', NULL, 1, NULL, NULL, 5, 'Green', 'bob.green@example.com', 'Bob', 'bob.green@example.com', '$2a$10$oF0q2MU6z4Nz7OPCYcCgE.BYCW6m.8l4LXpotavppzupAbz.TVAh.', NULL),
(1, '2024-10-26 20:10:50', '2024-10-26 20:10:50', '65498721', 7, 3, NULL, NULL, 6, 'Perez', 'carlos.perez@example.com', 'Carlos', 'carlos.perez@example.com', '$2a$10$nEWQ2MbRLzl.tIw2nWAXVutyxh/w55Gu1P.88OTnB85qcPdW7rqua', NULL),
(0, '2024-10-26 20:11:00', '2024-10-26 20:11:00', '12938475', NULL, 1, NULL, NULL, 7, 'Torres', 'diana.torres@example.com', 'Diana', 'diana.torres@example.com', '$2a$10$PXF5tUCqAT.DBfJtTjPyouT5TvBAz5qPF8ltExOrstQ/u/NfsyXhy', NULL),
(1, '2024-10-26 20:11:09', '2024-10-26 20:11:09', '73829164', NULL, 2, NULL, NULL, 8, 'Gomez', 'evelyn.gomez@example.com', 'Evelyn', 'evelyn.gomez@example.com', '$2a$10$i7dEulpzWsQd4d5RtJVBLe8syu2VfgIV.c5/HkO0PYmGH/gwR.Uja', NULL),
(1, '2024-10-26 20:11:17', '2024-10-26 20:11:17', '56473829', 15, 3, NULL, NULL, 9, 'White', 'frank.white@example.com', 'Frank', 'frank.white@example.com', '$2a$10$sm3vadyitJfsDqhiSnO4uOZhtRv8KYRPs29d2mEbzk/yJzbDZLYPC', NULL),
(0, '2024-10-26 20:11:25', '2024-10-26 20:11:25', '94837561', NULL, 1, NULL, NULL, 10, 'Silva', 'gabriel.silva@example.com', 'Gabriel', 'gabriel.silva@example.com', '$2a$10$HUiXhQmZzaIjd7H0ZA4sCePm8Fvpsg0PAasSfxnQp2dranOiFdSuC', NULL),
(1, '2024-10-26 20:11:39', '2024-10-26 20:11:39', '84729135', NULL, 2, NULL, NULL, 11, 'Martinez', 'helen.martinez@example.com', 'Helen', 'helen.martinez@example.com', '$2a$10$6sqaTtbxGkWL9MaaiQ9rD.Q5gx68JX8QL8WVOwn/rvzfrVfi4jNoO', NULL),
(0, '2024-10-26 20:11:47', '2024-10-26 20:11:47', '93487512', 9, 3, NULL, NULL, 12, 'Lopez', 'ivan.lopez@example.com', 'Ivan', 'ivan.lopez@example.com', '$2a$10$OrtcmvdE/6KYxPlT56b/LO4p9hv/fNaiPfttjQkWVjZq5LSYdV24i', NULL),
(1, '2024-10-26 20:11:59', '2024-10-26 20:11:59', '19384756', NULL, 1, NULL, NULL, 13, 'Sanchez', 'julia.sanchez@example.com', 'Julia', 'julia.sanchez@example.com', '$2a$10$MKNAN.Ok/eAtfcZYKXxFGevS9S3.QaSt45ocXbYnT.PzKKjww0ZTK', NULL),
(1, '2024-10-26 20:12:06', '2024-10-26 20:12:06', '76543219', NULL, 2, NULL, NULL, 14, 'Ruiz', 'kevin.ruiz@example.com', 'Kevin', 'kevin.ruiz@example.com', '$2a$10$1j3hA9XiJvSjOgJudq6ateFvDra0m2tK9PkRiKEeKwvNghAqhmKh6', NULL),
(0, '2024-10-26 20:12:17', '2024-10-26 20:12:17', '98712345', 12, 3, NULL, NULL, 15, 'Fernandez', 'laura.fernandez@example.com', 'Laura', 'laura.fernandez@example.com', '$2a$10$ZJZdHyDLjsaKuGXxApORHekW/b1G3/yh0L2yZRkX1WvxXlg0FbD3u', NULL),
(1, '2024-10-26 20:12:25', '2024-10-26 20:12:25', '38291746', NULL, 1, NULL, NULL, 16, 'Rojas', 'marco.rojas@example.com', 'Marco', 'marco.rojas@example.com', '$2a$10$3vYD1/zYS5G.r5OvTQyOL.NOVDc7sQvpJ8aYb7HqGzCr4PZm4a0KG', NULL),
(1, '2024-10-26 20:12:35', '2024-10-26 20:12:35', '29487156', NULL, 2, NULL, NULL, 17, 'Castro', 'natalia.castro@example.com', 'Natalia', 'natalia.castro@example.com', '$2a$10$S0Jv2vKq3XQsrFYostaCoOaAwRWO466LTw5qVvlrDMgvXrbm5Ekmq', NULL),
(0, '2024-10-26 20:12:41', '2024-10-26 20:12:41', '48372619', 6, 3, NULL, NULL, 18, 'Diaz', 'oscar.diaz@example.com', 'Oscar', 'oscar.diaz@example.com', '$2a$10$j2K0lntqAw4Ij2ufcTvqx.wgGnggUbpMxlJqR0ZmycE9nKNS8L0oG', NULL),
(1, '2024-10-26 20:12:47', '2024-10-26 20:12:47', '12983745', NULL, 1, NULL, NULL, 19, 'Ramirez', 'patricia.ramirez@example.com', 'Patricia', 'patricia.ramirez@example.com', '$2a$10$Ri25ggioZpJoEfAIDVn7p.MQILP6hwVPK6YunN/QhtwqE8c4cMuEG', NULL),
(0, '2024-10-26 20:12:54', '2024-10-26 20:12:54', '67894532', 8, 3, NULL, NULL, 20, 'Alvarez', 'quentin.alvarez@example.com', 'Quentin', 'quentin.alvarez@example.com', '$2a$10$Pk7OUxJM4vsEOvhNvDAi5.zizLiTcKBDUAwf9tgOzKrtY9fawMVD2', NULL),
(1, '2024-10-26 20:13:01', '2024-10-26 20:13:01', '92837456', NULL, 2, NULL, NULL, 21, 'Mendez', 'rosa.mendez@example.com', 'Rosa', 'rosa.mendez@example.com', '$2a$10$FbpAF94MZch42isITXWA2.jbNJXDYOYUhWqmukVoxDwYvRCEdkm5e', NULL),
(1, '2024-10-29 06:19:10', '2024-10-29 06:19:10', '75943715', NULL, 2, NULL, NULL, 22, 'Sandoval Pinedo', 'diego.sandoval@gmail.com', 'Diego Alonso', 'diego.sandoval@gmail.com', '$2a$10$IB/3wu5aAUgSehELBVuyAOqEEz0093FcPwBHYWy0zYg0ia9JpDvI2', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`cita_id`),
  ADD UNIQUE KEY `UKrkd0pm7vulvgu7tqxowidqsj0` (`horario_id`),
  ADD KEY `FKb3l8n6flyfg5uxsvimq1idnt8` (`usuario_id`);

--
-- Indices de la tabla `detalle_historial_medico`
--
ALTER TABLE `detalle_historial_medico`
  ADD PRIMARY KEY (`cita_id`,`historial_medico_id`),
  ADD KEY `FK7dns78imcouam53d78huitboi` (`historial_medico_id`);

--
-- Indices de la tabla `especializacion`
--
ALTER TABLE `especializacion`
  ADD PRIMARY KEY (`especializacion_id`);

--
-- Indices de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`historial_medico_id`),
  ADD UNIQUE KEY `UKfua12vh6qps2wi9windf34w3` (`usuario_id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`horario_id`),
  ADD KEY `FK5y6aur8y2srlc017f1du9qjqv` (`usuario_id`);

--
-- Indices de la tabla `reprogramaciones`
--
ALTER TABLE `reprogramaciones`
  ADD PRIMARY KEY (`reprogramacion_id`),
  ADD KEY `FKkogvm6xei0futequx20iwiba2` (`cita_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `UKma71x4n4tydibsd9qt0m71le7` (`dni`),
  ADD UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`),
  ADD KEY `FKshkwj12wg6vkm6iuwhvcfpct8` (`rol_id`),
  ADD KEY `FKdveg948rchygs2n6yj8ui0i13` (`especializacion_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `cita_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `especializacion`
--
ALTER TABLE `especializacion`
  MODIFY `especializacion_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `historial_medico_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `horario_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `reprogramaciones`
--
ALTER TABLE `reprogramaciones`
  MODIFY `reprogramacion_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `FKb3l8n6flyfg5uxsvimq1idnt8` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  ADD CONSTRAINT `FKl1fknwenhx0uxn15hir0twf8o` FOREIGN KEY (`horario_id`) REFERENCES `horario` (`horario_id`);

--
-- Filtros para la tabla `detalle_historial_medico`
--
ALTER TABLE `detalle_historial_medico`
  ADD CONSTRAINT `FK7dns78imcouam53d78huitboi` FOREIGN KEY (`historial_medico_id`) REFERENCES `historial_medico` (`historial_medico_id`),
  ADD CONSTRAINT `FKdb5fhuultgypa0ra2lb30ehbn` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`cita_id`);

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `FK2p0jw2uj9eglmc04d3hyjsfsw` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `FK5y6aur8y2srlc017f1du9qjqv` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `reprogramaciones`
--
ALTER TABLE `reprogramaciones`
  ADD CONSTRAINT `FKkogvm6xei0futequx20iwiba2` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`cita_id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FKdveg948rchygs2n6yj8ui0i13` FOREIGN KEY (`especializacion_id`) REFERENCES `especializacion` (`especializacion_id`),
  ADD CONSTRAINT `FKshkwj12wg6vkm6iuwhvcfpct8` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
