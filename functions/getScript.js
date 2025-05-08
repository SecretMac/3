const fs = require('fs');

exports.handler = async (event, context) => {
  const userAgent = event.headers['user-agent'] || '';
  const referer = event.headers['referer'] || event.headers['referrer'] || '';

  // Block if not from Roblox or has Referer (browser requests)
  if (!userAgent.includes('Roblox') || referer) {
    return {
      statusCode: 403,
      body: 'Access denied',
    };
  }

  // Get script name from query parameter
  const scriptName = event.queryStringParameters.script || 'leak.lua';

  // Access the script file (included via included_files)
  try {
    const scriptContent = fs.readFileSync(scriptName, 'utf8');
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
