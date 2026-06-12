package com.colegio.authservise.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "alumno_perfil")
public class AlumnoPerfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false)
    private String grado;

    public AlumnoPerfil() {
    }

    public AlumnoPerfil(Long id, String nombre, String apellido, String grado) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.grado = grado;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getGrado() {
        return grado;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }
}
