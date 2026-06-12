package com.colegio.authservise.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "apoderado_alumno")
public class ApoderadoAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "apoderado_id", nullable = false)
    private Usuario apoderado;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private AlumnoPerfil alumno;

    public ApoderadoAlumno() {
    }

    public ApoderadoAlumno(Long id, Usuario apoderado, AlumnoPerfil alumno) {
        this.id = id;
        this.apoderado = apoderado;
        this.alumno = alumno;
    }

    public Long getId() {
        return id;
    }

    public Usuario getApoderado() {
        return apoderado;
    }

    public AlumnoPerfil getAlumno() {
        return alumno;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setApoderado(Usuario apoderado) {
        this.apoderado = apoderado;
    }

    public void setAlumno(AlumnoPerfil alumno) {
        this.alumno = alumno;
    }
}
