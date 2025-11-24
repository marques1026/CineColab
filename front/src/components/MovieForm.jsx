import React from "react";
import InputField from "./InputField";
import DuoInput from "./DuoInput";
import Button from "./Button";

export default function MovieForm({
  modo = "edit",    
  titulo, setTitulo,
  ano, setAno,
  duracao, setDuracao,
  diretor, setDiretor,
  produtora, setProdutora,
  elenco, setElenco,
  genero, setGenero,
  sinopse, setSinopse,
  poster, setPoster,
  onSubmit,
  onClear
}) {

  return (
    <>
      <InputField
        label="Título do Filme:"
        value={titulo}
        onChange={setTitulo}
        placeholder="Ex: Meu Malvado Favorito 2"
      />

      <DuoInput>
        <InputField
          label="Ano de Lançamento:"
          value={ano}
          onChange={setAno}
          placeholder="Ex: 2013"
        />

        <InputField
          label="Tempo de Duração:"
          value={duracao}
          onChange={setDuracao}
          placeholder="Ex: 1h38min"
        />
      </DuoInput>

      <DuoInput>
        <InputField
          label="Diretor(a):"
          value={diretor}
          onChange={setDiretor}
          placeholder="Ex: Pierre Coffin"
        />

        <InputField
          label="Produtora:"
          value={produtora}
          onChange={setProdutora}
          placeholder="Ex: Illumination Entertainment"
        />
      </DuoInput>

      <InputField
        label="Elenco:"
        value={elenco}
        onChange={setElenco}
        placeholder="Ex: Kristen Wiig, Benjamin Bratt"
      />

      <InputField
        label="Gênero:"
        value={genero}
        onChange={setGenero}
        placeholder="Ex: Ação, Aventura, Infantil"
      />

      <InputField
        label="Sinopse:"
        value={sinopse}
        onChange={setSinopse}
        placeholder="Escreva a sinopse do filme..."
        textarea={true}
      />

      <InputField
        label="URL do Poster:"
        value={poster}
        onChange={setPoster}
        placeholder="https://imagem.com/poster.jpg"
      />

      {/* BOTÕES */}
      <div className="editar-buttons">
        <Button variant="outline">Voltar</Button>

        <div className="editar-buttons-right">
          <Button variant="outline" onClick={onClear}>
            Limpar tudo
          </Button>

          <Button variant="primary" onClick={onSubmit}>
            {modo === "edit" ? "Enviar Requisição →" : "Cadastrar Filme →"}
          </Button>
        </div>
      </div>
    </>
  );
}
