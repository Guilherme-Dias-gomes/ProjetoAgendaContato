CREATE TABLE contatos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    apelido VARCHAR(255),
    cpf BIGINT NOT NULL,
    telefone BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL,
    data_cadastro DATETIME NOT NULL,
    data_ultima_alteracao DATETIME
);
