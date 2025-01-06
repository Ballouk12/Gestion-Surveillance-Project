package com.GestionSurveillance.JEE.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
public class Session {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    private String dateDebut;  
    private String dateFin;    
    private String typeSession;
    private String debut1;
    private String fin1;
    private String debut2;
    private String fin2;
    private String debut3;
    private String fin3;
    private String debut4;
    private String fin4;
    
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<Examen> examens;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}

	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}

	public String getTypeSession() {
		return typeSession;
	}

	public void setTypeSession(String typeSession) {
		this.typeSession = typeSession;
	}

	public String getDebut1() {
		return debut1;
	}

	public void setDebut1(String debut1) {
		this.debut1 = debut1;
	}

	public String getFin1() {
		return fin1;
	}

	public void setFin1(String fin1) {
		this.fin1 = fin1;
	}

	public String getDebut2() {
		return debut2;
	}

	public void setDebut2(String debut2) {
		this.debut2 = debut2;
	}

	public String getFin2() {
		return fin2;
	}

	public void setFin2(String fin2) {
		this.fin2 = fin2;
	}

	public String getDebut3() {
		return debut3;
	}

	public void setDebut3(String debut3) {
		this.debut3 = debut3;
	}

	public String getFin3() {
		return fin3;
	}

	public void setFin3(String fin3) {
		this.fin3 = fin3;
	}

	public String getDebut4() {
		return debut4;
	}

	public void setDebut4(String debut4) {
		this.debut4 = debut4;
	}

	public String getFin4() {
		return fin4;
	}

	public void setFin4(String fin4) {
		this.fin4 = fin4;
	}

	public List<Examen> getExamens() {
		return examens;
	}

	public void setExamens(List<Examen> examens) {
		this.examens = examens;
	}
    
    

}
