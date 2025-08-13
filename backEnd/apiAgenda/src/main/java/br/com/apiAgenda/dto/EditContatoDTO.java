package br.com.apiAgenda.dto;

import java.time.LocalDateTime;

public record EditContatoDTO(
        String nome,
        String apelido,
        Long cpf,
        Long telefone,
        String email
) {
}
