package com.colegio.authservise.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
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

    @InjectMocks
    private AuthService authService;

    @Test
    void registrarProfesor_deberiaCrearUsuarioConRolProfesor() {                                  //ESTA
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
        assertEquals("PROFESOR", response.getRol());                                                     //agregado

        verify(usuarioRepository).save(any(Usuario.class));
    }


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    @Test
    void registrarApoderado_deberiaCrearUsuarioConRolApoderado() {                                          //ESTA
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
        assertEquals("APODERADO", response.getRol());                                                          //agregado

        verify(usuarioRepository).save(any(Usuario.class));
    }





    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void registrarProfesor_deberiaLanzarErrorSiEmailYaExiste() {
        RegistroUsuarioRequest request = new RegistroUsuarioRequest();
        request.setNombre("Profesor");
        request.setApellido("Demo");
        request.setEmail("profesor@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.existsByEmail("profesor@colegio.cl")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> authService.registrarProfesor(request));

        verify(usuarioRepository, never()).save(any(Usuario.class));
    }





    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void login_deberiaRetornarUsuarioCuandoCredencialesSonValidas() {                                                //ESTA
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
        assertEquals("APODERADO", response.getRol());                                              //agregado
    }





    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void login_deberiaLanzarErrorSiUsuarioNoExiste() {
        LoginRequest request = new LoginRequest();
        request.setEmail("noexiste@colegio.cl");
        request.setPassword("123456");

        when(usuarioRepository.findByEmail("noexiste@colegio.cl"))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login(request));
    }




    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void login_deberiaLanzarErrorSiPasswordEsIncorrecta() {
        LoginRequest request = new LoginRequest();
        request.setEmail("maria.apoderado@colegio.cl");
        request.setPassword("clave-mala");

        Usuario usuario = new Usuario();
        usuario.setId(2L);
        usuario.setNombre("Maria");
        usuario.setApellido("Gonzalez");
        usuario.setEmail("maria.apoderado@colegio.cl");
        usuario.setPassword("password-encriptada");
        usuario.setRol(RolUsuario.APODERADO);

        when(usuarioRepository.findByEmail("maria.apoderado@colegio.cl"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches("clave-mala", "password-encriptada"))
                .thenReturn(false);

        assertThrows(RuntimeException.class, () -> authService.login(request));
    }
}