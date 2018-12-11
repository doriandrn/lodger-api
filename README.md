# Lodger (offline-first) API

## __lodger__ ```<comandă>``` parametri

---

### Descriere TIPURI

__M__ - Metodă
__G__ - Getter (nu există parametri)
__Gpm__ - Getter cu parametri

## Lodger MVP

| Comanda | Tip | Parametri | Descriere |
| ------: | :-: | :-------- | --- |
| `put` | M | ```{ ce:<string>: _una din:_ ['asociatie', 'serviciu', ... 'citireContor'] }``` | |
| `trash` | M | | |

| `incaseaza` | M | | Wrapper la functia de adauga|
| `exportaDate` | M | | |
| `importaDate` | M | | |
| | | | |
| `asociatii` | G + Gpm | Filtru de cautare, Limite, etc. Apelat fără parametri = ia configul default | Wrapper la metoda `find` pt colectie |
| ... Toate din definitii la fel |
