# Momentum - Anti Procrastinator App

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG9jbmRlOHA2ZTh0NHpkaHF0NDRjZmFjb3Q3MW9zYmdqMTlycGtmeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ENoMhjnIOiZMs/giphy.gif)

En webbapplikation designad för att hjälpa användaren sluta att prokrastinera genom att bryta ner uppgifter i hanterbara steg.

## Funktioner

- Bryt ner uppgifter steg-för-steg 
- Välj önskad detaljnivå (enstaka steg, flera steg eller omfattande detaljerad nedbrytning)
- Redigera och förfina din handlingsplan enkelt
- Rent, intuitivt gränssnitt utan distraherande element

## Teknikstack

- **Frontend**: React med Emotion (för styling) och React Router
- **Backend**: Node.js med Express för API-endpoints
- **AI-integration**: OpenAI API (GPT-4 Turbo) för intelligent nedbrytning av uppgifter

## Installation

### Förutsättningar

- Node.js (v18 eller senare)
- npm eller yarn
- OpenAI API-nyckel

### Konfiguration

coming soon

## Användning

1. Ange den uppgift du behöver hjälp att komma igång med
2. Specificera när du vill börja
3. Lägg till eventuell ytterligare information om utmaningar eller begränsningar
4. Välj önskad detaljnivå för uppgiftsnedbrytningen
5. Klicka på "Generera plan" för att få din personliga handlingsplan
6. Använd redigeringsfunktionen om du behöver förfina eller justera planen

## API-struktur

Applikationen använder två huvudsakliga API-endpoints:

- `/api/generate-plan`: Skapar en ny handlingsplan baserad på användarens input.
- `/api/edit-plan`: Redigerar en befintlig plan baserad på användarfeedback.

## Deployment

Applikationen är konfigurerad för deployment på Vercel. För att deploya:

1. Anslut ditt GitHub-repository till Vercel.
2. Lägg till din `OPENAI_API_KEY` som en miljövariabel i Vercel-projektinställningarna.
3. Deploya projektet.

## Licens

Detta projekt är licensierat under MIT-licensen - se LICENSE-filen för detaljer.
## Erkännanden

- [OpenAI](https://openai.com/) för AI-backend
- [React](https://reactjs.org/) och [Vite](https://vitejs.dev/) för frontend-ramverket
- [Emotion](https://emotion.sh/) för stylinglösningen
