package br.com.apiAgenda.services;

import br.com.apiAgenda.dto.EditContatoDTO;
import br.com.apiAgenda.exception.ContatoNotFoundException;
import br.com.apiAgenda.model.Contato;
import br.com.apiAgenda.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContatoService {
    @Autowired
    private ContatoRepository repository;

    public List<Contato> getAll(){
        return repository.findAll();
    }

    public Contato getById(Long id){
        return repository.findById(id).orElseThrow(
                () -> new ContatoNotFoundException(id)
        );
    }

    public Contato create(Contato contato){
        contato.setDataCadastro(LocalDateTime.now());
        contato.setDataUltimaAlteracao(LocalDateTime.now());
        return repository.save(contato);
    }

    public Contato editContato(EditContatoDTO dto, Long id){
        Contato contato = new Contato();
        contato.setDataUltimaAlteracao(LocalDateTime.now());
        Contato contatoExistente = repository.findById(id).orElseThrow(
                () -> new ContatoNotFoundException(id)
        );
        contatoExistente.setNome(dto.nome());
        contatoExistente.setApelido(dto.apelido());
        contatoExistente.setCpf(dto.cpf());
        contatoExistente.setTelefone(dto.telefone());
        contatoExistente.setEmail(dto.email());

        return repository.save(contatoExistente);
    }

    public void deleteContato(Long id){
        repository.findById(id).orElseThrow(
                () -> new ContatoNotFoundException(id)
        );
        repository.deleteById(id);
    }
}
