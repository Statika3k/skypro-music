import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime, getUniqueValuesByKey, getUniqueYears } from './helper';

describe('formatTime', () => {
  it('Добавление нуля, если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время < 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  it('Форматирует время ровно 1 минута', () => {
    expect(formatTime(60)).toBe('1:00');
  });
  it('Форматирует время > 10 минут', () => {
    expect(formatTime(605)).toBe('10:05');
  });
});

describe('getUniqueValuesByKey', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Track 1',
      author: 'Author 1',
      release_date: '2020-01-01',
      genre: ['Rock', 'Pop'],
      duration_in_seconds: 180,
      album: 'Album 1',
      logo: null,
      track_file: 'track1.mp3',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Track 2',
      author: 'Author 2',
      release_date: '2021-01-01',
      genre: ['Rock', 'Jazz'],
      duration_in_seconds: 200,
      album: 'Album 2',
      logo: null,
      track_file: 'track2.mp3',
      stared_user: [],
    },
    {
      _id: 3,
      name: 'Track 3',
      author: 'Author 1',
      release_date: '2022-01-01',
      genre: ['Pop'],
      duration_in_seconds: 220,
      album: 'Album 3',
      logo: null,
      track_file: 'track3.mp3',
      stared_user: [],
    },
  ];

  it('Возвращает уникальных авторов', () => {
    const result = getUniqueValuesByKey(mockTracks, 'author');
    expect(result).toEqual(['Author 1', 'Author 2']);
  });

  it('Возвращает уникальные жанры (из массивов)', () => {
    const result = getUniqueValuesByKey(mockTracks, 'genre');
    expect(result).toEqual(['Rock', 'Pop', 'Jazz']);
  });

  it('Возвращает пустой массив для пустого массива треков', () => {
    const result = getUniqueValuesByKey([], 'author');
    expect(result).toEqual([]);
  });

  it('Игнорирует пустые значения', () => {
    const tracksWithEmpty: TrackType[] = [
      { ...mockTracks[0], author: '' },
      { ...mockTracks[1], author: 'Author 2' },
    ];
    const result = getUniqueValuesByKey(tracksWithEmpty, 'author');
    expect(result).toEqual(['Author 2']);
  });
});

describe('getUniqueYears', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Track 1',
      author: 'Author 1',
      release_date: '2020-01-01',
      genre: ['Rock'],
      duration_in_seconds: 180,
      album: 'Album 1',
      logo: null,
      track_file: 'track1.mp3',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Track 2',
      author: 'Author 2',
      release_date: '2019-01-01',
      genre: ['Pop'],
      duration_in_seconds: 200,
      album: 'Album 2',
      logo: null,
      track_file: 'track2.mp3',
      stared_user: [],
    },
    {
      _id: 3,
      name: 'Track 3',
      author: 'Author 3',
      release_date: '2020-06-01',
      genre: ['Jazz'],
      duration_in_seconds: 220,
      album: 'Album 3',
      logo: null,
      track_file: 'track3.mp3',
      stared_user: [],
    },
    {
      _id: 4,
      name: 'Track 4',
      author: 'Author 4',
      release_date: '', 
      genre: ['Rock'],
      duration_in_seconds: 180,
      album: 'Album 4',
      logo: null,
      track_file: 'track4.mp3',
      stared_user: [],
    },
  ];

  it('Возвращает уникальные годы в порядке убывания', () => {
    const result = getUniqueYears(mockTracks);
    expect(result).toEqual(['2020 год', '2019 год']);
  });

  it('Игнорирует треки без release_date', () => {
    const result = getUniqueYears(mockTracks);
    expect(result).not.toContain('');
  });

  it('Возвращает пустой массив для пустого массива треков', () => {
    const result = getUniqueYears([]);
    expect(result).toEqual([]);
  });
});
