# React Portfolio (Vite + TypeScript)

Nowoczesne portfolio programisty zbudowane w React + Vite + TypeScript.

## Spis Treści
* [O Projekcie](#o-projekcie)
* [Zbudowano Przy Użyciu](#zbudowano-przy-użyciu)
* [Pierwsze Kroki](#pierwsze-kroki)
  * [Wymagania Wstępne](#wymagania-wstępne)
  * [Instalacja](#instalacja)
* [Dostępne Skrypty](#dostępne-skrypty)
* [Funkcjonalności](#funkcjonalności)
* [Autor](#autor)

## O Projekcie

Nowoczesne portfolio programisty prezentujące umiejętności i zrealizowane projekty. Strona została zbudowana z myślą o interaktywności, nowoczesnym wyglądzie i responsywności. Wykorzystuje technologie takie jak React, Vite i TypeScript do stworzenia dynamicznego i efektywnego interfejsu użytkownika.

## Zbudowano Przy Użyciu

Główne technologie i biblioteki wykorzystane w tym projekcie:
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router DOM](https://reactrouter.com/)
* [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei) (dla interaktywnych elementów 3D)
* [tsparticles](https://particles.js.org/) (dla animacji tła z cząsteczkami)
* CSS (dla stylizacji)

## Pierwsze Kroki

Aby uruchomić projekt lokalnie, postępuj zgodnie z poniższymi instrukcjami.

### Wymagania Wstępne

Upewnij się, że masz zainstalowane następujące narzędzia:
* Node.js (zalecana wersja LTS)
  ```sh
  node -v
  ```
* npm (zazwyczaj instalowany razem z Node.js)
  ```sh
  npm -v
  ```

### Instalacja

1.  Sklonuj repozytorium (jeśli jeszcze tego nie zrobiłeś):
    ```bash
    git clone https://github.com/Tolemak/portfolio-react.git
    ```
2.  Przejdź do katalogu projektu:
    ```bash
    cd portfolio-react
    ```
3.  Zainstaluj zależności projektu:
    ```bash
    npm install
    ```

## Dostępne Skrypty

W katalogu projektu możesz uruchomić następujące polecenia:

### `npm run dev`
Uruchamia aplikację w trybie deweloperskim.
Otwórz [http://localhost:5173](http://localhost:5173) (lub inny port wskazany w konsoli), aby zobaczyć ją w przeglądarce.
Strona będzie automatycznie przeładowywać się po wprowadzeniu zmian w kodzie.

### `npm run build`
Buduje aplikację do wersji produkcyjnej w katalogu `dist/`.
Optymalizuje build pod kątem wydajności i przygotowuje pliki do wdrożenia.

### `npm run lint`
Uruchamia ESLint w celu analizy kodu i wykrycia potencjalnych błędów oraz problemów ze stylem kodu.

### `npm run preview`
Uruchamia lokalny serwer produkcyjny dla zbudowanej aplikacji z katalogu `dist/`. Pozwala to przetestować wersję produkcyjną przed wdrożeniem.

## Funkcjonalności
- Sekcja powitalna (hero) z animowanym tłem
- Sekcje: projekty, umiejętności, doświadczenie, edukacja, o mnie
- Nawigacja górna z podświetleniem
- Responsywny design
- Ciemny i jasny motyw
- Interaktywne 3D na stronie głównej
- Bilingwalność (PL/EN) i przełącznik języka
- Kafelkowe, nowoczesne karty z glassmorphism
- Spójne modale i tagi umiejętności

## Autor

Kamil Gałkowski
- GitHub: [Tolemak](https://github.com/Tolemak)