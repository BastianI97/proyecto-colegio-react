package com.colegio.authservise.controller;

import com.colegio.authservise.entity.AlumnoPerfil;
import com.colegio.authservise.service.GestionAcademicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/apoderados")
public class ApoderadoController {

    private final GestionAcademicaService gestionAcademicaService;

    public ApoderadoController(GestionAcademicaService gestionAcademicaService) {
        this.gestionAcademicaService = gestionAcademicaService;
    }

    @GetMapping("/{apoderadoId}/alumnos")
    public ResponseEntity<List<AlumnoPerfil>> listarAlumnosDelApoderado(@PathVariable Long apoderadoId) {
        return ResponseEntity.ok(gestionAcademicaService.listarAlumnosPorApoderado(apoderadoId));
    }

    @GetMapping("/{apoderadoId}/alumnos/{alumnoId}/validar")
    public ResponseEntity<Map<String, Object>> validarAccesoAlumno(
            @PathVariable Long apoderadoId,
            @PathVariable Long alumnoId
    ) {
        boolean autorizado = gestionAcademicaService.apoderadoPuedeVerAlumno(apoderadoId, alumnoId);

        return ResponseEntity.ok(Map.of(
                "apoderadoId", apoderadoId,
                "alumnoId", alumnoId,
                "autorizado", autorizado
        ));
    }
}
