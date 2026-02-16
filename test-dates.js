// Script de prueba para verificar fechas
// Ejecuta: node test-dates.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDates() {
  console.log('=== PRUEBA DE FECHAS ===\n');

  // 1. Ver todas las citas actuales
  console.log('1. Citas existentes en la base de datos:');
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' }
  });

  if (appointments.length === 0) {
    console.log('   No hay citas registradas aún\n');
  } else {
    appointments.forEach(apt => {
      const date = new Date(apt.date);
      console.log(`   - ID: ${apt.id}`);
      console.log(`     Nombre: ${apt.name}`);
      console.log(`     Fecha en DB (ISO): ${apt.date.toISOString()}`);
      console.log(`     Fecha UTC: ${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`);
      console.log(`     Hora: ${apt.time}`);
      console.log(`     Personas: ${apt.guests}`);
      console.log(`     Estado: ${apt.status}\n`);
    });
  }

  // 2. Crear una cita de prueba para hoy
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const testDate = new Date(todayStr + 'T00:00:00.000Z');

  console.log(`2. Creando cita de prueba para HOY (${todayStr}):`);

  try {
    const newApt = await prisma.appointment.create({
      data: {
        name: 'Prueba de Fecha - HOY',
        email: 'prueba@test.com',
        phone: '+34600000000',
        date: testDate,
        time: '20:00',
        guests: 2,
        notes: 'Cita de prueba para verificar fecha',
        status: 'pending'
      }
    });

    console.log('   ✅ Cita creada correctamente');
    console.log(`   ID: ${newApt.id}`);
    console.log(`   Fecha guardada (ISO): ${newApt.date.toISOString()}`);

    const savedDate = new Date(newApt.date);
    console.log(`   Fecha UTC: ${savedDate.getUTCFullYear()}-${String(savedDate.getUTCMonth()+1).padStart(2,'0')}-${String(savedDate.getUTCDate()).padStart(2,'0')}`);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // 3. Crear una cita para mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;
  const tomorrowDate = new Date(tomorrowStr + 'T00:00:00.000Z');

  console.log(`\n3. Creando cita de prueba para MAÑANA (${tomorrowStr}):`);

  try {
    const newApt = await prisma.appointment.create({
      data: {
        name: 'Prueba de Fecha - MAÑANA',
        email: 'prueba2@test.com',
        phone: '+34600000001',
        date: tomorrowDate,
        time: '21:00',
        guests: 4,
        notes: 'Cita de prueba para mañana',
        status: 'pending'
      }
    });

    console.log('   ✅ Cita creada correctamente');
    console.log(`   ID: ${newApt.id}`);
    console.log(`   Fecha guardada (ISO): ${newApt.date.toISOString()}`);

    const savedDate = new Date(newApt.date);
    console.log(`   Fecha UTC: ${savedDate.getUTCFullYear()}-${String(savedDate.getUTCMonth()+1).padStart(2,'0')}-${String(savedDate.getUTCDate()).padStart(2,'0')}`);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n=== FIN DE PRUEBAS ===');
  console.log('\nAhora ve al dashboard (http://localhost:4322/admin/dashboard)');
  console.log('y verifica que las fechas aparecen correctamente:\n');
  console.log(`- Hoy: ${todayStr}`);
  console.log(`- Mañana: ${tomorrowStr}`);

  await prisma.$disconnect();
}

testDates().catch(console.error);
