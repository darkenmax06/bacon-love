import { p as prisma } from '../../chunks/prisma_DvNDnCKU.mjs';
import { r as requireAuth } from '../../chunks/middleware_BvOuL8dj.mjs';
import { i as isDayEnabled, g as getAvailableTimesForDay } from '../../chunks/schedule-utils_FO8jfudb.mjs';
import 'nodemailer';
export { renderers } from '../../renderers.mjs';

function createTransporter() {
  return null;
}
function formatDateForEmail(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
function confirmationTemplate(apt) {
  const formattedDate = formatDateForEmail(apt.date);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Reserva - Bacon Love</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:36px;letter-spacing:4px;color:#f3eeee;font-weight:400;">BACON LOVE</p>
              <p style="margin:8px 0 0 0;font-size:12px;letter-spacing:3px;color:rgba(243,238,238,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">Restaurante</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);border:1px solid rgba(243,238,238,0.12);border-radius:12px;overflow:hidden;">

              <!-- Card Header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 32px;background:rgba(0,0,0,0.5);border-bottom:1px solid rgba(243,238,238,0.1);">
                    <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:2px;color:rgba(243,238,238,0.45);text-transform:uppercase;font-family:Arial,sans-serif;">Tu reserva está confirmada</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:26px;color:#f3eeee;font-weight:400;">¡Hola, ${apt.name}!</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 32px 0 32px;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:rgba(243,238,238,0.75);line-height:1.7;">
                      Hemos recibido tu reserva en Bacon Love. Te contactaremos por WhatsApp para confirmar los detalles. ¡Te esperamos!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Details Grid -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,0,0,0.35);border-radius:10px;overflow:hidden;">

                      <!-- Row: Date + Time -->
                      <tr>
                        <td width="50%" style="padding:18px 20px;border-bottom:1px solid rgba(243,238,238,0.08);border-right:1px solid rgba(243,238,238,0.08);">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">Fecha</p>
                          <p style="margin:0;font-size:17px;color:#f3eeee;font-family:Arial,sans-serif;font-weight:700;">${formattedDate}</p>
                        </td>
                        <td width="50%" style="padding:18px 20px;border-bottom:1px solid rgba(243,238,238,0.08);">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">Hora</p>
                          <p style="margin:0;font-size:17px;color:#f3eeee;font-family:Arial,sans-serif;font-weight:700;">${apt.time}</p>
                        </td>
                      </tr>

                      <!-- Row: Guests + Phone -->
                      <tr>
                        <td width="50%" style="padding:18px 20px;border-right:1px solid rgba(243,238,238,0.08);">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">Personas</p>
                          <p style="margin:0;font-size:17px;color:#f3eeee;font-family:Arial,sans-serif;font-weight:700;">${apt.guests}</p>
                        </td>
                        <td width="50%" style="padding:18px 20px;">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">Teléfono</p>
                          <p style="margin:0;font-size:17px;color:#f3eeee;font-family:Arial,sans-serif;font-weight:700;">${apt.phone}</p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>

              ${apt.notes ? `
              <!-- Notes -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 32px 24px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,193,7,0.06);border-left:3px solid rgba(255,193,7,0.45);border-radius:0 8px 8px 0;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.5);text-transform:uppercase;font-family:Arial,sans-serif;">Notas</p>
                          <p style="margin:0;font-size:14px;color:rgba(243,238,238,0.85);font-family:Arial,sans-serif;line-height:1.6;">${apt.notes}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- Footer message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 32px 32px 32px;">
                    <p style="margin:0;font-size:13px;color:rgba(243,238,238,0.4);font-family:Arial,sans-serif;line-height:1.6;">
                      Si necesitas modificar o cancelar tu reserva, contáctanos por WhatsApp al número que nos proporcionaste.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(243,238,238,0.25);font-family:Arial,sans-serif;letter-spacing:1px;">BACON LOVE · Este correo fue generado automáticamente</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function adminNotificationTemplate(apt) {
  const formattedDate = formatDateForEmail(apt.date);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Reserva - Bacon Love Admin</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 24px 0;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:30px;letter-spacing:4px;color:#f3eeee;font-weight:400;">BACON LOVE</p>
              <p style="margin:6px 0 0 0;font-size:11px;letter-spacing:3px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Admin · Nueva Reserva</p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="padding:0 0 20px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(46,125,50,0.15);border:1px solid rgba(46,125,50,0.4);border-radius:8px;">
                <tr>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:14px;color:#90ee90;font-weight:700;letter-spacing:0.5px;">✓ Nueva reserva recibida</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);border:1px solid rgba(243,238,238,0.12);border-radius:12px;overflow:hidden;">

              <!-- Client info -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 28px;border-bottom:1px solid rgba(243,238,238,0.08);">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Cliente</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#f3eeee;">${apt.name}</p>
                    <p style="margin:4px 0 0 0;font-size:12px;color:rgba(243,238,238,0.35);letter-spacing:1px;">ID: #${apt.id.substring(0, 8).toUpperCase()}</p>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,0,0,0.35);border-radius:10px;overflow:hidden;">

                      <tr>
                        <td width="50%" style="padding:14px 18px;border-bottom:1px solid rgba(243,238,238,0.07);border-right:1px solid rgba(243,238,238,0.07);">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Fecha</p>
                          <p style="margin:0;font-size:15px;color:#f3eeee;font-weight:700;">${formattedDate}</p>
                        </td>
                        <td width="50%" style="padding:14px 18px;border-bottom:1px solid rgba(243,238,238,0.07);">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Hora</p>
                          <p style="margin:0;font-size:15px;color:#f3eeee;font-weight:700;">${apt.time}</p>
                        </td>
                      </tr>

                      <tr>
                        <td width="50%" style="padding:14px 18px;border-right:1px solid rgba(243,238,238,0.07);">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Personas</p>
                          <p style="margin:0;font-size:15px;color:#f3eeee;font-weight:700;">${apt.guests}</p>
                        </td>
                        <td width="50%" style="padding:14px 18px;">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Estado</p>
                          <p style="margin:0;font-size:15px;color:#ffc107;font-weight:700;">Pendiente</p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 28px 20px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,0,0,0.25);border-radius:10px;overflow:hidden;">
                      <tr>
                        <td width="50%" style="padding:14px 18px;border-right:1px solid rgba(243,238,238,0.07);">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Email</p>
                          <p style="margin:0;font-size:14px;color:#f3eeee;word-break:break-all;">${apt.email}</p>
                        </td>
                        <td width="50%" style="padding:14px 18px;">
                          <p style="margin:0 0 3px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.4);text-transform:uppercase;">Teléfono</p>
                          <p style="margin:0;font-size:14px;color:#f3eeee;">${apt.phone}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${apt.notes ? `
              <!-- Notes -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 28px 20px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,193,7,0.06);border-left:3px solid rgba(255,193,7,0.45);border-radius:0 8px 8px 0;">
                      <tr>
                        <td style="padding:12px 16px;">
                          <p style="margin:0 0 5px 0;font-size:10px;letter-spacing:1.5px;color:rgba(243,238,238,0.5);text-transform:uppercase;">Notas del cliente</p>
                          <p style="margin:0;font-size:13px;color:rgba(243,238,238,0.85);line-height:1.6;">${apt.notes}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- WhatsApp CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 28px 28px 28px;">
                    <a href="https://wa.me/${apt.phone.replace(/\D/g, "")}"
                       style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#25D366 0%,#20b358 100%);color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:0.3px;">
                      Contactar por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(243,238,238,0.2);letter-spacing:1px;">BACON LOVE · Notificación automática del sistema de reservas</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
async function sendConfirmationEmail(apt) {
  const transporter = createTransporter();
  if (!transporter) return;
  const from = undefined                         ;
  await transporter.sendMail({
    from: `Bacon Love <${from}>`,
    to: apt.email,
    subject: `Confirmación de reserva — ${apt.date}`,
    html: confirmationTemplate(apt)
  });
}
async function sendAdminNotification(apt, adminEmail) {
  if (!adminEmail) return;
  const transporter = createTransporter();
  if (!transporter) return;
  const from = undefined                         ;
  await transporter.sendMail({
    from: `Bacon Love <${from}>`,
    to: adminEmail,
    subject: `Nueva reserva — ${apt.name} · ${apt.date} ${apt.time}`,
    html: adminNotificationTemplate(apt)
  });
}

const GET = async ({ cookies, url }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const status = url.searchParams.get("status");
    const date = url.searchParams.get("date");
    const where = {};
    if (status) {
      where.status = status;
    }
    if (date) {
      const startDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
      const endDate = /* @__PURE__ */ new Date(date + "T23:59:59.999Z");
      where.date = {
        gte: startDate,
        lte: endDate
      };
    }
    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [
        { date: "asc" },
        { time: "asc" }
      ]
    });
    return new Response(
      JSON.stringify({ appointments }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error obteniendo citas:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, notes } = body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!/^\+?[0-9\s-]+$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Número de teléfono inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const settings = await prisma.settings.findUnique({
      where: { id: "default" }
    });
    if (!settings) {
      return new Response(
        JSON.stringify({ error: "Configuración no encontrada" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    if (guests > settings.maxSeatsPerReservation) {
      return new Response(
        JSON.stringify({
          error: `Máximo ${settings.maxSeatsPerReservation} personas por reserva`
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const appointmentDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
    const now = /* @__PURE__ */ new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (appointmentDate < todayUTC) {
      return new Response(
        JSON.stringify({ error: "No se pueden hacer reservas en fechas pasadas" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (appointmentDate.getTime() === todayUTC.getTime()) {
      const [slotHours, slotMinutes] = time.split(":").map(Number);
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
      const slotTotalMinutes = slotHours * 60 + slotMinutes;
      const nowTotalMinutes = nowHours * 60 + nowMinutes;
      if (slotTotalMinutes <= nowTotalMinutes) {
        return new Response(
          JSON.stringify({ error: "Ese horario ya ha pasado hoy" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    const maxDate = /* @__PURE__ */ new Date();
    maxDate.setDate(maxDate.getDate() + settings.advanceBookingDays);
    if (appointmentDate > maxDate) {
      return new Response(
        JSON.stringify({
          error: `Solo se pueden hacer reservas con ${settings.advanceBookingDays} días de anticipación`
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const dayOfWeek = appointmentDate.getUTCDay().toString();
    if (!isDayEnabled(dayOfWeek, settings)) {
      return new Response(
        JSON.stringify({ error: "El restaurante no está disponible ese día" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const startDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
    const endDate = /* @__PURE__ */ new Date(date + "T23:59:59.999Z");
    const closedDate = await prisma.closedDate.findFirst({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    if (closedDate) {
      return new Response(
        JSON.stringify({ error: `Restaurante cerrado: ${closedDate.reason}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const availableTimes = getAvailableTimesForDay(dayOfWeek, settings);
    if (!availableTimes.includes(time)) {
      return new Response(
        JSON.stringify({ error: "Horario no disponible" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        },
        time,
        status: {
          not: "cancelled"
        }
      }
    });
    const totalSeatsBooked = existingAppointments.reduce(
      (sum, apt) => sum + apt.guests,
      0
    );
    if (totalSeatsBooked + guests > settings.maxSeatsTotal) {
      return new Response(
        JSON.stringify({
          error: "No hay suficientes mesas disponibles para ese horario",
          availableSeats: settings.maxSeatsTotal - totalSeatsBooked
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: appointmentDate,
        time,
        guests: parseInt(guests),
        notes: notes || "",
        status: "pending"
      }
    });
    const aptForEmail = {
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date,
      time: appointment.time,
      guests: appointment.guests,
      notes: appointment.notes || void 0
    };
    Promise.all([
      sendConfirmationEmail(aptForEmail),
      settings.adminEmail ? sendAdminNotification(aptForEmail, settings.adminEmail) : Promise.resolve()
    ]).catch((err) => console.error("Error sending emails:", err));
    return new Response(
      JSON.stringify({ appointment }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creando cita:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
