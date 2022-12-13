# Proba Tehnica IT - Frontend

Am urmarit cat se poate de mult design-ul de pe figma iar pe partea de responsive 
am mai cerut parerea mentorului si am mai intuit modificarile aduse.

## Rulare

In folderul frontend veti rula urmatoarele comenzi (cred/sper)

### `npm i react-scripts axios local-storage sass`

### `npm start`

Se deschide aplciatia in browser la adresa [http://localhost:3000](http://localhost:3000)

## Tehnlogii

Am folosit React si SASS. Formularele sunt trimise catre backend prin Axios.

## Task-uri implementate

### 1. Navbar

Este fixat sus, are cele 2 butoane. Pe ecrane mai mici, cele 2 butoane sunt inlocuite de 
unul singur care dupa apasare vor aparea alte 3 butoane in jos.
Se afiseaza Delogare in cazul in care utilizatorul logat, si se tine cont de asta prin JWT-ul 
returnat in momentul autentificarii, retinut ulterior in local storage.

### 2. Landing page

Nimic special de zis, arata cum ar trebui iar butonul este functional

### 3. Login/Register

Se deschid dialog-uri ca in mock aproximativ ca nu erau exact explicate.
Cele 2 formulare, atat pentru fullscreen cat si mobile, sunt si legate la backend (voi explica ulterior)
iar trecerea in starea de logare se face doar daca cererea de login primeste un response OK 200

### 4. Formular de upload imagini

Nu am reusit sa implementez drag and drop.
Am incercat sa implementez si functionalitatea ca poza sa iti apara dupa ce o incarci inainte sa dai submit insa
dintr-un motiv anume campul de files era ulterior golit si nu se mai putea face post-ul (n-am mai avut timp
sa intreb mentorul legat de aceasta eroare).
Si acest formular este legat la backend (pozele chiar vor aparea ulterior alaturi de numele utilizatorului si
de descriere).

### 5. Footer

Iconitele functioneaza

### 6. Responsiveness

Chiar este responsive, facut din media queries.

### 7. My Bonus - Legare Frontend si Backend

Cererile implementate se fac cu ajutorul Axios. 
La refresh/prima randare a paginii, se va trimite o cerere 'get memes/' in urma carora vor aparea
elementele din sectiunea Most viewed, cu poza, creator si descriere. Stiu ca design-ul nu este foarte interesant
in partea aceea dar nu era nicio recomandare de implementare. De asemena, si restul de cereri sunt trimise tot prin Axios
(post meme, login sau register)


