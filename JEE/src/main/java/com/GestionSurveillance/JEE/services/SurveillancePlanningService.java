package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.entities.Enseignant;
import com.GestionSurveillance.JEE.entities.Examen;
import com.GestionSurveillance.JEE.entities.Session;
import com.GestionSurveillance.JEE.entities.Surveillance;
import com.GestionSurveillance.JEE.repositories.EnseignantRepository;
import com.GestionSurveillance.JEE.repositories.ExamenRepository;
import com.GestionSurveillance.JEE.repositories.SessionRepository;
import com.GestionSurveillance.JEE.repositories.SurveillanceRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SurveillancePlanningService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private ExamenRepository examenRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private SurveillanceRepository surveillanceRepository;


    public class DatePlage {
        private String date;
        private List<String> creneaux;

        public DatePlage(String date, List<String> creneaux) {
            this.date = date;
            this.creneaux = creneaux;
        }

        public DatePlage() {
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public List<String> getCreneaux() {
            return creneaux;
        }

        public void setCreneaux(List<String> creneaux) {
            this.creneaux = creneaux;
        }
    }

    @Data
    public class EnseignantSurveillance {
        private Long id;
        private String nom;
        private Map<String, Map<String, String>> surveillances; // date -> creneau -> info

        public Map<String, Map<String, String>> getSurveillances() {
            return surveillances;
        }

        public void setSurveillances(Map<String, Map<String, String>> surveillances) {
            this.surveillances = surveillances;
        }

        public String getNom() {
            return nom;
        }

        public void setNom(String nom) {
            this.nom = nom;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

    }

    public Map<String, Object> getPlanningData(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        // Générer les dates entre dateDebut et dateFin
        List<String> dates = generateDates(session.getDateDebut(), session.getDateFin());

        // Générer les créneaux horaires de la session
        List<String> creneaux = Arrays.asList(
                session.getDebut1() + "-" + session.getFin1(),
                session.getDebut2() + "-" + session.getFin2(),
                session.getDebut3() + "-" + session.getFin3(),
                session.getDebut4() + "-" + session.getFin4()
        ).stream().filter(c -> !c.startsWith("null")).collect(Collectors.toList());

        // Récupérer tous les enseignants avec leurs surveillances
        List<EnseignantSurveillance> enseignantSurveillances = generateEnseignantSurveillances(
                dates, creneaux, sessionId);

        Map<String, Object> result = new HashMap<>();
        result.put("dates", dates);
        result.put("creneaux", creneaux);
        result.put("enseignants", enseignantSurveillances);

        return result;
    }

    private List<String> generateDates(String dateDebut, String dateFin) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(dateDebut, formatter);
        LocalDate end = LocalDate.parse(dateFin, formatter);

        List<String> dates = new ArrayList<>();
        LocalDate current = start;
        while (!current.isAfter(end)) {
            dates.add(current.format(formatter));
            current = current.plusDays(1);
        }
        return dates;
    }


    private List<EnseignantSurveillance> generateEnseignantSurveillances(
            List<String> dates,
            List<String> creneaux,
            Long sessionId) {

        List<Enseignant> enseignants = enseignantRepository.findAll();
        List<EnseignantSurveillance> result = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (Enseignant enseignant : enseignants) {
            EnseignantSurveillance es = new EnseignantSurveillance();
            es.setId(enseignant.getId());
            es.setNom(enseignant.getNom() + " " + enseignant.getPrenom());
            es.setSurveillances(new HashMap<>());

            for (String dateStr : dates) {
                es.getSurveillances().put(dateStr, new HashMap<>());

                try {
                    Date date = dateFormat.parse(dateStr);

                    for (String creneau : creneaux) {
                        String debut = creneau.split("-")[0].trim();

                        // Vérifier si l'enseignant est responsable
                        Optional<Examen> examenResp = examenRepository
                                .findBySessionIdAndEnseignantIdAndDateAndCreneau(
                                        sessionId,
                                        enseignant.getId(),
                                        date,
                                        debut
                                );

                        if (examenResp.isPresent()) {
                            es.getSurveillances().get(dateStr).put(creneau, "RR");
                            continue;
                        }

                        // Vérifier les surveillances
                        Optional<Surveillance> surveillance = surveillanceRepository
                                .findBySessionIdAndEnseignantIdAndDateAndCreneau(
                                        sessionId,
                                        enseignant.getId(),
                                        date,
                                        debut
                                );

                        if (surveillance.isPresent()) {
                            String info = surveillance.get().getTypeSurveillance().equals("TT")
                                    ? "TT"
                                    : surveillance.get().getLocal().getNom();
                            es.getSurveillances().get(dateStr).put(creneau, info);
                        } else {
                            es.getSurveillances().get(dateStr).put(creneau, "");
                        }
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            result.add(es);
        }
        return result;
    }
}