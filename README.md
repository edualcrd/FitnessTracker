# FitnessTracker

## Idea y temática de la aplicación
**FitnessTracker** es una aplicación web diseñada para ayudar a los usuarios a llevar un registro detallado y un seguimiento de sus rutinas de entrenamiento físico. 

La plataforma permite a los usuarios registrarse, iniciar sesión, crear entrenamientos personalizados, añadir ejercicios a dichas rutinas y visualizar estadísticas sobre su rendimiento. El objetivo principal es ofrecer una herramienta sencilla e intuitiva para que cualquier persona pueda monitorizar su progreso físico a lo largo del tiempo, manteniendo toda su información centralizada y accesible.

---

## 🛠️ Tecnologías utilizadas

El proyecto está dividido en dos partes principales (Frontend y Backend) y utiliza las siguientes tecnologías:

### Frontend (`/client`)
* **React** (creado con Vite) para la construcción de interfaces de usuario.
* **React Router DOM** para la navegación entre páginas.
* **Axios** para el consumo de la API REST.
* **Recharts / Chart.js** para la visualización gráfica de las estadísticas de entrenamiento.
* **CSS Puro / Tailwind** (dependiendo de la configuración en `index.css` y `App.css`) para los estilos.

### Backend (`/server`)
* **Node.js** con **Express.js** para la creación de la API REST.
* **MySQL2** como base de datos relacional y para la ejecución de consultas.
* **JSON Web Tokens (JWT)** para la autenticación y autorización de sesiones.
* **Bcrypt.js** para el encriptado seguro de las contraseñas en la base de datos.
* **Multer** para la gestión y subida de archivos (como imágenes de perfil o rutinas).
* **Dotenv** para la gestión de variables de entorno.

---

## Instrucciones de instalación y ejecución

Sigue estos pasos para desplegar el proyecto en tu entorno local:

### 1. Requisitos previos
* Tener [Node.js](https://nodejs.org/) instalado.
* Tener un servidor [MySQL](https://www.mysql.com/) en ejecución.

### 2. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd fitnesstracker
```
### 3. Configuración de la Base de Datos y Backend
1. Abre tu gestor de MySQL (ej. phpMyAdmin, DBeaver o la terminal) y crea una base de datos para el proyecto (por ejemplo, fitnesstracker_db).

2. Dirígete a la carpeta del servidor:
```bash
cd server
```

3. Instala las dependencias:
```bash
npm install
```

4. Crea un archivo .env en la raíz de la carpeta server y añade tus variables de entorno. Ejemplo:
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=fitnesstracker_db
JWT_SECRET=tu_clave_secreta_super_segura
```

5. Inicia el servidor (asegúrate de que las tablas se creen correctamente si tienes un script de inicialización o migraciones):
```bash
npm start
# o si usas nodemon: npm run dev
```
### 4. Configuración del Frontend
1. Abre una nueva terminal y dirígete a la carpeta del cliente:
```bash
cd client
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la aplicación en modo desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y dirígete a http://localhost:5173 (o el puerto que te indique Vite).

## Estructura del Proyecto

fitnesstracker
 ┣ 📂 client/               # Aplicación Frontend (React)
 ┃ ┣ 📂 public/             # Recursos estáticos
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 assets/           # Imágenes, iconos, etc.
 ┃ ┃ ┣ 📂 components/       # Componentes reutilizables (Navbar, Charts, Skeletons)
 ┃ ┃ ┣ 📂 context/          # Contexto global (ej. AuthContext para estado de sesión)
 ┃ ┃ ┣ 📂 pages/            # Vistas principales (Dashboard, Login, CreateWorkout, etc.)
 ┃ ┃ ┣ 📂 services/         # Funciones para llamadas a la API (api.js, authService.js)
 ┃ ┃ ┣ 📜 App.jsx           # Componente raíz y rutas
 ┃ ┃ ┗ 📜 main.jsx          # Punto de entrada de React
 ┃ ┗ 📜 package.json
 ┃
 ┗ 📂 server/               # API Backend (Node.js/Express)
   ┣ 📂 config/             # Configuración de conexión a la BD (db.js)
   ┣ 📂 controllers/        # Lógica de negocio (authController, workoutController)
   ┣ 📂 middleware/         # Middlewares de Express (ej. verificación JWT)
   ┣ 📂 models/             # Modelos de consultas SQL (UserModel, WorkoutModel, etc.)
   ┣ 📂 routes/             # Definición de endpoints de la API
   ┣ 📜 index.js            # Punto de entrada del servidor Express
   ┗ 📜 package.json

## Usuarios de Prueba

Para facilitar la evaluación y revisión del proyecto sin necesidad de crear una cuenta desde cero, puedes registrar y utilizar las siguientes credenciales como estándar, o insertarlas directamente en tu base de datos si dispones de un script SQL:

Usuario Regular (Ejemplo para probar funcionalidades base):

Email: usuario@prueba.com

Contraseña: 123456

Usuario 2 (Para comprobar separación de datos entre cuentas):

Email: test@prueba.com

Contraseña: password123

(Nota: Si la base de datos está vacía en la primera ejecución, dirígete a la página de Registro en la aplicación y crea un usuario con estas credenciales).


