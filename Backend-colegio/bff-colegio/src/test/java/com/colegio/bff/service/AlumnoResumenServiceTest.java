package com.colegio.bff.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AlumnoResumenServiceTest {

    private RestTemplate restTemplate;
    private AlumnoResumenService alumnoResumenService;

    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        alumnoResumenService = new AlumnoResumenService(restTemplate);

        ReflectionTestUtils.setField(alumnoResumenService, "notasUrl", "http://localhost:8082/api/notas");
        ReflectionTestUtils.setField(alumnoResumenService, "asistenciaUrl", "http://localhost:8083/api/asistencias");
    }

    @Test
    void obtenerResumenAcademicoDebeIntegrarNotasPromedioYAsistencia() {
        Long alumnoId = 1L;

        List<Map<String, Object>> notas = List.of(
                Map.of("asignatura", "Matemáticas", "calificacion", 6.5)
        );

        Map<String, Object> asistencia = Map.of(
                "presentes", 10,
                "ausentes", 2,
                "porcentajeAsistencia", 83.3
        );

        when(restTemplate.getForObject("http://localhost:8082/api/notas/alumno/1", Object.class))
                .thenReturn(notas);

        when(restTemplate.getForObject("http://localhost:8082/api/notas/alumno/1/promedio", Object.class))
                .thenReturn(6.5);

        when(restTemplate.getForObject("http://localhost:8083/api/asistencias/alumno/1/resumen", Object.class))
                .thenReturn(asistencia);

        Map<String, Object> resultado = alumnoResumenService.obtenerResumenAcademico(alumnoId);

        assertEquals(1L, resultado.get("alumnoId"));
        assertEquals(notas, resultado.get("notas"));
        assertEquals(6.5, resultado.get("promedio"));
        assertEquals(asistencia, resultado.get("asistencia"));

        verify(restTemplate, times(1))
                .getForObject("http://localhost:8082/api/notas/alumno/1", Object.class);

        verify(restTemplate, times(1))
                .getForObject("http://localhost:8082/api/notas/alumno/1/promedio", Object.class);

        verify(restTemplate, times(1))
                .getForObject("http://localhost:8083/api/asistencias/alumno/1/resumen", Object.class);
    }
}
