package com.GestionSurveillance.JEE.services;
import com.GestionSurveillance.JEE.repositories.DepartementRepository;
import com.GestionSurveillance.JEE.entities.Departement;
import com.GestionSurveillance.JEE.entities.Enseignant;
import com.GestionSurveillance.JEE.repositories.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnseignantService {

    @Autowired
    private EnseignantRepository enseignantRepository;
    @Autowired
    private DepartementRepository departementRepository;
    public List<Enseignant> getAllEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantById(Long id) {
        return enseignantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enseignant introuvable avec l'id : " + id));
    }

    public Enseignant addEnseignant(Enseignant enseignant) {
        // Récupération du département à partir de son ID
        Departement departement = departementRepository.findById(enseignant.getDepartement().getId())
                .orElseThrow(() -> new RuntimeException("Département non trouvé"));

        // Association de l'enseignant au département
        enseignant.setDepartement(departement);

        // Sauvegarde de l'enseignant dans la base de données
        return enseignantRepository.save(enseignant);
    }


    public Enseignant updateEnseignant(Long id, Enseignant updatedEnseignant) {
        Enseignant existingEnseignant = getEnseignantById(id);
        existingEnseignant.setNom(updatedEnseignant.getNom());
        existingEnseignant.setPrenom(updatedEnseignant.getPrenom());
        existingEnseignant.setEmail(updatedEnseignant.getEmail());
        existingEnseignant.setPhone(updatedEnseignant.getPhone());

        existingEnseignant.setEstDispense(updatedEnseignant.isEstDispense());
        existingEnseignant.setEstReserviste(updatedEnseignant.isEstReserviste());
        existingEnseignant.setNbrSurveillance(updatedEnseignant.getNbrSurveillance());
        existingEnseignant.setDepartement(updatedEnseignant.getDepartement());
        return enseignantRepository.save(existingEnseignant);
    }

    public void deleteEnseignant(Long id) {
        enseignantRepository.deleteById(id);
    }

    public List<Enseignant> getEnseignantsByDepartement(Long departementId) {
        return enseignantRepository.findByDepartementId(departementId);
    }

    public List<Enseignant> getAvailableEnseignants() {
        return enseignantRepository.findByEstDispenseTrue();
    }

    public List<Enseignant> getReservisteEnseignants() {
        return enseignantRepository.findByEstReservisteTrue();
    }

    public Enseignant getEnseignantByEmail(String email) {
        return enseignantRepository.findByEmail(email);
    }
}
