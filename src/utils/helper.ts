import { TrackType } from '@/sharedTypes/sharedTypes';

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  // Используем set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  //проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    //Если значение - мвссив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v && typeof v === 'string') {
          uniqueValues.add(v);
        }
      });
    }
    //Если значение - строка
    else if (typeof value === 'string' && value) {
      uniqueValues.add(value);
    }
  });

  //Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export function getUniqueYears(tracks: TrackType[]): string[] {
  const years = tracks.map(track => {
    if (track.release_date) {
      const year = track.release_date.split('-')[0];
      return `${year} год`;
    }
    return '';
  }).filter(year => year !== '');
  
  return [...new Set(years)].sort((a, b) => {
    const yearA = parseInt(a.split(' ')[0]);
    const yearB = parseInt(b.split(' ')[0]);
    return yearB - yearA;
  });
}
  