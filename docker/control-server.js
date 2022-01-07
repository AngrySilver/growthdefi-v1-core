const http = require('http');
const child_process = require('child_process');

const port = 8546;
const timeout = 1 * 60 * 60 * 1000;

let busy = false;

const server = http.createServer((request, response) => {

  console.log(new Date().toISOString(), request.url);

  if (request.method == 'POST') {
    if (request.url == '/restart') {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      if (busy) {
        response.end('Server already restarting\n');
        return;
      }
      busy = true;
      child_process.exec('docker restart ganache-cli', (error, stdout, stderr) => {
        if (error) {
          response.end(stderr);
          console.log(stderr);
          busy = false;
          return;
        }
        child_process.exec('npm run deploy', (error, stdout, stderr) => {
          if (error) {
            response.end(stderr);
            console.log(stderr);
            busy = false;
            return;
          }
          response.end(stdout);
          console.log(stdout);
          busy = false;
        });
      });
    }
  }

});
server.setTimeout(timeout);
server.listen(port, () => console.log('Server running at http://localhost:' + port + '/'));
