# Anwendung

Eine streaming Anwendung mit NodeJS (ffmpeg) als Backend und VUEjs als Frontend

# Voraussetzung 
  - NodeJS
  - ffmpeg

# Backend
## Installation
Folgende befehle in der Console ausführen.

    cd streaming-backend
    npm install
    npm start

Es wird ein NodeJS Server hochgefahren , der auf den Port 3000 lauscht.

## API
    localhost:3000/api/video/stream

Es wird eine Videodatei, die sich im Ordner `res/media` befindet gestreamt.

Der Dateiname ist noch Hardgecodet und es wird eine Datei `Preception.mp4` erwartet.

### zum Debuggen
    DEBUG=streaming-backend:* npm start

# Frontend

```
   cd streaming-app
   npm install
   npm run dev
```

Es wird eine Webpack Applikation gestartet, die unter der URL `http://localhost:8080` zu finden ist.


Die Applikation ist ein VUEjs anwendung.

## Hinweis
Da verschiede Origins benutzt werden, kann es zu einer `Access-Control-Allow-Origin` Fehlermeldung kommen.
Dazu als Workaround das Plugin CORS für Chrome installieren und bei `Access-Control-Expose-Headers` eine Wildkard `*` setzen.
 

