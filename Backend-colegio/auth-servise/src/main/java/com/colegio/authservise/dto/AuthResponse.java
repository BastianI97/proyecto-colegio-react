package com.colegio.authservise.dto;

public class AuthResponse {

    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String rol;
    private String mensaje;

    public AuthResponse() {
    }

    public AuthResponse(Long id, String nombre, String apellido, String email, String rol, String mensaje) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.rol = rol;
        this.mensaje = mensaje;
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

    public String getEmail() {
        return email;
    }

    public String getRol() {
        return rol;
    }

    public String getMensaje() {
        return mensaje;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
