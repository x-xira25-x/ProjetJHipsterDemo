package org.jhipster.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Vendeur.
 */
@Entity
@Table(name = "vendeur")
public class Vendeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false)
    private Long numero;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "npa")
    private String npa;

    @Column(name = "localite")
    private String localite;

    @NotNull
    @Column(name = "num_telephone", nullable = false)
    private Integer numTelephone;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumero() {
        return numero;
    }

    public Vendeur numero(Long numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public String getNom() {
        return nom;
    }

    public Vendeur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Vendeur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public Vendeur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNpa() {
        return npa;
    }

    public Vendeur npa(String npa) {
        this.npa = npa;
        return this;
    }

    public void setNpa(String npa) {
        this.npa = npa;
    }

    public String getLocalite() {
        return localite;
    }

    public Vendeur localite(String localite) {
        this.localite = localite;
        return this;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public Integer getNumTelephone() {
        return numTelephone;
    }

    public Vendeur numTelephone(Integer numTelephone) {
        this.numTelephone = numTelephone;
        return this;
    }

    public void setNumTelephone(Integer numTelephone) {
        this.numTelephone = numTelephone;
    }

    public User getUser() {
        return user;
    }

    public Vendeur user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Vendeur vendeur = (Vendeur) o;
        if (vendeur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendeur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vendeur{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", npa='" + getNpa() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", numTelephone=" + getNumTelephone() +
            "}";
    }
}
