import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../contacts/contacts.service';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { RestrictedWordsValidator } from '../validators/RestrictedWordsValidator';
import { Phone } from '../contacts/contact.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    dateOfBirth: <string | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.array([this.createFoneGroup(undefined)]),    
    address: this.fb.nonNullable.array([this.fb.nonNullable.group({
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      addressType: '',
      preferred: [false]
    })
     ]),
    notes: ['', RestrictedWordsValidator]
  })

  addFone(): void {
    this.phones().push(this.createFoneGroup(undefined))
  }

  hasChange(old:any, nw: any) : boolean {
      return JSON.stringify(old) === JSON.stringify(nw)
  }

  createFoneGroup(phone: Phone | undefined) {
    
    const pg = this.fb.nonNullable.group({
      phoneNumber:  phone?.phoneNumber == undefined ?  '': phone?.phoneNumber,
      phoneType: phone?.phoneType == undefined ? '': phone?.phoneType,
      preferred: phone?.preferred == undefined ? false: phone?.preferred 
    })
    pg.controls.preferred.valueChanges.pipe(
        distinctUntilChanged(this.hasChange)
    ).    
    subscribe((value) =>{
      if(value)
        pg.controls.phoneNumber.addValidators([Validators.required])
      else
      pg.controls.phoneNumber.removeValidators([Validators.required])
      pg.controls.phoneNumber.updateValueAndValidity();
    })

    return pg
  }

   addAddress(): void {
    this.address().push(this.fb.nonNullable.group({
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      addressType: '',preferred: [false]
    }))
  }
  deleteFone(index: number): any | undefined {
    return this.contactForm.controls.phone.removeAt(index);
  }

  deleteAddress(index: number): any | undefined{
    return this.address().removeAt(index);
  }
  
  phones() {
    return this.contactForm.controls.phone;
  }
  fn() {
    return this.contactForm.controls.firstName;
  }

  ln() {
    return this.contactForm.controls.lastName;
  }

  nts() {
    return this.contactForm.controls.notes;
  }


  address() {
    return this.contactForm.controls.address;
  }


  constructor(private route: ActivatedRoute, private svc: ContactsService, private router: Router, private fb: FormBuilder) { }


  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.svc.getContact(contactId).pipe(
      filter(c => c != undefined),
      tap(contact => {
        console.log("From service", contact)
        if (contact) {
          this.contactForm.patchValue(contact)
          console.log("contactForm 1", this.contactForm.value)
          this.phones().clear();
          contact?.phone.forEach(phone => {
            this.phones().push(this.createFoneGroup(phone));
          });
          this.address().clear();
          contact?.address.forEach(address => {
            this.address().push(
              this.fb.nonNullable.group({
                streetAddress: address.streetAddress,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                addressType: address.addressType,
                preferred: address.preferred
              })
            );
          });

        }
        console.log("contactForm", this.contactForm.value)
      })
    ).subscribe();
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.svc.saveContact(this.contactForm.getRawValue()).subscribe(() => this.router.navigate(['/contacts']));
  }
}


