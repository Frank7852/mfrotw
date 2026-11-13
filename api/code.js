// Código do Spotify (URL não documentada; pode mudar).
module.exports = async (req, res) => {
  const id = (req.query.id || '').toString();
  if (!/^[A-Za-z0-9]{22}$/.test(id)) return res.status(400).send('id inválido');
  try {
    const r = await fetch('https://scannables.scdn.co/uri/plain/png/ffffff/black/640/spotify:album:' + id);
    if (!r.ok) return res.status(404).send('indisponível');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.send(Buffer.from(await r.arrayBuffer()));
  } catch (e) { res.status(502).send('erro'); }
};
