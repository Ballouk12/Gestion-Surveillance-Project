package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.services.StatisquesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "http://localhost:5173")
public class StatistiquesController {

    @Autowired
    private StatisquesService statisquesService;

    @GetMapping("/{sessionId}")
    public ResponseEntity<Map<String, Long>> getStatistiques(@PathVariable long sessionId) {
        try {
            Map<String, Long> statistiques = statisquesService.getStatisques(sessionId);
            return ResponseEntity.ok(statistiques);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Retourne une erreur serveur en cas d'exception
        }
    }
}
