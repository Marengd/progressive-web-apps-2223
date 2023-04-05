# Progressive Kanye West Quote App
Unleash Kanye's Wisdom.

<img src="/docs/imgs/readme-header-image.jpg" alt="Close – up van een mobiele telefoon omringd door duisternis met de tekst Kanye West, Word of Wisdom Generator op het scherm." width="100%">

This is the repository of <a href="https://danianmarengo.nl">Danian Marengo</a> for his Kanye West word of wisdom generator. This website was created for the project <a href="https://github.com/cmda-minor-web/progressive-web-apps-2223">Progressive Web Apps</a>, which is part of the <a href="https://github.com/cmda-minor-web">Minor Web Design and Development 2022 en 2023</a> at the <a href="https://www.hva.nl/">Amsterdam University of Applied Sciences</a>, as part of the program <a href="https://www.hva.nl/opleidingen/communication-and-multimedia-design?gclid=Cj0KCQiAgaGgBhC8ARIsAAAyLfFCp5OTcBLGcx-_uMWa2sowONOebB19jLA1KMt2yEmVFGWaHdsi9DwaAq0PEALw_wcB">Communication and Multimedia Design.</a>

<br>

## Beschrijving
Deze geüpdatete website is ontwikkeld met behulp van Node.js en Express, en is overgegaan van een volledig client-side gerenderde applicatie naar een server-side gerenderde progressive Web App.

De oorspronkelijke versie, gemaakt voor de cursus 'Web App From Scratch', maakte gebruik van vanilla JavaScript zonder frameworks zoals Angular, React of Vue. Het doel van deze nieuwe versie is om de webapplicatie te verbeteren door server-side rendering toe te passen en het om te zetten in een Progressive Web App.

<br>

## Aan de slag
Je moet Node.js en Node Package Manager op je machine geïnstalleerd hebben, dit zijn onze enige afhankelijkheden om het project lokaal te kunnen draaien.

<br>


```shell
# Kloon de repository.
Git clone https://github.com/Marengd/progressive-web-apps-2223.git

# Navigeer naar de gekloonde projectfolder.
Cd progressive-web-apps-2223

# Installeer de projectafhankelijkheden.
Npm install

# Bouw het project voor implementatie.
Npm run build

# Start de projectserver.
Npm run start
```
<br>
<br>

## Mijn progressive web- app
In dit hoofdstuk zal ik uitgebreid ingaan op de features en Browser Technologies die zijn gebruikt in de enquête en hoe Progressive Enhancement is toegepast. Ik zal inzicht geven in hoe deze elementen zijn ingezet om een optimale gebruikerservaring te creëren.

<br>
<br>

## Server- side rendering
Server Side Rendering is een techniek waarbij de HTML van een webpagina op de server gegenereerd wordt en vervolgens naar de client gestuurd wordt, in tegenstelling tot Client Side Rendering, waarbij de HTML op de client door JavaScript gegenereerd wordt. Het verschil tussen beide technieken is dat bij Server Side Rendering de pagina sneller geladen wordt omdat de browser de HTML direct ontvangt en hoeft te renderen, terwijl bij Client Side Rendering de browser eerst JavaScript moet uitvoeren om de HTML te genereren en te renderen. 

Server Side Rendering is beter omdat het de snelheid van de pagina verbetert, zorgt voor betere zoekmachine- optimalisatie en een betere gebruikerservaring, vooral op apparaten met beperkte prestaties.

<br>

### Van client- naar server- side rendering
Het renderen van de lijst met alle quotes op alfabetische volgorde was een cruciale stap in het verbeteren van de gebruikerservaring van mijn applicatie. Voorheen werd deze lijst client- side gerenderd door middel van JavaScript. Dit betekende dat de gebruiker wachtte totdat de volledige lijst was geladen en verwerkt voordat ze de quotes kon bekijken. 

<br>

<details>
  <summary> <h3>Van client- naar server- side rendering </h3> </summary>


  ### 1. De client- side
  Voorheen renderende ik de quotes in het bestand "displayAllquotes.js" door middel van JavaScript. Ik gebruikte hiervoor een aantal modules, zoals helper.js en fetchQuotes.js Ik haalde de quotes op via een 'Promise.all' en sorteerde ze vervolgens op alfabetische volgorde. Hierdoor werd elke quote gegroepeerd per letter en weergegeven in de HTML- pagina.

```shell
  import { $ } from "./helper.js";
  import { quotePromises } from './fetchQuotes.js';
  import { loading, loaded } from './states.js';

  loading();
  displayQuotes();

  let currentLetter = '';
  let currentDetails = null;

  async function displayQuotes() {
  const loader = $('#loader');
  const quoteList = $('#quote-list');

  if (!quoteList) {
  console.log("Error: Could not find the 'quote list'");
  return;
  }

  const quotes = await Promise.all(quotePromises);
  const quotesSet = new Set(quotes);

  loader.classList.add('active');

  Array.from(quotesSet).sort().forEach((quote) => {
  const startingLetter = quote.charAt(0).toUpperCase();

  if (startingLetter !== currentLetter) {
    if (currentDetails !== null) {
      quoteList.appendChild(currentDetails);
    }

    currentDetails = document.createElement('details');
    const summary = document.createElement('summary');
    const ul = document.createElement('ul');
    summary.textContent = `${startingLetter}`;
    currentDetails.appendChild(summary);
    currentDetails.appendChild(ul);

    currentLetter = startingLetter;
  }

  const li = document.createElement('li');
  li.textContent = quote;
  li.addEventListener('click', () => {
    console.log(li.textContent);
    alert(li.textContent);
  });
  currentDetails.querySelector('ul').appendChild(li);

  });

  if (currentDetails !== null) {
  quoteList.appendChild(currentDetails);
  }

  loaded();
  }

```

<br>

  ### 2. De server- side
  Tegenwoordig render ik de quotes op de server met behulp van Node.js en ejs. In plaats van JavaScript te gebruiken, gebruik ik een template om de quotes op de server te renderen en weer te geven aan de gebruiker. De quotes worden nog steeds gegroepeerd per letter en weergegeven in HTML- tags, maar worden dit keer op de server gegenereerd en opgehaald.

  ``` shell
  <% for (const letter in groupedQuotes) { %>
  <details>
      <summary>
        <%= letter %>
      </summary>
      <ul>
        <% groupedQuotes[letter].forEach((quote, index)=> { %>
            <li>
              <a href="/quote-detail/<%= index %>">
                  <%= quote %>
              </a>
            </li>
            <% }); %>
      </ul>
  </details>
  <% } %>
  ```


<br>

</details>

## Tooling
In deze stap heb ik de tooling geïnstalleerd en geïmplementeerd voor mijn Progressive Web App. Ik heb gekozen voor een workflow met NPM scripts, omdat dit een beproefde manier is om de bouw van de app te automatiseren en te optimaliseren.

<br>

### Webpack, implementeren als tooling
Webpack is een tool die gebruikt wordt om verschillende soorten code te bundelen, zoals CSS en JS. Hierdoor wordt de code sneller geladen door de browser. En blijft de code voor jou overzichtelijk.

<br>


###### Stappenplan

<details>

  <summary><h3>Het implementeren van Webpack</h3></summary>

  ### 1. Installatie

  Ik ben van start gegaan met het installeren van webpack en de benodigdheden, door het volgende commando uit te voeren.
  ```shell
  # Webpack installeren en opslaan in Developer omgeving.
  $ Npm install webpack webpack-cli mini-css-extract-plugin css-loader style-loader --save-dev
  ```

  <br>


  ### 2. Opzetten

  Vervolgens heb ik op dezelfde hoogte van mijn 'root' een bestand aangemaakt genaamd 'webpack.config.js'. Dit is het configuratie
  bestand waarin je specificeert hoe de CSS en JS gebundeld en gecomprimeerd moet worden.

  ```shell
  # Het bestand wepkac.config.js aanmaken.
  $ Touch webpack.config.js
  ```

  <br>

  ### 3. Configureren
  Daarna ben ik aan de slag gegaan met het configureren van mijn 'webpack.config.js' hierin wordt bepaalt hoe webpack de inhoud van uw project moet verwerken en bundelen.

  <br>

  ```bash
  # Importeer de "path" module van Node.js
  const path = require("path");

  # Importeer de "MiniCssExtractPlugin" van mini-css-extract-plugin
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  ```

  <br>

  ```shell
  # Bepaal of de modus "development" of "production" is.
  const mode = process.env.NODE_ENV || 'development';
  ```

  <br>

  ```shell
  # Export de configuratie voor webpack.
  module.exports = {
    mode,
    # Bepaal welke bestanden als invoerpunt moeten worden gebruikt.
    entry: {
      main: '/public/js/app.js',
      'custom-properties': '/public/css/custom-properties.css',
      reset: '/public/css/reset.css' // Voeg 'reset.css' als invoerpunt toe.
    },
    # Bepaal waar de uitvoerbestanden naartoe moeten worden opgeslagen en hoe ze moeten worden genoemd.
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: '[name].bundle.js',
      publicPath: '/dist/'
    },
    # Bepaal hoe de regels voor de modules moeten worden toegepast.
    module: {
      rules: [
        {
          # Als het bestand eindigt op .css, gebruik de MiniCssExtractPlugin en de css-loader.
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          # Als het bestand eindigt op .woff of .woff2, behandel het als een asset/resource.
          test: /\.(woff|woff2)$/,
          type: 'asset/resource'
        }
      ]
    },
  ```

  <br>

  ```shell
    # Bepaal welke plugins moeten worden gebruikt.
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  };
  ```
<br>
<br>

### 3. Implementeren
Vervolgens heb ik in plaats van de traditionele manier van het linken van stylesheets en javascript bestanden door middel van <link> en <script> tags, heb ik deze vervangen door links naar de gebundelde bestanden die door webpack zijn gegenereerd.

<br>

```shell
# Stylesheet link, naar webpack.
<link rel="stylesheet" href="/dist/main.css">
````

```shell
# JavaScript link, naar webpack.
<script src="/dist/main.bundle.js" defer></script>
```
<br>
<br>

### 4. Lanceren
Tot slot heb ik in de package.json van de applicatie de volgende scripts toegevoegd om de tooling van de applicatie uit te voeren. Waardoor met het commando 'npm run build' Webpack zal worden uitgevoerd en de benodigde bestanden worden gebundeld en opgeslagen in de public dist map.

```shell
# Script toegevoegd aan package.json.
"scripts": {
    "build": "webpack"
  },
```

```shell
# Webpack uitvoeren en benodigde bestanden bundelen en opslaan.
Npm run build
```

</details>

<br>
<br>








## Converteren
In deze stap heb ik een installeerbare versie van mijn Progressive Web App gemaakt en een service worker geïmplementeerd.

<br>

### Het implementeren van, een Service Worker
Een Service Worker is een script dat op de achtergrond van een progressive web application draait en de mogelijkheid biedt om bepaalde taken uit te voeren, zelfs als de gebruiker de app niet op dat moment gebruikt. Deze taken omvatten bijvoorbeeld het laden en opslaan van assets, zoals afbeeldingen, in de cache, zodat ze sneller beschikbaar zijn wanneer de gebruiker de app opent.


<br>

### Service Worker afstemmen op de wens van de gebruiker
Een User Story is een korte, eenvoudige beschrijving van een vereiste of wens van de gebruiker van een product of systeem. Een User Story kan helpen om de wensen van de gebruiker op een gestructureerde en begrijpelijke manier vast te leggen.

<br>

### Wens van de gebruiker
Als een "fan" die geïnspireerd wil blijven door Kanye West zijn "inspirerende spreuken", wil ik alle spreuken kunnen bekijken in een lijst, zelfs wanneer mijn internetverbinding instabiel of niet- bestaand is.

Als ik op een spreuk klik, wil ik worden doorgestuurd naar een detailpagina waar de spreuk wordt weergegeven. Ik wil ook op de hoogte worden gesteld van mijn online en of offline status, zodat ik een vloeiende ervaring kan hebben.

<br>


###### Stappenplan
<details>

  <summary><h3>Het implementeren van een Service Worker</h3></summary>

### 1. Installatie
Om van start te gaan ben ik begonnen met het aanmaken van het bestand 'service-worker.js' in de map public js.


```shell
# Het bestand service-worker.js aanmaken in de map public js.
$ touch public/js/service-worker.js

```

<br>

### 2. Configureren

Vervolgens heb ik een partial gemaakt met de naam 'footer', die het volgende script bevat om de service worker in de browser te registreren, waardoor bepaalde onderdelen van de webapp offline kunnen worden gebruikt.


```shell
# Het registreren van de service worker.

# Controleer of de service worker ondersteund wordt in de huidige browser
if ('serviceWorker' in navigator) {
  
  # Voeg een event listener toe aan het laden van de pagina
  window.addEventListener('load', () => {
    
    # Registreer de service worker op de specifieke locatie
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {

        # Update de service worker wanneer deze verandert
        return registration.update();
      })
  });
}

```

### 3. Instellen
Vervolgens heb ik een partial gemaakt met de naam 'footer', die het volgende script bevat om de service worker in de browser te registreren, waardoor bepaalde onderdelen van de webapp offline kunnen worden gebruikt.


```shell
# Definieer de cache-naam voor de service- worker.
const cacheName = 'kanye-west-quote-generator-app-cache';
```

```shell
# Lijst met assets om te cachen.
const urlsToCache = [
  '/',
  '/offline',
]
```

```shell
# Installeer de event-listener voor de service- worker.
self.addEventListener('install', (event) => {
  console.log('Service Worker: geïnstalleerd');

 # Cache de assets tijdens het installatieproces.
  event.waitUntil((async () => {
    try {
      # Open de cache met de opgegeven cache- naam.
      const cache = await caches.open(cacheName);
      console.log('Cache geopend.');
      
      # Voeg de assets toe aan de cache.
      const cacheResult = await cache.addAll(urlsToCache);
      console.log('URLs gecached:', urlsToCache);
      return cacheResult;
    } catch (error) {
      console.error('Cache Add All fout:', error);
    }
  })());
});
```

```shell 
# Activeer de event-listener voor de service- worker.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Geactiveerd');
  # Maak de oude caches op tijdens het activatieproces.
  event.waitUntil((async () => {
    # Haal de lijst van cache-namen op.
    const cacheNames = await caches.keys();
    return Promise.all(
      # Verwijder caches die niet de huidige cache zijn.
      cacheNames.filter((thisCacheName) => thisCacheName !== cacheName)
        .map((cacheName) => {
          console.log('Service Worker: Cache verwijderen ', cacheName);
          return caches.delete(cacheName);
        })
    );
  })());
});
```

```shell
# Fetch event-listener voor de service- worker.
self.addEventListener('fetch', (event) => {
  # Beantwoord fetch-events met een gecached antwoord of een netwerkverzoek.
  event.respondWith((async () => {
    try {
      # Probeer een gecached antwoord te vinden voor het verzoek.
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      # Als de response niet in cache is, voer een netwerkverzoek uit.
      const networkResponse = await fetch(event.request);

      # Als we een geldige response hebben ontvangen, cache deze en retourneer hem.
      if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
        const responseToCache = networkResponse.clone();
        const cache = await caches.open(cacheName);
        cache.put(event.request, responseToCache);
        return networkResponse;
      }

      # Als de response niet geldig is, retourneer deze zonder te cachen.
      return networkResponse;
    } catch (error) {
      # Als er een netwerkfout optreedt, serveer de offline pagina voor alle verzoeken.
      return caches.match('/offline');
    }
  })());
});
```
</details>

<br>

## Service worker uitgewerkt als Activity Diagram
Een activity diagram is een soort diagram die vaak voorkomt in de softwareontwikkeling, en heeft als functie om de stroom van activiteiten of taken te visualiseren die een systeem of proces uitvoert. Voor Front End Developers kan een activity diagram bijvoorbeeld worden gebruikt om de interacties van gebruikers met een website of applicatie te visualiseren, inclusief de verschillende acties die ze kunnen uitvoeren en de verschillende schermen die ze kunnen zien.

Dit kan helpen bij het plannen en ontwerpen van de gebruikerservaring en de functionaliteit van de applicatie.

<br>

[Uitwerking Activitiy Diagram](/docs/imgs/readme-lighthouse-results.jpg)


<br>
<br>



## Het optimaliseren van het Critical Rendering Path
Het verbeteren van de snelheid waarmee de content van een webpagina wordt geladen en weergegeven aan de gebruiker. Dit omvat het verminderen van de hoeveelheid data die nodig is om de pagina te laden, het verbeteren van de manier waarop de browser deze data verwerkt en het verminderen van de tijd die nodig is om de pagina te renderen en weer te geven aan de gebruiker.

<br>

### Optimaliseren voor het ophogen van mijn beoordeling
Bij het optimaliseren van het Critical Rendering Path streefde ik ernaar om mijn beoordeling in 'lighthouse' op 100 te krijgen, door deze vier belangrijke categorieën te verbeteren perceived load speed, load responsiveness, runtime responsiveness en visual stability. Ik leg uit hoe ik dit heb bereikt.

<br>

###### Categorie 1

<details>

<summary> <h3> Perceived load speed </h3> </summary>

<ul>

<blockquote>
  Door de JPEG te veranderen in webM wordt de grootte van de afbeelding verminderd, waardoor de pagina sneller geladen kan worden. 
</blockquote> 

<br>
  
<blockquote>
Door CSS te minifyen, wordt de grootte van de CSS bestanden verminderd, waardoor de pagina sneller geladen kan worden.
</blockquote>

  <br>

<blockquote>
  Door assets te cachen, worden ze sneller beschikbaar wanneer de gebruiker de pagina opent, waardoor de tijd nodig om de pagina te laden verminderd wordt. 
</blockquote>

</details>

###### Categorie 2

<details>

<summary> <h3> Load Responsiveness </h3> </summary>

<ul>

<blockquote>
  Door een meta desc te toevoegen voor zoekmachineoptimalisatie, wordt de vindbaarheid van de pagina verbeterd, waardoor de laadtijd van de pagina sneller wordt, wat bijdraagt aan een betere gebruikerservaring.
</blockquote>

<br>

<blockquote>
  Door het minifyen van CSS wordt de grootte van de CSS bestanden verkleind, wat de browser sneller de CSS bestanden laat verwerken en het JavaScript sneller uitgevoerd kan worden, verbetert dit de laadsnelheid en responsiviteit van de pagina.
</blockquote>

</details>


###### Categorie 3

<details>

<summary> <h3> Runtime Responsiveness </h3> </summary>

  <blockquote>
    Door "display swap" toe te voegen aan de font face regels, verbetert de prestaties van de lettertypen en wordt ervoor gezorgd dat de pagina sneller op gebruikersinteracties reageert.
  </blockquote>

</details>

###### Categorie 4

<details>

<summary> <h3> Visual Stability </h3> </summary>

  <blockquote>
    Door het toevoegen van een theme color, heb ik ervoor gezorgd dat de pagina een consistente visuele stijl heeft. Hierdoor verschuiven elementen op de pagina niet onverwacht en is de gebruikerservaring verbeterd.
  </blockquote>

</details>


###### Categorie 5

<details>

<summary> <h3> Smoothness </h3> </summary>

  <blockquote>
    Ik heb assets gecached, waardoor ze sneller beschikbaar waren voor de gebruiker bij het openen van de pagina. Hierdoor verliepen de overgangen en animaties soepeler en werd het gevoel van een fluide overgang vergroot.
  </blockquote>

</details>

<br>

### Optimaliseren voor het gewenste resultaat
Door het optimaliseren van deze vier belangrijke categorieën, heb ik mijn doel behaald om mijn beoordeling in 'lighthouse' op 100 te krijgen. Ik leg uit hoe ik dit heb bereikt door te verbeteren van perceived load speed, load responsiveness, runtime responsiveness en visual stability.
<br>

<img src="/docs/imgs/readme-lighthouse-results.jpg" alt="Een score van 100, voor de prestaties, toegankelijkheid, praktische tips en SEO." width="100%">

<br>
<br>










## Credits
<ul>
  <li>https://kanye.rest/</li>
</ul>

<br>

## Miscellaneous
Follow Danian Marengo, <a href="https://www.danianmarengo.nl">Website</a>

<br>

## License
<a href="https://github.com/Marengd/kwoot/blob/main/LICENSE"> Mit</a>
<br>
By Danian Marengo