const env = 'development';

let url;
if (env === 'production') url = '';
else url = 'http://localhost:3001';

export { url };