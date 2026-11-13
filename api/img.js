// Ponte de imagens (mesma origem) para o canvas poder exportar PNG.
const OK = /^https:\/\/([a-z0-9-]+\.)*(dzcdn\.net|deezer\.com|scannables\.scdn\.co)\//i;
module.exports = async (req, res) => {
  const u = (req.query.u || '').toString();
  if (!OK.test(u)) return res.status(400).send('host não permitido');
  try {
    const r = await fetch(u);
    if (!r.ok) return res.status(404).send('não encontrado');
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.send(Buffer.from(await r.arrayBuffer()));
  } catch (e) { res.status(502).send('erro'); }
};
