# Gerador de posters de álbum

Sem chaves nem contas pagas. Dados: Deezer. Código: scannables.scdn.co (ID do link do Spotify).

Fluxo: busca no Deezer, código via Odesli (song.link), imagem em scannables.scdn.co. Se algo falhar, o site pede o link ou a imagem do código manualmente.

## Publicar (Vercel, grátis)
1. Crie conta em vercel.com e suba esta pasta (arraste no dashboard "Add New > Project" ou use `npx vercel` dentro da pasta).
2. Sem configuração extra: `index.html` é a página e `api/` são as funções.

## Testar local
`npx vercel dev`
