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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AsistenciaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AsistenciaService asistenciaService;

    @InjectMocks
    private AsistenciaController asistenciaController;

    private Asistencia crearAsistencia(Long id, Long alumnoId, String estado) {
        return new Asistencia(
                id,
                alumnoId,
                LocalDate.of(2026, 5, 25),
                estado,
                "Registro de asistencia"
        );
    }

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(asistenciaController).build();
    }

    @Test
    void crearAsistenciaDebeRetornarCreated() throws Exception {
        Asistencia asistenciaCreada = crearAsistencia(1L, 1L, "PRESENTE");

        when(asistenciaService.crearAsistencia(any(Asistencia.class))).thenReturn(asistenciaCreada);

        mockMvc.perform(post("/api/asistencias")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"fecha\":\"2026-05-25\",\"estado\":\"PRESENTE\",\"observacion\":\"Asiste a clases\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.alumnoId").value(1))
                .andExpect(jsonPath("$.estado").value("PRESENTE"));
    }

    @Test
    void listarAsistenciasDebeRetornarOk() throws Exception {
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE"),
                crearAsistencia(2L, 1L, "AUSENTE")
        );

        when(asistenciaService.listarAsistencias()).thenReturn(asistencias);

        mockMvc.perform(get("/api/asistencias"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].estado").value("AUSENTE"));
    }

    @Test
    void obtenerAsistenciaPorIdDebeRetornarOk() throws Exception {
        Asistencia asistencia = crearAsistencia(1L, 1L, "PRESENTE");

        when(asistenciaService.obtenerAsistenciaPorId(1L)).thenReturn(asistencia);

        mockMvc.perform(get("/api/asistencias/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.estado").value("PRESENTE"));
    }

    @Test
    void listarAsistenciasPorAlumnoDebeRetornarOk() throws Exception {
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE")
        );

        when(asistenciaService.listarAsistenciasPorAlumno(1L)).thenReturn(asistencias);

        mockMvc.perform(get("/api/asistencias/alumno/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].alumnoId").value(1));
    }

    @Test
    void listarAsistenciasPorAlumnoYFechaDebeRetornarOk() throws Exception {
        LocalDate fecha = LocalDate.of(2026, 5, 25);
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE")
        );

        when(asistenciaService.listarAsistenciasPorAlumnoYFecha(1L, fecha)).thenReturn(asistencias);

        mockMvc.perform(get("/api/asistencias/alumno/1/fecha/2026-05-25"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].estado").value("PRESENTE"));
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
    void actualizarAsistenciaDebeRetornarOk() throws Exception {
        Asistencia asistenciaActualizada = crearAsistencia(1L, 1L, "AUSENTE");

        when(asistenciaService.actualizarAsistencia(any(Long.class), any(Asistencia.class)))
                .thenReturn(asistenciaActualizada);

        mockMvc.perform(put("/api/asistencias/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"fecha\":\"2026-05-25\",\"estado\":\"AUSENTE\",\"observacion\":\"No asiste\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("AUSENTE"));
    }

    @Test
    void eliminarAsistenciaDebeRetornarNoContent() throws Exception {
        doNothing().when(asistenciaService).eliminarAsistencia(1L);

        mockMvc.perform(delete("/api/asistencias/1"))
                .andExpect(status().isNoContent());
    }
}
