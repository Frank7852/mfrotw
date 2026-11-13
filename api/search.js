module.exports = async (req, res) => {
  const q = (req.query.q || '').toString().slice(0, 120);
  if (!q) return res.status(400).json({ error: 'q obrigatório' });
  try {
    const r = await fetch('https://api.deezer.com/search/album?limit=8&q=' + encodeURIComponent(q));
    const j = await r.json();
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.json((j.data || []).map(a => ({ id: a.id, title: a.title, artist: a.artist && a.artist.name, thumb: a.cover_medium })));
  } catch (e) { res.status(502).json({ error: 'falha ao buscar' }); }
};
