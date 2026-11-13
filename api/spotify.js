// Descobre o álbum no Spotify a partir do ID do Deezer (via Odesli/song.link, sem chave: ~10 req/min por IP).
module.exports = async (req, res) => {
  const id = (req.query.deezer || '').toString().replace(/\D/g, '');
  if (!id) return res.status(400).json({ error: 'deezer obrigatório' });
  try {
    const r = await fetch('https://api.song.link/v1-alpha.1/links?platform=deezer&type=album&id=' + id, { headers: { 'User-Agent': 'poster-generator' } });
    if (!r.ok) return res.status(r.status === 429 ? 429 : 404).json({ error: 'não encontrado' });
    const j = await r.json();
    const sp = j.linksByPlatform && j.linksByPlatform.spotify;
    const m = sp && (sp.url || '').match(/album\/([A-Za-z0-9]{22})/);
    if (!m) return res.status(404).json({ error: 'sem Spotify' });
    res.setHeader('Cache-Control', 's-maxage=604800');
    res.json({ spotifyId: m[1], url: 'https://open.spotify.com/album/' + m[1] });
  } catch (e) { res.status(502).json({ error: 'falha' }); }
};
