import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Contact} from '../models';
import {ContactRepository} from '../repositories';

export class ContactControllerController {
  constructor(
    @repository(ContactRepository)
    public contactRepository: ContactRepository,
  ) {}

  @post('/contacts', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contact)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact),
        },
      },
    })
    contact: Omit<Contact, 'id'>,
  ): Promise<Contact> {
    return this.contactRepository.create(contact);
  }

  @get('/contacts/count', {
    responses: {
      '200': {
        description: 'Contact model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Contact))
    where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.count(where);
  }

  // Get All
  @get('/contacts', {
    responses: {
      '200': {
        description: 'Array of Contact model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contact)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Contact))
    filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.contactRepository.find(filter);
  }

  // Update All
  @patch('/contacts', {
    responses: {
      '200': {
        description: 'Contact PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
    @param.query.object('where', getWhereSchemaFor(Contact))
    where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.updateAll(contact, where);
  }

  // Show
  @get('/contacts/{id}', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contact)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Contact> {
    return this.contactRepository.findById(id);
  }

  // Update
  @patch('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contact PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
  ): Promise<void> {
    await this.contactRepository.updateById(id, contact);
  }

  // Replace
  @put('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contact model updated success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contact: Contact,
  ): Promise<void> {
    await this.contactRepository.replaceById(id, contact);
  }

  // Delete
  @del('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contact DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactRepository.deleteById(id);
  }
}
