export interface IAuthForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends IAuthForm {
  name: string;
  profilepic: any;
}
