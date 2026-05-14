# Microservicio Terreno (MongoDB Atlas) - Proyecto Donaton
Repositorio del microservicio de terreno para el proyecto Donaton, utilizando MongoDB Atlas como base de datos. Este microservicio es responsable de gestionar la información relacionada con los terrenos disponibles para donaciones, incluyendo su ubicación, tamaño, estado y otros detalles relevantes.

Este servicio se integra con otros microservicios del proyecto Donaton, como el microservicio de donaciones y el microservicio de logística, para proporcionar una experiencia completa y eficiente a los usuarios que desean realizar donaciones de terrenos.




## Características
- Gestión de terrenos: Permite crear, leer, actualizar y eliminar información sobre los terrenos disponibles para donaciones.
- endpoint de pruebas para verificar la conexión con el microservicio.
- Integración con MongoDB Atlas para almacenamiento de datos.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Instrucciones para Ejecutar el Proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/DamagedGhost/donaton-terreno
    ```
2. Navega al directorio del proyecto:
   ```bash
    cd donaton-terreno
    ```
3. Instala las dependencias:
   ```bash
    npm install
    ```
4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente variable:
   ```
    DB_URL=tu_uri_de_mongodb_atlas
    ```
5. Inicia el servidor:
   ```bash
    npm start
    ```

## Prueba de Conexión
Para verificar que el microservicio de terreno está funcionando correctamente, puedes realizar una solicitud GET al endpoint de salud:
```bash
curl http://localhost:3003/health
```
Deberías recibir una respuesta indicando que el servicio está activo y conectado a la base de datos.

*para que funcione correctamente el microservicio, se debera crear una base de datos en MongoDB Atlas, o utilizar una base de datos local*

## Consideraciones de Seguridad
Dado que este proyecto es parte de un sistema más grande que maneja información sensible, es importante seguir buenas prácticas de seguridad, como almacenar las rutas de los microservicios y credenciales en variables de entorno, y no exponer información sensible en el código fuente. Además, se recomienda implementar medidas adicionales de seguridad, como autenticación y autorización, para proteger los endpoints del microservicio.

---

Este proyecto es parte de un esfuerzo colaborativo para crear una plataforma de donaciones eficiente y fácil de usar. Componentes estan sujetos a cambios y mejoras continuas, es de conocimiento potenciales riesgos de seguridad, por lo que se recomienda almacenar las rutas de los microservicios y credenciales en variables de entorno para evitar exponer información sensible en el código fuente.

## Repositorios relacionados
- [Repositorio Principal de Donaton](https://github.com/diegoparra-git/Proyecto-Donaton-Front)
- [Backend de Donaton](https://github.com/DamagedGhost/donaton-api)
- [Microservicio de Donaciones](https://github.com/diegoparra-git/donaton-donaciones)
- [Microservicio de Logística](https://github.com/StevenQR21/donaton-logistica)
