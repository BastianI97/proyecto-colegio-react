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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AsistenciaServiceTest {

    @Mock
    private AsistenciaRepository asistenciaRepository;

    @InjectMocks
    private AsistenciaService asistenciaService;

    private Asistencia crearAsistencia(Long id, Long alumnoId, String estado) {
        return new Asistencia(
                id,
                alumnoId,
                LocalDate.of(2026, 5, 25),
                estado,
                "Registro de asistencia"
        );
    }

    @Test
    void crearAsistenciaDebeAsignarFechaCuandoVieneNula() {
        Asistencia asistencia = new Asistencia(
                null,
                1L,
                null,
                "PRESENTE",
                "Asiste a clases"
        );

        when(asistenciaRepository.save(asistencia)).thenReturn(asistencia);

        Asistencia resultado = asistenciaService.crearAsistencia(asistencia);

        assertNotNull(resultado.getFecha());
        verify(asistenciaRepository).save(asistencia);
    }

    @Test
    void crearAsistenciaDebeMantenerFechaCuandoVieneInformada() {
        Asistencia asistencia = crearAsistencia(null, 1L, "PRESENTE");

        when(asistenciaRepository.save(asistencia)).thenReturn(asistencia);

        Asistencia resultado = asistenciaService.crearAsistencia(asistencia);

        assertEquals(LocalDate.of(2026, 5, 25), resultado.getFecha());
        verify(asistenciaRepository).save(asistencia);
    }

    @Test
    void listarAsistenciasDebeRetornarLista() {
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE"),
                crearAsistencia(2L, 1L, "AUSENTE")
        );

        when(asistenciaRepository.findAll()).thenReturn(asistencias);

        List<Asistencia> resultado = asistenciaService.listarAsistencias();

        assertEquals(2, resultado.size());
        verify(asistenciaRepository).findAll();
    }

    @Test
    void obtenerAsistenciaPorIdDebeRetornarAsistenciaCuandoExiste() {
        Asistencia asistencia = crearAsistencia(1L, 1L, "PRESENTE");

        when(asistenciaRepository.findById(1L)).thenReturn(Optional.of(asistencia));

        Asistencia resultado = asistenciaService.obtenerAsistenciaPorId(1L);

        assertEquals(1L, resultado.getId());
        verify(asistenciaRepository).findById(1L);
    }

    @Test
    void obtenerAsistenciaPorIdDebeLanzarExcepcionCuandoNoExiste() {
        when(asistenciaRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> asistenciaService.obtenerAsistenciaPorId(99L)
        );

        assertTrue(exception.getMessage().contains("Asistencia no encontrada"));
        verify(asistenciaRepository).findById(99L);
    }

    @Test
    void listarAsistenciasPorAlumnoDebeRetornarLista() {
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE")
        );

        when(asistenciaRepository.findByAlumnoId(1L)).thenReturn(asistencias);

        List<Asistencia> resultado = asistenciaService.listarAsistenciasPorAlumno(1L);

        assertEquals(1, resultado.size());
        verify(asistenciaRepository).findByAlumnoId(1L);
    }

    @Test
    void listarAsistenciasPorAlumnoYFechaDebeRetornarLista() {
        LocalDate fecha = LocalDate.of(2026, 5, 25);
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE")
        );

        when(asistenciaRepository.findByAlumnoIdAndFecha(1L, fecha)).thenReturn(asistencias);

        List<Asistencia> resultado = asistenciaService.listarAsistenciasPorAlumnoYFecha(1L, fecha);

        assertEquals(1, resultado.size());
        verify(asistenciaRepository).findByAlumnoIdAndFecha(1L, fecha);
    }

    @Test
    void actualizarAsistenciaDebeModificarDatos() {
        Asistencia existente = crearAsistencia(1L, 1L, "PRESENTE");
        Asistencia actualizada = new Asistencia(
                null,
                2L,
                LocalDate.of(2026, 6, 1),
                "AUSENTE",
                "No asiste"
        );

        when(asistenciaRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(asistenciaRepository.save(existente)).thenReturn(existente);

        Asistencia resultado = asistenciaService.actualizarAsistencia(1L, actualizada);

        assertEquals(2L, resultado.getAlumnoId());
        assertEquals(LocalDate.of(2026, 6, 1), resultado.getFecha());
        assertEquals("AUSENTE", resultado.getEstado());
        assertEquals("No asiste", resultado.getObservacion());
        verify(asistenciaRepository).save(existente);
    }

    @Test
    void eliminarAsistenciaDebeEliminarRegistroExistente() {
        Asistencia asistencia = crearAsistencia(1L, 1L, "PRESENTE");

        when(asistenciaRepository.findById(1L)).thenReturn(Optional.of(asistencia));

        asistenciaService.eliminarAsistencia(1L);

        verify(asistenciaRepository).delete(asistencia);
    }

    @Test
    void contarPresentesPorAlumnoDebeRetornarTotal() {
        when(asistenciaRepository.countByAlumnoIdAndEstadoIgnoreCase(1L, "PRESENTE")).thenReturn(3L);

        long resultado = asistenciaService.contarPresentesPorAlumno(1L);

        assertEquals(3L, resultado);
    }

    @Test
    void contarAusentesPorAlumnoDebeRetornarTotal() {
        when(asistenciaRepository.countByAlumnoIdAndEstadoIgnoreCase(1L, "AUSENTE")).thenReturn(1L);

        long resultado = asistenciaService.contarAusentesPorAlumno(1L);

        assertEquals(1L, resultado);
    }

    @Test
    void calcularPorcentajeAsistenciaDebeRetornarCeroCuandoNoHayRegistros() {
        when(asistenciaRepository.findByAlumnoId(1L)).thenReturn(List.of());

        double resultado = asistenciaService.calcularPorcentajeAsistencia(1L);

        assertEquals(0.0, resultado);
    }

    @Test
    void calcularPorcentajeAsistenciaDebeCalcularCorrectamente() {
        List<Asistencia> asistencias = List.of(
                crearAsistencia(1L, 1L, "PRESENTE"),
                crearAsistencia(2L, 1L, "PRESENTE"),
                crearAsistencia(3L, 1L, "AUSENTE"),
                crearAsistencia(4L, 1L, "AUSENTE")
        );

        when(asistenciaRepository.findByAlumnoId(1L)).thenReturn(asistencias);

        double resultado = asistenciaService.calcularPorcentajeAsistencia(1L);

        assertEquals(50.0, resultado);
    }
}
