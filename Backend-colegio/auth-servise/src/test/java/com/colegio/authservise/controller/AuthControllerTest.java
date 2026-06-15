package com.colegio.authservise.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.colegio.authservise.dto.LoginRequest;
import com.colegio.authservise.dto.RegistroUsuarioRequest;
import com.colegio.authservise.service.AuthService;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }





    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void registrarProfesor_deberiaResponderOk() throws Exception {                                                           //esta
        when(authService.registrarProfesor(any(RegistroUsuarioRequest.class))).thenReturn(null);

        mockMvc.perform(post("/api/auth/registro/profesor")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "nombre": "Profesor",
                                  "apellido": "Demo",
                                  "email": "profesor@colegio.cl",
                                  "password": "123456"
                                }
                                """))
                .andExpect(status().isCreated());

        verify(authService).registrarProfesor(any(RegistroUsuarioRequest.class));
    }




    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    @Test
    void registrarApoderado_deberiaResponderOk() throws Exception {                                                               //esta
        when(authService.registrarApoderado(any(RegistroUsuarioRequest.class))).thenReturn(null);

        mockMvc.perform(post("/api/auth/registro/apoderado")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "nombre": "Maria",
                                  "apellido": "Gonzalez",
                                  "email": "maria.apoderado@colegio.cl",
                                  "password": "123456"
                                }
                                """))
                .andExpect(status().isCreated());

        verify(authService).registrarApoderado(any(RegistroUsuarioRequest.class));
    }





    //----------------------------------------------------------------------LOGIN--------------------------------------------------------------------------------------------------------------------------------

    @Test
    void login_deberiaResponderOk() throws Exception {
        when(authService.login(any(LoginRequest.class))).thenReturn(null);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "profesor@colegio.cl",
                                  "password": "123456"
                                }
                                """))
                .andExpect(status().isOk());

        verify(authService).login(any(LoginRequest.class));
    }
}