function getAvailableTimesForDay(dayOfWeek, settings) {
  if (settings.daySchedules) {
    const daySchedules = JSON.parse(settings.daySchedules);
    const daySchedule = daySchedules[dayOfWeek];
    if (!daySchedule || !daySchedule.enabled) {
      return [];
    }
    return daySchedule.times;
  } else {
    const openDays = JSON.parse(settings.openDays);
    const openTimes = JSON.parse(settings.openTimes);
    if (!openDays.includes(dayOfWeek)) {
      return [];
    }
    return openTimes;
  }
}
function isDayEnabled(dayOfWeek, settings) {
  if (settings.daySchedules) {
    const daySchedules = JSON.parse(settings.daySchedules);
    const daySchedule = daySchedules[dayOfWeek];
    return daySchedule?.enabled || false;
  } else {
    const openDays = JSON.parse(settings.openDays);
    return openDays.includes(dayOfWeek);
  }
}

export { getAvailableTimesForDay as g, isDayEnabled as i };
