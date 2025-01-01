package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.entities.Enseignant;
import com.GestionSurveillance.JEE.services.EnseignantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enseignants")
@CrossOrigin(origins = "http://localhost:5173")
public class EnseignantController {

    @Autowired
    private EnseignantService enseignantService;

    @GetMapping
    public ResponseEntity<List<Enseignant>> getAllEnseignants() {
        return ResponseEntity.ok(enseignantService.getAllEnseignants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enseignant> getEnseignantById(@PathVariable Long id) {
        try {
            Enseignant enseignant = enseignantService.getEnseignantById(id);
            if (enseignant.getSurveillances().isEmpty() && enseignant.getExamens().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(enseignant);
            }
            return ResponseEntity.ok(enseignant);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<Enseignant> addEnseignant(@RequestBody Enseignant enseignant) {
        Enseignant newEnseignant = enseignantService.addEnseignant(enseignant);
        return ResponseEntity.ok(newEnseignant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enseignant> updateEnseignant(@PathVariable Long id, @RequestBody Enseignant updatedEnseignant) {
        try {
            Enseignant enseignant = enseignantService.updateEnseignant(id, updatedEnseignant);
            return ResponseEntity.ok(enseignant);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        try {
            enseignantService.deleteEnseignant(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/departement/{departementId}")
    public ResponseEntity<List<Enseignant>> getEnseignantsByDepartement(@PathVariable Long departementId) {
        return ResponseEntity.ok(enseignantService.getEnseignantsByDepartement(departementId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Enseignant>> getAvailableEnseignants() {
        return ResponseEntity.ok(enseignantService.getAvailableEnseignants());
    }

    @GetMapping("/reservistes")
    public ResponseEntity<List<Enseignant>> getReservisteEnseignants() {
        return ResponseEntity.ok(enseignantService.getReservisteEnseignants());
    }

    @GetMapping("/email")
    public ResponseEntity<Enseignant> getEnseignantByEmail(@RequestParam String email) {
        Enseignant enseignant = enseignantService.getEnseignantByEmail(email);
        if (enseignant != null) {
            return ResponseEntity.ok(enseignant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
