package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.entities.Session;
import com.GestionSurveillance.JEE.entities.Examen;
import com.GestionSurveillance.JEE.services.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:5173") // Permet les requêtes CORS pour le frontend
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        Session newSession = sessionService.addSession(session);
        return ResponseEntity.ok(newSession);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        try {
            Session session = sessionService.getSessionById(id);
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session sessionDetails) {
        try {
            Session updatedSession = sessionService.updateSession(id, sessionDetails);
            return ResponseEntity.ok(updatedSession);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        try {
            sessionService.deleteSession(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/examens")
    public ResponseEntity<List<Examen>> getExamensBySessionId(@PathVariable Long id) {
        try {
            List<Examen> examens = sessionService.getExamensBySessionId(id);
            return ResponseEntity.ok(examens);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/horaires")
    public ResponseEntity<List<String>> getExamHorairesBySessionId(@PathVariable Long id) {
        try {
            List<String> horaires = sessionService.getExamHorairesBySessionId(id);
            return ResponseEntity.ok(horaires);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
