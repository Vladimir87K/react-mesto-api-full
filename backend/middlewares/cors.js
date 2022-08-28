// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // Если это предварительный запрос, добавляем нужные заголовки
  if (req.headers) {
    res.header('Access-Control-Allow-Origin', '*');
  } else if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  next();
};

module.exports = cors;
