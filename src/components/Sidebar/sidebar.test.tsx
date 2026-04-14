import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import ReduxProvider from '@/store/ReduxProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Sidebar component', () => {
  test('Отрисовка имени пользователя по умолчанию (Гость)', () => {
    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>,
    );

    expect(screen.getByText('Гость')).toBeInTheDocument();
  });

  test('Отрисовка трёх плейлистов', () => {
    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>,
    );

    const playlistImages = screen.getAllByAltText("day's playlist");
    expect(playlistImages).toHaveLength(3);
  });

  test('Плейлисты имеют правильные ссылки', () => {
    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>,
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/music/category/2');
    expect(links[1]).toHaveAttribute('href', '/music/category/3');
    expect(links[2]).toHaveAttribute('href', '/music/category/4');
  });

  test('Клик по иконке выхода обрабатывается', () => {
  render(
    <ReduxProvider>
      <Sidebar />
    </ReduxProvider>
  );

  const exitButton = screen.getByTestId('sidebar-exit');
  fireEvent.click(exitButton);
  
  expect(localStorage.getItem('userId')).toBeNull();
});
});
