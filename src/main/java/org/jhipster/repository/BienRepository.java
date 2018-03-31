package org.jhipster.repository;

import java.util.List;
import org.jhipster.domain.Bien;
import org.jhipster.domain.Visite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {

    @Query("Select bien from Bien bien where bien.vendu='n'")List<Bien> findAllAvendre();
 @Query ("select bien.visite from Bien bien, Visite visite where bien.id =:idBien")List<Visite>findAllBiensVisites(Long idBien);
}
