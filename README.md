<p align="center">
  <h1 align="center">Chronos</h1>
  <p align="center">Szabadúszó és szolgáltatáscsere platform</p>
</p>

---

## Előfeltételek

Az alkalmazás futtatásához az alábbi programokra van szükség. Ha valamelyik nincs telepítve, kövesse a hivatkozott útmutatókat.

### 1. Docker Desktop

A Docker az alkalmazás konténerizált futtatásához szükséges. Egyetlen paranccsal elindítja az összes szükséges szolgáltatást (backend, frontend, adatbázis).

- Letöltés: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Telepítés után indítsa el a **Docker Desktop** alkalmazást, és várja meg, amíg az ikon az alkalmazás bal sarkában zöldre vált / a státusz „Engine running" lesz.

### 2. Git (opcionális, csak ha git-tel tölti le a projektet)

- Letöltés: [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## Telepítés és indítás

### 1. lépés – A forráskód letöltése

Válassza ki az Önnek megfelelő módot:

#### A) Git segítségével (ajánlott, ha van Git telepítve)

Nyisson egy terminált, és futtassa az alábbi parancsokat:

```bash
git clone https://github.com/Soliver21/Chronos.git
```

#### B) ZIP fájlból

1. Csomagolja ki a kapott ZIP fájlt egy tetszőleges mappába.
2. Nyisson egy terminált a kicsomagolt mappában.
   - **Windows:** A mappán (a projekt gyökerében) belül kattintson a felső címsávra, írja be: `cmd`, majd nyomjon Entert.
   - **macOS/Linux:** Jobb klikk a mappán → „Terminál megnyitása itt".

---

### 2. lépés – Környezeti változók beállítása

A projektben található egy `.env.example` fájl. Másolja át a "backend" mappába és nevezze át `.env`-re

---

### 3. lépés – Az alkalmazás elindítása

A **gyökérkönyvtárban** (ahol a `docker-compose.yml` fájl van) futtassa az alábbi parancsot:

```bash
docker compose up -d --build
```

> Ez az első indításkor néhány percet vehet igénybe, mert letölti a szükséges Docker image-eket és lefordítja az alkalmazást. Következő indításoknál ez már sokkal gyorsabb lesz.

Az indítás után az alkalmazás elérhető:

| Szolgáltatás | URL |
|---|---|
| Frontend | [http://localhost:5301](http://localhost:5301) |
| Backend API | [http://localhost:3001](http://localhost:3001) |

---


---

## 🔧 Egyéb hasznos parancsok

### Az alkalmazás leállítása

```bash
docker compose down
```


### Prisma Studio – Adatbázis vizuális böngésző

A Prisma Studio egy böngészőalapú felület, amellyel közvetlenül megtekinthető és szerkeszthető az adatbázis tartalma. Hasznos fejlesztés és tesztelés közben.

```bash
docker exec -it chronos_backend npx prisma studio --browser none --port 5555
```

Elindítás után nyissa meg böngészőben: [http://localhost:5555](http://localhost:5555)

---

## ❓ Gyakori problémák

**„Port already in use" hiba**
> Valamelyik szükséges port (3000, 3306, 5173) már foglalt. Állítsa le az azt használó programot, vagy indítsa újra a számítógépet.

**A Docker nem indul el**
> Győződjön meg róla, hogy a Docker Desktop alkalmazás fut (a tálcán látható az ikonja és zöld / „Running" státuszban van).

**Az adatbázis nem elérhető az első indításkor**
> Az adatbázis inicializálása az első alkalommal néhány másodpercet vesz igénybe. Várjon 20–30 másodpercet, majd futtassa újra: `docker-compose restart backend`

