package ${package}.controller;

import ${package}.service.SaludoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    private final SaludoService saludoService;

    public HealthController(SaludoService saludoService) {
        this.saludoService = saludoService;
    }

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "message", saludoService.obtenerMensaje()
        ));
    }
}
