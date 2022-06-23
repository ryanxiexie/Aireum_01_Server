const logger = require('../util/logger');
const { logsRef } = require('../util/fbLoggerAdmin');

const callLogger = (req, res) => {
  const { level, message, label } = req.query;

  logger.log({
    label: label,
    level: level,
    message: message,
  });

  res.json({ message: 'logging successfully' });
};

module.exports = { callLogger };
