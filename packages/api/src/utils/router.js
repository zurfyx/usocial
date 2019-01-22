const ok = (res) => res.json({ message: 'OK' });
const err400 = (res, error) => res.status(400).json({ error })

module.exports = {
  ok,
  err400,
};
