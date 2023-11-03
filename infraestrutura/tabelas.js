class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTbUsuarios();
    }

    criarTbUsuarios() { 
        const sql = `CREATE TABLE IF NOT EXISTS usuarios (
            id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cpf_cnpj varchar(20) NOT NULL DEFAULT '0',
            nome varchar(100) NOT NULL DEFAULT '0',
            email varchar(255) NOT NULL DEFAULT '0',
            dt_nascimento date NOT NULL,
            telefone varchar(50) NOT NULL DEFAULT '0',
            senha varchar(255) NOT NULL DEFAULT '0',
            status varchar(255) DEFAULT 'ATIVO', 
            cep varchar(255) NOT NULL DEFAULT '0',
            estado varchar(255) NOT NULL DEFAULT '0',
            cidade varchar(255) NOT NULL DEFAULT '0',
            bairro varchar(255) NOT NULL DEFAULT '0',
            logradouro varchar(255) NOT NULL DEFAULT '0',
            complemento varchar(255) NOT NULL DEFAULT '0',
            numero varchar(255) NOT NULL,
            nacionalidade int(255) NOT NULL,
            naturalidade int(255) NOT NULL,
            estado_civil int(255) NOT NULL,
            rg varchar(20) NOT NULL,
            id_setor int(11) NOT NULL, 
            sexo enum('M','F') NOT NULL,
            dataHoraCriacao datetime NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            } else {
                console.log("Tabela de usuarios criada com sucesso");

            }
        });
    }
}

module.exports = new Tabelas