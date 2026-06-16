package com.colegio.authservise.controller;

import com.colegio.authservise.dto.AuthResponse;
import com.colegio.authservise.dto.CrearAlumnoRequest;
import com.colegio.authservise.dto.RegistroUsuarioRequest;
import com.colegio.authservise.entity.AlumnoPerfil;
import com.colegio.authservise.entity.ApoderadoAlumno;
import com.colegio.authservise.entity.Usuario;
import com.colegio.authservise.service.AuthService;
import com.colegio.authservise.service.GestionAcademicaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesor")
public class ProfesorController {

    private final GestionAcademicaService gestionAcademicaService;
    private final AuthService authService;

    public ProfesorController(GestionAcademicaService gestionAcademicaService, AuthService authService) {
        this.gestionAcademicaService = gestionAcademicaService;
        this.authService = authService;
    }

    @PostMapping("/alumnos")
    public ResponseEntity<AlumnoPerfil> crearAlumno(@RequestBody CrearAlumnoRequest request) {
        AlumnoPerfil alumno = gestionAcademicaService.crearAlumno(request);
        return new ResponseEntity<>(alumno, HttpStatus.CREATED);
    }

    @GetMapping("/alumnos")
    public ResponseEntity<List<AlumnoPerfil>> listarAlumnos() {
        return ResponseEntity.ok(gestionAcademicaService.listarAlumnos());
    }

    @GetMapping("/alumnos/{alumnoId}")
    public ResponseEntity<AlumnoPerfil> obtenerAlumnoPorId(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(gestionAcademicaService.obtenerAlumnoPorId(alumnoId));
    }

    @PostMapping("/apoderados")
    public ResponseEntity<AuthResponse> crearApoderado(@RequestBody RegistroUsuarioRequest request) {
        return new ResponseEntity<>(authService.registrarApoderado(request), HttpStatus.CREATED);
    }

    @GetMapping("/apoderados")
    public ResponseEntity<List<Usuario>> listarApoderados() {
        return ResponseEntity.ok(gestionAcademicaService.listarApoderados());
    }

    @PostMapping("/apoderados/{apoderadoId}/alumnos/{alumnoId}")
    public ResponseEntity<ApoderadoAlumno> asociarApoderadoConAlumno(
            @PathVariable Long apoderadoId,
            @PathVariable Long alumnoId
    ) {
        ApoderadoAlumno relacion = gestionAcademicaService.asociarApoderadoConAlumno(apoderadoId, alumnoId);
        return new ResponseEntity<>(relacion, HttpStatus.CREATED);
    }
}
