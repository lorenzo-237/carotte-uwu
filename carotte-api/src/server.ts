import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { TestRoute } from '@/routes/tests.route';
import { AuthRoute } from './routes/auth.route';

ValidateEnv();

const app = new App([new TestRoute(), new AuthRoute()]);

app.listen();
