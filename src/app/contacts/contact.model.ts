export interface Contact {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string | null,
  favoritesRanking: number | null,
  phone: Phone[],
  address: Address[],
  notes: string
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
  preferred: boolean
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
  preferred: boolean
}