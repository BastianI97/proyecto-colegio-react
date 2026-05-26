package com.colegio.asistencia.service;

import com.colegio.asistencia.entity.Asistencia;
import com.colegio.asistencia.repository.AsistenciaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AsistenciaServiceTest {

    @Mock
    private AsistenciaRepository asistenciaRepository;

    @InjectMocks
    private AsistenciaService asistenciaService;

    @Test
    void calcularPorcentajeAsistenciaDebeRetornarPorcentajeCorrecto() {
        Long alumnoId = 1L;

        List<Asistencia> registros = List.of(
                new Asistencia(1L, alumnoId, LocalDate.now(), "PRESENTE", "Asiste a clases"),
                new Asistencia(2L, alumnoId, LocalDate.now(), "PRESENTE", "Asiste a clases"),
                new Asistencia(3L, alumnoId, LocalDate.now(), "AUSENTE", "Inasistencia")
        );

        when(asistenciaRepository.findByAlumnoId(alumnoId)).thenReturn(registros);

        double porcentaje = asistenciaService.calcularPorcentajeAsistencia(alumnoId);

        assertEquals(66.66666666666667, porcentaje);
    }

    @Test
    void calcularPorcentajeAsistenciaSinRegistrosDebeRetornarCero() {
        Long alumnoId = 99L;

        when(asistenciaRepository.findByAlumnoId(alumnoId)).thenReturn(List.of());

        double porcentaje = asistenciaService.calcularPorcentajeAsistencia(alumnoId);

        assertEquals(0.0, porcentaje);
    }
}
