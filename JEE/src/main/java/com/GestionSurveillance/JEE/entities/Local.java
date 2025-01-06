package com.GestionSurveillance.JEE.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Getter
@Setter
public class Local {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	private String nom;
	@OneToMany(mappedBy = "local")
	@JsonIgnore
	private List<ExamLocal> examens;

	@NotNull
	private int capacite;
	private String type;

	private boolean estDisponible;

	private int nbSurveillance;
	@OneToMany(mappedBy = "local", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Surveillance> surveillances;

	public String getType() {return type;}

	public void setType(String type) {this.type = type;}

	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getCapacite() {
		return capacite;
	}

	public void setCapacite(int capacite) {
		this.capacite = capacite;
	}

	public boolean isEstDisponible() {
		return estDisponible;
	}

	public void setEstDisponible(boolean estDisponible) {
		this.estDisponible = estDisponible;
	}

	public int getNbSurveillance() {
		return nbSurveillance;
	}

	public void setNbSurveillance(int nbSurveillance) {
		this.nbSurveillance = nbSurveillance;
	}

	public List<Surveillance> getSurveillances() {
		return surveillances;
	}

	public void setSurveillances(List<Surveillance> surveillances) {
		this.surveillances = surveillances;
	}

	public List<ExamLocal> getExamens() {
		return examens;
	}

	public void setExamens(List<ExamLocal> examens) {
		this.examens = examens;
	}
}
