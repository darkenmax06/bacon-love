# 🧪 Guía de Pruebas del Sistema de Reservas

## ✅ Checklist de Pruebas Completas

### 1. PRUEBAS DE VISUALIZACIÓN EN DASHBOARD
**URL:** http://localhost:4322/admin/dashboard

- [ ] **Verificar fechas correctas:**
  - Las citas muestran 15/02/2026 (no 14/02/2026)
  - Las citas muestran 16/02/2026 (no 15/02/2026)
  - Las fechas existentes (26, 27, 28/02) se ven correctamente

- [ ] **Verificar información completa:**
  - Nombre del cliente visible
  - Email y teléfono visible
  - Hora correcta
  - Número de personas correcto
  - Estado visible (pendiente/confirmado/cancelado)
  - Notas se muestran si existen

---

### 2. PRUEBAS DE FILTROS

**A. Filtro por Estado:**
- [ ] Seleccionar "Pendiente" → Solo muestra citas pendientes
- [ ] Seleccionar "Confirmado" → Solo muestra citas confirmadas
- [ ] Seleccionar "Cancelado" → Solo muestra citas canceladas
- [ ] Seleccionar "Todos los estados" → Muestra todas

**B. Filtro por Fecha:**
- [ ] Seleccionar 15/02/2026 → Solo muestra las citas de hoy
- [ ] Seleccionar 16/02/2026 → Solo muestra las citas de mañana
- [ ] Seleccionar 26/02/2026 → Solo muestra las citas del 26
- [ ] Limpiar filtro → Muestra todas las citas

**C. Combinación de Filtros:**
- [ ] Estado "Pendiente" + Fecha 15/02/2026
- [ ] Estado "Confirmado" + Fecha específica

---

### 3. PRUEBAS DE CAMBIO DE ESTADO

**En cualquier cita:**
- [ ] Cambiar de "Pendiente" a "Confirmado"
  - ✓ El selector cambia inmediatamente
  - ✓ La lista se recarga
  - ✓ El badge de estado se actualiza (color verde)

- [ ] Cambiar de "Confirmado" a "Cancelado"
  - ✓ El selector cambia inmediatamente
  - ✓ La lista se recarga
  - ✓ El badge de estado se actualiza (color rojo)

- [ ] Cambiar de "Cancelado" a "Pendiente"
  - ✓ El selector cambia inmediatamente
  - ✓ La lista se recarga
  - ✓ El badge de estado se actualiza (color amarillo)

---

### 4. PRUEBAS DE BOTÓN WHATSAPP

**Para cualquier cita:**
- [ ] Click en botón "WhatsApp"
  - ✓ Se abre WhatsApp Web o la app
  - ✓ El número es el correcto
  - ✓ Está listo para enviar mensaje

---

### 5. PRUEBAS DE ELIMINACIÓN

**Seleccionar una cita de prueba:**
- [ ] Click en botón "Eliminar"
  - ✓ Aparece confirmación "¿Estás seguro de eliminar esta cita?"
  - ✓ Click en "Cancelar" → No elimina
  - ✓ Click en "Aceptar" → Elimina la cita
  - ✓ La lista se recarga sin esa cita

---

### 6. PRUEBAS DE DISPONIBILIDAD (Cliente)

**URL:** http://localhost:4322/es/citas

**A. Validación de Formulario:**
- [ ] Intentar enviar sin llenar campos → Muestra errores
- [ ] Llenar todos los campos requeridos → Permite enviar

**B. Selección de Fecha:**
- [ ] Seleccionar hoy (15/02) → Carga horarios disponibles
- [ ] Seleccionar mañana (16/02) → Carga horarios disponibles
- [ ] Los horarios muestran "plazas disponibles" (no "mesas")

**C. Verificar Disponibilidad Real:**
- [ ] Para 20:00 hoy:
  - Debe mostrar: "20:00 (48 plazas disponibles)"
  - (50 total - 2 de la reserva existente = 48)

**D. Validaciones:**
- [ ] Intentar reservar más personas que el máximo → Muestra error
- [ ] Intentar reservar en fecha pasada → Muestra error
- [ ] Intentar reservar un día cerrado → No hay horarios disponibles

**E. Crear Reserva Nueva:**
- [ ] Llenar formulario:
  - Nombre: "Test Usuario"
  - Email: "test@test.com"
  - Teléfono: "+34600111222"
  - Fecha: Mañana (16/02)
  - Hora: Cualquier horario disponible
  - Personas: 4
  - Notas: "Prueba de reserva"

- [ ] Enviar formulario
  - ✓ Muestra mensaje "¡Reserva confirmada!"
  - ✓ El formulario se limpia
  - ✓ Los horarios se resetean

- [ ] Ir al dashboard y verificar:
  - ✓ La nueva reserva aparece
  - ✓ La fecha es correcta (16/02/2026, no 15/02)
  - ✓ Todos los datos son correctos

---

### 7. PRUEBAS DE CONFIGURACIÓN

**Pestaña "Configuración" en Dashboard:**

**A. Ver Configuración Actual:**
- [ ] Se cargan los valores actuales:
  - Capacidad Total
  - Máximo por Reserva
  - Días disponibles (checkboxes marcados)
  - Horarios (lista de horarios)
  - Duración de reserva
  - Días de anticipación

**B. Modificar Configuración:**
- [ ] Cambiar "Capacidad Total" a 40
- [ ] Cambiar "Máximo por Reserva" a 8
- [ ] Desmarcar "Domingo"
- [ ] Agregar un horario nuevo: "22:30"
- [ ] Click en "Guardar Configuración"
  - ✓ Muestra "Configuración guardada exitosamente"

**C. Verificar Cambios:**
- [ ] Recargar la página
  - ✓ Los cambios se mantienen
- [ ] Ir a /es/citas
  - ✓ Al seleccionar una fecha, el nuevo horario aparece
  - ✓ El máximo de personas es 8

**D. Revertir Cambios:**
- [ ] Volver a poner:
  - Capacidad Total: 50
  - Máximo por Reserva: 10
  - Marcar Domingo si era necesario
  - Quitar el horario de prueba
- [ ] Guardar

---

### 8. PRUEBAS DE CAPACIDAD Y OVERBOOKING

**Verificar que no permite sobreventa:**

1. [ ] Crear API call manual o usar formulario varias veces
   - Reservar 20 personas para 20:00 mañana
   - Reservar 20 personas más para 20:00 mañana
   - Intentar reservar 15 personas más para 20:00 mañana
   - ✓ Debe mostrar error "No hay suficientes mesas disponibles"
   - ✓ Solo permite hasta 50 personas totales

2. [ ] Verificar en disponibilidad:
   - Para ese horario debe mostrar "10 plazas disponibles" o menos

---

### 9. PRUEBAS EN INGLÉS

**URL:** http://localhost:4322/en/appointments

- [ ] La página carga en inglés
- [ ] Los labels están traducidos
- [ ] Los horarios muestran "seats available" (no "tables")
- [ ] El formulario funciona igual que en español
- [ ] Los mensajes de error están en inglés

---

### 10. PRUEBAS DE AUTENTICACIÓN

**A. Cerrar Sesión:**
- [ ] En dashboard, click en "Cerrar Sesión"
  - ✓ Redirige a /admin/login
  - ✓ No se puede acceder a /admin/dashboard sin login

**B. Login Incorrecto:**
- [ ] Intentar login con contraseña incorrecta
  - ✓ Muestra error
  - ✓ No permite acceso

**C. Login Correcto:**
- [ ] Login con credenciales correctas
  - ✓ Redirige a dashboard
  - ✓ Se puede navegar normalmente

---

### 11. PRUEBAS DE VALIDACIÓN DE DATOS

**En formulario de cliente:**

- [ ] Email inválido (sin @) → Error
- [ ] Teléfono con letras → Error
- [ ] Número de personas 0 o negativo → Error
- [ ] Número de personas mayor al máximo → Error
- [ ] Fecha vacía → Error
- [ ] Horario no seleccionado → Error

---

## 📊 Resumen de Resultados

Después de completar todas las pruebas, llena:

**FUNCIONALIDADES CORRECTAS:**
- [ ] Fechas se muestran correctamente en dashboard
- [ ] Filtros funcionan
- [ ] Cambio de estados funciona
- [ ] Botón WhatsApp funciona
- [ ] Eliminación funciona
- [ ] Disponibilidad se calcula correctamente
- [ ] Reservas se crean correctamente
- [ ] Configuración se guarda correctamente
- [ ] Validaciones funcionan
- [ ] Traducción funciona
- [ ] Autenticación funciona

**PROBLEMAS ENCONTRADOS:**
(Anota aquí cualquier problema que encuentres)

---

## 🎯 Prueba Rápida (5 minutos)

Si no tienes tiempo para todas las pruebas:

1. [ ] Dashboard → Verifica fechas correctas (no día anterior)
2. [ ] Formulario cliente → Crea una reserva para mañana
3. [ ] Dashboard → Verifica que aparece con fecha correcta
4. [ ] Cambia estado a "Confirmado"
5. [ ] Configura horario → Guarda cambios

Si estas 5 pruebas funcionan, el sistema está operativo.

---

## ✅ SISTEMA LISTO

Si todas las pruebas pasaron:
- ✅ Bug de fecha corregido
- ✅ Sistema completamente funcional
- ✅ Listo para usar en producción (después de cambiar credenciales)
