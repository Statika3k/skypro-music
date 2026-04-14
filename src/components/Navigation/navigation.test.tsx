import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import ReduxProvider from '@/store/ReduxProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Navigation component', () => {
  test('Отрисовка логотипа', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('Отрисовка кнопки "Главное"', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    expect(screen.getByText('Главное')).toBeInTheDocument();
    expect(screen.getByText('Главное')).toHaveAttribute('href', '/music/main');
  });

  test('Неавторизованный пользователь видит "Войти"', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toHaveAttribute('href', '/auth/signin');
  });

  test('Неавторизованный пользователь не видит "Мой плейлист"', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    expect(screen.queryByText('Мой плейлист')).not.toBeInTheDocument();
  });

  test('Клик по бургеру переключает меню', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    const burger = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(burger);
    
    const menu = document.querySelector('.nav__menu');
    expect(menu).toHaveClass('nav__menu_active');
    
    fireEvent.click(burger);
    expect(menu).not.toHaveClass('nav__menu_active');
  });

  test('Клик по "Выйти" обрабатывается', () => {
    render(
      <ReduxProvider>
        <Navigation />
      </ReduxProvider>
    );

    expect(screen.getByText('Войти')).toBeInTheDocument();
  });
});