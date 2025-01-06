package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.services.SurveillancePlanningService;
import com.GestionSurveillance.JEE.services.SurveillanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/surveillances")
@CrossOrigin(origins = "http://localhost:5173")
public class SurveillanceController {

    @Autowired
    private SurveillanceService surveillanceService;
    @Autowired
    private SurveillancePlanningService planningService;


    @GetMapping("/{sessionId}")
    public ResponseEntity<Map<String, Object>> getPlanningData(@PathVariable Long sessionId) {
        try {
            Map<String, Object> planningData = planningService.getPlanningData(sessionId);
            return ResponseEntity.ok(planningData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/attribution-globale")
    public ResponseEntity<?> attribuerSurveillancesGlobales() {
        try {
            surveillanceService.creerSurveillancesAutomatiques();
            return ResponseEntity.ok()
                    .body(Map.of("message", "Surveillances attribuées avec succès pour tous les examens"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur lors de l'attribution des surveillances: " + e.getMessage()));
        }
    }
}