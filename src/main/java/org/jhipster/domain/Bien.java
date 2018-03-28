package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bien.
 */
@Entity
@Table(name = "bien")
public class Bien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false)
    private Long numero;

    @NotNull
    @Column(name = "rue_no", nullable = false)
    private String rueNo;

    @NotNull
    @Column(name = "annee_construction", nullable = false)
    private LocalDate anneeConstruction;

    @NotNull
    @Column(name = "nb_pieces", nullable = false)
    private Integer nbPieces;

    @Column(name = "libelle")
    private String libelle;

    @ManyToMany(mappedBy = "biens")
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

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

    public Bien numero(Long numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public String getRueNo() {
        return rueNo;
    }

    public Bien rueNo(String rueNo) {
        this.rueNo = rueNo;
        return this;
    }

    public void setRueNo(String rueNo) {
        this.rueNo = rueNo;
    }

    public LocalDate getAnneeConstruction() {
        return anneeConstruction;
    }

    public Bien anneeConstruction(LocalDate anneeConstruction) {
        this.anneeConstruction = anneeConstruction;
        return this;
    }

    public void setAnneeConstruction(LocalDate anneeConstruction) {
        this.anneeConstruction = anneeConstruction;
    }

    public Integer getNbPieces() {
        return nbPieces;
    }

    public Bien nbPieces(Integer nbPieces) {
        this.nbPieces = nbPieces;
        return this;
    }

    public void setNbPieces(Integer nbPieces) {
        this.nbPieces = nbPieces;
    }

    public String getLibelle() {
        return libelle;
    }

    public Bien libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Bien clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Bien addClient(Client client) {
        this.clients.add(client);
        client.getBiens().add(this);
        return this;
    }

    public Bien removeClient(Client client) {
        this.clients.remove(client);
        client.getBiens().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
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
        Bien bien = (Bien) o;
        if (bien.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bien.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bien{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", rueNo='" + getRueNo() + "'" +
            ", anneeConstruction='" + getAnneeConstruction() + "'" +
            ", nbPieces=" + getNbPieces() +
            ", libelle='" + getLibelle() + "'" +
            "}";
    }
}
