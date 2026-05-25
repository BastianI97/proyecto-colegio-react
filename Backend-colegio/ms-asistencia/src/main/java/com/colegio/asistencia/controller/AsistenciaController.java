package com.colegio.asistencia.controller;

import com.colegio.asistencia.entity.Asistencia;
import com.colegio.asistencia.service.AsistenciaService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/asistencias")
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    public AsistenciaController(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    @PostMapping
    public ResponseEntity<Asistencia> crearAsistencia(@Valid @RequestBody Asistencia asistencia) {
        Asistencia nuevaAsistencia = asistenciaService.crearAsistencia(asistencia);
        return new ResponseEntity<>(nuevaAsistencia, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Asistencia>> listarAsistencias() {
        return ResponseEntity.ok(asistenciaService.listarAsistencias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> obtenerAsistenciaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciaPorId(id));
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Asistencia>> listarAsistenciasPorAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(asistenciaService.listarAsistenciasPorAlumno(alumnoId));
    }

    @GetMapping("/alumno/{alumnoId}/fecha/{fecha}")
    public ResponseEntity<List<Asistencia>> listarAsistenciasPorAlumnoYFecha(
            @PathVariable Long alumnoId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(asistenciaService.listarAsistenciasPorAlumnoYFecha(alumnoId, fecha));
    }

    @GetMapping("/alumno/{alumnoId}/resumen")
    public ResponseEntity<Map<String, Object>> obtenerResumenAsistencia(@PathVariable Long alumnoId) {
        Map<String, Object> resumen = Map.of(
                "alumnoId", alumnoId,
                "presentes", asistenciaService.contarPresentesPorAlumno(alumnoId),
                "ausentes", asistenciaService.contarAusentesPorAlumno(alumnoId),
                "porcentajeAsistencia", asistenciaService.calcularPorcentajeAsistencia(alumnoId)
        );

        return ResponseEntity.ok(resumen);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> actualizarAsistencia(
            @PathVariable Long id,
            @Valid @RequestBody Asistencia asistencia) {
        return ResponseEntity.ok(asistenciaService.actualizarAsistencia(id, asistencia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAsistencia(@PathVariable Long id) {
        asistenciaService.eliminarAsistencia(id);
        return ResponseEntity.noContent().build();
    }
}
