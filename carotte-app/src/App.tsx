import { Routes, Route } from 'react-router';
import CalendarApp from './components/calendar/CalendarApp';
import { CalendarProvider } from './components/providers/calendar-provider';
import { ThemeProvider } from './components/providers/theme-provider';
import { TailwindIndicator } from './components/utils/TailwindIndicator';
import HomePage from './pages/HomePage';
import ProtectedRoutes from './components/utils/protected-routes';
import LoginPage from './pages/LoginPage';
import UnAuthRoutes from './components/utils/unauth-routees';
import { AuthProvider } from './components/providers/auth-provider';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='light'>
        <CalendarProvider>
          <div className='h-screen w-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<ProtectedRoutes />}>
                <Route index element={<HomePage />} />
                <Route path='app' element={<CalendarApp />} />
              </Route>
              <Route element={<UnAuthRoutes />}>
                <Route path='/login' element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </CalendarProvider>
        <TailwindIndicator />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
