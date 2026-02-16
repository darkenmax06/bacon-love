import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando la base de datos...');

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@baconlove.com' },
    update: {},
    create: {
      email: 'admin@baconlove.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('✅ Usuario administrador creado:', admin.email);

  // Crear configuración por defecto
  const settings = await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      maxSeatsTotal: 50,
      maxSeatsPerReservation: 10,
      openDays: JSON.stringify(['1', '2', '3', '4', '5', '6']), // Lunes a Sábado
      openTimes: JSON.stringify([
        '12:00', '12:30', '13:00', '13:30', '14:00',
        '20:00', '20:30', '21:00', '21:30', '22:00'
      ]),
      reservationDuration: 120,
      advanceBookingDays: 30,
    },
  });

  console.log('✅ Configuración creada');
  console.log('\n📋 Credenciales de acceso:');
  console.log('   Email: admin@baconlove.com');
  console.log('   Password: admin123');
  console.log('\n⚠️  Cambia estas credenciales en producción!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error sembrando la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
