package br.com.apiAgenda.repository;

import br.com.apiAgenda.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

}
