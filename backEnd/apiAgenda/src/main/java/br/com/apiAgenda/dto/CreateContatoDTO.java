package br.com.apiAgenda.dto;

import br.com.apiAgenda.model.Contato;

public record CreateContatoDTO(
        Long id,
        String nome,
        String apelido,
        Long cpf,
        Long telefone,
        String email
) {
    public static CreateContatoDTO from(Contato contato){
        return new CreateContatoDTO(
                contato.getId(),
                contato.getNome(),
                contato.getApelido(),
                contato.getCpf(),
                contato.getTelefone(),
                contato.getEmail()
        );
    }
}