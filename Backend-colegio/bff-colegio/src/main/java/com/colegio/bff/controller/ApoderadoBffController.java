package com.colegio.bff.controller;

import com.colegio.bff.service.AlumnoResumenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bff/apoderados")
public class ApoderadoBffController {

    private final AlumnoResumenService alumnoResumenService;

    public ApoderadoBffController(AlumnoResumenService alumnoResumenService) {
        this.alumnoResumenService = alumnoResumenService;
    }

    @GetMapping("/{apoderadoId}/alumnos")
    public ResponseEntity<Object> obtenerAlumnosPorApoderado(@PathVariable Long apoderadoId) {
        return ResponseEntity.ok(alumnoResumenService.obtenerAlumnosPorApoderado(apoderadoId));
    }

    @GetMapping("/{apoderadoId}/alumnos/{alumnoId}/resumen")
    public ResponseEntity<Map<String, Object>> obtenerResumenAlumnoParaApoderado(
            @PathVariable Long apoderadoId,
            @PathVariable Long alumnoId
    ) {
        return ResponseEntity.ok(
                alumnoResumenService.obtenerResumenAcademicoParaApoderado(apoderadoId, alumnoId)
        );
    }
}
