package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "npa", nullable = false)
    private String npa;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "localite", nullable = false)
    private String localite;

    @NotNull
    @Column(name = "num_telephone", nullable = false)
    private Integer numTelephone;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @NotNull
    @JoinTable(name = "client_bien",
               joinColumns = @JoinColumn(name="clients_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="biens_id", referencedColumnName="id"))
    private Set<Bien> biens = new HashSet<>();

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private Set<Visite> visites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Client nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Client prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public Client adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNpa() {
        return npa;
    }

    public Client npa(String npa) {
        this.npa = npa;
        return this;
    }

    public void setNpa(String npa) {
        this.npa = npa;
    }

    public String getLocalite() {
        return localite;
    }

    public Client localite(String localite) {
        this.localite = localite;
        return this;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public Integer getNumTelephone() {
        return numTelephone;
    }

    public Client numTelephone(Integer numTelephone) {
        this.numTelephone = numTelephone;
        return this;
    }

    public void setNumTelephone(Integer numTelephone) {
        this.numTelephone = numTelephone;
    }

    public User getUser() {
        return user;
    }

    public Client user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Bien> getBiens() {
        return biens;
    }

    public Client biens(Set<Bien> biens) {
        this.biens = biens;
        return this;
    }

    public Client addBien(Bien bien) {
        this.biens.add(bien);
        bien.getClients().add(this);
        return this;
    }

    public Client removeBien(Bien bien) {
        this.biens.remove(bien);
        bien.getClients().remove(this);
        return this;
    }

    public void setBiens(Set<Bien> biens) {
        this.biens = biens;
    }

    public Set<Visite> getVisites() {
        return visites;
    }

    public Client visites(Set<Visite> visites) {
        this.visites = visites;
        return this;
    }

    public Client addVisite(Visite visite) {
        this.visites.add(visite);
        visite.setClient(this);
        return this;
    }

    public Client removeVisite(Visite visite) {
        this.visites.remove(visite);
        visite.setClient(null);
        return this;
    }

    public void setVisites(Set<Visite> visites) {
        this.visites = visites;
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
        Client client = (Client) o;
        if (client.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), client.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", npa='" + getNpa() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", numTelephone=" + getNumTelephone() +
            "}";
    }
}
