// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type NewUser = {
  firstname: any,
  lastname: any,
  email: any,
  username: any,
  password: any
}

export type LogUser = {
  email: any,
  password: any
}

export type NewRoom = {
  title: any,
  description: any,
  pinnedLink: any,
  topics: any,
  createdBy: any
}