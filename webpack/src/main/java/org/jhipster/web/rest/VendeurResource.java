package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.Vendeur;

import org.jhipster.repository.VendeurRepository;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Vendeur.
 */
@RestController
@RequestMapping("/api")
public class VendeurResource {

    private final Logger log = LoggerFactory.getLogger(VendeurResource.class);

    private static final String ENTITY_NAME = "vendeur";

    private final VendeurRepository vendeurRepository;

    public VendeurResource(VendeurRepository vendeurRepository) {
        this.vendeurRepository = vendeurRepository;
    }

    /**
     * POST  /vendeurs : Create a new vendeur.
     *
     * @param vendeur the vendeur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendeur, or with status 400 (Bad Request) if the vendeur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendeurs")
    @Timed
    public ResponseEntity<Vendeur> createVendeur(@Valid @RequestBody Vendeur vendeur) throws URISyntaxException {
        log.debug("REST request to save Vendeur : {}", vendeur);
        if (vendeur.getId() != null) {
            throw new BadRequestAlertException("A new vendeur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vendeur result = vendeurRepository.save(vendeur);
        return ResponseEntity.created(new URI("/api/vendeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendeurs : Updates an existing vendeur.
     *
     * @param vendeur the vendeur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendeur,
     * or with status 400 (Bad Request) if the vendeur is not valid,
     * or with status 500 (Internal Server Error) if the vendeur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendeurs")
    @Timed
    public ResponseEntity<Vendeur> updateVendeur(@Valid @RequestBody Vendeur vendeur) throws URISyntaxException {
        log.debug("REST request to update Vendeur : {}", vendeur);
        if (vendeur.getId() == null) {
            return createVendeur(vendeur);
        }
        Vendeur result = vendeurRepository.save(vendeur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendeur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendeurs : get all the vendeurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendeurs in body
     */
    @GetMapping("/vendeurs")
    @Timed
    public List<Vendeur> getAllVendeurs() {
        log.debug("REST request to get all Vendeurs");
        return vendeurRepository.findAll();
        }

    /**
     * GET  /vendeurs/:id : get the "id" vendeur.
     *
     * @param id the id of the vendeur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendeur, or with status 404 (Not Found)
     */
    @GetMapping("/vendeurs/{id}")
    @Timed
    public ResponseEntity<Vendeur> getVendeur(@PathVariable Long id) {
        log.debug("REST request to get Vendeur : {}", id);
        Vendeur vendeur = vendeurRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vendeur));
    }

    /**
     * DELETE  /vendeurs/:id : delete the "id" vendeur.
     *
     * @param id the id of the vendeur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendeurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendeur(@PathVariable Long id) {
        log.debug("REST request to delete Vendeur : {}", id);
        vendeurRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
