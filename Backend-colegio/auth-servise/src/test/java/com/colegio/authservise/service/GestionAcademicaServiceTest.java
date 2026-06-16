package com.colegio.authservise.service;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.colegio.authservise.dto.CrearAlumnoRequest;
import com.colegio.authservise.entity.AlumnoPerfil;
import com.colegio.authservise.entity.ApoderadoAlumno;
import com.colegio.authservise.entity.RolUsuario;
import com.colegio.authservise.entity.Usuario;
import com.colegio.authservise.repository.AlumnoPerfilRepository;
import com.colegio.authservise.repository.ApoderadoAlumnoRepository;
import com.colegio.authservise.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class GestionAcademicaServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private AlumnoPerfilRepository alumnoPerfilRepository;

    @Mock
    private ApoderadoAlumnoRepository apoderadoAlumnoRepository;

    @InjectMocks
    private GestionAcademicaService gestionAcademicaService;

    @Test
    void crearAlumno_deberiaGuardarAlumnoCorrectamente() {
        CrearAlumnoRequest request = new CrearAlumnoRequest();
        request.setNombre("Hector");
        request.setApellido("Gonzalez");
        request.setGrado("5 Grado B");

        when(alumnoPerfilRepository.save(any(AlumnoPerfil.class))).thenAnswer(invocation -> {
            AlumnoPerfil alumno = invocation.getArgument(0);
            alumno.setId(1L);
            return alumno;
        });

        AlumnoPerfil resultado = gestionAcademicaService.crearAlumno(request);

        assertEquals(1L, resultado.getId());
        assertEquals("Hector", resultado.getNombre());
        assertEquals("Gonzalez", resultado.getApellido());
        assertEquals("5 Grado B", resultado.getGrado());

        verify(alumnoPerfilRepository).save(any(AlumnoPerfil.class));
    }

    @Test
    void listarAlumnos_deberiaRetornarTodosLosAlumnos() {
        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setId(1L);
        alumno.setNombre("Hector");
        alumno.setApellido("Gonzalez");
        alumno.setGrado("5 Grado B");

        when(alumnoPerfilRepository.findAll()).thenReturn(List.of(alumno));

        List<AlumnoPerfil> resultado = gestionAcademicaService.listarAlumnos();

        assertEquals(1, resultado.size());
        assertEquals("Hector", resultado.get(0).getNombre());

        verify(alumnoPerfilRepository).findAll();
    }



                                                                //agregardo  Prueba alumno


        @Test
    void obtenerAlumnoPorId_deberiaRetornarAlumnoSiExiste() {
        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setId(1L);
        alumno.setNombre("Hector");
        alumno.setApellido("Gonzalez");
        alumno.setGrado("5 Grado B");

        when(alumnoPerfilRepository.findById(1L)).thenReturn(Optional.of(alumno));

        AlumnoPerfil resultado = gestionAcademicaService.obtenerAlumnoPorId(1L);

        assertEquals(1L, resultado.getId());
        assertEquals("Hector", resultado.getNombre());
        assertEquals("Gonzalez", resultado.getApellido());
        assertEquals("5 Grado B", resultado.getGrado());

        verify(alumnoPerfilRepository).findById(1L);
    }

    @Test
    void obtenerAlumnoPorId_deberiaLanzarErrorSiNoExiste() {
        when(alumnoPerfilRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () ->
                gestionAcademicaService.obtenerAlumnoPorId(99L)
        );

        verify(alumnoPerfilRepository).findById(99L);
    }

    @Test
    void listarApoderados_deberiaRetornarSoloUsuariosConRolApoderado() {
        Usuario profesor = new Usuario();
        profesor.setId(1L);
        profesor.setNombre("Profesor");
        profesor.setRol(RolUsuario.PROFESOR);

        Usuario apoderado = new Usuario();
        apoderado.setId(2L);
        apoderado.setNombre("Maria");
        apoderado.setRol(RolUsuario.APODERADO);

        when(usuarioRepository.findAll()).thenReturn(List.of(profesor, apoderado));

        List<Usuario> resultado = gestionAcademicaService.listarApoderados();

        assertEquals(1, resultado.size());
        assertEquals(2L, resultado.get(0).getId());
        assertEquals("Maria", resultado.get(0).getNombre());
        assertEquals(RolUsuario.APODERADO, resultado.get(0).getRol());

        verify(usuarioRepository).findAll();
    }



                                                                                            //prueba agregada


        @Test
    void asociarApoderadoConAlumno_deberiaGuardarRelacionCorrectamente() {
        Usuario apoderado = new Usuario();
        apoderado.setId(2L);
        apoderado.setNombre("Maria");
        apoderado.setRol(RolUsuario.APODERADO);

        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setId(1L);
        alumno.setNombre("Hector");
        alumno.setApellido("Gonzalez");
        alumno.setGrado("5 Grado B");

        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(apoderado));
        when(alumnoPerfilRepository.findById(1L)).thenReturn(Optional.of(alumno));
        when(apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(2L, 1L)).thenReturn(false);

        when(apoderadoAlumnoRepository.save(any(ApoderadoAlumno.class))).thenAnswer(invocation -> {
            ApoderadoAlumno relacion = invocation.getArgument(0);
            relacion.setId(1L);
            return relacion;
        });

        ApoderadoAlumno resultado = gestionAcademicaService.asociarApoderadoConAlumno(2L, 1L);

        assertEquals(1L, resultado.getId());
        assertEquals(2L, resultado.getApoderado().getId());
        assertEquals(1L, resultado.getAlumno().getId());

        verify(apoderadoAlumnoRepository).save(any(ApoderadoAlumno.class));
    }

    @Test
    void asociarApoderadoConAlumno_deberiaLanzarErrorSiUsuarioNoExiste() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () ->
                gestionAcademicaService.asociarApoderadoConAlumno(99L, 1L)
        );

        verify(apoderadoAlumnoRepository, never()).save(any(ApoderadoAlumno.class));
    }

    @Test
    void asociarApoderadoConAlumno_deberiaLanzarErrorSiUsuarioNoEsApoderado() {
        Usuario profesor = new Usuario();
        profesor.setId(1L);
        profesor.setNombre("Profesor");
        profesor.setRol(RolUsuario.PROFESOR);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(profesor));

        assertThrows(RuntimeException.class, () ->
                gestionAcademicaService.asociarApoderadoConAlumno(1L, 1L)
        );

        verify(apoderadoAlumnoRepository, never()).save(any(ApoderadoAlumno.class));
    }

    @Test
    void asociarApoderadoConAlumno_deberiaLanzarErrorSiAlumnoNoExiste() {
        Usuario apoderado = new Usuario();
        apoderado.setId(2L);
        apoderado.setNombre("Maria");
        apoderado.setRol(RolUsuario.APODERADO);

        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(apoderado));
        when(alumnoPerfilRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () ->
                gestionAcademicaService.asociarApoderadoConAlumno(2L, 99L)
        );

        verify(apoderadoAlumnoRepository, never()).save(any(ApoderadoAlumno.class));
    }

    @Test
    void asociarApoderadoConAlumno_deberiaLanzarErrorSiRelacionYaExiste() {
        Usuario apoderado = new Usuario();
        apoderado.setId(2L);
        apoderado.setNombre("Maria");
        apoderado.setRol(RolUsuario.APODERADO);

        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setId(1L);
        alumno.setNombre("Hector");

        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(apoderado));
        when(alumnoPerfilRepository.findById(1L)).thenReturn(Optional.of(alumno));
        when(apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(2L, 1L)).thenReturn(true);

        assertThrows(RuntimeException.class, () ->
                gestionAcademicaService.asociarApoderadoConAlumno(2L, 1L)
        );

        verify(apoderadoAlumnoRepository, never()).save(any(ApoderadoAlumno.class));
    }



                                                                //Pruebas listar por agregadas

    @Test
    void listarAlumnosPorApoderado_deberiaRetornarAlumnosAsociados() {
        Usuario apoderado = new Usuario();
        apoderado.setId(2L);
        apoderado.setNombre("Maria");
        apoderado.setRol(RolUsuario.APODERADO);

        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setId(1L);
        alumno.setNombre("Hector");
        alumno.setApellido("Gonzalez");
        alumno.setGrado("5 Grado B");

        ApoderadoAlumno relacion = new ApoderadoAlumno();
        relacion.setId(1L);
        relacion.setApoderado(apoderado);
        relacion.setAlumno(alumno);

        when(apoderadoAlumnoRepository.findByApoderadoId(2L))
                .thenReturn(List.of(relacion));

        List<AlumnoPerfil> resultado = gestionAcademicaService.listarAlumnosPorApoderado(2L);

        assertEquals(1, resultado.size());
        assertEquals(1L, resultado.get(0).getId());
        assertEquals("Hector", resultado.get(0).getNombre());
        assertEquals("Gonzalez", resultado.get(0).getApellido());
        assertEquals("5 Grado B", resultado.get(0).getGrado());

        verify(apoderadoAlumnoRepository).findByApoderadoId(2L);
    }

    @Test
    void apoderadoPuedeVerAlumno_deberiaRetornarTrueSiExisteRelacion() {
        when(apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(2L, 1L))
                .thenReturn(true);

        boolean resultado = gestionAcademicaService.apoderadoPuedeVerAlumno(2L, 1L);

        assertTrue(resultado);

        verify(apoderadoAlumnoRepository).existsByApoderadoIdAndAlumnoId(2L, 1L);
    }

    @Test
    void apoderadoPuedeVerAlumno_deberiaRetornarFalseSiNoExisteRelacion() {
        when(apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(2L, 99L))
                .thenReturn(false);

        boolean resultado = gestionAcademicaService.apoderadoPuedeVerAlumno(2L, 99L);

        assertFalse(resultado);

        verify(apoderadoAlumnoRepository).existsByApoderadoIdAndAlumnoId(2L, 99L);
    }

}