package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.entities.Local;
import com.GestionSurveillance.JEE.services.LocalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/locaux")
@CrossOrigin(origins = "http://localhost:5173") // Permet les requêtes CORS depuis le frontend
public class LocalController {

    @Autowired
    private LocalService localService;


    @GetMapping("/available")
    public ResponseEntity<List<Local>> getAvailableLocaux(
            @RequestParam("date")  @DateTimeFormat(pattern = "yyyy-MM-dd")Date  date,
            @RequestParam("debut") String debut,
            @RequestParam("fin") String fin) {

        try {
            List<Local> locauxDisponibles = localService.getAvailableLocaux(date, debut, fin);
            return ResponseEntity.ok(locauxDisponibles);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // Gérer les erreurs de parsing ou autres
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Local> getLocalById(@PathVariable int id) {
        try {
            Local local = localService.getLocalById(id);
            return ResponseEntity.ok(local);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Local>> getAllLocal() {
        return ResponseEntity.ok(localService.getAllLocal());
    }
    @PostMapping
    public ResponseEntity<Local> createLocal(@RequestBody Local local) {
        Local newLocal = localService.createLocal(local);
        return ResponseEntity.ok(newLocal);
    }

    @PostMapping("/upload")
    public ResponseEntity<List<Local>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<Local> locals = localService.processUploadedFile(file);
            return ResponseEntity.ok(locals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Local> updateLocal(@PathVariable int id, @RequestBody Local updatedLocal) {
        try {
            Local local = localService.updateLocal(id, updatedLocal);
            return ResponseEntity.ok(local);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocal(@PathVariable int id) {
        try {
            localService.deleteLocal(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Local>> searchLocauxByNom(@RequestParam String nom) {
        List<Local> locaux = localService.findLocauxByNom(nom);
        return ResponseEntity.ok(locaux);
    }
}
