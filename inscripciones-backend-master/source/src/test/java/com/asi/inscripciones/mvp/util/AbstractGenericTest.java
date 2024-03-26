package com.asi.inscripciones.mvp.util;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;


import com.asi.inscripciones.mvp.mapper.OrganismoMapperImpl;
import com.asi.inscripciones.mvp.mapper.PermisoMapperImpl;
import com.asi.inscripciones.mvp.mapper.RolMapperImpl;
import com.asi.inscripciones.mvp.mapper.UsuarioMapperImpl;

@DataJpaTest
@ActiveProfiles(profiles = ConstanteTest.PERFIL_TEST)
@TestPropertySource(locations = ConstanteTest.PROPERTIES_TEST)
@Sql(ConstanteTest.DATA_SQL)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ComponentScan(basePackageClasses = {UsuarioMapperImpl.class, OrganismoMapperImpl.class, PermisoMapperImpl.class, RolMapperImpl.class})
public abstract class AbstractGenericTest {
    
    public Long id = 1L;

}
