import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router';
import { useCalendar } from '../providers/calendar-provider';
import { CalendarDays, Carrot, Eye, EyeOff, LogOut } from 'lucide-react';
import { useAuth } from '../providers/auth-provider';

function AppNavigation({ children }: { children: React.ReactNode }) {
  const { options, setOptions } = useCalendar();
  const { user, onLogout } = useAuth();

  if (!user) {
    return null;
  }

  const toggleHideNavigation = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      hideNavigation: !prevOptions.hideNavigation,
    }));
  };
  const toggleHidePastDay = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      hidePastDays: !prevOptions.hidePastDays,
    }));
  };
  const toggleHideCalendar = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      hideCalendar: !prevOptions.hideCalendar,
    }));
  };
  const logout = async () => {
    await onLogout();
    window.location.reload();
  };

  return (
    <div className='container mx-auto pt-24'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h1 className='text-sm font-bold text-center uppercase border-b border-black w-1/3 mx-auto py-2'>
            {user.instagram}
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <NavLink to='/'>
              <Carrot />
              Accueil
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <NavLink to='/app'>
                <CalendarDays />
                Calendrier
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className='w-full' onClick={toggleHideCalendar}>
                {options.hideCalendar ? <EyeOff /> : <Eye />} Visible
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className='w-full' onClick={toggleHidePastDay}>
                {options.hidePastDays ? <EyeOff /> : <Eye />} Dates passées
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className='w-full' asChild>
              <button onClick={toggleHideNavigation}>{options.hideNavigation ? <Eye /> : <EyeOff />} Instagram </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button onClick={logout}>
              <LogOut />
              Déconnexion
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </div>
  );
}

export default AppNavigation;
