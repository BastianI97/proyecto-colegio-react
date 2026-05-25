package com.colegio.notas.service;

import com.colegio.notas.entity.Nota;
import com.colegio.notas.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotaService {

    private final NotaRepository notaRepository;

    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public Nota crearNota(Nota nota) {
        if (nota.getFechaRegistro() == null) {
            nota.setFechaRegistro(LocalDate.now());
        }
        return notaRepository.save(nota);
    }

    public List<Nota> listarNotas() {
        return notaRepository.findAll();
    }

    public Nota obtenerNotaPorId(Long id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con id: " + id));
    }

    public List<Nota> listarNotasPorAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }

    public List<Nota> listarNotasPorAlumnoYAsignatura(Long alumnoId, String asignatura) {
        return notaRepository.findByAlumnoIdAndAsignaturaIgnoreCase(alumnoId, asignatura);
    }

    public Nota actualizarNota(Long id, Nota notaActualizada) {
        Nota notaExistente = obtenerNotaPorId(id);

        notaExistente.setAlumnoId(notaActualizada.getAlumnoId());
        notaExistente.setAsignatura(notaActualizada.getAsignatura());
        notaExistente.setCalificacion(notaActualizada.getCalificacion());

        if (notaActualizada.getFechaRegistro() != null) {
            notaExistente.setFechaRegistro(notaActualizada.getFechaRegistro());
        }

        return notaRepository.save(notaExistente);
    }

    public void eliminarNota(Long id) {
        Nota notaExistente = obtenerNotaPorId(id);
        notaRepository.delete(notaExistente);
    }

    public Double calcularPromedioPorAlumno(Long alumnoId) {
        List<Nota> notas = notaRepository.findByAlumnoId(alumnoId);

        if (notas.isEmpty()) {
            return 0.0;
        }

        return notas.stream()
                .mapToDouble(Nota::getCalificacion)
                .average()
                .orElse(0.0);
    }
}
