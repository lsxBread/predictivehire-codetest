import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { VacanciesService } from '../src/services/vacancies.service';
import { CompaniesService } from '../src/services/companies.service';

describe('Graphql API(e2e)', () => {
  let app;

  const mockVacancy = {
    _id: 'mockId',
    title: 'mockTitle',
    description: 'mockDes',
    expireAt: '2020',
  };

  const mockCompany = {
    name: 'mockCompany',
    address: 'mockAddress',
  };

  const companyService = {
    findCompanyById: () => Promise.resolve(mockCompany),
  };

  const vacanciesService = {
    findVacancyById: () => Promise.resolve(mockVacancy),
    createVacancy: () => Promise.resolve(mockVacancy),
    updateVacancyById: () => Promise.resolve(mockVacancy),
    deleteVacancyById: () => Promise.resolve(mockVacancy),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(VacanciesService)
      .useValue(vacanciesService)
      .overrideProvider(CompaniesService)
      .useValue(companyService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('get vacancy by Id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            vacancy(vacancyId: "123", companyId: "123") {
              _id
              title
              description
              expireAt
              company {
                name
                address
              }
            }
          }
        `,
      })
      .expect(({ body }) => {
        const { vacancy } = body.data;
        expect(vacancy).toMatchObject({
          ...mockVacancy,
          company: {
            ...mockCompany,
          },
        });
      })
      .expect(200);
  });

  it('create vacancy', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createVacancy(input: {title: "", description: "", expireAt: "", companyId: ""}) {
              _id
              title
              description
              expireAt
            }
          }
        `,
      })
      .expect(({ body }) => {
        const { createVacancy } = body.data;
        expect(createVacancy).toMatchObject({
          ...mockVacancy,
        });
      })
      .expect(200);
  });

  it('delete vacancy by id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            deleteVacancy(vacancyId: "", companyId: "") {
              _id
              title
              description
              expireAt
            }
          }
        `,
      })
      .expect(({ body }) => {
        const { deleteVacancy } = body.data;
        expect(deleteVacancy).toMatchObject({
          ...mockVacancy,
        });
      })
      .expect(200);
  });

  it('update vacancy by id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateVacancy(vacancyId: "", companyId: "", input: {title: "", description: ""}) {
              _id
              title
              description
              expireAt
            }
          }
        `,
      })
      .expect(({ body }) => {
        const { updateVacancy } = body.data;
        expect(updateVacancy).toMatchObject({
          ...mockVacancy,
        });
      })
      .expect(200);
  });
});
