import {Faker, faker} from '@faker-js/faker';
import DatabaseService from "../services/DatabaseService";
abstract class Factory {
  protected faker: Faker;
  protected prisma?: any;

  protected constructor(withDatabase: boolean = false) {
    this.faker = faker;
    if(withDatabase){
        this.prisma = DatabaseService.getInstance().getClient();
    }
  }

  public abstract create(count: number): any;
  protected abstract fakeParameters(): void;
}

export default Factory;