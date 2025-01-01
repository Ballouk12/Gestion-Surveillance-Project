package com.GestionSurveillance.JEE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "option_entity")
public class Option {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nom; 
	
	@ManyToOne
	@JoinColumn(name = "departemet_id")
	private Departement departement;

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

	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}
	
	

}
