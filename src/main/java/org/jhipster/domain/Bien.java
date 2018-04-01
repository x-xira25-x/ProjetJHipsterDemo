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
    @Column(name = "rue_no", nullable = false)
    private String rueNo;

    @NotNull
    @Column(name = "localite", nullable = false)
    private String localite;

    @NotNull
    @Column(name = "annee_construction", nullable = false)
    private LocalDate anneeConstruction;

    @NotNull
    @Column(name = "nb_pieces", nullable = false)
    private Float nbPieces;

    @Column(name = "libelle")
    private String libelle;

    @NotNull
    @Column(name = "jhi_type", nullable = false)
    private String type;

    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "vendu", length = 1, nullable = false)
    private String vendu;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @ManyToMany(mappedBy = "biens")
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

    @OneToMany(mappedBy = "bien")
    @JsonIgnore
    private Set<Visite> visites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getLocalite() {
        return localite;
    }

    public Bien localite(String localite) {
        this.localite = localite;
        return this;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
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

    public Float getNbPieces() {
        return nbPieces;
    }

    public Bien nbPieces(Float nbPieces) {
        this.nbPieces = nbPieces;
        return this;
    }

    public void setNbPieces(Float nbPieces) {
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

    public String getType() {
        return type;
    }

    public Bien type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVendu() {
        return vendu;
    }

    public Bien vendu(String vendu) {
        this.vendu = vendu;
        return this;
    }

    public void setVendu(String vendu) {
        this.vendu = vendu;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Bien photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Bien photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
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

    public Set<Visite> getVisites() {
        return visites;
    }

    public Bien visites(Set<Visite> visites) {
        this.visites = visites;
        return this;
    }

    public Bien addVisite(Visite visite) {
        this.visites.add(visite);
        visite.setBien(this);
        return this;
    }

    public Bien removeVisite(Visite visite) {
        this.visites.remove(visite);
        visite.setBien(null);
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
            ", rueNo='" + getRueNo() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", anneeConstruction='" + getAnneeConstruction() + "'" +
            ", nbPieces=" + getNbPieces() +
            ", libelle='" + getLibelle() + "'" +
            ", type='" + getType() + "'" +
            ", vendu='" + getVendu() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
