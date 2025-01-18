import { Service } from 'typedi';

@Service()
export class TestService {
  public carotte() {
    return 'Carotte <3';
  }
}
