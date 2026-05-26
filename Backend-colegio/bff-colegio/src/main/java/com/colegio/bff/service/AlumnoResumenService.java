package com.colegio.bff.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AlumnoResumenService {

    private final RestTemplate restTemplate;

    @Value("${services.notas.url}")
    private String notasUrl;

    @Value("${services.asistencia.url}")
    private String asistenciaUrl;

    public AlumnoResumenService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object obtenerNotasPorAlumno(Long alumnoId) {
        String url = notasUrl + "/alumno/" + alumnoId;
        return restTemplate.getForObject(url, Object.class);
    }

    public Object obtenerPromedioPorAlumno(Long alumnoId) {
        String url = notasUrl + "/alumno/" + alumnoId + "/promedio";
        return restTemplate.getForObject(url, Object.class);
    }

    public Object obtenerAsistenciaPorAlumno(Long alumnoId) {
        String url = asistenciaUrl + "/alumno/" + alumnoId;
        return restTemplate.getForObject(url, Object.class);
    }

    public Object obtenerResumenAsistencia(Long alumnoId) {
        String url = asistenciaUrl + "/alumno/" + alumnoId + "/resumen";
        return restTemplate.getForObject(url, Object.class);
    }

    public Map<String, Object> obtenerResumenAcademico(Long alumnoId) {
        return Map.of(
                "alumnoId", alumnoId,
                "notas", obtenerNotasPorAlumno(alumnoId),
                "promedio", obtenerPromedioPorAlumno(alumnoId),
                "asistencia", obtenerResumenAsistencia(alumnoId)
        );
    }
}
