package br.com.apiAgenda.exception;

public class ContatoNotFoundException extends RuntimeException {
    public ContatoNotFoundException(Long id) {
        super("Contato não encontrado!");
    }
}
