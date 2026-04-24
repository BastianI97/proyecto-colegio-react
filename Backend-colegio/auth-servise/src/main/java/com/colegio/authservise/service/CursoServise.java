package com.colegio.authservise.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.colegio.authservise.entity.Curso;
import com.colegio.authservise.repository.CursoRepository;

@Service
public class CursoServise {

    private final CursoRepository cursoRepository;

    public CursoServise(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public Curso crearCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Curso obtenerCursoPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
    }

    public Curso actualizarCurso(Long id, Curso cursoActualizado) {
        Curso cursoExistente = obtenerCursoPorId(id);

        cursoExistente.setNombre(cursoActualizado.getNombre());
        cursoExistente.setNivel(cursoActualizado.getNivel());
        cursoExistente.setSeccion(cursoActualizado.getSeccion());
        cursoExistente.setAnioEscolar(cursoActualizado.getAnioEscolar());

        return cursoRepository.save(cursoExistente);
    }

    public void eliminarCurso(Long id) {
        Curso cursoExistente = obtenerCursoPorId(id);
        cursoRepository.delete(cursoExistente);
    }
}