package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.entities.FerieDay;
import com.GestionSurveillance.JEE.services.FerieDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ferie-days")
public class FerieDayController {

    @Autowired
    private FerieDayService ferieDayService;
    @PostMapping
    public ResponseEntity<String> createFerieDay(@RequestBody FerieDay ferieDay ) {
        boolean isCreated = ferieDayService.createFerieDay(ferieDay);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Ferie Day created successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create Ferie Day.");
        }
    }

    // Méthode pour récupérer tous les jours fériés
    @GetMapping
    public ResponseEntity<List<FerieDay>> getAllFerieDays() {
        List<FerieDay> ferieDays = ferieDayService.getAllFerieDays();
        return ResponseEntity.ok(ferieDays);
    }

    // Méthode pour mettre à jour un jour férié
    @PutMapping("/{id}")
    public ResponseEntity<String> updateFerieDay(@PathVariable int id, @RequestBody FerieDay ferieDay) {
        ferieDay.setId(id); // S'assurer que l'ID est correctement défini
        boolean isUpdated = ferieDayService.updateFerieDay(ferieDay);
        if (isUpdated) {
            return ResponseEntity.ok("Ferie Day updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update Ferie Day.");
        }
    }

    // Méthode pour supprimer un jour férié
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFerieDay(@PathVariable int id) {
        try {
            ferieDayService.deleteFerieDay(id);
            return ResponseEntity.ok("Ferie Day deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ferie Day not found.");
        }
    }
}
