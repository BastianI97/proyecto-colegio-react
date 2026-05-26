package com.colegio.notas.controller;

import com.colegio.notas.entity.Nota;
import com.colegio.notas.service.NotaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class NotaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private NotaService notaService;

    @InjectMocks
    private NotaController notaController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(notaController).build();
    }

    @Test
    void calcularPromedioPorAlumnoDebeRetornarOk() throws Exception {
        when(notaService.calcularPromedioPorAlumno(1L)).thenReturn(6.5);

        mockMvc.perform(get("/api/notas/alumno/1/promedio"))
                .andExpect(status().isOk())
                .andExpect(content().string("6.5"));
    }

    @Test
    void crearNotaDebeRetornarCreated() throws Exception {
        Nota notaCreada = new Nota(1L, 1L, "Matemáticas", 6.5, LocalDate.now());

        when(notaService.crearNota(any(Nota.class))).thenReturn(notaCreada);

        mockMvc.perform(post("/api/notas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"asignatura\":\"Matemáticas\",\"calificacion\":6.5}"))
                .andExpect(status().isCreated());
    }
}
