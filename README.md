Project name: chatApp-sockets
Kurs: Systemstöd och integration med 3-partssystem

# Chat App med React, Socket.io och Express - README

Välkommen till Chat App-projektet! Denna applikation använder sig av React för användargränssnittet, Socket.io för realtidskommunikation och Express som server. Med denna applikation kan användare skicka meddelanden i realtid till varandra i en chattmiljö.

## Instruktioner för installation och körning

Följ dessa steg för att hämta och köra projektet lokalt på din dator:

### Förutsättningar

Innan du börjar måste du se till att följande är installerat på din dator:

- [Node.js](https://nodejs.org/)
- En webbläsare 



### Steg 1: Klona projektet

Öppna en terminal och navigera till en mapp där du vill placera projektet. Kör sedan följande kommando för att klona projektet från GitHub:


git clone https://github.com/heinanX/chatApp-sockets.git



### Steg 2: Installera dependencies

Öppna en terminal (ctrl + J) och navigera in i server-mappen genom att köra:

- cd server

- Kör sedan följande kommando för att installera de nödvändiga dependencies för servern:

- npm install


Öppna en till terminal (ctrl + J) och navigera in i client-mappen genom att köra:

- cd client

- Kör sedan följande kommando för att installera de nödvändiga dependencies för clienten:

- npm install


Detta kommer att installera alla dependencies som behövs för både Express-servern och React-klienten.



### Steg 3: Starta servern och klienten

Använd de två öppna terminalerna och skriv i respektive termenal:

**Terminalfönster 1 (Servern):**

npm start

Servern kommer att köras på port 3000 som standard. Om du vill använda en annan port kan du ändra detta i `server.js`-filen.

**Terminalfönster 2 (Klienten):**

npm run dev

Skriv sedan `o` i terminalen så öppnas applikationen i din standardwebbläsare på http://localhost:5173/ (alt. klicka på länken medans du håller ner `ctrl`-knappen)



### Steg 4: Använd Chat App

Nu när både servern och klienten är igång kan du använda `Chat DeFudge App` för att skicka och ta emot meddelanden i realtid! Skriv in ditt användarnamn och skapa eller välj en chatt att ansluta till. Du kan öppna flera flikar eller fönster i din webbläsare för att simulera flera användare och se realtidsmeddelandena.

## Anpassning och vidareutveckling

Detta projekt är en grundläggande implementation av en chattapplikation med React, Socket.io och Express. Du kan anpassa och vidareutveckla den genom att lägga till fler funktioner som användarautentisering, möjlighet att skapa privata chattrum, emoji-stöd osv.



Lycka till! 🚀