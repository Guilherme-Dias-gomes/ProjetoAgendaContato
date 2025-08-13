package br.com.apiAgenda.controller;

import br.com.apiAgenda.dto.EditContatoDTO;
import br.com.apiAgenda.dto.ResponseContatoDTO;
import br.com.apiAgenda.model.Contato;
import br.com.apiAgenda.repository.ContatoRepository;
import br.com.apiAgenda.services.ContatoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contato")
public class ContatoController {
    private ContatoService service;

    private ContatoRepository repository;

    @GetMapping
    public List<ResponseContatoDTO> listarContatos(){
        return service.getAll().stream()
                .map(ResponseContatoDTO::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseContatoDTO buscarContatoPorId(@PathVariable Long id){
        return ResponseContatoDTO.from(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<ResponseContatoDTO> criarContato(@RequestBody ResponseContatoDTO dto){
        Contato novoContato = new Contato();

        novoContato.setNome(dto.nome());
        novoContato.setApelido(dto.apelido());
        novoContato.setCpf(dto.cpf());
        novoContato.setTelefone(dto.telefone());
        novoContato.setEmail(dto.email());
        novoContato.setDataCadastro(dto.dataCadastro());
        novoContato.setDataUltimaAlteracao(dto.DataUltimaAlteracao());

        Contato contatoSalvo = repository.save(novoContato);

        ResponseContatoDTO response = new ResponseContatoDTO(
                contatoSalvo.getId(),
                contatoSalvo.getNome(),
                contatoSalvo.getApelido(),
                contatoSalvo.getCpf(),
                contatoSalvo.getTelefone(),
                contatoSalvo.getEmail(),
                contatoSalvo.getDataCadastro(),
                contatoSalvo.getDataUltimaAlteracao()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EditContatoDTO> edtiContato(@RequestBody EditContatoDTO dto, @PathVariable Long id){
        Contato contatoAtualizado = service.editContato(dto,id);
        EditContatoDTO response = new EditContatoDTO(
                contatoAtualizado.getNome(),
                contatoAtualizado.getApelido(),
                contatoAtualizado.getCpf(),
                contatoAtualizado.getTelefone(),
                contatoAtualizado.getEmail()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public void deleteContato(@PathVariable Long id) {
        service.deleteContato(id);
    }
}
