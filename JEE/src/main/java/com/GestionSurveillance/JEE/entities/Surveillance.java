package com.GestionSurveillance.JEE.entities;

import com.GestionSurveillance.JEE.entities.Local;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
public class Surveillance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String typeSurveillance;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "enseignant_id")
	private Enseignant enseignant;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "session_id")
	private Session session;

	@ManyToOne
	@JoinColumn(name = "local_id") // Clé étrangère pour référencer l'entité Local
	private Local local;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTypeSurveillance() {
		return typeSurveillance;
	}

	public void setTypeSurveillance(String typeSurveillance) {
		this.typeSurveillance = typeSurveillance;
	}

	public Enseignant getEnseignant() {
		return enseignant;
	}

	public void setEnseignant(Enseignant enseignant) {
		this.enseignant = enseignant;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public Local getLocal() {
		return local;
	}

	public void setLocal(Local local) {
		this.local = local;
	}
}
