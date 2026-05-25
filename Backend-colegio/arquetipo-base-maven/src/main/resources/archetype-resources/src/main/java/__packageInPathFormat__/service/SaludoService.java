package ${package}.service;

import org.springframework.stereotype.Service;

@Service
public class SaludoService {

    public String obtenerMensaje() {
        return "Microservicio generado correctamente desde arquetipo Maven";
    }
}
