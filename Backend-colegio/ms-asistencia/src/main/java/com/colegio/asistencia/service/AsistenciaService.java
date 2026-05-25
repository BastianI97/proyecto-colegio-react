package com.colegio.asistencia.service;

import com.colegio.asistencia.entity.Asistencia;
import com.colegio.asistencia.repository.AsistenciaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaService(AsistenciaRepository asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }

    public Asistencia crearAsistencia(Asistencia asistencia) {
        if (asistencia.getFecha() == null) {
            asistencia.setFecha(LocalDate.now());
        }
        return asistenciaRepository.save(asistencia);
    }

    public List<Asistencia> listarAsistencias() {
        return asistenciaRepository.findAll();
    }

    public Asistencia obtenerAsistenciaPorId(Long id) {
        return asistenciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asistencia no encontrada con id: " + id));
    }

    public List<Asistencia> listarAsistenciasPorAlumno(Long alumnoId) {
        return asistenciaRepository.findByAlumnoId(alumnoId);
    }

    public List<Asistencia> listarAsistenciasPorAlumnoYFecha(Long alumnoId, LocalDate fecha) {
        return asistenciaRepository.findByAlumnoIdAndFecha(alumnoId, fecha);
    }

    public Asistencia actualizarAsistencia(Long id, Asistencia asistenciaActualizada) {
        Asistencia asistenciaExistente = obtenerAsistenciaPorId(id);

        asistenciaExistente.setAlumnoId(asistenciaActualizada.getAlumnoId());
        asistenciaExistente.setFecha(asistenciaActualizada.getFecha());
        asistenciaExistente.setEstado(asistenciaActualizada.getEstado());
        asistenciaExistente.setObservacion(asistenciaActualizada.getObservacion());

        return asistenciaRepository.save(asistenciaExistente);
    }

    public void eliminarAsistencia(Long id) {
        Asistencia asistenciaExistente = obtenerAsistenciaPorId(id);
        asistenciaRepository.delete(asistenciaExistente);
    }

    public long contarPresentesPorAlumno(Long alumnoId) {
        return asistenciaRepository.countByAlumnoIdAndEstadoIgnoreCase(alumnoId, "PRESENTE");
    }

    public long contarAusentesPorAlumno(Long alumnoId) {
        return asistenciaRepository.countByAlumnoIdAndEstadoIgnoreCase(alumnoId, "AUSENTE");
    }

    public double calcularPorcentajeAsistencia(Long alumnoId) {
        List<Asistencia> registros = asistenciaRepository.findByAlumnoId(alumnoId);

        if (registros.isEmpty()) {
            return 0.0;
        }

        long presentes = registros.stream()
                .filter(registro -> "PRESENTE".equalsIgnoreCase(registro.getEstado()))
                .count();

        return (presentes * 100.0) / registros.size();
    }
}
