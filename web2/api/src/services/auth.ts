import config from "config";

interface AuthError {
  status: number;
  message: string;
}

export class Auth {
  private password: string;

  constructor(password?: string) {
    this.password = password || config.get<string>("PASSWORD");
  }

  login(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (password === this.password) {
        resolve(password);
      } else {
        reject({
          status: 401,
          message: "Authentication failed",
        } as AuthError);
      }
    });
  }
}
