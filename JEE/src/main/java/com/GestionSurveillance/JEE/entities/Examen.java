package com.GestionSurveillance.JEE.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Examen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String module;

    private int nbEtudiants;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @OneToMany(mappedBy = "examen", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<ExamLocal> locaux;
    public List<ExamLocal> getLocaux() {
        return locaux;
    }

    public void setLocaux(List<ExamLocal> locaux) {
        this.locaux = locaux;
    }

    public Enseignant getEnseignant() {
        return enseignant;
    }

    public void setEnseignant(Enseignant enseignant) {
        this.enseignant = enseignant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public int getNbEtudiants() {
        return nbEtudiants;
    }

    public void setNbEtudiants(int nbEtudiants) {
        this.nbEtudiants = nbEtudiants;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}