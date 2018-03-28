package org.jhipster.web.rest;

import org.jhipster.ProjetJHipster2H2App;

import org.jhipster.domain.Vendeur;
import org.jhipster.domain.User;
import org.jhipster.repository.VendeurRepository;
import org.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VendeurResource REST controller.
 *
 * @see VendeurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetJHipster2H2App.class)
public class VendeurResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_NPA = "AAAAAAAAAA";
    private static final String UPDATED_NPA = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_TELEPHONE = 1;
    private static final Integer UPDATED_NUM_TELEPHONE = 2;

    @Autowired
    private VendeurRepository vendeurRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVendeurMockMvc;

    private Vendeur vendeur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendeurResource vendeurResource = new VendeurResource(vendeurRepository);
        this.restVendeurMockMvc = MockMvcBuilders.standaloneSetup(vendeurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vendeur createEntity(EntityManager em) {
        Vendeur vendeur = new Vendeur()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .adresse(DEFAULT_ADRESSE)
            .npa(DEFAULT_NPA)
            .localite(DEFAULT_LOCALITE)
            .numTelephone(DEFAULT_NUM_TELEPHONE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        vendeur.setUser(user);
        return vendeur;
    }

    @Before
    public void initTest() {
        vendeur = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendeur() throws Exception {
        int databaseSizeBeforeCreate = vendeurRepository.findAll().size();

        // Create the Vendeur
        restVendeurMockMvc.perform(post("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isCreated());

        // Validate the Vendeur in the database
        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeCreate + 1);
        Vendeur testVendeur = vendeurList.get(vendeurList.size() - 1);
        assertThat(testVendeur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testVendeur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testVendeur.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testVendeur.getNpa()).isEqualTo(DEFAULT_NPA);
        assertThat(testVendeur.getLocalite()).isEqualTo(DEFAULT_LOCALITE);
        assertThat(testVendeur.getNumTelephone()).isEqualTo(DEFAULT_NUM_TELEPHONE);
    }

    @Test
    @Transactional
    public void createVendeurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendeurRepository.findAll().size();

        // Create the Vendeur with an existing ID
        vendeur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendeurMockMvc.perform(post("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isBadRequest());

        // Validate the Vendeur in the database
        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendeurRepository.findAll().size();
        // set the field null
        vendeur.setNom(null);

        // Create the Vendeur, which fails.

        restVendeurMockMvc.perform(post("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isBadRequest());

        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendeurRepository.findAll().size();
        // set the field null
        vendeur.setPrenom(null);

        // Create the Vendeur, which fails.

        restVendeurMockMvc.perform(post("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isBadRequest());

        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendeurRepository.findAll().size();
        // set the field null
        vendeur.setNumTelephone(null);

        // Create the Vendeur, which fails.

        restVendeurMockMvc.perform(post("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isBadRequest());

        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVendeurs() throws Exception {
        // Initialize the database
        vendeurRepository.saveAndFlush(vendeur);

        // Get all the vendeurList
        restVendeurMockMvc.perform(get("/api/vendeurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendeur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].npa").value(hasItem(DEFAULT_NPA.toString())))
            .andExpect(jsonPath("$.[*].localite").value(hasItem(DEFAULT_LOCALITE.toString())))
            .andExpect(jsonPath("$.[*].numTelephone").value(hasItem(DEFAULT_NUM_TELEPHONE)));
    }

    @Test
    @Transactional
    public void getVendeur() throws Exception {
        // Initialize the database
        vendeurRepository.saveAndFlush(vendeur);

        // Get the vendeur
        restVendeurMockMvc.perform(get("/api/vendeurs/{id}", vendeur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendeur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.npa").value(DEFAULT_NPA.toString()))
            .andExpect(jsonPath("$.localite").value(DEFAULT_LOCALITE.toString()))
            .andExpect(jsonPath("$.numTelephone").value(DEFAULT_NUM_TELEPHONE));
    }

    @Test
    @Transactional
    public void getNonExistingVendeur() throws Exception {
        // Get the vendeur
        restVendeurMockMvc.perform(get("/api/vendeurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendeur() throws Exception {
        // Initialize the database
        vendeurRepository.saveAndFlush(vendeur);
        int databaseSizeBeforeUpdate = vendeurRepository.findAll().size();

        // Update the vendeur
        Vendeur updatedVendeur = vendeurRepository.findOne(vendeur.getId());
        // Disconnect from session so that the updates on updatedVendeur are not directly saved in db
        em.detach(updatedVendeur);
        updatedVendeur
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .adresse(UPDATED_ADRESSE)
            .npa(UPDATED_NPA)
            .localite(UPDATED_LOCALITE)
            .numTelephone(UPDATED_NUM_TELEPHONE);

        restVendeurMockMvc.perform(put("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVendeur)))
            .andExpect(status().isOk());

        // Validate the Vendeur in the database
        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeUpdate);
        Vendeur testVendeur = vendeurList.get(vendeurList.size() - 1);
        assertThat(testVendeur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testVendeur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testVendeur.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testVendeur.getNpa()).isEqualTo(UPDATED_NPA);
        assertThat(testVendeur.getLocalite()).isEqualTo(UPDATED_LOCALITE);
        assertThat(testVendeur.getNumTelephone()).isEqualTo(UPDATED_NUM_TELEPHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingVendeur() throws Exception {
        int databaseSizeBeforeUpdate = vendeurRepository.findAll().size();

        // Create the Vendeur

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVendeurMockMvc.perform(put("/api/vendeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendeur)))
            .andExpect(status().isCreated());

        // Validate the Vendeur in the database
        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVendeur() throws Exception {
        // Initialize the database
        vendeurRepository.saveAndFlush(vendeur);
        int databaseSizeBeforeDelete = vendeurRepository.findAll().size();

        // Get the vendeur
        restVendeurMockMvc.perform(delete("/api/vendeurs/{id}", vendeur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vendeur> vendeurList = vendeurRepository.findAll();
        assertThat(vendeurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendeur.class);
        Vendeur vendeur1 = new Vendeur();
        vendeur1.setId(1L);
        Vendeur vendeur2 = new Vendeur();
        vendeur2.setId(vendeur1.getId());
        assertThat(vendeur1).isEqualTo(vendeur2);
        vendeur2.setId(2L);
        assertThat(vendeur1).isNotEqualTo(vendeur2);
        vendeur1.setId(null);
        assertThat(vendeur1).isNotEqualTo(vendeur2);
    }
}
