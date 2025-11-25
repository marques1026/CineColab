SET SQL_SAFE_UPDATES = 0; -- DESLIGA A TRAVA DE SEGURANÇA TEMPORARIAMENTE

DROP DATABASE IF EXISTS cinecolab;
CREATE DATABASE cinecolab;
USE cinecolab;

-- ==================================================
-- 1. CRIAÇÃO DAS TABELAS
-- ==================================================

-- Entidades Principais
CREATE TABLE Ator (
    id_ator INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    genero VARCHAR(255),
    data_de_nascimento DATE,
    nacionalidade VARCHAR(255)
);

CREATE TABLE Diretor (
    id_diretor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    sobrenome VARCHAR(255),
    nacionalidade VARCHAR(255),
    data_nascimento DATE,
    genero VARCHAR(255)
);

CREATE TABLE Produtora (
    id_produtora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    data_fundacao DATE,
    pais_de_origem VARCHAR(255)
);

CREATE TABLE genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE linguagem (
    id_linguagem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE pais (
    id_pais INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela Filme (JÁ ATUALIZADA COM AS COLUNAS NOVAS)
CREATE TABLE Filme (
    id_filme INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    orcamento BIGINT,
    tempo_de_duracao INT, -- em minutos
    ano_de_lancamento INT,
    poster VARCHAR(255),
    -- Colunas adicionadas para compatibilidade com o backend novo:
    sinopse TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT 'PENDENTE'
);

-- Tabela de Usuários (Para o Login funcionar)
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Tabelas de Junção
CREATE TABLE filme_produtora (
    id_filme_pro INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_produtora INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_produtora) REFERENCES Produtora(id_produtora) ON DELETE CASCADE
);

CREATE TABLE Filme_ator (
    id_filme_ator INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_ator INT NOT NULL,
    personagem VARCHAR(255),
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_ator) REFERENCES Ator(id_ator) ON DELETE CASCADE
);

CREATE TABLE filme_diretor (
    id_filme_diretor INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_diretor INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_diretor) REFERENCES Diretor(id_diretor) ON DELETE CASCADE
);

CREATE TABLE filme_linguagem (
    id_filme_ling INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_linguagem INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_linguagem) REFERENCES linguagem(id_linguagem) ON DELETE CASCADE
);

CREATE TABLE Filme_genero (
    id_filme_gen INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero) ON DELETE CASCADE
);

CREATE TABLE Filme_pais (
    id_filme_pais INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_pais INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES Filme(id_filme) ON DELETE CASCADE,
    FOREIGN KEY (id_pais) REFERENCES pais(id_pais) ON DELETE CASCADE
);

-- ==================================================
-- 2. INSERÇÃO DE DADOS (POPULANDO O BANCO)
-- ==================================================

-- Usuários para Login
INSERT INTO usuarios (nome, email, senha, is_admin) VALUES 
('Administrador', 'admin@cinecolab.com', '123456', TRUE),
('Usuario Comum', 'user@cinecolab.com', '123456', FALSE);

-- Categorias Básicas
INSERT INTO genero (nome) VALUES 
('Animação'), ('Aventura'), ('Fantasia'), ('Infantil'), ('Ação'), 
('Drama'), ('Comédia'), ('Família'), ('Terror'), ('Ficção Científica'), 
('Musical'), ('Suspense'), ('Policial');

INSERT INTO linguagem (nome) VALUES 
('Inglês'), ('Mandarim'), ('Português');

INSERT INTO pais (nome) VALUES 
('EUA'), ('China'), ('Hong Kong'), ('Reino Unido'), ('Brasil');

INSERT INTO Ator (nome, nacionalidade) VALUES
('Chris Pine', 'EUA'), ('Jaden Smith', 'EUA'), ('Jackie Chan', 'Hong Kong'),
('Steve Carell', 'EUA'), ('Sandra Bullock', 'EUA'), ('Patrick Wilson', 'EUA'),
('Vera Farmiga', 'EUA'), ('Matthew McConaughey', 'EUA'), ('Kelly Macdonald', 'Reino Unido'),
('Mia Wasikowska', 'Austrália'), ('Johnny Depp', 'EUA'), ('Larissa Manoela', 'Brasil'),
('Jean Paulo Campos', 'Brasil'), ('Benedict Cumberbatch', 'Reino Unido'), ('Tom Holland', 'Reino Unido'),
('Jake Gyllenhaal', 'EUA'), ('Adam Sandler', 'EUA'), ('Dakota Fanning', 'EUA'),
('Jason Lee', 'EUA'), ('Owen Wilson', 'EUA'), ('Auli\'i Cravalho', 'EUA'),
('Dwayne Johnson', 'EUA'), ('Denzel Washington', 'EUA'), ('Amy Adams', 'Itália/EUA'),
('Sam Neill', 'Nova Zelândia'), ('Marlon Brando', 'EUA'), ('Al Pacino', 'EUA');

INSERT INTO Diretor (nome, sobrenome, nacionalidade) VALUES
('Peter', 'Ramsey', 'EUA'), ('Harald', 'Zwart', 'Noruega'), ('Pierre', 'Coffin', 'França'),
('Chris', 'Renaud', 'EUA'), ('Kyle', 'Balda', 'EUA'), ('James', 'Wan', 'Malásia/Austrália'),
('Christopher', 'Nolan', 'Reino Unido/EUA'), ('Brenda', 'Chapman', 'EUA'), ('Tim', 'Burton', 'EUA'),
('Alexandre', 'Boury', 'Brasil'), ('Mauricio', 'Eça', 'Brasil'), ('Scott', 'Derrickson', 'EUA'),
('Jon', 'Watts', 'EUA'), ('Dennis', 'Dugan', 'EUA'), ('Henry', 'Selick', 'EUA'),
('Mike', 'Mitchell', 'EUA'), ('John', 'Lasseter', 'EUA'), ('Ron', 'Clements', 'EUA'),
('John', 'Musker', 'EUA'), ('Antoine', 'Fuqua', 'EUA'), ('Denis', 'Villeneuve', 'Canadá'),
('Steven', 'Spielberg', 'EUA'), ('Francis Ford', 'Coppola', 'EUA');

INSERT INTO Produtora (nome, pais_de_origem) VALUES
('DreamWorks Animation', 'EUA'), ('Overbrook Entertainment', 'EUA'), ('China Film Group Corporation', 'China'),
('Columbia Pictures', 'EUA'), ('Illumination Entertainment', 'EUA'), ('Warner Bros.', 'EUA'),
('Paramount Pictures', 'EUA'), ('Pixar Animation Studios', 'EUA'), ('Walt Disney Pictures', 'EUA'),
('Roth Films', 'EUA'), ('Downtown Filmes', 'Brasil'), ('Paris Filmes', 'Brasil'),
('Marvel Studios', 'EUA'), ('Pascal Pictures', 'EUA'), ('Laika', 'EUA'),
('Fox Film', 'EUA'), ('Walt Disney Animation Studios', 'EUA'), ('Universal Pictures', 'EUA');

-- FILMES (Inserindo dados básicos)
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('A Origem dos Guardiões', 2012, 97, 145000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Karatê Kid', 2010, 140, 40000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Meu Malvado Favorito 2', 2013, 98, 76000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Minions', 2015, 91, 74000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Invocação do Mal', 2013, 112, 20000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Interestellar', 2014, 169, 165000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Valente', 2012, 93, 185000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Alice no País das Maravilhas', 2010, 108, 200000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao) VALUES ('Carrossel o Filme', 2015, 93);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Doutor Estranho', 2016, 115, 165000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Homem-Aranha: Longe de Casa', 2019, 129, 160000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Gente Grande', 2010, 102, 80000000);
INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, orcamento) VALUES ('Coraline e o Mundo Secreto', 2009, 100, 60000000);

-- Relacionamentos (Tabelas de Junção)
INSERT INTO filme_produtora (id_filme, id_produtora) VALUES (1, 1), (2, 2), (2, 3), (2, 4), (3, 5), (4, 5), (5, 6), (6, 6), (6, 7), (7, 8), (7, 9), (8, 9), (8, 10), (9, 11), (9, 12), (10, 13), (11, 4), (11, 13), (11, 14), (12, 4), (13, 15);

INSERT INTO Filme_ator (id_filme, id_ator, personagem) VALUES 
(1, 1, 'Jack Frost (Voz)'), (2, 2, 'Dre Parker'), (2, 3, 'Mr. Han'), 
(3, 4, 'Gru (Voz)'), (4, 5, 'Scarlet Overkill (Voz)'), (5, 6, 'Ed Warren'), 
(5, 7, 'Lorraine Warren'), (6, 8, 'Cooper'), (7, 9, 'Merida (Voz)'), 
(8, 10, 'Alice Kingsleigh'), (8, 11, 'Chapeleiro Maluco'), 
(9, 12, 'Maria Joaquina'), (9, 13, 'Cirilo'), 
(10, 14, 'Dr. Stephen Strange'), (11, 15, 'Peter Parker'), 
(11, 16, 'Mysterio'), (12, 17, 'Lenny Feder'), (13, 18, 'Coraline Jones (Voz)');

INSERT INTO filme_diretor (id_filme, id_diretor) VALUES (1, 1), (2, 2), (3, 3), (3, 4), (4, 3), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10), (9, 11), (10, 12), (11, 13), (12, 14), (13, 15);

INSERT INTO filme_linguagem (id_filme, id_linguagem) VALUES (1, 1), (2, 1), (2, 2), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 3), (10, 1), (11, 1), (12, 1), (13, 1);

INSERT INTO Filme_genero (id_filme, id_genero) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 5), (2, 6), (3, 1), (3, 7), (3, 8), (4, 1), (4, 7), (4, 8), (5, 9), (5, 12), (6, 2), (6, 6), (6, 10), (7, 1), (7, 2), (7, 3), (8, 2), (8, 3), (8, 8), (9, 4), (9, 7), (9, 8), (10, 5), (10, 2), (10, 3), (11, 5), (11, 2), (11, 10), (12, 7), (13, 1), (13, 3);

INSERT INTO Filme_pais (id_filme, id_pais) VALUES (1, 1), (2, 1), (2, 2), (2, 3), (3, 1), (4, 1), (5, 1), (6, 1), (6, 4), (7, 1), (8, 1), (9, 5), (10, 1), (11, 1), (12, 1), (13, 1);

-- Atualizando as URLs dos posters para os seus filmes
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/medias/nmedia/18/91/31/65/20139682.jpg' WHERE titulo = 'A Origem dos Guardiões';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/medias/nmedia/18/90/34/58/20092461.jpg' WHERE titulo = 'Karatê Kid';
UPDATE Filme SET poster = 'https://br.web.img2.acsta.net/pictures/13/07/02/20/48/426034.jpg' WHERE titulo = 'Meu Malvado Favorito 2';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/pictures/15/05/27/15/22/076202.jpg' WHERE titulo = 'Minions';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/pictures/13/08/20/17/47/361007.jpg' WHERE titulo = 'Invocação do Mal';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/pictures/14/10/31/20/11/015654.jpg' WHERE titulo = 'Interestellar';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/medias/nmedia/18/87/89/34/20028688.jpg' WHERE titulo = 'Valente';
UPDATE Filme SET poster = 'https://br.web.img2.acsta.net/medias/nmedia/18/87/30/14/20028669.jpg' WHERE titulo = 'Alice no País das Maravilhas';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/pictures/15/06/18/12/55/382025.jpg' WHERE titulo = 'Carrossel o Filme';
UPDATE Filme SET poster = 'https://br.web.img2.acsta.net/pictures/16/09/23/16/51/484503.jpg' WHERE titulo = 'Doutor Estranho';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/pictures/19/07/05/17/30/5167951.jpg' WHERE titulo = 'Homem-Aranha: Longe de Casa';
UPDATE Filme SET poster = 'https://br.web.img2.acsta.net/medias/nmedia/18/87/29/77/20028662.jpg' WHERE titulo = 'Gente Grande';
UPDATE Filme SET poster = 'https://br.web.img3.acsta.net/medias/nmedia/18/87/76/68/19961208.jpg' WHERE titulo = 'Coraline e o Mundo Secreto';


UPDATE Filme 
SET 
    status = 'APROVADO',
    sinopse = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sinopse indisponível no momento.'
WHERE id_filme > 0;
