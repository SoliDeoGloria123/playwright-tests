# playwright-tests

Suite de pruebas E2E en Playwright y TypeScript contra [Sauce Demo](https://www.saucedemo.com), un sitio público pensado para practicar automatización. Usa el patrón Page Object Model, incluye pruebas de API contra [JSONPlaceholder](https://jsonplaceholder.typicode.com/) y genera un reporte HTML. En CI las pruebas corren con Chromium en modo headless.

Las credenciales de Sauce Demo (`standard_user` / `secret_sauce`) son las que el propio sitio publica para pruebas. No son una cuenta real.

## Requisitos

- Node.js 20 o superior

## Cómo ejecutarlas

```bash
npm install
npx playwright install chromium
npm test
```

Eso corre la suite en Chromium headless y deja el reporte en `playwright-report/`. Para abrirlo:

```bash
npm run report
```

En modo con interfaz gráfica:

```bash
npm run test:headed
```

## Qué cubre la suite

Pruebas E2E (Sauce Demo):

- Inicio de sesión con el usuario estándar y llegada al inventario
- Usuario bloqueado (`locked_out_user`) y validación cuando faltan credenciales
- Agregar productos al carrito
- Ordenar el inventario de Z a A
- Flujo completo de checkout

Pruebas de API (JSONPlaceholder, API pública de práctica):

- `GET /posts` y `GET /posts/1`
- `POST /posts` (el servicio de demostración responde `201` y no persiste datos)

## Estructura

```
pages/          # Page Objects: login, inventario, carrito y checkout
tests/e2e/      # Pruebas de interfaz contra Sauce Demo
tests/api/      # Pruebas HTTP contra JSONPlaceholder
playwright.config.ts
```


## English

Playwright + TypeScript end-to-end suite against [Sauce Demo](https://www.saucedemo.com), a public site built for test practice. It uses the Page Object Model, includes API tests against [JSONPlaceholder](https://jsonplaceholder.typicode.com/), and writes an HTML report. CI runs the tests headless in Chromium.

```bash
npm install
npx playwright install chromium
npm test
npm run report
```

Sauce Demo credentials used here (`standard_user` / `secret_sauce`) are the ones the site itself publishes for testing.

## Autor / Author

Juan David Mahecha
[LinkedIn](https://www.linkedin.com/in/juan-david-mahecha-dev)
