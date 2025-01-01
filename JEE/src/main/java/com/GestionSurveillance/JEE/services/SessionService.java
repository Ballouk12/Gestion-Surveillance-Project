package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.repositories.SessionRepository;
import com.GestionSurveillance.JEE.entities.Examen;
import com.GestionSurveillance.JEE.entities.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
@Service
public class SessionService {
	
	@Autowired 
	private  SessionRepository sessionRepository;
	
	public List<Session> getAllSessions(){
		return sessionRepository.findAll();
	}
	
	public Session getSessionById(Long id) {
		return sessionRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Session introuvable"));
	}
	
	public Session addSession(Session session) {
		return sessionRepository.save(session);
	}
	
	 public Session updateSession(Long id, Session sessionDétails) {
	        Optional<Session> sessionOptional = sessionRepository.findById(id);
	        if (sessionOptional.isPresent()) {
	            Session session = sessionOptional.get();
	            session.setDateDebut(sessionDétails.getDateDebut());
	            session.setDateFin(sessionDétails.getDateFin());
	            session.setTypeSession(sessionDétails.getTypeSession());
	            session.setDebut1(sessionDétails.getDebut1());
	            session.setFin1(sessionDétails.getFin1());
	            session.setDebut2(sessionDétails.getDebut2());
	            session.setFin2(sessionDétails.getFin2());
	            session.setDebut3(sessionDétails.getDebut3());
	            session.setFin3(sessionDétails.getFin3());
	            session.setDebut4(sessionDétails.getDebut4());
	            session.setFin4(sessionDétails.getFin4());
	            return sessionRepository.save(session);
	        }
	        return null;
	    }
	 
	 public List<String> getExamHorairesBySessionId(Long sessionId) {
	        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
	        if (sessionOptional.isPresent()) {
	            Session session = sessionOptional.get();
	            List<String> horaires = new ArrayList<>();
	            horaires.add(session.getDebut1() + " - " + session.getFin1());
	            horaires.add(session.getDebut2() + " - " + session.getFin2());
	            horaires.add(session.getDebut3() + " - " + session.getFin3());
	            horaires.add(session.getDebut4() + " - " + session.getFin4());
	            return horaires;
	        }
	        return new ArrayList<>();
	    }
	 
	 public void deleteSession(Long id) {
		 sessionRepository.deleteById(id);  
	    }
	 public List<Examen> getExamensBySessionId(Long sessionId) {
	        Session session = sessionRepository.findById(sessionId)
	                .orElseThrow(() -> new RuntimeException("Session introuvable"));
	        return session.getExamens();
	    }
	

}
