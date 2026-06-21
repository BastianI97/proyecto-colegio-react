package com.colegio.bff.service;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class AlumnoResumenServiceTest {

    @Mock
    private RestTemplate restTemplate;

    private AlumnoResumenService alumnoResumenService;

    @BeforeEach
    void setUp() {
        alumnoResumenService = new AlumnoResumenService(restTemplate);

        ReflectionTestUtils.setField(alumnoResumenService, "notasUrl", "http://notas/api/notas");
        ReflectionTestUtils.setField(alumnoResumenService, "asistenciaUrl", "http://asistencia/api/asistencias");
        ReflectionTestUtils.setField(alumnoResumenService, "authUrl", "http://auth/api");
    }

    @Test
    void obtenerNotasPorAlumno_deberiaConsultarMsNotas() {
        List<Map<String, Object>> notas = List.of(
                Map.of(
                        "id", 1,
                        "alumnoId", 3,
                        "asignatura", "Matemáticas",
                        "calificacion", 6.5
                )
        );

        when(restTemplate.getForObject("http://notas/api/notas/alumno/3", Object.class))
                .thenReturn(notas);

        Object resultado = alumnoResumenService.obtenerNotasPorAlumno(3L);

        assertEquals(notas, resultado);
        verify(restTemplate).getForObject("http://notas/api/notas/alumno/3", Object.class);
    }

    @Test
    void obtenerPromedioPorAlumno_deberiaConsultarPromedioEnMsNotas() {
        when(restTemplate.getForObject("http://notas/api/notas/alumno/3/promedio", Object.class))
                .thenReturn(6.5);

        Object resultado = alumnoResumenService.obtenerPromedioPorAlumno(3L);

        assertEquals(6.5, resultado);
        verify(restTemplate).getForObject("http://notas/api/notas/alumno/3/promedio", Object.class);
    }

    @Test
    void obtenerAsistenciaPorAlumno_deberiaConsultarMsAsistencia() {
        List<Map<String, Object>> asistencia = List.of(
                Map.of(
                        "id", 1,
                        "alumnoId", 3,
                        "estado", "PRESENTE"
                )
        );

        when(restTemplate.getForObject("http://asistencia/api/asistencias/alumno/3", Object.class))
                .thenReturn(asistencia);

        Object resultado = alumnoResumenService.obtenerAsistenciaPorAlumno(3L);

        assertEquals(asistencia, resultado);
        verify(restTemplate).getForObject("http://asistencia/api/asistencias/alumno/3", Object.class);
    }

    @Test
    void obtenerResumenAsistencia_deberiaConsultarResumenEnMsAsistencia() {
        Map<String, Object> resumenAsistencia = Map.of(
                "alumnoId", 3,
                "presentes", 2,
                "ausentes", 1,
                "porcentajeAsistencia", 66.6
        );

        when(restTemplate.getForObject("http://asistencia/api/asistencias/alumno/3/resumen", Object.class))
                .thenReturn(resumenAsistencia);

        Object resultado = alumnoResumenService.obtenerResumenAsistencia(3L);

        assertEquals(resumenAsistencia, resultado);
        verify(restTemplate).getForObject("http://asistencia/api/asistencias/alumno/3/resumen", Object.class);
    }

    @Test
    void obtenerResumenAcademico_deberiaConsolidarNotasPromedioYAsistencia() {
        List<Map<String, Object>> notas = List.of(
                Map.of(
                        "asignatura", "Matemáticas",
                        "calificacion", 6.5
                )
        );

        Map<String, Object> resumenAsistencia = Map.of(
                "presentes", 2,
                "ausentes", 1,
                "porcentajeAsistencia", 66.6
        );

        when(restTemplate.getForObject("http://notas/api/notas/alumno/3", Object.class))
                .thenReturn(notas);

        when(restTemplate.getForObject("http://notas/api/notas/alumno/3/promedio", Object.class))
                .thenReturn(6.5);

        when(restTemplate.getForObject("http://asistencia/api/asistencias/alumno/3/resumen", Object.class))
                .thenReturn(resumenAsistencia);

        Map<String, Object> resultado = alumnoResumenService.obtenerResumenAcademico(3L);

        assertEquals(3L, resultado.get("alumnoId"));
        assertEquals(notas, resultado.get("notas"));
        assertEquals(6.5, resultado.get("promedio"));
        assertEquals(resumenAsistencia, resultado.get("asistencia"));
    }

    @Test
    void obtenerAlumnosPorApoderado_deberiaConsultarAuthService() {
        List<Map<String, Object>> alumnos = List.of(
                Map.of(
                        "id", 3,
                        "nombre", "Camila",
                        "apellido", "Rojas",
                        "grado", "5° Básico"
                )
        );

        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos", Object.class))
                .thenReturn(alumnos);

        Object resultado = alumnoResumenService.obtenerAlumnosPorApoderado(6L);

        assertEquals(alumnos, resultado);
        verify(restTemplate).getForObject("http://auth/api/apoderados/6/alumnos", Object.class);
    }

    @Test
    void apoderadoPuedeVerAlumno_deberiaRetornarTrueCuandoAuthAutoriza() {
        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos/3/validar", Map.class))
                .thenReturn(Map.of("autorizado", true));

        boolean resultado = alumnoResumenService.apoderadoPuedeVerAlumno(6L, 3L);

        assertTrue(resultado);
    }

    @Test
    void apoderadoPuedeVerAlumno_deberiaRetornarFalseCuandoAuthNoAutoriza() {
        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos/1/validar", Map.class))
                .thenReturn(Map.of("autorizado", false));

        boolean resultado = alumnoResumenService.apoderadoPuedeVerAlumno(6L, 1L);

        assertFalse(resultado);
    }

    @Test
    void apoderadoPuedeVerAlumno_deberiaRetornarFalseCuandoAuthRetornaNull() {
        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos/1/validar", Map.class))
                .thenReturn(null);

        boolean resultado = alumnoResumenService.apoderadoPuedeVerAlumno(6L, 1L);

        assertFalse(resultado);
    }

    @Test
    void obtenerResumenAcademicoParaApoderado_deberiaRetornarResumenCuandoEstaAutorizado() {
        List<Map<String, Object>> notas = List.of();

        Map<String, Object> resumenAsistencia = Map.of(
                "presentes", 1,
                "ausentes", 0,
                "porcentajeAsistencia", 100.0
        );

        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos/3/validar", Map.class))
                .thenReturn(Map.of("autorizado", true));

        when(restTemplate.getForObject("http://notas/api/notas/alumno/3", Object.class))
                .thenReturn(notas);

        when(restTemplate.getForObject("http://notas/api/notas/alumno/3/promedio", Object.class))
                .thenReturn(0.0);

        when(restTemplate.getForObject("http://asistencia/api/asistencias/alumno/3/resumen", Object.class))
                .thenReturn(resumenAsistencia);

        Map<String, Object> resultado =
                alumnoResumenService.obtenerResumenAcademicoParaApoderado(6L, 3L);

        assertEquals(3L, resultado.get("alumnoId"));
        assertEquals(notas, resultado.get("notas"));
        assertEquals(0.0, resultado.get("promedio"));
        assertEquals(resumenAsistencia, resultado.get("asistencia"));
    }

    @Test
    void obtenerResumenAcademicoParaApoderado_deberiaLanzarForbiddenCuandoNoEstaAutorizado() {
        when(restTemplate.getForObject("http://auth/api/apoderados/6/alumnos/1/validar", Map.class))
                .thenReturn(Map.of("autorizado", false));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> alumnoResumenService.obtenerResumenAcademicoParaApoderado(6L, 1L)
        );

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
    }
}