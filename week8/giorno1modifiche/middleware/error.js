function notFound(req, res, next) {
  res.status(404).json({ error: 'Not found' });
}

function errorHandler(err, req, res, next) {
  console.error('[ERR]', err); // unico log “rumoroso” consentito
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };
