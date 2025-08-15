# 📅 SN12 — La app planificada para ti

SN12 es una aplicación diseñada para **gestionar, planificar y analizar** tu tiempo de manera sencilla y efectiva.  
Permite registrar actividades, organizarlas por proyectos o temas, y visualizar estadísticas detalladas por semana, mes, año o un período específico.

---

## 🚀 Características principales

- **Perfiles de usuario**: Estudiante / Trabajador / Personal.
- **Registro de actividades** con cronómetro (iniciar, detener, guardar con breve descripción).
- **Clasificación por temas y proyectos**.
- **Estadísticas y reportes** semanales, mensuales, anuales o personalizados.
- **Apartado de proyectos** con seguimiento de tareas.
- **Planificación diaria** *(en evaluación para futura versión)*.

---

## 🛠️ Tecnologías

- **Frontend**: React / React Native
- **Backend**: Node.js con Express
- **Base de datos**: MongoDB
- **Autenticación**: JWT
- **Estilos**: Tailwind CSS

---

## 📂 Estructura del proyecto
backend/
├─ node_modules/
├─ src/
│ ├─ config/ # Carga de .env, logger, DB, etc.
│ ├─ controllers/ # Lógica de orquestación por recurso
│ ├─ handlers/ # Adaptadores req/res por ruta
│ ├─ helpers/ # Utilidades puras 
│ ├─ middlewares/ # Auth, validaciones, manejo de errores
│ ├─ models/ # Modelos
│ ├─ routes/ # Definición de endpoints y versionado
│ ├─ services/ # Reglas de negocio y casos de uso
│ ├─ validations/ # Schemas Joi y sanitización
│ └─ index.js # Bootstrap del servidor
├─ package.json
├─ package-lock.json
└─ gitignore
frontend/
README.md

