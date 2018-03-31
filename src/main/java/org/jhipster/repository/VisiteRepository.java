package org.jhipster.repository;

import java.util.List;
import org.jhipster.domain.Visite;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Visite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {

    @Query("select visite from Visite visite where visite.client.user.login =:login")
    List<Visite>FindAllByClient(@Param("login")String login);

}
