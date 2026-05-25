package com.colegio.notas.controller;

import com.colegio.notas.entity.Nota;
import com.colegio.notas.service.NotaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public ResponseEntity<Nota> crearNota(@Valid @RequestBody Nota nota) {
        Nota nuevaNota = notaService.crearNota(nota);
        return new ResponseEntity<>(nuevaNota, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Nota>> listarNotas() {
        return ResponseEntity.ok(notaService.listarNotas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> obtenerNotaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(notaService.obtenerNotaPorId(id));
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Nota>> listarNotasPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(notaService.listarNotasPorAlumno(alumnoId));
    }

    @GetMapping("/alumno/{alumnoId}/asignatura/{asignatura}")
    public ResponseEntity<List<Nota>> listarNotasPorAlumnoYAsignatura(
            @PathVariable Long alumnoId,
            @PathVariable String asignatura) {
        return ResponseEntity.ok(notaService.listarNotasPorAlumnoYAsignatura(alumnoId, asignatura));
    }

    @GetMapping("/alumno/{alumnoId}/promedio")
    public ResponseEntity<Double> calcularPromedioPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(notaService.calcularPromedioPorAlumno(alumnoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> actualizarNota(@PathVariable Long id, @Valid @RequestBody Nota nota) {
        return ResponseEntity.ok(notaService.actualizarNota(id, nota));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNota(@PathVariable Long id) {
        notaService.eliminarNota(id);
        return ResponseEntity.noContent().build();
    }
}
