package com.colegio.bff.controller;

import com.colegio.bff.service.AlumnoResumenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AlumnoResumenControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AlumnoResumenService alumnoResumenService;

    @InjectMocks
    private AlumnoResumenController alumnoResumenController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(alumnoResumenController).build();
    }

    @Test
    void obtenerNotasPorAlumnoDebeRetornarOk() throws Exception {
        List<Map<String, Object>> notas = List.of(
                Map.of(
                        "id", 1,
                        "alumnoId", 1,
                        "asignatura", "Matemáticas",
                        "calificacion", 6.5
                )
        );

        when(alumnoResumenService.obtenerNotasPorAlumno(1L)).thenReturn(notas);

        mockMvc.perform(get("/api/bff/alumnos/1/notas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].alumnoId").value(1))
                .andExpect(jsonPath("$[0].asignatura").value("Matemáticas"))
                .andExpect(jsonPath("$[0].calificacion").value(6.5));
    }

    @Test
    void obtenerPromedioPorAlumnoDebeRetornarOk() throws Exception {
        when(alumnoResumenService.obtenerPromedioPorAlumno(1L)).thenReturn(6.5);

        mockMvc.perform(get("/api/bff/alumnos/1/promedio"))
                .andExpect(status().isOk())
                .andExpect(content().string("6.5"));
    }

    @Test
    void obtenerAsistenciaPorAlumnoDebeRetornarOk() throws Exception {
        List<Map<String, Object>> asistencias = List.of(
                Map.of(
                        "id", 1,
                        "alumnoId", 1,
                        "estado", "PRESENTE",
                        "observacion", "Asiste a clases"
                )
        );

        when(alumnoResumenService.obtenerAsistenciaPorAlumno(1L)).thenReturn(asistencias);

        mockMvc.perform(get("/api/bff/alumnos/1/asistencia"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].alumnoId").value(1))
                .andExpect(jsonPath("$[0].estado").value("PRESENTE"))
                .andExpect(jsonPath("$[0].observacion").value("Asiste a clases"));
    }

    @Test
    void obtenerResumenAsistenciaDebeRetornarOk() throws Exception {
        Map<String, Object> resumenAsistencia = Map.of(
                "alumnoId", 1,
                "presentes", 2,
                "ausentes", 1,
                "porcentajeAsistencia", 66.6
        );

        when(alumnoResumenService.obtenerResumenAsistencia(1L)).thenReturn(resumenAsistencia);

        mockMvc.perform(get("/api/bff/alumnos/1/resumen-asistencia"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.alumnoId").value(1))
                .andExpect(jsonPath("$.presentes").value(2))
                .andExpect(jsonPath("$.ausentes").value(1))
                .andExpect(jsonPath("$.porcentajeAsistencia").value(66.6));
    }

    @Test
    void obtenerResumenAcademicoDebeRetornarOk() throws Exception {
        Map<String, Object> resumenAcademico = Map.of(
                "alumnoId", 1,
                "notas", List.of(
                        Map.of(
                                "asignatura", "Matemáticas",
                                "calificacion", 6.5
                        )
                ),
                "promedio", 6.5,
                "asistencia", Map.of(
                        "presentes", 1,
                        "ausentes", 0,
                        "porcentajeAsistencia", 100.0
                )
        );

        when(alumnoResumenService.obtenerResumenAcademico(1L)).thenReturn(resumenAcademico);

        mockMvc.perform(get("/api/bff/alumnos/1/resumen"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.alumnoId").value(1))
                .andExpect(jsonPath("$.promedio").value(6.5))
                .andExpect(jsonPath("$.notas[0].asignatura").value("Matemáticas"))
                .andExpect(jsonPath("$.notas[0].calificacion").value(6.5))
                .andExpect(jsonPath("$.asistencia.presentes").value(1))
                .andExpect(jsonPath("$.asistencia.ausentes").value(0))
                .andExpect(jsonPath("$.asistencia.porcentajeAsistencia").value(100.0));
    }
}
