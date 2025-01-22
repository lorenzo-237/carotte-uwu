import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { TestRoute } from '@/routes/tests.route';
import { AuthRoute } from './routes/auth.route';
import { CalendarRoute } from './routes/calendar.route';
import { UserRoute } from './routes/users.route';

ValidateEnv();

const app = new App([new UserRoute(), new CalendarRoute(), new TestRoute(), new AuthRoute()]);

app.listen();
