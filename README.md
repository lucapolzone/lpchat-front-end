# LPChat

## Descrizione
Pensata come un “Minimum Viable Product”, è una web app di messaggistica in tempo reale con form di login, una dashboard dove vedere gli utenti registati e dove è possibile aprire una chat-room con loro. Nella dashboard è anche possibile vedere tramite notifica se ci sono messaggi ricevuti non ancora letti.


## Indice

- [Features](#features)
- [Back-end](#back-end)
- [Front-end](#front-end)
- [Stato attuale del Front-end](#stato-attuale-del-front-end)
- [Configurazione e inizializzazione](#configurazione-e-inizializzazione)


## Stack del progetto
![Laravel](./img_readme/laravel.svg)
![Vite](./img_readme/pusher.svg)
![Vue](./img_readme/vue.svg)
![Vite](./img_readme/pinia.svg)
![Vite](./img_readme/vite.svg)

## Features
<b>1. Autenticazione e gestione utenti</b>
- Login e registrazione utenti (registrazione, login, gestione sessioni). 
<br/><br/>

<b>2. Dashboard e chat-room</b><br/>
- Dashboard principale per visualizzare le chat-room con gli utenti.
- Badge di notifica accanto a ogni conversazione per mostrare quanti messaggi non letti ci sono.<br/><br/>

<b>3. Messaggistica e notifiche</b>
- Scambio di messaggi in tempo reale.
- Notifiche push in tempo reale che informano gli utenti quando arrivano nuovi messaggi.<br/><br/>

## Back-end
<b>1. Laravel:</b>
- Fornirà il backend dell'applicazione con le <b>API Resources</b> per utenti, conversazioni, notifiche e messaggi.
- Gestirà l'autenticazione degli utenti e la validazione dei dati.
- Si occuperà di archiviare i messaggi nel database.<br /><br />

<b>2. Pusher</b>
- Pusher si occuperà di propagare in tempo reale gli eventi relativi ai nuovi messaggi e alle notifiche, inviando gli aggiornamenti al front-end.

## Front-end
<b>1. Vue</b>
- I componenti Vue saranno sviluppati con la sintassi <b>Composition API</b> e il progetto sarà configurato tramite <b>Vite</b> per lo scaffolding.<br /><br />

<b>2. Pinia</b>
- Pinia verrà utilizzato per gestire lo stato globale dell'applicazione. Ci sarà uno store che contiene i dati relativi ai messaggi, le notifiche e le conversazioni.
-	Verrà usato <b>Pinia Plugin PersistedState</b> per mantenere lo stato della chat anche dopo un aggiornamento della pagina, mantenendo i messaggi e le notifiche persistenti.<br /><br />

<b>3. Pusher:</b>
-	Pusher verrà configurato per ricevere gli eventi dal back-end (invio di un nuovo messaggio e notifiche in dashboard). Quando gli eventi saranno ricevuti, verrà aggiornato lo store di Pinia per mantenere i dati sincronizzati.
-	Quando Pinia aggiornerà lo stato, ciò aggiornerà automaticamente i componenti, senza dover ricaricare la pagina.<br /><br />


## Stato attuale del Front-end
![Work In Progress](./img_readme/work-in-progress.png)

<br /> 

> <br /> 
> Grazie a Vue Router è possibile navigare tra le pagine della web app.
> <br /><br /> 

<br /> 


### 1. Pagina Login
- È presente un form di login ma al momento è statico e non è collegato al back-end.

### 2. Dashboard
- È collegata a <b>GET | /api/conversations</b> e sono stampati a schermo una lista di utenti e le conversazioni attive che rimandano alle chat-room.

### 3. Chat-Room
- È collegata a <b>GET | api/messages/{conversationId}</b> e sono stampati a schermo i messaggi e gli utenti della chat-room.

<br />

In generale, va terminata la configurazione di:
- <b>Pinia store</B>, per l'aggiornamento dello stato globale (autenticazione, messaggi, notifiche). 
- <b>Pusher</b> per la ricezione dell'evento dal back-end.
- Registrazione e Login per gli utenti.

<br />

# Configurazione e inizializzazione
<br />

> <br /> 
> Devi prima aver avviato il progetto <b>lpchat-back-end</b> per le chiamate API
> <br /><br /> 

<br />


1. **Clona la repository e naviga nella cartella del progetto:**

   ```sh
   cd lpchat-front-end
   ```

2. **Installa le dipendenze:**

   ```sh
   npm install
   ```

3. **Per avviare il progetto in modalità di sviluppo, esegui:**

   ```sh
   npm run dev
   ```
   Questo comando avvierà il server di sviluppo e aprirà l'applicazione nel browser.

<br />
