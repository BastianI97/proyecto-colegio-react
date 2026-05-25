package com.colegio.asistencia.controller;

import com.colegio.asistencia.entity.Asistencia;
import com.colegio.asistencia.service.AsistenciaService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AsistenciaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AsistenciaService asistenciaService;

    @InjectMocks
    private AsistenciaController asistenciaController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(asistenciaController).build();
    }

    @Test
    void obtenerResumenAsistenciaDebeRetornarOk() throws Exception {
        when(asistenciaService.contarPresentesPorAlumno(1L)).thenReturn(2L);
        when(asistenciaService.contarAusentesPorAlumno(1L)).thenReturn(1L);
        when(asistenciaService.calcularPorcentajeAsistencia(1L)).thenReturn(66.6);

        mockMvc.perform(get("/api/asistencias/alumno/1/resumen"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.alumnoId").value(1))
                .andExpect(jsonPath("$.presentes").value(2))
                .andExpect(jsonPath("$.ausentes").value(1))
                .andExpect(jsonPath("$.porcentajeAsistencia").value(66.6));
    }

    @Test
    void crearAsistenciaDebeRetornarCreated() throws Exception {
        Asistencia asistenciaCreada = new Asistencia(
                1L,
                1L,
                LocalDate.now(),
                "PRESENTE",
                "Asiste a clases"
        );

        when(asistenciaService.crearAsistencia(any(Asistencia.class))).thenReturn(asistenciaCreada);

        mockMvc.perform(post("/api/asistencias")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"fecha\":\"2026-05-25\",\"estado\":\"PRESENTE\",\"observacion\":\"Asiste a clases\"}"))
                .andExpect(status().isCreated());
    }
}
