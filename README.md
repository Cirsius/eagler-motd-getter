## eagler motd getter

simple page to query eaglercraft servers for their motd and icon

### how it works

connects to an eaglercraft server websocket and sends `Accept: MOTD`, then receives the json motd response, then the binary arraybuffer which is the server icon as raw rgba pixel data. then it draws it into a canvas using `putImageData`