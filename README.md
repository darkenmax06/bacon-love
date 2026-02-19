# Bacon Love — Sitio Web Oficial

Sitio web completo para **Bacon Love**, un restaurante de smash burgers artesanales. Incluye landing page multilingüe, sistema de reservas online, sección de pedidos y panel de administración.

---

## Idea del Proyecto

Bacon Love necesitaba una presencia digital que reflejara la identidad de la marca: oscura, artesanal y directa. El sitio cumple varias funciones:

- **Vitrina de marca** — Presentar el restaurante, sus platos y su historia
- **Reservas online** — Permitir a los clientes agendar una mesa sin necesidad de llamar
- **Pedidos a domicilio** — Enlace directo a la plataforma de pedidos externa
- **Gestión interna** — Panel de administración para revisar y gestionar reservas

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | [Astro 5](https://astro.build) (SSR mode) |
| Hosting | [Vercel](https://vercel.com) (Serverless) |
| Base de datos | PostgreSQL vía [Prisma ORM](https://www.prisma.io/) |
| Estilos | CSS plano (sin frameworks) |
| Scripts | TypeScript (en componentes Astro) |
| Email | [Nodemailer](https://nodemailer.com/) |
| Runtime | Node.js |

---

## Funcionalidades

### Sitio Público

- Landing page con secciones: Hero, Sobre Nosotros, Platillos, Pedidos Online, Testimonios
- **Multilingüe** — Español (`/es/`) e Inglés (`/en/`)
- Sistema de **reservas** con disponibilidad en tiempo real
- Formulario con selector de fecha personalizado, hora, personas y notas
- Envío automático de **correo de confirmación** al cliente tras reservar
- Página 404 personalizada sin menú
- Diseño 100% responsive (mobile-first)

### Panel de Administración (`/admin/`)

- Login con autenticación por sesión
- **Dashboard de Citas** — Filtro por fecha (muestra hoy por defecto), cambio de estado, eliminación
- **Configuración del sistema**:
  - Número máximo de comensales por franja horaria
  - Duración de la reserva
  - Días de antelación máxima para reservar
  - Días de la semana disponibles y horarios
  - Correo del administrador (recibe notificación por cada nueva reserva)
- Layout propio del admin (sin menú del sitio público)
- Sidebar fija en desktop, colapsable en móvil

### Notificaciones por Email

Al crear una reserva se envían automáticamente dos correos:

1. **Al cliente** — Confirmación con todos los detalles de la reserva (fecha, hora, personas, teléfono, notas)
2. **Al administrador** — Notificación con datos del cliente y enlace directo a WhatsApp

Ambos usan plantillas HTML con diseño oscuro acorde a la marca.

---

## Estructura del Proyecto

```
bacon-love/
├── prisma/
│   ├── schema.prisma          # Modelos: Appointment, Settings, ClosedDate
│   └── migrations/            # Historial de migraciones
│
├── public/                    # Archivos estáticos (logo, favicon, imágenes)
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.astro    # Layout del panel admin (sidebar + login)
│   │   │   ├── AppointmentsTab.astro
│   │   │   └── SettingsTab.astro
│   │   ├── DatePicker.astro         # Selector de fecha personalizado
│   │   ├── Layout.astro             # Layout principal del sitio
│   │   ├── Menu.astro               # Navegación principal
│   │   ├── Orders.astro             # Sección de pedidos online
│   │   ├── layout.css               # Variables CSS globales y reset
│   │   └── menu.css                 # Estilos del menú
│   │
│   ├── lib/
│   │   ├── email.ts                 # Plantillas y envío de correos
│   │   └── schedule-utils.ts        # Utilidades de horarios
│   │
│   ├── pages/
│   │   ├── [lang]/
│   │   │   └── index.astro          # Landing page dinámica (es/en)
│   │   ├── es/
│   │   │   └── citas.astro          # Formulario de reservas (ES)
│   │   ├── en/
│   │   │   └── appointments.astro   # Formulario de reservas (EN)
│   │   ├── admin/
│   │   │   ├── dashboard.astro      # Panel de administración
│   │   │   └── login.astro          # Login del admin
│   │   ├── api/
│   │   │   ├── appointments/        # GET, POST, PATCH, DELETE citas
│   │   │   ├── settings/            # GET, PUT configuración
│   │   │   ├── closed-dates/        # GET, POST, DELETE fechas cerradas
│   │   │   └── auth/                # login, logout, me
│   │   └── 404.astro
│   │
│   └── translations/
│       ├── es.js                    # Textos en español
│       └── en.js                    # Textos en inglés
│
├── .env                             # Variables de entorno (ver sección abajo)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Instalación y Desarrollo

### Requisitos

- Node.js 18+
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd bacon-love

# 2. Instalar dependencias (también ejecuta prisma generate automáticamente)
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL, DIRECT_URL, ADMIN_PASSWORD y JWT_SECRET

# 4. Aplicar migraciones a la base de datos
npx prisma migrate deploy

# 5. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar el build de producción |
| `npx prisma studio` | Interfaz gráfica para la base de datos |
| `npx prisma migrate dev` | Crear nueva migración en desarrollo |

---

## Variables de Entorno

Crear un archivo `.env` en la raíz (copiar desde `.env.example`):

```env
# Base de datos — PostgreSQL (Neon recomendado)
# DATABASE_URL usa PgBouncer (conexión pooled, para serverless)
# DIRECT_URL es la conexión directa, solo para migraciones
DATABASE_URL="postgresql://usuario:password@host/basedatos?pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgresql://usuario:password@host/basedatos?connect_timeout=15"

# Autenticación admin
ADMIN_PASSWORD="tu-password-seguro"
JWT_SECRET="clave-aleatoria-de-al-menos-32-caracteres"

# SMTP para correos (opcional — si no se configura, los correos se omiten)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="tu-correo@gmail.com"
SMTP_PASS="tu-app-password"
SMTP_FROM="Bacon Love <tu-correo@gmail.com>"
```

> Para Gmail, usa una **App Password** (no tu contraseña normal). Actívala en: Google Account → Seguridad → Verificación en dos pasos → Contraseñas de aplicación.

---

## Rutas del Sitio

| Ruta | Descripción |
|------|-------------|
| `/es/` | Landing page en español |
| `/en/` | Landing page en inglés |
| `/es/citas` | Formulario de reservas (ES) |
| `/en/appointments` | Formulario de reservas (EN) |
| `/admin/login` | Login del panel admin |
| `/admin/dashboard` | Panel de administración |

### API Endpoints

| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/api/appointments` | GET, POST | Listar / crear citas |
| `/api/appointments/[id]` | PATCH, DELETE | Actualizar / eliminar cita |
| `/api/appointments/availability` | GET | Horarios disponibles para una fecha |
| `/api/settings` | GET, PUT | Configuración del sistema |
| `/api/closed-dates` | GET, POST, DELETE | Fechas cerradas (festivos, etc.) |
| `/api/auth/login` | POST | Autenticación admin |
| `/api/auth/logout` | POST | Cerrar sesión |
| `/api/auth/me` | GET | Verificar sesión activa |

---

## Configuración del Admin

Acceder a `/admin/dashboard` → pestaña **Configuración**:

- **Máx. comensales** — Límite de personas por franja horaria (evita overbooking)
- **Duración** — Duración en minutos de cada reserva
- **Días de antelación** — Con cuántos días de antelación se puede reservar (ej: 30)
- **Días disponibles** — Qué días de la semana acepta reservas
- **Horarios** — Franjas horarias disponibles (ej: 13:00, 14:00, 20:00, 21:00)
- **Email admin** — Correo que recibe notificaciones de nuevas reservas

---

## Despliegue en Vercel

El proyecto usa el adaptador oficial `@astrojs/vercel` y está listo para desplegarse con un push a Git.

### Pasos para desplegar

**1. Base de datos — Crear una base de datos PostgreSQL**

Se recomienda [Neon](https://neon.tech) (tier gratuito, compatible con serverless):
- Crear un proyecto en Neon
- Copiar la **Connection string (pooled)** → `DATABASE_URL`
- Copiar la **Direct connection string** → `DIRECT_URL`

**2. Ejecutar migraciones**

Desde tu máquina local, con las variables de entorno de producción en `.env`:

```bash
npx prisma migrate deploy
```

**3. Conectar repositorio a Vercel**

- Importar el repositorio en [vercel.com](https://vercel.com)
- Vercel detecta Astro automáticamente
- El comando de build ya está configurado: `prisma generate && astro build`

**4. Configurar variables de entorno en Vercel**

En el dashboard de Vercel → Settings → Environment Variables, añadir:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Connection string pooled (con `?pgbouncer=true`) |
| `DIRECT_URL` | Connection string directa (sin pgbouncer) |
| `ADMIN_PASSWORD` | Contraseña del panel admin |
| `JWT_SECRET` | Clave secreta para JWT (32+ caracteres aleatorios) |
| `SMTP_HOST` | Servidor SMTP (opcional) |
| `SMTP_PORT` | Puerto SMTP (opcional) |
| `SMTP_SECURE` | `true`/`false` (opcional) |
| `SMTP_USER` | Usuario SMTP (opcional) |
| `SMTP_PASS` | Contraseña SMTP / App Password (opcional) |
| `SMTP_FROM` | Nombre y correo del remitente (opcional) |

**5. Desplegar**

Hacer push a la rama principal. Vercel construye y despliega automáticamente.

### Despliegue local (Node.js)

```bash
npm run build
node dist/server/entry.mjs
```

---

## Pedidos Online

El botón de pedidos enlaza a la plataforma externa:

```
https://pedidos.delitbee.shop/bacon-love
```

Este enlace aparece en:
- El menú de navegación principal
- La sección "Pedidos" de la landing page

---

## Diseño y Marca

- **Paleta**: Negro absoluto (`#060606`) + blanco cálido (`#f3eeee`)
- **Tipografías**: `Stella` (serif, títulos) + `Jost` (sans-serif, cuerpo)
- **Estilo**: Dark, minimalista, artesanal
- **Sin frameworks CSS** — todo CSS plano con variables personalizadas

---

*Desarrollado para Bacon Love · 2026*
