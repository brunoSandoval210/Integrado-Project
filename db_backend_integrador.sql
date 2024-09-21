-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2024 a las 21:35:17
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
  `cita_id` int(11) NOT NULL,
  `fecha_cita` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado_cita` int(11) NOT NULL DEFAULT 1,
  `usuario_id` int(11) DEFAULT NULL,
  `horario_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_historial_medico`
--

CREATE TABLE `detalle_historial_medico` (
  `historial_medico_id` int(11) NOT NULL,
  `cita_id` int(11) NOT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_usuario`
--

CREATE TABLE `documentos_usuario` (
  `id` int(11) NOT NULL,
  `nombre_archivo` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `historial_medico_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especializacion`
--

CREATE TABLE `especializacion` (
  `especializacion_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especializacion`
--

INSERT INTO `especializacion` (`especializacion_id`, `nombre`, `fecha_creacion`, `fecha_actualizacion`, `status`) VALUES
(1, 'Cardiología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(2, 'Dermatología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(3, 'Gastroenterología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(4, 'Ginegología y Obstetricia', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(5, 'Hematología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(6, 'Oftalmología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(7, 'Ortopedia', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(8, 'Otorrinolaringología', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(9, 'Pediatría', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(10, 'Psiquiatría General', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1),
(11, 'Medicina General', '2024-09-19 00:50:20', '2024-09-19 00:50:20', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_medico`
--

CREATE TABLE `historial_medico` (
  `historial_medico_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `horario_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `nombre`, `fecha_creacion`, `fecha_actualizacion`, `status`) VALUES
(1, 'ROLE_DOCTOR', '2024-09-16 19:42:54', '2024-09-16 19:42:54', 1),
(2, 'ROLE_USER', '2024-09-16 19:42:54', '2024-09-17 00:46:37', 1),
(3, 'ROLE_ADMIN', '2024-09-17 00:46:37', '2024-09-17 00:46:37', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` varchar(8) DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numero_colegiatura` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_especializacion`
--

CREATE TABLE `usuario_especializacion` (
  `usuario_id` int(11) NOT NULL,
  `especializacion_id` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_especializacion`
--

INSERT INTO `usuario_especializacion` (`usuario_id`, `especializacion_id`, `fecha_creacion`, `fecha_actualizacion`, `status`) VALUES
(24, 2, '2024-09-19 00:52:21', '2024-09-19 00:52:21', 1),
(25, 1, '2024-09-19 00:52:21', '2024-09-19 00:52:21', 1),
(26, 3, '2024-09-19 00:52:21', '2024-09-19 00:52:21', 1),
(27, 4, '2024-09-19 00:52:21', '2024-09-19 00:52:21', 1),
(28, 5, '2024-09-19 00:52:21', '2024-09-19 00:52:21', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`cita_id`),
  ADD KEY `idx_cita_usuario` (`usuario_id`),
  ADD KEY `idx_cita_horario` (`horario_id`);

--
-- Indices de la tabla `detalle_historial_medico`
--
ALTER TABLE `detalle_historial_medico`
  ADD PRIMARY KEY (`historial_medico_id`,`cita_id`),
  ADD KEY `fk_detalle_historial_cita` (`cita_id`),
  ADD KEY `idx_detalle_historial_medico` (`historial_medico_id`,`cita_id`);

--
-- Indices de la tabla `documentos_usuario`
--
ALTER TABLE `documentos_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historial_medico_id` (`historial_medico_id`);

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
  ADD KEY `idx_historial_usuario` (`usuario_id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`horario_id`),
  ADD KEY `idx_horario_usuario` (`usuario_id`);

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
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `UKma71x4n4tydibsd9qt0m71le7` (`dni`),
  ADD UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`),
  ADD KEY `idx_usuario_rol` (`rol_id`),
  ADD KEY `idx_usuario_dni` (`dni`),
  ADD KEY `idx_usuario_email` (`email`);

--
-- Indices de la tabla `usuario_especializacion`
--
ALTER TABLE `usuario_especializacion`
  ADD PRIMARY KEY (`usuario_id`,`especializacion_id`),
  ADD KEY `idx_usuario_especializacion_usuario` (`usuario_id`),
  ADD KEY `idx_usuario_especializacion_especializacion` (`especializacion_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `cita_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `documentos_usuario`
--
ALTER TABLE `documentos_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especializacion`
--
ALTER TABLE `especializacion`
  MODIFY `especializacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `historial_medico_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `horario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `fk_cita_horario` FOREIGN KEY (`horario_id`) REFERENCES `horario` (`horario_id`),
  ADD CONSTRAINT `fk_cita_paciente` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `detalle_historial_medico`
--
ALTER TABLE `detalle_historial_medico`
  ADD CONSTRAINT `fk_detalle_historial_cita` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`cita_id`),
  ADD CONSTRAINT `fk_detalle_historial_medico_historial_medico` FOREIGN KEY (`historial_medico_id`) REFERENCES `historial_medico` (`historial_medico_id`);

--
-- Filtros para la tabla `documentos_usuario`
--
ALTER TABLE `documentos_usuario`
  ADD CONSTRAINT `documentos_usuario_ibfk_1` FOREIGN KEY (`historial_medico_id`) REFERENCES `historial_medico` (`historial_medico_id`);

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `fk_historial_medico_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `fk_horario_medico` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FKshkwj12wg6vkm6iuwhvcfpct8` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`),
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`);

--
-- Filtros para la tabla `usuario_especializacion`
--
ALTER TABLE `usuario_especializacion`
  ADD CONSTRAINT `fk_especialiacion_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  ADD CONSTRAINT `fk_usuario_especializacion` FOREIGN KEY (`especializacion_id`) REFERENCES `especializacion` (`especializacion_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
