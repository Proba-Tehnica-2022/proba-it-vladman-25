# Proba Tehnica IT - Backend

Am implementat toate task-urile + cel bonus si bonus aditional (veti afla mai tarziu)

## Rulare

In folderul frontend veti rula urmatoarele comenzi (cred/sper)

### `npm i nodemon express mongoose cors`
### `npm i body-parser bcrypt jsonwebtoken fs formidable`

### `npm start`

Se deschide aplicatia pe portul 5000

## Tehnlogii

Am folosit Node.js, MongoDB, Mongoose

## Task-uri implementate

### 1. DB Schema

In folderul /models veti gasi schemele pentru enitatile din Mongo

### 2. CRUD

In folderul /routes, respectiv meme.routes.js se vor afla implementarile pentru cererile http
Am reusit sa leg backend-ul si frontend-ul deci unele cereri vor fi testate cu Postman-formdata
sau direct din frontend. Insa, cererile de patch si delete au ramas default, testandu-se cu Postman 'x-www-blabla'
deoarece nu exista functionalitatea implementata in frontend.

### 3. Register/ Login

De asemenea, sunt legate la frontend. Se testeaza tot cu formdata sau din frontend. Register retine parola criptata in
baza de date. Login verifica parola criptata cu parola data si daca e corecta genereaza un JWT format din
username-ul sau. Se transmit si mesajele corecte in cazul inputului gresit


### 4. Input validation

Se verifica toate cerintele si se trimit mesajele corespunzatoare.

### 5. Protected endpoints

Pentru cererile de post, patch si delete de la meme-uri, se va trece prin middleware, unde se verifica
daca cererea are atasata un JWT (este autentificatr in vreun fel). Ulterior pentru patch si delete,
verificam in meme-routes daca poza apartine utilizatorului logat.

### 6. File Upload

Fisierele sunt copiate in localstorage in backend, in folderul uploads (care este public).
Acestea sunt salvate ca id + extensie, iar acest path este retinut si in baza de date.
Acum ca ma gandesc, nu cred ca functioneaza pentru altceva decat ".png" deoarece salvez doar cu extensia asta.

### 7. My Bonus - Legare Frontend si Backend

A trebuit sa adaug autorizarea cererilor prin anumite campuri din header ca sa poata functiona (vezi in index.js)
Am transformat si cererie care initial erau de forma 'x-www' in 'formdata'.
Pe partea de frontend, se va face la inceput o cerere de get pentru meme-uri, iar apoi la sectiunea
Most Viewed vor aparea toate meme-urile din baza de date.

