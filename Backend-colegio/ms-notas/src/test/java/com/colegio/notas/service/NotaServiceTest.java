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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NotaServiceTest {

    @Mock
    private NotaRepository notaRepository;

    @InjectMocks
    private NotaService notaService;

    @Test
    void calcularPromedioPorAlumnoDebeRetornarPromedio() {
        Long alumnoId = 1L;

        List<Nota> notas = List.of(
                new Nota(1L, alumnoId, "Matemáticas", 6.0, LocalDate.now()),
                new Nota(2L, alumnoId, "Historia", 7.0, LocalDate.now()),
                new Nota(3L, alumnoId, "Ciencias", 5.0, LocalDate.now())
        );

        when(notaRepository.findByAlumnoId(alumnoId)).thenReturn(notas);

        Double promedio = notaService.calcularPromedioPorAlumno(alumnoId);

        assertEquals(6.0, promedio);
    }

    @Test
    void calcularPromedioPorAlumnoSinNotasDebeRetornarCero() {
        Long alumnoId = 99L;

        when(notaRepository.findByAlumnoId(alumnoId)).thenReturn(List.of());

        Double promedio = notaService.calcularPromedioPorAlumno(alumnoId);

        assertEquals(0.0, promedio);
    }
}
