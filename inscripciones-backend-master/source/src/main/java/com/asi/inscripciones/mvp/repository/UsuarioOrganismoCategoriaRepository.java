package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.entity.UsuarioOrganismoCategoria;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioOrganismoCategoriaRepository extends JpaRepository<UsuarioOrganismoCategoria,Long> {
    

    @Query("SELECT u FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:id")
    public List<UsuarioOrganismoCategoria> findByIdUsuario(final @Param("id") Long id);

    @Query("SELECT u FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:id")
    public List<UsuarioOrganismoCategoria> findByIdUsuario(final @Param("id") Long id, Pageable pageable);

    @Query("SELECT u FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:id AND u.organismoCategoria.organismo.id=:organismoId")
    public List<UsuarioOrganismoCategoria> findByIdUsuarioAndOrganismoId(final @Param("id") Long id, final @Param("organismoId") Long organismoId);

    @Query("SELECT u.usuario FROM UsuarioOrganismoCategoria u WHERE u.usuario.rol.id=3 and u.organismoCategoria.id=:id ")
    public List<Usuario> findByIdOrganismoCategoriaProfesor(final @Param("id") Long id);

    @Query("SELECT u.usuario FROM UsuarioOrganismoCategoria u WHERE u.organismoCategoria.id=:id ")
    public List<Usuario> findByIdOrganismoAndCategoria(final @Param("id") Long id);

    @Query("SELECT u FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId AND u.organismoCategoria.categoria.id=:categoriaId")
    public Optional<UsuarioOrganismoCategoria> findByIdUsuarioCategoria(final @Param("usuarioId") Long usuarioId, final @Param("categoriaId") Long categoriaId);

    @Modifying
    @Query("DELETE FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId AND u.organismoCategoria.categoria.id=:categoriaId")
    public void deleteByIdUsuarioCategoria(final @Param("usuarioId") Long usuarioId, final @Param("categoriaId") Long categoriaId);
    
}
