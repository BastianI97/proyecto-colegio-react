package com.colegio.notas.controller;

import com.colegio.notas.entity.Nota;
import com.colegio.notas.service.NotaService;
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
class NotaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private NotaService notaService;

    @InjectMocks
    private NotaController notaController;

    private Nota crearNota(Long id, Long alumnoId, String asignatura, Double calificacion) {
        return new Nota(
                id,
                alumnoId,
                asignatura,
                calificacion,
                LocalDate.of(2026, 5, 25)
        );
    }

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(notaController).build();
    }

    @Test
    void crearNotaDebeRetornarCreated() throws Exception {
        Nota notaCreada = crearNota(1L, 1L, "Matemáticas", 6.5);

        when(notaService.crearNota(any(Nota.class))).thenReturn(notaCreada);

        mockMvc.perform(post("/api/notas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"asignatura\":\"Matemáticas\",\"calificacion\":6.5}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.alumnoId").value(1))
                .andExpect(jsonPath("$.asignatura").value("Matemáticas"))
                .andExpect(jsonPath("$.calificacion").value(6.5));
    }

    @Test
    void listarNotasDebeRetornarOk() throws Exception {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5),
                crearNota(2L, 1L, "Lenguaje", 5.8)
        );

        when(notaService.listarNotas()).thenReturn(notas);

        mockMvc.perform(get("/api/notas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].asignatura").value("Lenguaje"));
    }

    @Test
    void obtenerNotaPorIdDebeRetornarOk() throws Exception {
        Nota nota = crearNota(1L, 1L, "Matemáticas", 6.5);

        when(notaService.obtenerNotaPorId(1L)).thenReturn(nota);

        mockMvc.perform(get("/api/notas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.asignatura").value("Matemáticas"));
    }

    @Test
    void listarNotasPorAlumnoDebeRetornarOk() throws Exception {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5)
        );

        when(notaService.listarNotasPorAlumno(1L)).thenReturn(notas);

        mockMvc.perform(get("/api/notas/alumno/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].alumnoId").value(1));
    }

    @Test
    void listarNotasPorAlumnoYAsignaturaDebeRetornarOk() throws Exception {
        List<Nota> notas = List.of(
                crearNota(1L, 1L, "Matemáticas", 6.5)
        );

        when(notaService.listarNotasPorAlumnoYAsignatura(1L, "Matemáticas")).thenReturn(notas);

        mockMvc.perform(get("/api/notas/alumno/1/asignatura/Matemáticas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].asignatura").value("Matemáticas"));
    }

    @Test
    void calcularPromedioPorAlumnoDebeRetornarOk() throws Exception {
        when(notaService.calcularPromedioPorAlumno(1L)).thenReturn(6.5);

        mockMvc.perform(get("/api/notas/alumno/1/promedio"))
                .andExpect(status().isOk())
                .andExpect(content().string("6.5"));
    }

    @Test
    void actualizarNotaDebeRetornarOk() throws Exception {
        Nota notaActualizada = crearNota(1L, 1L, "Lenguaje", 6.8);

        when(notaService.actualizarNota(any(Long.class), any(Nota.class))).thenReturn(notaActualizada);

        mockMvc.perform(put("/api/notas/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"alumnoId\":1,\"asignatura\":\"Lenguaje\",\"calificacion\":6.8}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.asignatura").value("Lenguaje"))
                .andExpect(jsonPath("$.calificacion").value(6.8));
    }

    @Test
    void eliminarNotaDebeRetornarNoContent() throws Exception {
        doNothing().when(notaService).eliminarNota(1L);

        mockMvc.perform(delete("/api/notas/1"))
                .andExpect(status().isNoContent());
    }
}
