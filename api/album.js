module.exports = async (req, res) => {
  const id = (req.query.id || '').toString().replace(/\D/g, '');
  if (!id) return res.status(400).json({ error: 'id obrigatório' });
  try {
    const [a, t] = await Promise.all([
      fetch('https://api.deezer.com/album/' + id).then(r => r.json()),
      fetch('https://api.deezer.com/album/' + id + '/tracks?limit=100').then(r => r.json())
    ]);
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.json({
      title: a.title, artist: a.artist && a.artist.name, cover: a.cover_xl || a.cover_big,
      date: a.release_date, duration: a.duration, tracks: (t.data || []).map(x => x.title)
    });
  } catch (e) { res.status(502).json({ error: 'falha ao carregar álbum' }); }
};
