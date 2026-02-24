# Calculadora de Interjornada (CLT)

Interface web simples focada em hora extra com jornada normal editavel.

Layout em React com Vite, componentizado e pronto para evoluir.

Voce informa:

- inicio e fim da jornada normal;

- entrada na hora extra;
- saida da hora extra.
- se a saida foi apos meia-noite.

E a pagina calcula automaticamente:

- duracao da hora extra;
- inicio minimo da proxima jornada para respeitar 11h de interjornada (CLT art. 66);
- comparacao com o inicio da jornada normal que voce definiu.

## Como usar

1. Instale as dependencias:

```bash
npm install
```

2. Rode em ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra a URL mostrada no terminal (normalmente `http://localhost:5173`).
4. Informe inicio/fim da jornada normal.
5. Informe inicio/fim da hora extra.
6. Se necessario, marque que a saida foi no dia seguinte.
7. O resultado aparece automaticamente.

## Build de producao

```bash
npm run build
```

## Stack

- React 18
- Vite 5
- CSS modular por componente de interface

## Monetizacao (Google AdSense)

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione suas chaves:

```bash
VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_SLOT=1234567890
VITE_ADSENSE_ADTEST=off
```

3. Reinicie o servidor (`npm run dev`).

Sem essas variaveis, a UI mostra um placeholder de anuncio.

### Netlify (producao)

No painel do Netlify: **Site configuration** > **Environment variables** e adicione as mesmas variaveis.
Depois, em **Deploys**, execute **Trigger deploy** > **Deploy site**.

## Observacao

Ferramenta de apoio e orientacao geral. Para casos especificos, consulte RH, sindicato ou assessoria juridica.
