exports.handler = async (event, context) => {
  const userAgent = event.headers['user-agent'] || '';
  const referer = event.headers.referer || event.headers.referrer || '';

  // Block browsers, allow Roblox
  if (!userAgent.includes('Roblox') || referer) {
    return {
      statusCode: 403,
      body: 'Access denied',
    };
  }

  // Serve the script
  const fs = require('fs');
  const path = require('path');
  const scriptName = event.queryStringParameters.script || 'leak.lua';
  const scriptPath = path.join(__dirname, '../', scriptName);

  try {
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: scriptContent,
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: 'Script not found',
    };
  }
};
