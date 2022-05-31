interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  googleCalendarId?: string | string[];
  permissionLevel: number;
}

export default IUser;
