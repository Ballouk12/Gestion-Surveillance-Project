package com.GestionSurveillance.JEE.services;


import com.GestionSurveillance.JEE.entities.*;
import com.GestionSurveillance.JEE.repositories.EnseignantRepository;
import com.GestionSurveillance.JEE.repositories.ExamLocalRepository;
import com.GestionSurveillance.JEE.repositories.ExamenRepository;
import com.GestionSurveillance.JEE.repositories.SurveillanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SurveillanceService {

    @Autowired
    private ExamLocalRepository examLocalRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private SurveillanceRepository surveillanceRepository;

    public void creerSurveillancesAutomatiques() {
        // Récupérer tous les ExamLocal
        List<ExamLocal> tousExamLocaux = examLocalRepository.findAll();

        // Grouper les ExamLocal par date et créneau horaire
        Map<String, List<ExamLocal>> examParCreneau = tousExamLocaux.stream()
                .collect(Collectors.groupingBy(examLocal ->
                        examLocal.getDate().toString() + "_" + examLocal.getDebut() + "_" + examLocal.getFin()));

        // Pour chaque créneau horaire
        examParCreneau.forEach((creneau, examLocaux) -> {
            // Récupérer tous les enseignants disponibles
            List<Enseignant> enseignantsDisponibles = enseignantRepository.findAll().stream()
                    .filter(e -> !"OUI".equalsIgnoreCase(e.getEstDispense()))
                    .collect(Collectors.toList());

            // Exclure les enseignants responsables des examens de ce créneau
            Set<Long> enseignantsResponsables = examLocaux.stream()
                    .map(examLocal -> examLocal.getExamen().getEnseignant().getId())
                    .collect(Collectors.toSet());

            enseignantsDisponibles = enseignantsDisponibles.stream()
                    .filter(e -> !enseignantsResponsables.contains(e.getId()))
                    .collect(Collectors.toList());

            // Pour chaque local à ce créneau
            for (ExamLocal examLocal : examLocaux) {
                Local local = examLocal.getLocal();

                // Sélectionner un enseignant principal pour la surveillance normale
                Optional<Enseignant> surveillantPrincipal = enseignantsDisponibles.stream()
                        .min(Comparator.comparingInt(Enseignant::getNbrSurveillance));

                if (surveillantPrincipal.isPresent()) {
                    // Créer la surveillance principale
                    Surveillance surveillance = new Surveillance();
                    surveillance.setEnseignant(surveillantPrincipal.get());
                    surveillance.setLocal(local);
                    surveillance.setSession(examLocal.getExamen().getSession());
                    surveillance.setTypeSurveillance("NORMALE");

                    // Mettre à jour le nombre de surveillances de l'enseignant
                    Enseignant enseignant = surveillantPrincipal.get();
                    enseignant.setNbrSurveillance(enseignant.getNbrSurveillance() + 1);
                    enseignantRepository.save(enseignant);

                    surveillanceRepository.save(surveillance);

                    // Retirer l'enseignant de la liste des disponibles
                    enseignantsDisponibles.remove(surveillantPrincipal.get());
                }
            }

            // Calculer le nombre d'enseignants supplémentaires (10% des enseignants disponibles)
            int nbSurveillantsTT = (int) Math.ceil(enseignantsDisponibles.size() * 0.1);

            // Sélectionner les surveillants TT
            List<Enseignant> surveillantsTT = enseignantsDisponibles.stream()
                    .sorted(Comparator.comparingInt(Enseignant::getNbrSurveillance))
                    .limit(nbSurveillantsTT)
                    .collect(Collectors.toList());

            // Affecter les surveillants TT aux locaux
            for (Enseignant surveillantTT : surveillantsTT) {
                for (ExamLocal examLocal : examLocaux) {
                    Surveillance surveillance = new Surveillance();
                    surveillance.setEnseignant(surveillantTT);
                    surveillance.setLocal(examLocal.getLocal());
                    surveillance.setSession(examLocal.getExamen().getSession());
                    surveillance.setTypeSurveillance("RR");

                    surveillantTT.setNbrSurveillance(surveillantTT.getNbrSurveillance() + 1);
                    enseignantRepository.save(surveillantTT);

                    surveillanceRepository.save(surveillance);
                }
            }
        });
    }
}