package com.colegio.asistencia.repository;

import com.colegio.asistencia.entity.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    List<Asistencia> findByAlumnoId(Long alumnoId);

    List<Asistencia> findByAlumnoIdAndFecha(Long alumnoId, LocalDate fecha);

    long countByAlumnoIdAndEstadoIgnoreCase(Long alumnoId, String estado);
}
