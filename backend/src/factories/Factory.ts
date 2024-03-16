import {Faker, faker} from '@faker-js/faker';
abstract class Factory {
  protected faker: Faker;

  protected constructor() {
    this.faker = faker;
  }

  public abstract create(count: number): any;
  protected abstract fakeParameters(): void;
}

export default Factory;