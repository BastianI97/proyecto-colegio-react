package com.colegio.authservise.service;

import com.colegio.authservise.dto.AuthResponse;
import com.colegio.authservise.dto.LoginRequest;
import com.colegio.authservise.dto.RegistroUsuarioRequest;
import com.colegio.authservise.entity.RolUsuario;
import com.colegio.authservise.entity.Usuario;
import com.colegio.authservise.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registrarProfesor(RegistroUsuarioRequest request) {
        return registrarUsuario(request, RolUsuario.PROFESOR, "Profesor registrado correctamente");
    }

    public AuthResponse registrarApoderado(RegistroUsuarioRequest request) {
        return registrarUsuario(request, RolUsuario.APODERADO, "Apoderado registrado correctamente");
    }

    private AuthResponse registrarUsuario(RegistroUsuarioRequest request, RolUsuario rol, String mensaje) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Ya existe un usuario registrado con ese email");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(rol);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return new AuthResponse(
                usuarioGuardado.getId(),
                usuarioGuardado.getNombre(),
                usuarioGuardado.getApellido(),
                usuarioGuardado.getEmail(),
                usuarioGuardado.getRol().name(),
                mensaje
        );
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return new AuthResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getRol().name(),
                "Login correcto"
        );
    }
}
