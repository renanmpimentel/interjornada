# Interjornada (CLT)

Calculadora web para apoio na validacao de interjornada minima de 11 horas (CLT, art. 66), com base na jornada normal e na hora extra informadas.

## Objetivo

O projeto ajuda a responder, de forma rapida:
- qual foi a duracao da hora extra
- qual o horario minimo de inicio da proxima jornada
- se o inicio padrao da jornada pode ser mantido

## Stack

- React 18
- Vite 5
- CSS
- Vitest (testes)
- ESLint (lint)
- TypeScript checker em modo JS (`checkJs`) para typecheck

## Requisitos

- Node.js 18+
- npm 9+

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra a URL exibida no terminal (normalmente `http://localhost:5173`).

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
```

## Contribuindo

1. Faça fork do repositório.
2. Crie uma branch para sua mudança.
3. Rode as validacoes locais:

```bash
npm run lint
npm run typecheck
npm test
```

4. Abra um Pull Request.

Consulte [`CONTRIBUTING.md`](./CONTRIBUTING.md) para detalhes.

## Governança

- Branches `main` e `master` protegidas
- Fluxo oficial via Pull Request
- `CODEOWNERS` configurado

## Licença

Este projeto está sob licença MIT. Veja [`LICENSE`](./LICENSE).

## Aviso

Ferramenta de apoio e orientacao geral. Para situacoes especificas, consulte RH, sindicato ou assessoria juridica.
