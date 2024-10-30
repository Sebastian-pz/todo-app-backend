# Todo App Backend

Este proyecto es la API de un sistema de administración de tareas, construido con [NestJS](https://nestjs.com/) y diseñado para proporcionar autenticación de usuarios con JWT y un CRUD de tareas.

## 1. Instrucciones de Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [SQLite](https://sqlite.org/) instalado (opcional, ya que SQLite crea un archivo automáticamente si no existe)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Sebastian-pz/todo-app-backend
   cd todo-app-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

### Variables de Entorno

Haz una copia del archivo `.env template` y renómbralo como `.env` en la raíz del proyecto y define tus variables de entorno:

```dotenv
JWT_SECRET=tu_secret_jwt
```

- `JWT_SECRET`: Secret key utilizada para la firma de los tokens JWT.

### Comandos

- **Desarrollo**: Ejecuta el proyecto en modo de desarrollo:

  ```bash
  npm run start:dev
  ```

- **Producción**: Compila el proyecto y ejecuta en modo producción:

  ```bash
  npm run build
  npm run start:prod
  ```

- **Formato de Código**: Aplica Prettier para dar formato al código:

  ```bash
  npm run format
  ```

## 2. Explicación Técnica

### Decisiones Técnicas

La mayoría de las decisiones se tomaron teniendo en cuenta el poco tiempo que se tenía para realizar la prueba, por ello gran parte de las herramientas se enfocan en rendimiento y eficacia.

1. **NestJS**: La estructura modular y orientada a controladores de NestJS ayuda a mantener un código limpio y modular, ideal para aplicaciones escalables.

2. **Autenticación JWT**: Se utiliza JWT para autenticar usuarios, ya que es seguro, ligero, y evita el uso de sesiones de servidor, lo que facilita el escalado en futuras implementaciones. La librería `@nestjs/jwt` maneja la creación y verificación de tokens de manera eficiente.

3. **SQLite**: SQLite es una solución ligera de base de datos que permite almacenar los datos de manera rápida y sin configuración compleja. Es ideal para el desarrollo y pruebas en aplicaciones pequeñas. `typeorm` facilita la integración con esta base de datos, proporcionando una capa de abstracción para consultas y operaciones CRUD.

4. **Validación y Transformación de Datos**: Se usan `class-validator` y `class-transformer` en los DTOs para asegurar que los datos de entrada sean válidos y seguros. Esto ayuda a mantener la integridad de los datos y evita errores comunes.

5. **bcryptjs para Hashing de Contraseñas**: `bcryptjs` se usa para hashear las contraseñas antes de almacenarlas, garantizando seguridad en la autenticación de usuarios.

6. **Estructura de Carpetas**: La estructura del proyecto sigue una arquitectura modular por características, donde cada módulo encapsula sus entidades, controladores, servicios y DTOs. Esto facilita la escalabilidad y el mantenimiento del código.

7. **Eslint y Prettier**: Para asegurar la calidad y consistencia del código, se configuraron `eslint` y `prettier`, aplicando estándares de codificación y formateo para evitar errores usuales y mejorar la legibilidad.

8. **UUIDs**: Cada usuario y tarea tiene un identificador único (UUID), generado con la librería `uuid`, garantizando que los identificadores sean únicos y difíciles de predecir.

Aquí tienes una sección del `README.md` con la documentación de las rutas disponibles y la estructura de las entidades de datos.

---

# API Endpoints

La API ofrece endpoints para autenticación de usuarios y manejo de tareas. Aquí están las rutas y sus métodos.

## Endpoints de Autenticación

### `/auth/login` - POST

- **Descripción**: Permite a un usuario autenticarse.
- **Payload**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Respuesta**: Devuelve un token JWT para autenticación de acceso a las rutas protegidas.

### `/auth/register` - POST

- **Descripción**: Permite registrar un nuevo usuario.
- **Payload**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Respuesta**: Devuelve el objeto del usuario registrado sin la contraseña.

### `/auth/protected` - GET

- **Descripción**: Endpoint protegido que verifica si el token JWT es válido (solo por fines de testing).
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Respuesta**: Mensaje de confirmación indicando que el token es válido o devuelve un error de autenticación si no es válido.

## Endpoints de Tareas (Tasks)

Las rutas para la gestión de tareas permiten realizar operaciones de creación, obtención, actualización y eliminación de tareas. Todas las rutas de tareas están protegidas por autenticación.

### `/tasks` - GET

- **Descripción**: Obtiene todas las tareas del usuario autenticado.
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Respuesta**: Una lista de tareas pertenecientes al usuario.

### `/tasks/:id` - GET

- **Descripción**: Obtiene una tarea específica por ID.
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Respuesta**: Objeto de tarea.

### `/tasks` - POST

- **Descripción**: Crea una nueva tarea.
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Payload**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "enum [PENDING, IN_PROGRESS, COMPLETED]",
    "completionDate": "ISO Date (opcional)"
  }
  ```
- **Respuesta**: Devuelve el objeto de la tarea creada.

### `/tasks/:id` - PATCH

- **Descripción**: Actualiza una tarea específica.
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Payload**:
  ```json
  {
    "title": "string (opcional)",
    "description": "string (opcional)",
    "status": "enum [PENDING, IN_PROGRESS, COMPLETED] (opcional)",
    "completionDate": "ISO Date (opcional)"
  }
  ```
- **Respuesta**: Devuelve el objeto de la tarea actualizada.

### `/tasks/:id` - DELETE

- **Descripción**: Elimina una tarea específica por ID.
- **Encabezado (Header)**:
  ```json
  {
    "Authorization": "Bearer <JWT>"
  }
  ```
- **Respuesta**: Mensaje de confirmación de eliminación.

---

### Próximos Pasos

Si hubiera tenido más tiempo para el desarrollo, los siguientes pasos serían:

- **Documentación con Swagger**: Agregar la documentación de la API usando Swagger para facilitar a otros desarrolladores la integración con el backend. Esto incluiría la generación automática de la documentación de cada endpoint y sus respectivos parámetros.

- **Soft Delete para Usuarios**: Implementar un borrado lógico (soft delete) para los usuarios. En lugar de eliminar un usuario del sistema, esta funcionalidad marcaría el usuario como inactivo, preservando los datos para futuras auditorías y mejorando la integridad de los datos relacionados.

- **Quizá manejo de cache**: Tal vez implementar un manejo del cache utilizando redis

- **Testing**: Me hubiera encantado poder meter mano en testing, para garantizar la calidad del backend; sin embargo, los tiempos no lo permitieron.
