package org.jhipster.web.rest;

import org.jhipster.ProjetJHipster2H2App;

import org.jhipster.domain.Bien;
import org.jhipster.repository.BienRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BienResource REST controller.
 *
 * @see BienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetJHipster2H2App.class)
public class BienResourceIntTest {

    private static final Long DEFAULT_NUMERO = 1L;
    private static final Long UPDATED_NUMERO = 2L;

    private static final String DEFAULT_RUE_NO = "AAAAAAAAAA";
    private static final String UPDATED_RUE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ANNEE_CONSTRUCTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ANNEE_CONSTRUCTION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_NB_PIECES = 1;
    private static final Integer UPDATED_NB_PIECES = 2;

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    @Autowired
    private BienRepository bienRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBienMockMvc;

    private Bien bien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BienResource bienResource = new BienResource(bienRepository);
        this.restBienMockMvc = MockMvcBuilders.standaloneSetup(bienResource)
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
    public static Bien createEntity(EntityManager em) {
        Bien bien = new Bien()
            .numero(DEFAULT_NUMERO)
            .rueNo(DEFAULT_RUE_NO)
            .localite(DEFAULT_LOCALITE)
            .anneeConstruction(DEFAULT_ANNEE_CONSTRUCTION)
            .nbPieces(DEFAULT_NB_PIECES)
            .libelle(DEFAULT_LIBELLE);
        return bien;
    }

    @Before
    public void initTest() {
        bien = createEntity(em);
    }

    @Test
    @Transactional
    public void createBien() throws Exception {
        int databaseSizeBeforeCreate = bienRepository.findAll().size();

        // Create the Bien
        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isCreated());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeCreate + 1);
        Bien testBien = bienList.get(bienList.size() - 1);
        assertThat(testBien.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testBien.getRueNo()).isEqualTo(DEFAULT_RUE_NO);
        assertThat(testBien.getLocalite()).isEqualTo(DEFAULT_LOCALITE);
        assertThat(testBien.getAnneeConstruction()).isEqualTo(DEFAULT_ANNEE_CONSTRUCTION);
        assertThat(testBien.getNbPieces()).isEqualTo(DEFAULT_NB_PIECES);
        assertThat(testBien.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
    }

    @Test
    @Transactional
    public void createBienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bienRepository.findAll().size();

        // Create the Bien with an existing ID
        bien.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setNumero(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRueNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setRueNo(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocaliteIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setLocalite(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnneeConstructionIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setAnneeConstruction(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbPiecesIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setNbPieces(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBiens() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);

        // Get all the bienList
        restBienMockMvc.perform(get("/api/biens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bien.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.intValue())))
            .andExpect(jsonPath("$.[*].rueNo").value(hasItem(DEFAULT_RUE_NO.toString())))
            .andExpect(jsonPath("$.[*].localite").value(hasItem(DEFAULT_LOCALITE.toString())))
            .andExpect(jsonPath("$.[*].anneeConstruction").value(hasItem(DEFAULT_ANNEE_CONSTRUCTION.toString())))
            .andExpect(jsonPath("$.[*].nbPieces").value(hasItem(DEFAULT_NB_PIECES)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())));
    }

    @Test
    @Transactional
    public void getBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);

        // Get the bien
        restBienMockMvc.perform(get("/api/biens/{id}", bien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bien.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.intValue()))
            .andExpect(jsonPath("$.rueNo").value(DEFAULT_RUE_NO.toString()))
            .andExpect(jsonPath("$.localite").value(DEFAULT_LOCALITE.toString()))
            .andExpect(jsonPath("$.anneeConstruction").value(DEFAULT_ANNEE_CONSTRUCTION.toString()))
            .andExpect(jsonPath("$.nbPieces").value(DEFAULT_NB_PIECES))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBien() throws Exception {
        // Get the bien
        restBienMockMvc.perform(get("/api/biens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);
        int databaseSizeBeforeUpdate = bienRepository.findAll().size();

        // Update the bien
        Bien updatedBien = bienRepository.findOne(bien.getId());
        // Disconnect from session so that the updates on updatedBien are not directly saved in db
        em.detach(updatedBien);
        updatedBien
            .numero(UPDATED_NUMERO)
            .rueNo(UPDATED_RUE_NO)
            .localite(UPDATED_LOCALITE)
            .anneeConstruction(UPDATED_ANNEE_CONSTRUCTION)
            .nbPieces(UPDATED_NB_PIECES)
            .libelle(UPDATED_LIBELLE);

        restBienMockMvc.perform(put("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBien)))
            .andExpect(status().isOk());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeUpdate);
        Bien testBien = bienList.get(bienList.size() - 1);
        assertThat(testBien.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testBien.getRueNo()).isEqualTo(UPDATED_RUE_NO);
        assertThat(testBien.getLocalite()).isEqualTo(UPDATED_LOCALITE);
        assertThat(testBien.getAnneeConstruction()).isEqualTo(UPDATED_ANNEE_CONSTRUCTION);
        assertThat(testBien.getNbPieces()).isEqualTo(UPDATED_NB_PIECES);
        assertThat(testBien.getLibelle()).isEqualTo(UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void updateNonExistingBien() throws Exception {
        int databaseSizeBeforeUpdate = bienRepository.findAll().size();

        // Create the Bien

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBienMockMvc.perform(put("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isCreated());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);
        int databaseSizeBeforeDelete = bienRepository.findAll().size();

        // Get the bien
        restBienMockMvc.perform(delete("/api/biens/{id}", bien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bien.class);
        Bien bien1 = new Bien();
        bien1.setId(1L);
        Bien bien2 = new Bien();
        bien2.setId(bien1.getId());
        assertThat(bien1).isEqualTo(bien2);
        bien2.setId(2L);
        assertThat(bien1).isNotEqualTo(bien2);
        bien1.setId(null);
        assertThat(bien1).isNotEqualTo(bien2);
    }
}
