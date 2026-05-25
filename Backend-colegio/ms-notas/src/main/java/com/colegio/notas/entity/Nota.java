package com.colegio.notas.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El id del alumno es obligatorio")
    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @NotBlank(message = "La asignatura es obligatoria")
    @Column(nullable = false)
    private String asignatura;

    @NotNull(message = "La calificación es obligatoria")
    @DecimalMin(value = "1.0", message = "La nota mínima es 1.0")
    @DecimalMax(value = "7.0", message = "La nota máxima es 7.0")
    @Column(nullable = false)
    private Double calificacion;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDate fechaRegistro;

    public Nota() {
        this.fechaRegistro = LocalDate.now();
    }

    public Nota(Long id, Long alumnoId, String asignatura, Double calificacion, LocalDate fechaRegistro) {
        this.id = id;
        this.alumnoId = alumnoId;
        this.asignatura = asignatura;
        this.calificacion = calificacion;
        this.fechaRegistro = fechaRegistro != null ? fechaRegistro : LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public Long getAlumnoId() {
        return alumnoId;
    }

    public void setAlumnoId(Long alumnoId) {
        this.alumnoId = alumnoId;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public Double getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Double calificacion) {
        this.calificacion = calificacion;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
