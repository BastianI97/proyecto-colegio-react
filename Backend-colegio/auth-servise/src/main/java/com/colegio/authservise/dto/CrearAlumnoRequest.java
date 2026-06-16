package com.colegio.authservise.dto;

public class CrearAlumnoRequest {

    private String nombre;
    private String apellido;
    private String grado;

    public CrearAlumnoRequest() {
    }

    public CrearAlumnoRequest(String nombre, String apellido, String grado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.grado = grado;
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
