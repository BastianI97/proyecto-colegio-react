package com.colegio.bff.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class AlumnoResumenService {

    private final RestTemplate restTemplate;

    @Value("${services.notas.url}")
    private String notasUrl;

    @Value("${services.asistencia.url}")
    private String asistenciaUrl;

    @Value("${services.auth.url}")
    private String authUrl;

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

    public Object obtenerAlumnosPorApoderado(Long apoderadoId) {
        String url = authUrl + "/apoderados/" + apoderadoId + "/alumnos";
        return restTemplate.getForObject(url, Object.class);
    }

    public boolean apoderadoPuedeVerAlumno(Long apoderadoId, Long alumnoId) {
        String url = authUrl + "/apoderados/" + apoderadoId + "/alumnos/" + alumnoId + "/validar";

        Map<?, ?> respuesta = restTemplate.getForObject(url, Map.class);

        if (respuesta == null || !respuesta.containsKey("autorizado")) {
            return false;
        }

        Object autorizado = respuesta.get("autorizado");
        return Boolean.TRUE.equals(autorizado);
    }

    public Map<String, Object> obtenerResumenAcademicoParaApoderado(Long apoderadoId, Long alumnoId) {
        boolean autorizado = apoderadoPuedeVerAlumno(apoderadoId, alumnoId);

        if (!autorizado) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "El apoderado no está autorizado para ver la información de este alumno"
            );
        }

        return obtenerResumenAcademico(alumnoId);
    }
}
