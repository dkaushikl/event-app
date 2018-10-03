export class Register {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobileno: number;
}

export class Login {
  public email: string;
  public password: string;
}

export class ForgotPassword {
  public email: string;
}

export class ConfirmPassword {
  public code: string;
  public password: string;
}

export class ResetPassword {
  public password: string;
  public code: string;
}

export class ChangePassword {
  public oldPassword: string;
  public newPassword: string;
  public confirmPassword: string;
}
