import { faker } from '@faker-js/faker';

const UserFactory = {

  createUser() {
    const firstName: string = faker.name.firstName();
    const lastName: string = faker.name.lastName();
    const nome = `${firstName} ${lastName}`;
    const email = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}@email.com`;
    const password = faker.internet.password();
    const administrador = 'true';

    return {
      nome,
      email,
      password,
      administrador,
    };
  },
};

export default UserFactory;
