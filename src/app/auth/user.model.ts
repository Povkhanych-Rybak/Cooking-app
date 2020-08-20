// model stores all data related to a user and helps with validating
export class User {
  public email: string;
  //password: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(email: string, id: string, token: string, expDate: Date) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = expDate
  }

  get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}

// get token - getter -when we will try to get access to the token(user.token) the oe inside that func will run
