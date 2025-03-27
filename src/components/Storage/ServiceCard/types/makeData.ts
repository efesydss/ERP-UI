import { faker } from '@faker-js/faker';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

export const makeData = (numEmployees: number): Employee[] => {
  return Array.from({ length: numEmployees }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle(),
    salary: faker.number.int({ min: 40000, max: 120000 }), // Modern API kullanımı
    startDate: faker.date.past({ years: 10 }).toISOString(), // Modern API kullanımı
    signatureCatchPhrase: faker.company.catchPhrase(),
    avatar: faker.image.avatar(),
  }));
};
export const data = makeData(100);