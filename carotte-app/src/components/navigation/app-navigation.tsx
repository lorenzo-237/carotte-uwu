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
import { Eye, EyeOff } from 'lucide-react';

function AppNavigation({ children }: { children: React.ReactNode }) {
  const { options, setOptions } = useCalendar();

  const toggleHideNavigation = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      hideNavigation: !prevOptions.hideNavigation,
    }));
  };
  const toggleHideCalendar = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      hideCalendar: !prevOptions.hideCalendar,
    }));
  };

  return (
    <div className='container mx-auto pt-24'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h1 className='text-sm font-bold text-center uppercase border-b border-black w-1/3 mx-auto py-2'>
            @Carotte.ttt
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <NavLink to='/'>Accueil</NavLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <NavLink to='/app'>Gestion Créneaux</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={toggleHideCalendar}>Calendrier {options.hideCalendar ? <EyeOff /> : <Eye />}</button>
            </DropdownMenuItem>{' '}
            <DropdownMenuItem asChild>
              <button onClick={toggleHideNavigation}>Instagram {options.hideNavigation ? <Eye /> : <EyeOff />}</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </div>
  );
}

export default AppNavigation;
