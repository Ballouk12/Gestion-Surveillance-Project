package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.dto.OptionDTO;
import com.GestionSurveillance.JEE.entities.Option;
import com.GestionSurveillance.JEE.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin("http://localhost:5173/")
public class OptionController {

    @Autowired
    private OptionService optionService;

    @GetMapping
    public ResponseEntity<List<Option>> getAllOptions() {
        return ResponseEntity.ok(optionService.getAllOptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Option> getOptionById(@PathVariable Long id) {
        try {
            Option option = optionService.getOptionById(id);
            return ResponseEntity.ok(option);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/departement/{departementId}")
    public ResponseEntity<List<Option>> getOptionsByDepartement(@PathVariable Long departementId) {
        return ResponseEntity.ok(optionService.getOptionsByDepartementId(departementId));
    }

    @PostMapping
    public ResponseEntity<Option> addOption(@RequestBody Option option) {
        Option newOption = optionService.createOption(option);
        return ResponseEntity.ok(newOption);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Option> updateOption(@PathVariable Long id, @RequestBody OptionDTO updatedOption) {
        try {
            Option option = optionService.updateOption(id, updatedOption);
            return ResponseEntity.ok(option);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        try {
            optionService.deleteOption(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
