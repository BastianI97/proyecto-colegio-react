package com.colegio.authservise.repository;

import com.colegio.authservise.entity.ApoderadoAlumno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApoderadoAlumnoRepository extends JpaRepository<ApoderadoAlumno, Long> {

    List<ApoderadoAlumno> findByApoderadoId(Long apoderadoId);

    Optional<ApoderadoAlumno> findByApoderadoIdAndAlumnoId(Long apoderadoId, Long alumnoId);

    boolean existsByApoderadoIdAndAlumnoId(Long apoderadoId, Long alumnoId);
}
