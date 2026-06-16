package com.colegio.authservise.service;

import com.colegio.authservise.dto.CrearAlumnoRequest;
import com.colegio.authservise.entity.AlumnoPerfil;
import com.colegio.authservise.entity.ApoderadoAlumno;
import com.colegio.authservise.entity.RolUsuario;
import com.colegio.authservise.entity.Usuario;
import com.colegio.authservise.repository.AlumnoPerfilRepository;
import com.colegio.authservise.repository.ApoderadoAlumnoRepository;
import com.colegio.authservise.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GestionAcademicaService {

    private final AlumnoPerfilRepository alumnoPerfilRepository;
    private final UsuarioRepository usuarioRepository;
    private final ApoderadoAlumnoRepository apoderadoAlumnoRepository;

    public GestionAcademicaService(
            AlumnoPerfilRepository alumnoPerfilRepository,
            UsuarioRepository usuarioRepository,
            ApoderadoAlumnoRepository apoderadoAlumnoRepository
    ) {
        this.alumnoPerfilRepository = alumnoPerfilRepository;
        this.usuarioRepository = usuarioRepository;
        this.apoderadoAlumnoRepository = apoderadoAlumnoRepository;
    }

    public AlumnoPerfil crearAlumno(CrearAlumnoRequest request) {
        AlumnoPerfil alumno = new AlumnoPerfil();
        alumno.setNombre(request.getNombre());
        alumno.setApellido(request.getApellido());
        alumno.setGrado(request.getGrado());

        return alumnoPerfilRepository.save(alumno);
    }

    public List<AlumnoPerfil> listarAlumnos() {
        return alumnoPerfilRepository.findAll();
    }

    public AlumnoPerfil obtenerAlumnoPorId(Long alumnoId) {
        return alumnoPerfilRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con id: " + alumnoId));
    }

    public List<Usuario> listarApoderados() {
        return usuarioRepository.findAll()
                .stream()
                .filter(usuario -> usuario.getRol() == RolUsuario.APODERADO)
                .toList();
    }

    public ApoderadoAlumno asociarApoderadoConAlumno(Long apoderadoId, Long alumnoId) {
        Usuario apoderado = usuarioRepository.findById(apoderadoId)
                .orElseThrow(() -> new RuntimeException("Apoderado no encontrado con id: " + apoderadoId));

        if (apoderado.getRol() != RolUsuario.APODERADO) {
            throw new RuntimeException("El usuario indicado no tiene rol APODERADO");
        }

        AlumnoPerfil alumno = alumnoPerfilRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con id: " + alumnoId));

        if (apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(apoderadoId, alumnoId)) {
            throw new RuntimeException("El apoderado ya se encuentra asociado a este alumno");
        }

        ApoderadoAlumno relacion = new ApoderadoAlumno();
        relacion.setApoderado(apoderado);
        relacion.setAlumno(alumno);

        return apoderadoAlumnoRepository.save(relacion);
    }

    public List<AlumnoPerfil> listarAlumnosPorApoderado(Long apoderadoId) {
        return apoderadoAlumnoRepository.findByApoderadoId(apoderadoId)
                .stream()
                .map(ApoderadoAlumno::getAlumno)
                .toList();
    }

    public boolean apoderadoPuedeVerAlumno(Long apoderadoId, Long alumnoId) {
        return apoderadoAlumnoRepository.existsByApoderadoIdAndAlumnoId(apoderadoId, alumnoId);
    }
}
