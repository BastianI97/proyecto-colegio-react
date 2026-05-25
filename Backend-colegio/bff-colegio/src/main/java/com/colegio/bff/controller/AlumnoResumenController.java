package com.colegio.bff.controller;

import com.colegio.bff.service.AlumnoResumenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bff/alumnos")
public class AlumnoResumenController {

    private final AlumnoResumenService alumnoResumenService;

    public AlumnoResumenController(AlumnoResumenService alumnoResumenService) {
        this.alumnoResumenService = alumnoResumenService;
    }

    @GetMapping("/{alumnoId}/notas")
    public ResponseEntity<Object> obtenerNotasPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerNotasPorAlumno(alumnoId));
    }

    @GetMapping("/{alumnoId}/promedio")
    public ResponseEntity<Object> obtenerPromedioPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerPromedioPorAlumno(alumnoId));
    }

    @GetMapping("/{alumnoId}/asistencia")
    public ResponseEntity<Object> obtenerAsistenciaPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerAsistenciaPorAlumno(alumnoId));
    }

    @GetMapping("/{alumnoId}/resumen-asistencia")
    public ResponseEntity<Object> obtenerResumenAsistencia(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerResumenAsistencia(alumnoId));
    }

    @GetMapping("/{alumnoId}/resumen")
    public ResponseEntity<Object> obtenerResumenAcademico(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerResumenAcademico(alumnoId));
    }
}
