export enum Roles {
  USER,
  PREMIUM,
  ADMIN,
}

export interface 	User {
  firstName?: string
  lastName?: string
  username: string
  telegramId: string
  roles: { id: number; name: Roles }[]
}
