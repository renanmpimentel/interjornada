# Contributing

Obrigado por contribuir com o projeto.

## Como contribuir

1. Faça um fork e crie uma branch para sua mudanca.
2. Mantenha o escopo pequeno (vertical slice), com mudancas verificaveis.
3. Rode as validacoes antes de abrir PR:

```bash
npm run lint
npm run typecheck
npm test
```

4. Atualize documentacao quando necessario.
5. Abra Pull Request para `main` (ou `master` quando aplicavel).

## Regras do projeto

- Nunca commitar segredos.
- Use `.env.example` para variaveis de ambiente publicas.
- Se houver mudanca de arquitetura, crie um ADR em `docs/decisions/`.
- Push direto em `main`/`master` e bloqueado por protecao de branch; o fluxo oficial e via PR.
