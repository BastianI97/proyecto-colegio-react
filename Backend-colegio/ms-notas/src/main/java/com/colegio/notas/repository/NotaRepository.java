package com.colegio.notas.repository;

import com.colegio.notas.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    List<Nota> findByAlumnoId(Long alumnoId);

    List<Nota> findByAlumnoIdAndAsignaturaIgnoreCase(Long alumnoId, String asignatura);
}
