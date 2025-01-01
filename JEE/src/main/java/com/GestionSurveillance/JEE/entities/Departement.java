package com.GestionSurveillance.JEE.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;
@Entity
@Getter
@Setter
public class Departement {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	
	@NotNull
	private String nom;

	@OneToMany(mappedBy = "departement", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Enseignant> enseignants;

	@OneToMany(mappedBy = "departement", cascade = CascadeType.ALL)
	private List<Option> options;

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

	public List<Enseignant> getEnseignants() {
		return enseignants;
	}



}
