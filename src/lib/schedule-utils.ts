/**
 * Schedule Utilities
 * Helper functions for managing day-specific schedules and time slots
 */

export interface DaySchedule {
  enabled: boolean;
  times: string[];
}

export interface DaySchedules {
  [day: string]: DaySchedule;
}

/**
 * Convert legacy openDays and openTimes to new daySchedules format
 */
export function convertLegacySchedule(settings: {
  openDays: string;
  openTimes: string;
}): DaySchedules {
  const openDays = JSON.parse(settings.openDays) as string[];
  const openTimes = JSON.parse(settings.openTimes) as string[];

  const daySchedules: DaySchedules = {};

  // Initialize all days (0-6)
  for (let day = 0; day <= 6; day++) {
    const dayStr = day.toString();
    daySchedules[dayStr] = {
      enabled: openDays.includes(dayStr),
      times: openDays.includes(dayStr) ? openTimes : [],
    };
  }

  return daySchedules;
}

/**
 * Generate time slots for a given range and interval
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  intervalMinutes: number
): string[] {
  const slots: string[] = [];

  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let current = startH * 60 + startM; // Convert to minutes
  const end = endH * 60 + endM;

  // Validate input
  if (current >= end) {
    throw new Error('Start time must be before end time');
  }

  while (current <= end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    slots.push(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    );
    current += intervalMinutes;
  }

  return slots;
}

/**
 * Get available times for a specific day from daySchedules
 * Falls back to legacy openDays/openTimes if daySchedules is null
 */
export function getAvailableTimesForDay(
  dayOfWeek: string,
  settings: {
    daySchedules: string | null;
    openDays: string;
    openTimes: string;
  }
): string[] {
  if (settings.daySchedules) {
    const daySchedules = JSON.parse(settings.daySchedules) as DaySchedules;
    const daySchedule = daySchedules[dayOfWeek];

    if (!daySchedule || !daySchedule.enabled) {
      return [];
    }

    return daySchedule.times;
  } else {
    // Fall back to legacy system
    const openDays = JSON.parse(settings.openDays) as string[];
    const openTimes = JSON.parse(settings.openTimes) as string[];

    if (!openDays.includes(dayOfWeek)) {
      return [];
    }

    return openTimes;
  }
}

/**
 * Check if a day is enabled in schedules
 */
export function isDayEnabled(
  dayOfWeek: string,
  settings: {
    daySchedules: string | null;
    openDays: string;
  }
): boolean {
  if (settings.daySchedules) {
    const daySchedules = JSON.parse(settings.daySchedules) as DaySchedules;
    const daySchedule = daySchedules[dayOfWeek];
    return daySchedule?.enabled || false;
  } else {
    // Fall back to legacy system
    const openDays = JSON.parse(settings.openDays) as string[];
    return openDays.includes(dayOfWeek);
  }
}

/**
 * Validate time format (HH:MM)
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Remove duplicate times and sort them
 */
export function normalizeTimes(times: string[]): string[] {
  const uniqueTimes = Array.from(new Set(times));
  return uniqueTimes.sort((a, b) => {
    const [aH, aM] = a.split(':').map(Number);
    const [bH, bM] = b.split(':').map(Number);
    return aH * 60 + aM - (bH * 60 + bM);
  });
}

/**
 * Get day names in Spanish
 */
export function getDayNames(lang: 'es' | 'en' = 'es'): string[] {
  if (lang === 'en') {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }
  return ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
}
