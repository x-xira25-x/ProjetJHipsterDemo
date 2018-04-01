package org.jhipster.repository;

import org.jhipster.domain.Client;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select distinct client from Client client left join fetch client.biens")
    List<Client> findAllWithEagerRelationships();

    @Query("select client from Client client left join fetch client.biens where client.id =:id")
    Client findOneWithEagerRelationships(@Param("id") Long id);

    @Query ("select client.di from Client client where client.user.login=: login")
    Long findIdClient(@Param("login")String login);

}
