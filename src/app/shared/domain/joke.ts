export class Joke {
  private _category: string
  private _text: string

  constructor(text: string, category: string) {
    this._category = category;
    this._text = text;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }
}
