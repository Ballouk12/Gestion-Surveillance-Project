package com.GestionSurveillance.JEE.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;
@Getter
@Setter
@Entity
public class Enseignant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String nom;
	
	@NotNull
	private String prenom;
	private String phone ;
	
	@NotNull
	private String email;
	
	private String estDispense;
	private boolean estReserviste; 
	private int nbrSurveillance;
	
	@ManyToOne
	@JoinColumn(name = "departement_id")
	private Departement departement;
	//@JsonIgnore
	@OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL)
	private List<Surveillance> surveillances;

	//@JsonIgnore
	@OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Examen> examens;

	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String isEstDispense() {
		return estDispense;
	}

	public void setEstDispense(String estDispense) {
		this.estDispense = estDispense;
	}

	public String getEstDispense() {return estDispense;}

	public boolean isEstReserviste() {
		return estReserviste;
	}

	public void setEstReserviste(boolean estReserviste) {
		this.estReserviste = estReserviste;
	}

	public int getNbrSurveillance() {
		return nbrSurveillance;
	}

	public void setNbrSurveillance(int nbrSurveillance) {
		this.nbrSurveillance = nbrSurveillance;
	}

	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}

	public List<Surveillance> getSurveillances() {
		return surveillances;
	}

	public void setSurveillances(List<Surveillance> surveillances) {
		this.surveillances = surveillances;
	}

	public List<Examen> getExamens() {
		return examens;
	}

	public void setExamens(List<Examen> examens) {
		this.examens = examens;
	}
	

}
