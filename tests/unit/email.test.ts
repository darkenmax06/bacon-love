import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// ─── Hoist mock vars so they're available inside vi.mock factory ──────────────

const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-msg-id' });
  const mockCreateTransport = vi.fn().mockReturnValue({ sendMail: mockSendMail });
  return { mockSendMail, mockCreateTransport };
});

vi.mock('nodemailer', () => ({
  default: { createTransport: mockCreateTransport },
}));

import { sendConfirmationEmail, sendAdminNotification } from '../../src/lib/email';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockApt = {
  id: 'apt-test-123',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+34666777888',
  date: '2030-12-15',
  time: '20:00',
  guests: 2,
};

const mockAptWithNotes = { ...mockApt, notes: 'Sin gluten por favor' };

const OAUTH_ENV = {
  GMAIL_USER: 'info.nexora.devs@gmail.com',
  GOOGLE_CLIENT_ID: 'test-client-id',
  GOOGLE_CLIENT_SECRET: 'test-client-secret',
  GOOGLE_REFRESH_TOKEN: 'test-refresh-token',
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function setOAuthEnv() {
  Object.assign(process.env, OAUTH_ENV);
}

function clearOAuthEnv() {
  for (const key of Object.keys(OAUTH_ENV)) {
    delete process.env[key];
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Email Service — Google OAuth2', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Restore default implementations after reset
    mockSendMail.mockResolvedValue({ messageId: 'test-msg-id' });
    mockCreateTransport.mockReturnValue({ sendMail: mockSendMail });
    setOAuthEnv();
  });

  afterEach(() => {
    clearOAuthEnv();
  });

  // ── Transporter creation ────────────────────────────────────────────────────

  describe('createTransporter (via sendConfirmationEmail)', () => {
    it('crea el transporte con OAuth2 cuando las credenciales están presentes', async () => {
      await sendConfirmationEmail(mockApt);

      expect(mockCreateTransport).toHaveBeenCalledWith(
        expect.objectContaining({
          service: 'gmail',
          auth: expect.objectContaining({
            type: 'OAuth2',
            user: OAUTH_ENV.GMAIL_USER,
            clientId: OAUTH_ENV.GOOGLE_CLIENT_ID,
            clientSecret: OAUTH_ENV.GOOGLE_CLIENT_SECRET,
            refreshToken: OAUTH_ENV.GOOGLE_REFRESH_TOKEN,
          }),
        })
      );
    });

    it('omite el envío si faltan las credenciales OAuth2', async () => {
      clearOAuthEnv();

      await expect(sendConfirmationEmail(mockApt)).resolves.toBeUndefined();
      expect(mockSendMail).not.toHaveBeenCalled();
    });

    it('omite el envío si GMAIL_USER no está configurado', async () => {
      delete process.env.GMAIL_USER;

      await expect(sendConfirmationEmail(mockApt)).resolves.toBeUndefined();
      expect(mockSendMail).not.toHaveBeenCalled();
    });
  });

  // ── sendConfirmationEmail ───────────────────────────────────────────────────

  describe('sendConfirmationEmail', () => {
    it('envía el correo al email del cliente', async () => {
      await sendConfirmationEmail(mockApt);

      expect(mockSendMail).toHaveBeenCalledOnce();
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: mockApt.email,
        })
      );
    });

    it('usa GMAIL_USER como remitente', async () => {
      await sendConfirmationEmail(mockApt);

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: `Bacon Love <${OAUTH_ENV.GMAIL_USER}>`,
        })
      );
    });

    it('incluye la fecha en el asunto', async () => {
      await sendConfirmationEmail(mockApt);

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining(mockApt.date),
        })
      );
    });

    it('incluye el nombre del cliente en el HTML', async () => {
      await sendConfirmationEmail(mockApt);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain(mockApt.name);
    });

    it('incluye la hora de la reserva en el HTML', async () => {
      await sendConfirmationEmail(mockApt);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain(mockApt.time);
    });

    it('incluye las notas cuando están presentes', async () => {
      await sendConfirmationEmail(mockAptWithNotes);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain(mockAptWithNotes.notes);
    });

    it('no incluye sección de notas si no hay notas', async () => {
      await sendConfirmationEmail(mockApt);

      const call = mockSendMail.mock.calls[0][0];
      // notes section only renders when notes exist
      expect(call.html).not.toContain('Sin gluten por favor');
    });
  });

  // ── sendAdminNotification ───────────────────────────────────────────────────

  describe('sendAdminNotification', () => {
    it('envía la notificación al email de administrador', async () => {
      await sendAdminNotification(mockApt, 'admin@baconlove.com');

      expect(mockSendMail).toHaveBeenCalledOnce();
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'admin@baconlove.com',
        })
      );
    });

    it('usa GMAIL_USER como remitente', async () => {
      await sendAdminNotification(mockApt, 'admin@baconlove.com');

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: `Bacon Love <${OAUTH_ENV.GMAIL_USER}>`,
        })
      );
    });

    it('incluye el nombre del cliente en el asunto', async () => {
      await sendAdminNotification(mockApt, 'admin@baconlove.com');

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining(mockApt.name),
        })
      );
    });

    it('incluye la fecha y hora en el asunto', async () => {
      await sendAdminNotification(mockApt, 'admin@baconlove.com');

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining(mockApt.time),
        })
      );
    });

    it('incluye el id del cliente en el HTML', async () => {
      await sendAdminNotification(mockApt, 'admin@baconlove.com');

      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain(mockApt.id.substring(0, 8).toUpperCase());
    });

    it('no envía si el email de administrador está vacío', async () => {
      await sendAdminNotification(mockApt, '');

      expect(mockSendMail).not.toHaveBeenCalled();
    });

    it('incluye las notas del cliente cuando están presentes', async () => {
      await sendAdminNotification(mockAptWithNotes, 'admin@baconlove.com');

      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain(mockAptWithNotes.notes);
    });
  });
});
