package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.dto.ExamenDTO;
import com.GestionSurveillance.JEE.entities.*;
import com.GestionSurveillance.JEE.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class ExamenService {

	@Autowired
	private ExamenRepository examenRepository;

	@Autowired
	private LocalRepository localRepository;

	@Autowired
	private ExamLocalRepository examLocalRepository; // Assurez-vous d'avoir ce repository pour gérer les ExamLocal
	@Autowired
	private SessionRepository sessionRepository ;
	@Autowired
	private EnseignantRepository  enseignantRepository;
	public List<Examen> getExamens() {
		return examenRepository.findAll();
	}

	public Examen getExamenById(Long id) {
		return examenRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Examen introuvable"));
	}

	public List<Examen> getExamensByDateTime(Date date, String debut, String fin) {
		// Filtrage des examens par date, heure de début et de fin
		return examenRepository.findExamensByDateTime(date, debut, fin);
	}
	@Transactional
	public Examen createExamen(ExamenDTO examenDTO) {
		// Créer un nouvel examen
		Examen examen = new Examen();
		examen.setModule(examenDTO.getModule());
		examen.setNbEtudiants(examenDTO.getNbEtudiants());

		// Charger la session
		Session session = sessionRepository.findById(examenDTO.getSessionId())
				.orElseThrow(() -> new RuntimeException("Session introuvable avec l'ID : " + examenDTO.getSessionId()));
		examen.setSession(session);

		// Charger l'enseignant
		Enseignant enseignant = enseignantRepository.findById(examenDTO.getEnseignantId())
				.orElseThrow(() -> new RuntimeException("Enseignant introuvable avec l'ID : " + examenDTO.getEnseignantId()));
		examen.setEnseignant(enseignant);

		// Charger et associer les locaux
		List<ExamLocal> examLocals = new ArrayList<>();
		List<Local> locaux = localRepository.findAllById(examenDTO.getLocauxIds());
		if (locaux.isEmpty()) {
			throw new RuntimeException("Aucun local valide trouvé avec les ID fournis.");
		}
		for (Local local : locaux) {
			ExamLocal examLocal = new ExamLocal();
			examLocal.setLocal(local);
			examLocal.setExamen(examen);
			examLocal.setDate(examenDTO.getDate());
			examLocal.setDebut(examenDTO.getDebut());
			examLocal.setFin(examenDTO.getFin());
			examLocals.add(examLocal) ;
			 // Associer chaque local à l'examen
		}
		examen.setLocaux(examLocals);

		// Sauvegarder l'examen
		return examenRepository.save(examen);
	}

	@Transactional
	public Examen createExamenWithAutoAssignment(ExamenDTO examenDTO) {
		// Créer un nouvel examen
		Examen examen = new Examen();
		examen.setModule(examenDTO.getModule());
		examen.setNbEtudiants(examenDTO.getNbEtudiants());

		// Charger la session
		Session session = sessionRepository.findById(examenDTO.getSessionId())
				.orElseThrow(() -> new RuntimeException("Session introuvable avec l'ID : " + examenDTO.getSessionId()));
		examen.setSession(session);

		// Charger l'enseignant
		Enseignant enseignant = enseignantRepository.findById(examenDTO.getEnseignantId())
				.orElseThrow(() -> new RuntimeException("Enseignant introuvable avec l'ID : " + examenDTO.getEnseignantId()));
		examen.setEnseignant(enseignant);

		// Récupérer tous les locaux disponibles pour la date et l'horaire donnés
		List<Local> availableLocaux = localRepository.findLocauxByDateTime(examenDTO.getDate(), examenDTO.getDebut(), examenDTO.getFin());

		if (availableLocaux.isEmpty()) {
			throw new RuntimeException("Aucun local disponible pour la date et l'horaire spécifiés.");
		}

		// Trier les locaux par capacité (du plus petit au plus grand)
		availableLocaux.sort(Comparator.comparingInt(Local::getCapacite));

		// Initialiser les variables pour l'affectation
		int remainingStudents = examenDTO.getNbEtudiants();
		List<ExamLocal> examLocals = new ArrayList<>();

		// Affecter les locaux jusqu'à ce que tous les étudiants soient placés
		for (Local local : availableLocaux) {
			if (remainingStudents <= 0) {
				break;
			}

			ExamLocal examLocal = new ExamLocal();
			examLocal.setLocal(local);
			examLocal.setExamen(examen);
			examLocal.setDate(examenDTO.getDate());
			examLocal.setDebut(examenDTO.getDebut());
			examLocal.setFin(examenDTO.getFin());
			examLocals.add(examLocal);

			remainingStudents -= local.getCapacite();
		}

		// Vérifier si tous les étudiants ont été placés
		if (remainingStudents > 0) {
			throw new RuntimeException("Capacité insuffisante des locaux disponibles pour accueillir tous les étudiants. " +
					"Il manque des places pour " + remainingStudents + " étudiants.");
		}

		examen.setLocaux(examLocals);

		// Sauvegarder l'examen
		return examenRepository.save(examen);
	}

	// Méthode auxiliaire pour calculer la capacité totale des locaux
	private int calculateTotalCapacity(List<Local> locaux) {
		return locaux.stream()
				.mapToInt(Local::getCapacite)
				.sum();
	}

	@Transactional
	public void deleteExam(Long examenId) {
		Examen examen = examenRepository.findById(examenId)
				.orElseThrow(() -> new RuntimeException("Examen introuvable"));

		// Supprimer explicitement les associations d'ExamLocal
		for (ExamLocal examLocal : examen.getLocaux()) {
			examLocalRepository.delete(examLocal);
		}

		// Supprimer l'examen
		examenRepository.delete(examen);
	}

	public Examen updateExamen(Long id, ExamenDTO examenDTO) {
		// Retrieve the existing examen
		Examen examen = examenRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Examen not found with id: " + id));

		// Update basic fields of the examen entity
		examen.setModule(examenDTO.getModule());
		examen.setNbEtudiants(examenDTO.getNbEtudiants());

		// Update session and enseignant if necessary
		Session session = sessionRepository.findById(examenDTO.getSessionId())
				.orElseThrow(() -> new EntityNotFoundException("Session not found"));
		Enseignant enseignant = enseignantRepository.findById(examenDTO.getEnseignantId())
				.orElseThrow(() -> new EntityNotFoundException("Enseignant not found"));

		examen.setSession(session);
		examen.setEnseignant(enseignant);

		// Clear existing ExamLocal entries
		examen.getLocaux().clear();

		// Create new ExamLocal entries based on the DTO
		for (Integer localId : examenDTO.getLocauxIds()) {
			Local local = localRepository.findById(localId)
					.orElseThrow(() -> new EntityNotFoundException("Local not found with id: " + localId));

			ExamLocal examLocal = new ExamLocal();
			examLocal.setExamen(examen);
			examLocal.setLocal(local);
			examLocal.setDate(examenDTO.getDate());
			examLocal.setDebut(examenDTO.getDebut());
			examLocal.setFin(examenDTO.getFin());

			examen.getLocaux().add(examLocal);
		}

		// Save the updated examen
		return examenRepository.save(examen);
	}
}
