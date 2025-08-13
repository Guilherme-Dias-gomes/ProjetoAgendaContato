package br.com.apiAgenda.dto;

import br.com.apiAgenda.model.Contato;

import java.time.LocalDateTime;

public record ResponseContatoDTO(
        Long id,
        String nome,
        String apelido,
        Long cpf,
        Long telefone,
        String email,
        LocalDateTime dataCadastro,
        LocalDateTime DataUltimaAlteracao
) {
    public static ResponseContatoDTO from(Contato contato){
        return new ResponseContatoDTO(
                contato.getId(),
                contato.getNome(),
                contato.getApelido(),
                contato.getCpf(),
                contato.getTelefone(),
                contato.getEmail(),
                contato.getDataCadastro(),
                contato.getDataUltimaAlteracao()
        );
    }
}
