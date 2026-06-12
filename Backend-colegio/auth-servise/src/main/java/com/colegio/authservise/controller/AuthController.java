package com.colegio.authservise.controller;

import com.colegio.authservise.dto.AuthResponse;
import com.colegio.authservise.dto.LoginRequest;
import com.colegio.authservise.dto.RegistroUsuarioRequest;
import com.colegio.authservise.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registro/profesor")
    public ResponseEntity<AuthResponse> registrarProfesor(@RequestBody RegistroUsuarioRequest request) {
        return new ResponseEntity<>(authService.registrarProfesor(request), HttpStatus.CREATED);
    }

    @PostMapping("/registro/apoderado")
    public ResponseEntity<AuthResponse> registrarApoderado(@RequestBody RegistroUsuarioRequest request) {
        return new ResponseEntity<>(authService.registrarApoderado(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
