# Protótipo - Leitura Simples DJE TJBA

Protótipo em React + Vite, pronto para subir no GitHub e publicar no Netlify.

## Como rodar localmente

```cmd
npm install
npm run dev
```

## Build local

```cmd
npm run build
npm run preview
```

## Publicar no Netlify

- Importar o repositório do GitHub no Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- O arquivo `netlify.toml` já está pronto.

## Estrutura atual

- Menu superior com data e edição.
- Abas Cadernos 1 a 5.
- Filtros por categoria e unidade.
- Cards com resumo em linguagem simples.
- Dados simulados para apresentação do MVP.

## Próxima evolução

Substituir os dados simulados por consulta real ao DJE/TJBA via backend intermediário.
