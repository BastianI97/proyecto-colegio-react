package com.colegio.notas.service;

import com.colegio.notas.entity.Nota;
import com.colegio.notas.repository.NotaRepository;
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
class NotaServiceTest {

    @Mock
    private NotaRepository notaRepository;

    @InjectMocks
    private NotaService notaService;

    private Nota crearNota(Long id, Long alumnoId, String asignatura, Double calificacion) {
        return new Nota(
                id,
                alumnoId,
                asignatura,
                calificacion,
                LocalDate.of(2026, 5, 25)
        );
    }

    @Test
    void crearNotaDebeAsignarFechaCuandoVieneNula() {
        Nota nota = new Nota(null, 1L, "Matemáticas", 6.5, null);

        when(notaRepository.save(nota)).thenReturn(nota);

        Nota resultado = notaService.crearNota(nota);

        assertNotNull(resultado.getFechaRegistro());
        verify(notaRepository).save(nota);
    }

    @Test
    void crearNotaDebeMantenerFechaCuandoVieneInformada() {
        Nota nota = crearNota(null, 1L, "Matemáticas", 6.5);

        when(notaRepository.save(nota)).thenReturn(nota);

        Nota resultado = notaService.crearNota(nota);

        assertNotNull(resultado.getFechaRegistro());
        verify(notaRepository).save(nota);
    }

    @Test
    void listarNotasDebeRetornarLista() {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5),
                crearNota(2L, 1L, "Lenguaje", 5.8)
        );

        when(notaRepository.findAll()).thenReturn(notas);

        List<Nota> resultado = notaService.listarNotas();

        assertEquals(2, resultado.size());
        verify(notaRepository).findAll();
    }

    @Test
    void obtenerNotaPorIdDebeRetornarNotaCuandoExiste() {
        Nota nota = crearNota(1L, 1L, "Matemáticas", 6.5);

        when(notaRepository.findById(1L)).thenReturn(Optional.of(nota));

        Nota resultado = notaService.obtenerNotaPorId(1L);

        assertEquals(1L, resultado.getId());
        assertEquals("Matemáticas", resultado.getAsignatura());
        verify(notaRepository).findById(1L);
    }

    @Test
    void obtenerNotaPorIdDebeLanzarExcepcionCuandoNoExiste() {
        when(notaRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> notaService.obtenerNotaPorId(99L)
        );

        assertTrue(exception.getMessage().contains("Nota no encontrada"));
        verify(notaRepository).findById(99L);
    }

    @Test
    void listarNotasPorAlumnoDebeRetornarLista() {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5)
        );

        when(notaRepository.findByAlumnoId(1L)).thenReturn(notas);

        List<Nota> resultado = notaService.listarNotasPorAlumno(1L);

        assertEquals(1, resultado.size());
        verify(notaRepository).findByAlumnoId(1L);
    }

    @Test
    void listarNotasPorAlumnoYAsignaturaDebeRetornarLista() {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5)
        );

        when(notaRepository.findByAlumnoIdAndAsignaturaIgnoreCase(1L, "Matemáticas"))
                .thenReturn(notas);

        List<Nota> resultado = notaService.listarNotasPorAlumnoYAsignatura(1L, "Matemáticas");

        assertEquals(1, resultado.size());
        verify(notaRepository).findByAlumnoIdAndAsignaturaIgnoreCase(1L, "Matemáticas");
    }

    @Test
    void actualizarNotaDebeModificarDatosConFechaInformada() {
        Nota existente = crearNota(1L, 1L, "Matemáticas", 5.0);
        Nota actualizada = crearNota(null, 2L, "Lenguaje", 6.8);

        when(notaRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(notaRepository.save(existente)).thenReturn(existente);

        Nota resultado = notaService.actualizarNota(1L, actualizada);

        assertEquals(2L, resultado.getAlumnoId());
        assertEquals("Lenguaje", resultado.getAsignatura());
        assertEquals(6.8, resultado.getCalificacion());
        assertNotNull(resultado.getFechaRegistro());
        verify(notaRepository).save(existente);
    }

    @Test
    void actualizarNotaDebeMantenerUnaFechaValidaCuandoFechaNuevaEsNula() {
        Nota existente = crearNota(1L, 1L, "Matemáticas", 5.0);
        Nota actualizada = new Nota(null, 1L, "Historia", 6.0, null);

        when(notaRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(notaRepository.save(existente)).thenReturn(existente);

        Nota resultado = notaService.actualizarNota(1L, actualizada);

        assertEquals("Historia", resultado.getAsignatura());
        assertEquals(6.0, resultado.getCalificacion());
        assertNotNull(resultado.getFechaRegistro());
        verify(notaRepository).save(existente);
    }

    @Test
    void eliminarNotaDebeEliminarRegistroExistente() {
        Nota nota = crearNota(1L, 1L, "Matemáticas", 6.5);

        when(notaRepository.findById(1L)).thenReturn(Optional.of(nota));

        notaService.eliminarNota(1L);

        verify(notaRepository).delete(nota);
    }

    @Test
    void calcularPromedioPorAlumnoDebeRetornarCeroCuandoNoHayNotas() {
        when(notaRepository.findByAlumnoId(1L)).thenReturn(List.of());

        Double resultado = notaService.calcularPromedioPorAlumno(1L);

        assertEquals(0.0, resultado);
    }

    @Test
    void calcularPromedioPorAlumnoDebeCalcularCorrectamente() {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.0),
                crearNota(2L, 1L, "Lenguaje", 7.0),
                crearNota(3L, 1L, "Historia", 5.0)
        );

        when(notaRepository.findByAlumnoId(1L)).thenReturn(notas);

        Double resultado = notaService.calcularPromedioPorAlumno(1L);

        assertEquals(6.0, resultado);
    }
}
