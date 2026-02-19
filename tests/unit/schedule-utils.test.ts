import { describe, it, expect } from 'vitest';
import {
  convertLegacySchedule,
  generateTimeSlots,
  getAvailableTimesForDay,
  isDayEnabled,
  isValidTimeFormat,
  normalizeTimes,
  getDayNames,
} from '../../src/lib/schedule-utils';

// ─── convertLegacySchedule ───────────────────────────────────────────────────

describe('convertLegacySchedule', () => {
  it('marca los días habilitados correctamente', () => {
    const settings = {
      openDays: '["1","2","3"]',
      openTimes: '["12:00","14:00"]',
    };
    const result = convertLegacySchedule(settings);

    expect(result['1'].enabled).toBe(true);
    expect(result['2'].enabled).toBe(true);
    expect(result['3'].enabled).toBe(true);
    expect(result['0'].enabled).toBe(false);
    expect(result['4'].enabled).toBe(false);
  });

  it('asigna los horarios solo a los días habilitados', () => {
    const settings = {
      openDays: '["5","6"]',
      openTimes: '["20:00","21:00","22:00"]',
    };
    const result = convertLegacySchedule(settings);

    expect(result['5'].times).toEqual(['20:00', '21:00', '22:00']);
    expect(result['6'].times).toEqual(['20:00', '21:00', '22:00']);
    expect(result['0'].times).toEqual([]);
    expect(result['1'].times).toEqual([]);
  });

  it('genera entradas para los 7 días de la semana (0–6)', () => {
    const settings = {
      openDays: '[]',
      openTimes: '[]',
    };
    const result = convertLegacySchedule(settings);

    expect(Object.keys(result)).toHaveLength(7);
    for (let i = 0; i <= 6; i++) {
      expect(result[i.toString()]).toBeDefined();
    }
  });

  it('devuelve array vacío para todos los días si openDays está vacío', () => {
    const settings = {
      openDays: '[]',
      openTimes: '["12:00"]',
    };
    const result = convertLegacySchedule(settings);

    for (let i = 0; i <= 6; i++) {
      expect(result[i.toString()].enabled).toBe(false);
      expect(result[i.toString()].times).toEqual([]);
    }
  });
});

// ─── generateTimeSlots ───────────────────────────────────────────────────────

describe('generateTimeSlots', () => {
  it('genera slots con intervalo de 60 minutos', () => {
    const slots = generateTimeSlots('12:00', '14:00', 60);
    expect(slots).toEqual(['12:00', '13:00', '14:00']);
  });

  it('genera slots con intervalo de 30 minutos', () => {
    const slots = generateTimeSlots('20:00', '22:00', 30);
    expect(slots).toEqual(['20:00', '20:30', '21:00', '21:30', '22:00']);
  });

  it('devuelve solo el slot inicial cuando el intervalo excede el rango', () => {
    const slots = generateTimeSlots('12:00', '12:30', 60);
    expect(slots).toEqual(['12:00']);
  });

  it('lanza error si start >= end', () => {
    expect(() => generateTimeSlots('14:00', '12:00', 60)).toThrow(
      'Start time must be before end time'
    );
    expect(() => generateTimeSlots('12:00', '11:59', 30)).toThrow();
    expect(() => generateTimeSlots('12:00', '12:00', 60)).toThrow();
  });

  it('formatea las horas con ceros a la izquierda', () => {
    const slots = generateTimeSlots('08:00', '09:00', 60);
    expect(slots).toEqual(['08:00', '09:00']);
  });
});

// ─── getAvailableTimesForDay ─────────────────────────────────────────────────

describe('getAvailableTimesForDay', () => {
  const newFormatSettings = {
    daySchedules: JSON.stringify({
      '1': { enabled: true, times: ['12:00', '13:00', '14:00'] },
      '2': { enabled: true, times: ['20:00', '21:00'] },
      '0': { enabled: false, times: [] },
    }),
    openDays: '[]',
    openTimes: '[]',
  };

  it('devuelve los horarios del nuevo formato para un día habilitado', () => {
    expect(getAvailableTimesForDay('1', newFormatSettings)).toEqual([
      '12:00',
      '13:00',
      '14:00',
    ]);
  });

  it('devuelve array vacío para un día deshabilitado (nuevo formato)', () => {
    expect(getAvailableTimesForDay('0', newFormatSettings)).toEqual([]);
  });

  it('devuelve array vacío para un día no definido (nuevo formato)', () => {
    expect(getAvailableTimesForDay('6', newFormatSettings)).toEqual([]);
  });

  it('usa el formato legacy cuando daySchedules es null', () => {
    const legacySettings = {
      daySchedules: null,
      openDays: '["1","2","3"]',
      openTimes: '["12:00","13:00"]',
    };
    expect(getAvailableTimesForDay('1', legacySettings)).toEqual([
      '12:00',
      '13:00',
    ]);
  });

  it('devuelve array vacío para día deshabilitado (formato legacy)', () => {
    const legacySettings = {
      daySchedules: null,
      openDays: '["1","2"]',
      openTimes: '["12:00"]',
    };
    expect(getAvailableTimesForDay('0', legacySettings)).toEqual([]);
  });
});

// ─── isDayEnabled ────────────────────────────────────────────────────────────

describe('isDayEnabled', () => {
  it('retorna true para día habilitado en nuevo formato', () => {
    const settings = {
      daySchedules: JSON.stringify({
        '1': { enabled: true, times: [] },
        '0': { enabled: false, times: [] },
      }),
      openDays: '[]',
    };
    expect(isDayEnabled('1', settings)).toBe(true);
    expect(isDayEnabled('0', settings)).toBe(false);
  });

  it('retorna false para día no definido en nuevo formato', () => {
    const settings = {
      daySchedules: JSON.stringify({}),
      openDays: '["1","2","3"]',
    };
    expect(isDayEnabled('3', settings)).toBe(false);
  });

  it('usa el formato legacy cuando daySchedules es null', () => {
    const settings = {
      daySchedules: null,
      openDays: '["1","2","5"]',
    };
    expect(isDayEnabled('1', settings)).toBe(true);
    expect(isDayEnabled('5', settings)).toBe(true);
    expect(isDayEnabled('0', settings)).toBe(false);
    expect(isDayEnabled('3', settings)).toBe(false);
  });
});

// ─── isValidTimeFormat ───────────────────────────────────────────────────────

describe('isValidTimeFormat', () => {
  it('acepta formatos válidos HH:MM', () => {
    expect(isValidTimeFormat('00:00')).toBe(true);
    expect(isValidTimeFormat('12:00')).toBe(true);
    expect(isValidTimeFormat('23:59')).toBe(true);
    expect(isValidTimeFormat('9:00')).toBe(true);
    expect(isValidTimeFormat('08:30')).toBe(true);
  });

  it('rechaza formatos inválidos', () => {
    expect(isValidTimeFormat('24:00')).toBe(false);
    expect(isValidTimeFormat('12:60')).toBe(false);
    expect(isValidTimeFormat('12:5')).toBe(false);
    expect(isValidTimeFormat('1200')).toBe(false);
    expect(isValidTimeFormat('')).toBe(false);
    expect(isValidTimeFormat('abc')).toBe(false);
    expect(isValidTimeFormat('12:00:00')).toBe(false);
  });
});

// ─── normalizeTimes ──────────────────────────────────────────────────────────

describe('normalizeTimes', () => {
  it('elimina duplicados', () => {
    const result = normalizeTimes(['12:00', '13:00', '12:00', '14:00', '13:00']);
    expect(result).toEqual(['12:00', '13:00', '14:00']);
  });

  it('ordena los horarios cronológicamente', () => {
    const result = normalizeTimes(['22:00', '12:00', '20:00', '13:00']);
    expect(result).toEqual(['12:00', '13:00', '20:00', '22:00']);
  });

  it('devuelve array vacío si el input es vacío', () => {
    expect(normalizeTimes([])).toEqual([]);
  });

  it('devuelve el único elemento si no hay duplicados', () => {
    expect(normalizeTimes(['15:00'])).toEqual(['15:00']);
  });

  it('ordena correctamente horas con minutos', () => {
    const result = normalizeTimes(['12:30', '12:00', '12:15']);
    expect(result).toEqual(['12:00', '12:15', '12:30']);
  });
});

// ─── getDayNames ─────────────────────────────────────────────────────────────

describe('getDayNames', () => {
  it('devuelve 7 nombres', () => {
    expect(getDayNames('es')).toHaveLength(7);
    expect(getDayNames('en')).toHaveLength(7);
  });

  it('devuelve nombres en español por defecto', () => {
    const names = getDayNames();
    expect(names[0]).toBe('Domingo');
    expect(names[1]).toBe('Lunes');
    expect(names[6]).toBe('Sábado');
  });

  it('devuelve nombres en inglés', () => {
    const names = getDayNames('en');
    expect(names[0]).toBe('Sunday');
    expect(names[1]).toBe('Monday');
    expect(names[6]).toBe('Saturday');
  });
});
