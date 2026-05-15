# MELIBUS

MELIBUS es una aplicación web sencilla para consultar información sobre el servicio de autobús urbano. La app muestra líneas, paradas, horarios, mapa, avisos/incidencias y puntos de recarga. También incluye inicio de sesión básico para usuarios y un panel de administración sencillo.

El proyecto está pensado para un nivel de grado superior: React en el frontend, PHP en el backend y MariaDB como base de datos.

## Tecnologías usadas

- React: interfaz de usuario.
- Vite: servidor de desarrollo y compilación del frontend.
- React Router: navegación entre páginas.
- Leaflet y React Leaflet: mapa interactivo.
- PHP: API backend.
- MariaDB/MySQL: base de datos.
- PDO: conexión segura desde PHP a la base de datos.

## Estructura general

```text
MELIBUS/
├── api/
│   ├── config/
│   │   └── database.php
│   ├── controllers/
│   │   ├── AdminController.php
│   │   ├── AuthController.php
│   │   ├── AvisosController.php
│   │   ├── FavoritasController.php
│   │   ├── HorariosController.php
│   │   ├── LineasController.php
│   │   ├── ParadasController.php
│   │   └── RecargasController.php
│   ├── database/
│   │   ├── BBDD.sql
│   │   └── seed.sql
│   ├── helpers/
│   │   └── response.php
│   ├── .htaccess
│   └── index.php
├── public/
│   └── img/
├── src/
│   ├── components/
│   ├── data/
│   ├── img/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Funcionamiento general

El frontend se encarga de mostrar la web y recoger acciones del usuario. Por ejemplo, buscar una parada, iniciar sesión, guardar una parada favorita o entrar al panel de administrador.

El backend PHP recibe las peticiones del frontend mediante endpoints. Consulta o modifica los datos en MariaDB y devuelve respuestas JSON.

La base de datos guarda usuarios, líneas, paradas, relación entre líneas y paradas, horarios, favoritos, avisos/incidencias y puntos de recarga.

## Frontend

### `src/main.jsx`

Es el punto de entrada de React. Renderiza la aplicación dentro del elemento `root` del HTML.

### `src/App.jsx`

Define las rutas principales de la web:

- `/`: inicio.
- `/lineas`: listado de líneas.
- `/linea/:id`: detalle de una línea.
- `/paradas`: listado de paradas.
- `/parada/:id`: detalle de una parada.
- `/mapa`: mapa de paradas.
- `/horarios`: horarios.
- `/avisos`: avisos e incidencias.
- `/recargas`: puntos de recarga.
- `/perfil`: perfil del usuario.
- `/admin`: panel de administrador.

Si se quiere añadir una página nueva, normalmente se crea el componente dentro de `src/pages/` y después se registra la ruta en `App.jsx`.

### `src/components/`

Contiene componentes reutilizables:

- `Navbar.jsx`: barra superior, navegación principal, acceso a login/perfil/admin.
- `Sidebar.jsx`: accesos rápidos laterales.
- `Layout.jsx`: estructura común de las páginas.
- `AuthModal.jsx`: modal de inicio de sesión y registro.
- `SearchBar.jsx`: buscador reutilizable.
- `ParadaCard.jsx`: tarjeta de parada con botón de detalle y favoritos.
- `LineaCard.jsx`: tarjeta de línea.
- `AvisoCard.jsx`: tarjeta de aviso/incidencia.
- `RecargaCard.jsx`: tarjeta de punto de recarga.
- `PageHeader.jsx`: cabecera reutilizable de cada página.
- `Hero.jsx` y `FeatureCard.jsx`: sección inicial de la página principal.
- `Footer.jsx`: pie de página.

### `src/pages/`

Contiene las pantallas completas:

- `Home.jsx`: página de inicio con accesos a las funciones principales.
- `Lineas.jsx`: carga líneas desde la API y permite buscar.
- `DetalleLinea.jsx`: muestra una línea concreta y sus paradas.
- `Paradas.jsx`: muestra paradas, buscador y gestión de favoritos.
- `DetalleParada.jsx`: muestra datos de una parada, líneas que pasan por ella y horarios.
- `Horarios.jsx`: muestra todos los horarios agrupados.
- `Mapa.jsx`: muestra las paradas con coordenadas sobre Leaflet.
- `Avisos.jsx`: muestra avisos e incidencias activos.
- `Recargas.jsx`: muestra puntos de recarga.
- `Perfil.jsx`: muestra datos del usuario y sus paradas favoritas.
- `AdminPanel.jsx`: panel para gestionar usuarios, paradas y avisos.

### `src/services/`

Aquí está la comunicación con el backend.

`api.js` contiene la función base `apiRequest`. Todas las peticiones pasan por ahí. También añade la cabecera `X-User-Id` cuando hay usuario en `localStorage`.

`melibusApi.js` contiene funciones más fáciles de leer para cada endpoint, por ejemplo:

- `getParadas()`
- `getLineas()`
- `getHorariosParada(id)`
- `loginUsuario(datos)`
- `registrarUsuario(datos)`
- `agregarParadaFavorita(idUsuario, idParada)`
- `getAdminUsuarios()`

La idea es que las páginas no tengan que escribir rutas de API directamente.

### `src/index.css`

Contiene los estilos generales de la web. Está dividido por bloques:

- estructura general;
- cabecera;
- sidebar;
- hero;
- tarjetas;
- botones;
- formularios;
- mapa;
- perfil;
- administración;
- responsive.

Si se quiere cambiar el aspecto de botones principales, se revisa `.card-button`. Para formularios de login/admin, se revisan las clases `.auth-*` y `.admin-*`.

### `src/data/`

Mantiene datos locales antiguos o de apoyo. La app principal ya trabaja con API, pero estos archivos sirven como referencia de la estructura inicial de datos.

## Backend PHP

### `api/index.php`

Es la entrada principal de la API. Lee la URL solicitada, separa sus partes y llama al controlador correspondiente.

Ejemplos:

- `GET /api/lineas`
- `GET /api/paradas`
- `GET /api/paradas/1`
- `GET /api/paradas/1/horarios`
- `POST /api/auth/login`
- `GET /api/admin/usuarios`

También configura las cabeceras CORS para permitir peticiones desde el frontend.

### `api/config/database.php`

Contiene la conexión a MariaDB mediante PDO.

Valores por defecto:

- base de datos: `melibus`
- usuario: `root`
- contraseña: `Mabel`
- host: `127.0.0.1`
- puerto: `3306`

Se pueden cambiar usando variables de entorno:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `DB_SOCKET`

### `api/helpers/response.php`

Funciones comunes para responder desde la API:

- `sendJson($data, $statusCode)`: devuelve JSON.
- `sendError($message, $statusCode)`: devuelve un error en JSON.
- `readJsonBody()`: lee el cuerpo JSON de una petición `POST` o `PUT`.

### Controladores

`LineasController.php`

Gestiona líneas y paradas asociadas a una línea.

`ParadasController.php`

Gestiona el listado de paradas, detalle de parada y horarios de una parada.

`HorariosController.php`

Agrupa los horarios por línea, parada y tipo de día. Por eso una tarjeta de horario puede mostrar varias horas.

`AvisosController.php`

Devuelve avisos/incidencias activos para mostrarlos al usuario.

`RecargasController.php`

Devuelve puntos de recarga.

`AuthController.php`

Gestiona registro e inicio de sesión. Las contraseñas se guardan con `password_hash()` y se comprueban con `password_verify()`.

`FavoritasController.php`

Permite consultar, añadir y eliminar paradas favoritas de un usuario.

`AdminController.php`

Gestiona funciones de administración:

- ver usuarios;
- cambiar rol o activar/desactivar usuarios;
- crear, editar y desactivar paradas;
- crear, editar y desactivar avisos/incidencias.

El panel admin se protege comprobando el usuario enviado en la cabecera `X-User-Id`.

## Base de datos

Los scripts están en `api/database/`.

### `BBDD.sql`

Crea la base de datos y las tablas:

- `usuarios`
- `lineas`
- `paradas`
- `lineas_paradas`
- `horarios`
- `paradas_favoritas`
- `avisos_incidencias`
- `puntos_recarga`

### `seed.sql`

Inserta datos iniciales para poder probar la aplicación:

- usuarios de prueba;
- líneas;
- paradas;
- relación entre líneas y paradas;
- horarios;
- favoritos;
- avisos/incidencias;
- puntos de recarga.

Importante: si una parada muestra una línea pero no muestra sus horarios, normalmente significa que existe la relación en `lineas_paradas`, pero faltan registros en `horarios` para esa combinación de línea y parada.

## Flujo de datos

Ejemplo: listado de paradas.

1. El usuario entra en `/paradas`.
2. `Paradas.jsx` llama a `getParadas()`.
3. `getParadas()` usa `apiRequest("/paradas")`.
4. PHP recibe `GET /api/paradas`.
5. `api/index.php` llama a `ParadasController::index`.
6. El controlador consulta MariaDB.
7. PHP devuelve JSON.
8. React pinta las tarjetas con `ParadaCard`.

Ejemplo: guardar una parada favorita.

1. El usuario inicia sesión.
2. Sus datos quedan guardados en `localStorage` como `melibusUser`.
3. En `/paradas`, al pulsar la estrella se ejecuta `alternarFavorita`.
4. React llama a `agregarParadaFavorita`.
5. PHP guarda la relación en `paradas_favoritas`.
6. La interfaz actualiza la estrella de la parada.

## Puesta en marcha

Instalar dependencias:

```bash
npm install
```

Arrancar frontend en desarrollo:

```bash
npm run dev
```

Compilar frontend:

```bash
npm run build
```

Comprobar errores de lint:

```bash
npm run lint
```

Para la base de datos:

1. Crear la base y tablas ejecutando `api/database/BBDD.sql`.
2. Insertar datos de prueba ejecutando `api/database/seed.sql`.
3. Revisar los datos de conexión en `api/config/database.php`.

## Endpoints principales

```text
GET    /api/lineas
GET    /api/lineas/{id}
GET    /api/lineas/{id}/paradas

GET    /api/paradas
GET    /api/paradas/{id}
GET    /api/paradas/{id}/horarios

GET    /api/horarios
GET    /api/avisos
GET    /api/recargas

POST   /api/auth/register
POST   /api/auth/login

GET    /api/usuarios/{id}/paradas-favoritas
POST   /api/usuarios/{id}/paradas-favoritas
DELETE /api/usuarios/{id}/paradas-favoritas/{idParada}

GET    /api/admin/usuarios
PUT    /api/admin/usuarios/{id}
GET    /api/admin/paradas
POST   /api/admin/paradas
PUT    /api/admin/paradas/{id}
DELETE /api/admin/paradas/{id}
GET    /api/admin/avisos
POST   /api/admin/avisos
PUT    /api/admin/avisos/{id}
DELETE /api/admin/avisos/{id}
```

## Zonas típicas a modificar

Cambiar textos de una página:

- Revisar el archivo correspondiente en `src/pages/`.
- Si es una cabecera, revisar el componente `PageHeader` usado en esa página.

Cambiar botones:

- El texto del botón suele estar en el componente o página.
- El estilo principal está en `src/index.css`, clase `.card-button`.

Cambiar formularios:

- Login/registro: `src/components/AuthModal.jsx`.
- Admin paradas/avisos: `src/pages/AdminPanel.jsx`.
- Estilos de formularios: `src/index.css`.

Cambiar endpoints:

- Frontend: `src/services/melibusApi.js`.
- Backend: `api/index.php` y el controlador correspondiente.

Cambiar datos iniciales:

- Estructura de tablas: `api/database/BBDD.sql`.
- Datos de prueba: `api/database/seed.sql`.

Cambiar colores o apariencia:

- Variables principales al inicio de `src/index.css`.

Cambiar mapa:

- Lógica del mapa: `src/pages/Mapa.jsx`.
- Coordenadas de paradas: tabla `paradas`, campos `latitud` y `longitud`.

## Notas importantes

- La aplicación usa `localStorage` para guardar el usuario iniciado.
- No hay sistema avanzado de sesiones o JWT; es una autenticación sencilla para proyecto académico.
- El panel admin depende del rol `admin` en la tabla `usuarios`.
- Las paradas favoritas solo están disponibles para usuarios normales.
- Los horarios se muestran agrupados por línea, parada y tipo de día.
- Para que una parada muestre horarios de una línea, deben existir registros en `horarios` con el mismo `id_linea` e `id_parada`.

