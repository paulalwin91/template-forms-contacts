import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact.model';
import { formatDate } from '@angular/common';

export class InMemoryContactsApi implements InMemoryDbService {


  createDb() {
    let contacts: Contact[] = [
      {
        id: '5CehW',
        firstName: 'Percival',
        lastName: 'Doodleplumb',
        dateOfBirth: new Date('1994/05/05').toISOString().split('T')[0],
        favoritesRanking: 0,
        phone: [{ phoneNumber: '555-765-4321', phoneType: 'mobile', preferred : true }],
        address: [{
          streetAddress: '777 Whimsy Lane',
          city: 'Gleeberg City',
          state: 'Colohoma',
          postalCode: 'A4321',
          addressType: 'home', preferred : true
        }],
        notes: ''
      },
      {
        id: 'A6rwe',
        firstName: 'Mortimer',
        lastName: 'Flungford',
        dateOfBirth: new Date('1994/05/05').toISOString().split('T')[0],
        favoritesRanking: 0,
        phone: [{ phoneNumber: '555-877-5678', phoneType: 'mobile', preferred : true }],
        address: [{
          streetAddress: '543 Lullaby Lane',
          city: 'Sleepytown',
          state: 'Ulaska',
          postalCode: 'F2231',
          addressType: 'other'
          , preferred : true
        }],
        notes: ''
      },
      {
        id: '3bNGA',
        firstName: 'Wanda',
        lastName: 'Giggleworth',
        dateOfBirth: new Date('1994/05/05').toISOString().split('T')[0],
        favoritesRanking: 1,
        phone: [{ phoneNumber: '555-123-4567', phoneType: 'mobile', preferred : true }, { phoneNumber: '555-123-4444', phoneType: 'work' , preferred : false}],
        address: [{
          streetAddress: '123 Merriment Avenue',
          city: 'Dorado City',
          state: 'Mezona',
          postalCode: 'Z2345',
          addressType: 'work',
          preferred : true
        }],
        notes: ''
      },
    ]

    return { contacts }
  }
}