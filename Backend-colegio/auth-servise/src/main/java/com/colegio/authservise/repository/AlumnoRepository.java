package com.colegio.authservise.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.colegio.authservise.entity.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}