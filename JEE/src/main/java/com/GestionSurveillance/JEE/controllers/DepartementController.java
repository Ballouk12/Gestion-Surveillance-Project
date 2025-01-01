package com.GestionSurveillance.JEE.controllers;
import com.GestionSurveillance.JEE.*;
import com.GestionSurveillance.JEE.entities.Departement;
import com.GestionSurveillance.JEE.entities.Enseignant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.GestionSurveillance.JEE.services.DepartementService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/departements")
@CrossOrigin(origins = "http://localhost:5173") // Autorise les requêtes depuis le frontend (React.js)
public class DepartementController {

    @Autowired
    private DepartementService departementService;

    // Récupérer tous les départements
    @GetMapping
    public List<Departement> getAllDepartements() {
        return departementService.getAllDepartements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartement(@PathVariable Long id) {
        try {
            Departement departement = departementService.getDepartementById(id);
            return ResponseEntity.ok(departement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departement> updateDepartement(
            @PathVariable Long id,
            @RequestParam String nouveauNom) {
        try {
            Departement updatedDepartement = departementService.updateDepartement(id, nouveauNom);
            return ResponseEntity.ok(updatedDepartement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        try {
            departementService.deleteDepartement(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{departementId}/enseignants")
    public ResponseEntity<List<Enseignant>> getEnseignantsByDepartementId(@PathVariable Long departementId) {
        try {
            List<Enseignant> enseignants = departementService.getEnseignantsByDepartementId(departementId);
            return ResponseEntity.ok(enseignants);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public ResponseEntity<Departement> createDepartement(@RequestBody Departement departement) {
        try {
            Departement newDepartement = departementService.createDepartement(departement);
            return ResponseEntity.status(HttpStatus.CREATED).body(newDepartement);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<List<Departement>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<Departement> departements = departementService.processUploadedFile(file);
            return ResponseEntity.ok(departements);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
