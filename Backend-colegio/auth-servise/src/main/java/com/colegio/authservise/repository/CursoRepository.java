package com.colegio.authservise.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.colegio.authservise.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}