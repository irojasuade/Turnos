# Gestor de Turnos

Esta aplicación es un servidor Express que administra turnos utilizando PostgreSQL.

## Instalación

1. Clona el repositorio y navega hasta la carpeta.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   DATABASE_URL=<cadena de conexión de PostgreSQL>
   PORT=3000
   ```
   Ajusta los valores según tu entorno.

## Uso

Inicia el servidor con:
```bash
npm start
```
El servidor escuchará en el puerto indicado en `PORT`.

## Endpoints

- `GET /` – respuesta de prueba para verificar que el servicio está activo.
- `POST /turnos` – crea un turno. Debes enviar `cliente`, `fecha`, `hora` y `tratamiento` en el cuerpo JSON.
- `GET /turnos` – obtiene todos los turnos ordenados por fecha y hora.
- `GET /turnos/:fecha` – obtiene los turnos de una fecha específica.
- `GET /turnos/cliente/:nombre` – busca turnos por nombre del cliente (búsqueda parcial).

