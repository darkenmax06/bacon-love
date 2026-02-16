# 📚 Sistema de Reservas - Bacon Love
## Manual de Usuario y Documentación Técnica

---

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Credenciales por Defecto](#credenciales-por-defecto)
4. [Guía para Clientes](#guía-para-clientes)
5. [Guía para Administradores](#guía-para-administradores)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [API Endpoints](#api-endpoints)
8. [Solución de Problemas](#solución-de-problemas)
9. [Despliegue en Producción](#despliegue-en-producción)

---

## 🎯 Descripción General

Sistema completo de gestión de reservas/citas para el restaurante Bacon Love. Permite a los clientes hacer reservas en línea y a los administradores gestionar todas las citas desde un panel administrativo.

### Características Principales

✅ **Para Clientes:**
- Reservas en línea con selección de fecha, hora y número de personas
- Validación de disponibilidad en tiempo real
- Formulario bilingüe (Español/Inglés)
- Confirmación automática de reserva

✅ **Para Administradores:**
- Panel de control completo
- Visualización de todas las reservas
- Filtros por estado y fecha
- Cambio de estado de reservas (Pendiente/Confirmado/Cancelado)
- Botón directo a WhatsApp para contactar clientes
- Configuración del sistema (horarios, capacidad, días disponibles)

### Tecnologías Utilizadas

- **Frontend:** Astro 5 + TypeScript
- **Backend:** Astro API Routes (SSR)
- **Base de Datos:** SQLite con Prisma ORM
- **Autenticación:** JWT (JSON Web Tokens) con cookies HTTP-only
- **Estilo:** CSS custom siguiendo el diseño del sitio

---

## 🚀 Instalación y Configuración

### 1. Requisitos Previos

- Node.js 18+ instalado
- npm o pnpm instalado

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Configurar Base de Datos

La base de datos ya está inicializada, pero si necesitas recrearla:

```bash
# Eliminar base de datos existente (opcional)
rm dev.db

# Crear base de datos
npx prisma migrate dev --name init

# Generar cliente de Prisma
npx prisma generate

# Poblar con datos iniciales
npm run db:seed
```

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El sitio estará disponible en: `http://localhost:4321/`

---

## 🔐 Credenciales por Defecto

### Usuario Administrador

- **Email:** `admin@baconlove.com`
- **Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción.

### Modificar Credenciales

Para cambiar las credenciales del administrador:

1. Edita el archivo `prisma/seed.ts`
2. Cambia el email y password
3. Ejecuta: `npm run db:seed`

O usa herramientas como Prisma Studio:

```bash
npx prisma studio
```

---

## 👥 Guía para Clientes

### Hacer una Reserva

1. **Acceder a la Página de Reservas**
   - Español: `http://localhost:4321/es/citas`
   - Inglés: `http://localhost:4321/en/appointments`
   - O hacer clic en "Reservas" en el menú principal

2. **Completar el Formulario**
   - **Nombre completo:** Tu nombre
   - **Email:** Para confirmaciones
   - **Teléfono (WhatsApp):** El restaurante te contactará por aquí
   - **Fecha:** Selecciona un día disponible
   - **Horario:** Se cargan automáticamente los horarios disponibles según la fecha
   - **Número de personas:** Máximo permitido según configuración
   - **Notas (opcional):** Alergias, ocasión especial, preferencias

3. **Enviar Reserva**
   - Click en "Reservar"
   - Recibirás confirmación inmediata
   - El restaurante te contactará vía WhatsApp

### Validaciones Automáticas

El sistema valida automáticamente:
- ✅ Que la fecha no sea pasada
- ✅ Que el día esté disponible (según configuración del restaurante)
- ✅ Que haya mesas disponibles en ese horario
- ✅ Que no excedas el número máximo de personas por reserva
- ✅ Que el horario sea válido
- ✅ Formato de teléfono y email

---

## 👨‍💼 Guía para Administradores

### Acceso al Panel Administrativo

1. Ve a: `http://localhost:4321/admin/login`
2. Ingresa tus credenciales3. Serás redirigido automáticamente al dashboard

### Dashboard Principal

El dashboard tiene 2 pestañas principales:

#### 📅 Pestaña "Citas"

**Ver Todas las Reservas:**
- Se muestran todas las reservas en tarjetas
- Cada tarjeta muestra:
  - Nombre del cliente
  - Fecha y hora
  - Número de personas
  - Email y teléfono
  - Notas especiales
  - Estado actual

**Filtrar Reservas:**
- **Por estado:** Pendiente / Confirmado / Cancelado
- **Por fecha:** Selecciona una fecha específica

**Acciones por Reserva:**

1. **Contactar por WhatsApp**
   - Click en botón verde "WhatsApp"
   - Se abre WhatsApp Web/App con el número del cliente

2. **Cambiar Estado**
   - Usa el selector de estado
   - Opciones: Pendiente → Confirmado → Cancelado
   - El cambio es instantáneo

3. **Eliminar Reserva**
   - Click en botón "Eliminar"
   - Confirma la acción
   - La reserva se elimina permanentemente

#### ⚙️ Pestaña "Configuración"

Configura los parámetros del sistema de reservas:

**Capacidad:**
- **Capacidad Total:** Número máximo de sillas en el restaurante
- **Máximo por Reserva:** Cuántas personas pueden reservar juntas

**Días Disponibles:**
- Marca los días de la semana en que aceptas reservas
- Por defecto: Lunes a Sábado

**Horarios Disponibles:**
- Lista de horarios en formato HH:MM (24 horas)
- Un horario por línea
- Ejemplo:
  ```
  12:00
  12:30
  13:00
  20:00
  21:00
  ```

**Configuración Avanzada:**
- **Duración de Reserva:** Minutos que dura cada reserva (para planificación)
- **Días de Anticipación:** Cuántos días adelante pueden reservar los clientes

**Guardar Cambios:**
- Click en "Guardar Configuración"
- Los cambios aplican inmediatamente
- Las nuevas reservas usarán esta configuración

### Flujo de Trabajo Recomendado

1. **Cada mañana:**
   - Revisa reservas del día (filtrar por fecha de hoy)
   - Confirma todas las reservas pendientes
   - Contacta por WhatsApp para confirmar asistencia

2. **Durante el día:**
   - Monitorea nuevas reservas
   - Responde rápidamente vía WhatsApp

3. **Gestión:**
   - Cancela reservas que no confirmen
   - Ajusta configuración según demanda

### Cerrar Sesión

- Click en "Cerrar Sesión" en la esquina superior derecha
- Serás redirigido al login

---

## 📁 Estructura del Proyecto

```
bacon-love/
├── prisma/
│   ├── schema.prisma        # Modelos de base de datos
│   ├── seed.ts              # Datos iniciales
│   └── migrations/          # Migraciones de BD
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout.astro     # Layout principal
│   │   ├── Menu.astro       # Menú de navegación
│   │   └── ...
│   ├── lib/
│   │   ├── prisma.ts        # Cliente de Prisma
│   │   ├── auth.ts          # Funciones de autenticación
│   │   └── middleware.ts    # Middleware de auth
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/        # Endpoints de autenticación
│   │   │   ├── appointments/# Endpoints de citas
│   │   │   └── settings/    # Endpoints de configuración
│   │   ├── admin/
│   │   │   ├── login.astro  # Página de login
│   │   │   └── dashboard.astro # Panel admin
│   │   ├── es/
│   │   │   └── citas.astro  # Reservas en español
│   │   └── en/
│   │       └── appointments.astro # Reservas en inglés
│   └── translations/        # Archivos de idioma
├── dev.db                   # Base de datos SQLite
├── .env                     # Variables de entorno
└── astro.config.mjs         # Configuración de Astro
```

---

## 🔌 API Endpoints

### Autenticación

**POST `/api/auth/login`**
- Iniciar sesión
- Body: `{ email, password }`
- Response: Usuario + Cookie de sesión

**POST `/api/auth/logout`**
- Cerrar sesión
- Response: `{ message }`

**GET `/api/auth/me`**
- Obtener usuario actual
- Requiere autenticación
- Response: `{ user }`

### Citas/Reservas

**GET `/api/appointments`**
- Listar todas las citas
- Requiere autenticación
- Query params: `status`, `date`
- Response: `{ appointments: [] }`

**POST `/api/appointments`**
- Crear nueva cita (público)
- Body: `{ name, email, phone, date, time, guests, notes? }`
- Response: `{ appointment }`

**GET `/api/appointments/availability?date=YYYY-MM-DD`**
- Ver disponibilidad para una fecha (público)
- Response: `{ available, availability: [] }`

**PATCH `/api/appointments/:id`**
- Actualizar cita
- Requiere autenticación
- Body: Campos a actualizar
- Response: `{ appointment }`

**DELETE `/api/appointments/:id`**
- Eliminar cita
- Requiere autenticación
- Response: `{ message }`

### Configuración

**GET `/api/settings`**
- Obtener configuración (público)
- Response: `{ settings }`

**PUT `/api/settings`**
- Actualizar configuración
- Requiere autenticación
- Body: Configuración completa
- Response: `{ settings }`

---

## 🔧 Solución de Problemas

### La página no carga

```bash
# Reinicia el servidor
npm run dev
```

### Error de base de datos

```bash
# Regenera la base de datos
npx prisma migrate reset
npx prisma generate
npm run db:seed
```

### No puedo iniciar sesión

1. Verifica las credenciales
2. Revisa que la base de datos esté poblada:
   ```bash
   npm run db:seed
   ```
3. Limpia cookies del navegador

### Los horarios no se cargan

1. Verifica que la configuración tenga horarios definidos
2. Ve al dashboard → Configuración
3. Agrega horarios en formato HH:MM

### Error "No hay disponibilidad"

1. Ve a Configuración
2. Verifica que:
   - El día de la semana esté marcado como disponible
   - Haya horarios configurados
   - La capacidad total sea mayor a 0

---

## 🚀 Despliegue en Producción

### Preparación

1. **Cambia las Credenciales**
   - Edita `prisma/seed.ts`
   - Usa contraseñas seguras

2. **Variables de Entorno**
   Crea `.env.production`:
   ```env
   DATABASE_URL="file:./production.db"
   JWT_SECRET="tu-secreto-muy-seguro-y-largo"
   ```

3. **Build del Proyecto**
   ```bash
   npm run build
   ```

### Opciones de Despliegue

#### Opción 1: Vercel (Recomendado para SSR)

```bash
npm install -g vercel
vercel
```

⚠️ Nota: Necesitarás cambiar a PostgreSQL para Vercel

#### Opción 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Opción 3: VPS/Servidor Propio

```bash
# Build
npm run build

# Instala PM2
npm install -g pm2

# Inicia con PM2
pm2 start "npm run preview" --name bacon-love

# Configura inicio automático
pm2 startup
pm2 save
```

### Migrar a PostgreSQL (Para producción)

1. **Instala PostgreSQL**
2. **Actualiza `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Actualiza `.env`:**
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/baconlove"
   ```

4. **Migra:**
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

---

## 📞 Soporte y Contacto

Si tienes preguntas o necesitas ayuda:

- Revisa la documentación completa
- Consulta los logs del servidor
- Usa Prisma Studio para inspeccionar la BD: `npx prisma studio`

---

## 📝 Notas Finales

### Seguridad

- ✅ Las contraseñas se hashean con bcrypt
- ✅ Los tokens JWT son HTTP-only
- ✅ La base de datos está en .gitignore
- ⚠️ Cambia las credenciales por defecto
- ⚠️ Usa HTTPS en producción
- ⚠️ Configura JWT_SECRET fuerte en producción

### Mantenimiento

**Respaldar Base de Datos:**
```bash
cp dev.db dev.db.backup
```

**Ver Logs en Producción:**
```bash
pm2 logs bacon-love
```

**Reiniciar Aplicación:**
```bash
pm2 restart bacon-love
```

### Personalización

**Cambiar Colores:**
- Edita `src/components/layout.css`
- Variables CSS en `:root`

**Cambiar Idiomas:**
- Edita `src/translations/es.js` y `en.js`

**Agregar Campos al Formulario:**
1. Actualiza `prisma/schema.prisma`
2. Crea migración: `npx prisma migrate dev`
3. Actualiza formulario en `citas.astro`
4. Actualiza API en `/api/appointments/index.ts`

---

## ✅ Checklist de Puesta en Marcha

- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos inicializada (`npm run db:seed`)
- [ ] Servidor de desarrollo corriendo (`npm run dev`)
- [ ] Acceso al sitio principal funcionando
- [ ] Página de reservas accesible
- [ ] Login administrativo funcional con credenciales
- [ ] Dashboard muestra citas correctamente
- [ ] Configuración del sistema guardándose correctamente
- [ ] Filtros de citas funcionando
- [ ] Botones de WhatsApp abriendo correctamente
- [ ] Cambio de estado de citas funcional
- [ ] Credenciales cambiadas para producción
- [ ] Variables de entorno configuradas
- [ ] Build de producción exitoso
- [ ] Desplegado en servidor/plataforma

---

**¡Sistema Listo para Usar! 🎉**

El sistema de reservas está completamente funcional y listo para recibir reservas de tus clientes.
