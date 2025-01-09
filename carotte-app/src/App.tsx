import { Routes, Route } from 'react-router';
import CalendarApp from './components/calendar/CalendarApp';
import { CalendarProvider } from './components/providers/calendar-provider';
import { ThemeProvider } from './components/providers/theme-provider';
import { TailwindIndicator } from './components/utils/TailwindIndicator';
import HomePage from './pages/HomePage';
import AppNavigation from './components/navigation/app-navigation';

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <CalendarProvider>
        <div className='h-screen w-full overflow-y-auto'>
          <AppNavigation>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/app' element={<CalendarApp />} />
            </Routes>
          </AppNavigation>
        </div>
      </CalendarProvider>
      <TailwindIndicator />
    </ThemeProvider>
  );
}

export default App;
