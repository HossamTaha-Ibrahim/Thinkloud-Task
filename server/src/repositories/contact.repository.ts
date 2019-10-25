import {DefaultCrudRepository} from '@loopback/repository';
import {Contact, ContactRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Contact, dataSource);
  }
}
