package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.dto.ExamenDTO;
import com.GestionSurveillance.JEE.entities.Examen;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.GestionSurveillance.JEE.services.ExamenService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/examens")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @GetMapping
    public ResponseEntity<List<Examen>> getExamens() {
        List<Examen> examens = examenService.getExamens();
        System.out.println("Examens récupérés dans le contrôleur: " + examens);
        return ResponseEntity.ok(examens);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Examen>> getExamensByDateTime(
            @RequestParam("date")  @DateTimeFormat(pattern = "yyyy-MM-dd")Date date,
            @RequestParam("debut") String debut,
            @RequestParam("fin") String fin) {

        List<Examen> examens = examenService.getExamensByDateTime(date, debut, fin);
        if (examens.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(examens);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examen> getExamenById(@PathVariable Long id) {
        try {
            Examen examen = examenService.getExamenById(id);
            return ResponseEntity.ok(examen);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createExamen(@RequestBody ExamenDTO examenDTO) {
        try {
            // Déléguer la logique métier au service
            Examen savedExamen = examenService.createExamen(examenDTO);
            return ResponseEntity.ok(savedExamen);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExamen(@PathVariable Long id, @RequestBody ExamenDTO examenDTO) {
        try {
            // Déléguer la logique métier au service pour mettre à jour l'examen
            Examen updatedExamen = examenService.updateExamen(id, examenDTO);
            return ResponseEntity.ok(updatedExamen);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        try {
            examenService.deleteExam(id);
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); 
        }
    }
}
