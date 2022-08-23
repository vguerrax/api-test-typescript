import chai = require('chai');
import chaiHttp = require('chai-http');

import * as config from '../config';
import { attachResponse } from '../decorators/attach-response';

chai.use(chaiHttp);

export class UsersService {
  @attachResponse
  async getUsers(_id?: string): Promise<any> {
    let response: any;
    if (_id != null) {
      response = await chai
        .request(config.environment.url)
        .get(`/usuarios?_id=${_id}`)
        .set('Content-Type', 'application/json');
    }
    response = await chai
      .request(config.environment.url)
      .get('/usuarios')
      .set('Content-Type', 'application/json');
    return response;
  }

  @attachResponse
  async getUserById(_id: string) {
    const response = await chai
      .request(config.environment.url)
      .get(`/usuarios/${_id}`)
      .set('Content-Type', 'application/json');
    return response;
  }

  @attachResponse
  async postUser(user: any) {
    const response = await chai
      .request(config.environment.url)
      .post('/usuarios')
      .set('Content-Type', 'application/json')
      .send({
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador,
      });
    return response;
  }

  @attachResponse
  async putUser(user: any, _id: string) {
    const response = await chai
      .request(config.environment.url)
      .put(`/usuarios/${_id}`)
      .set('Content-Type', 'application/json')
      .send({
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador,
      });
    return response;
  }

  @attachResponse
  async deleteUser(_id: string) {
    const response = await chai
      .request(config.environment.url)
      .delete(`/usuarios/${_id}`)
      .set('Content-Type', 'application/json');
    return response;
  }
}
