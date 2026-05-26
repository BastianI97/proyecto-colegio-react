package ${package}.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SaludoServiceTest {

    @Test
    void obtenerMensajeDebeRetornarTextoEsperado() {
        SaludoService saludoService = new SaludoService();

        String resultado = saludoService.obtenerMensaje();

        assertEquals("Microservicio generado correctamente desde arquetipo Maven", resultado);
    }
}
