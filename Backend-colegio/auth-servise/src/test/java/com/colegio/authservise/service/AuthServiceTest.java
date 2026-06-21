package com.colegio.authservise.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.colegio.authservise.dto.AuthResponse;
import com.colegio.authservise.dto.LoginRequest;
import com.colegio.authservise.dto.RegistroUsuarioRequest;
import com.colegio.authservise.entity.RolUsuario;
import com.colegio.authservise.entity.Usuario;
import com.colegio.authservise.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(usuarioRepository, passwordEncoder);
    }

    @Test
    void registrarProfesor_deberiaGuardarUsuarioConRolProfesor() {
        RegistroUsuarioRequest request = new RegistroUsuarioRequest();
        request.setNombre("Profesor");
        request.setApellido("Demo");
        request.setEmail("profesor@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.existsByEmail("profesor@colegio.cl")).thenReturn(false);
        when(passwordEncoder.encode("123456")).thenReturn("password-encriptada");

        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario usuario = invocation.getArgument(0);
            usuario.setId(1L);
            return usuario;
        });

        AuthResponse response = authService.registrarProfesor(request);

        assertEquals(1L, response.getId());
        assertEquals("Profesor", response.getNombre());
        assertEquals("Demo", response.getApellido());
        assertEquals("profesor@colegio.cl", response.getEmail());
        assertEquals("PROFESOR", response.getRol());
        assertEquals("Profesor registrado correctamente", response.getMensaje());

        verify(usuarioRepository).existsByEmail("profesor@colegio.cl");
        verify(passwordEncoder).encode("123456");
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void registrarApoderado_deberiaGuardarUsuarioConRolApoderado() {
        RegistroUsuarioRequest request = new RegistroUsuarioRequest();
        request.setNombre("Maria");
        request.setApellido("Gonzalez");
        request.setEmail("maria.apoderado@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.existsByEmail("maria.apoderado@colegio.cl")).thenReturn(false);
        when(passwordEncoder.encode("123456")).thenReturn("password-encriptada");

        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario usuario = invocation.getArgument(0);
            usuario.setId(2L);
            return usuario;
        });

        AuthResponse response = authService.registrarApoderado(request);

        assertEquals(2L, response.getId());
        assertEquals("Maria", response.getNombre());
        assertEquals("Gonzalez", response.getApellido());
        assertEquals("maria.apoderado@colegio.cl", response.getEmail());
        assertEquals("APODERADO", response.getRol());
        assertEquals("Apoderado registrado correctamente", response.getMensaje());

        verify(usuarioRepository).existsByEmail("maria.apoderado@colegio.cl");
        verify(passwordEncoder).encode("123456");
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void registrarProfesor_deberiaLanzarErrorCuandoEmailYaExiste() {
        RegistroUsuarioRequest request = new RegistroUsuarioRequest();
        request.setNombre("Profesor");
        request.setApellido("Demo");
        request.setEmail("profesor@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.existsByEmail("profesor@colegio.cl")).thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.registrarProfesor(request)
        );

        assertEquals("Ya existe un usuario registrado con ese email", exception.getMessage());

        verify(usuarioRepository).existsByEmail("profesor@colegio.cl");
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    void login_deberiaRetornarRespuestaCuandoCredencialesSonValidas() {
        LoginRequest request = new LoginRequest();
        request.setEmail("maria.apoderado@colegio.cl");
        request.setPassword("123456");

        Usuario usuario = new Usuario();
        usuario.setId(2L);
        usuario.setNombre("Maria");
        usuario.setApellido("Gonzalez");
        usuario.setEmail("maria.apoderado@colegio.cl");
        usuario.setPassword("password-encriptada");
        usuario.setRol(RolUsuario.APODERADO);

        when(usuarioRepository.findByEmail("maria.apoderado@colegio.cl"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches("123456", "password-encriptada"))
                .thenReturn(true);

        AuthResponse response = authService.login(request);

        assertEquals(2L, response.getId());
        assertEquals("Maria", response.getNombre());
        assertEquals("Gonzalez", response.getApellido());
        assertEquals("maria.apoderado@colegio.cl", response.getEmail());
        assertEquals("APODERADO", response.getRol());
        assertEquals("Login correcto", response.getMensaje());

        verify(usuarioRepository).findByEmail("maria.apoderado@colegio.cl");
        verify(passwordEncoder).matches("123456", "password-encriptada");
    }

    @Test
    void login_deberiaLanzarErrorCuandoUsuarioNoExiste() {
        LoginRequest request = new LoginRequest();
        request.setEmail("noexiste@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.findByEmail("noexiste@colegio.cl"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Usuario no encontrado", exception.getMessage());

        verify(usuarioRepository).findByEmail("noexiste@colegio.cl");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    void login_deberiaLanzarErrorCuandoPasswordEsIncorrecto() {
        LoginRequest request = new LoginRequest();
        request.setEmail("maria.apoderado@colegio.cl");
        request.setPassword("clave-incorrecta");

        Usuario usuario = new Usuario();
        usuario.setId(2L);
        usuario.setNombre("Maria");
        usuario.setApellido("Gonzalez");
        usuario.setEmail("maria.apoderado@colegio.cl");
        usuario.setPassword("password-encriptada");
        usuario.setRol(RolUsuario.APODERADO);

        when(usuarioRepository.findByEmail("maria.apoderado@colegio.cl"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches("clave-incorrecta", "password-encriptada"))
                .thenReturn(false);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Credenciales inválidas", exception.getMessage());

        verify(usuarioRepository).findByEmail("maria.apoderado@colegio.cl");
        verify(passwordEncoder).matches("clave-incorrecta", "password-encriptada");
    }
}