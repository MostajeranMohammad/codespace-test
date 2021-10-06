import { spliterCharacter } from './consts';

export class StringParams {
  constructor(type: string, title: string, picUrl: string, value: string) {
    this.type = type;
    this.title = title;
    this.picUrl = picUrl;
    this.value = value;
  }
  private type: string;
  private title: string;
  private picUrl: string;
  private value: string;
  // TODO check for URLsafe Characters
  public encode(): string {
    return (
      this.type +
      spliterCharacter +
      this.title +
      spliterCharacter +
      encodeURI(this.picUrl) +
      spliterCharacter +
      this.value
    );
  }

  public static decode(formatedString: string): StringParams {
    const splitedString = formatedString.split(spliterCharacter);
    if (splitedString.length !== 4) throw new Error('invalid format');

    return new StringParams(
      splitedString[0],
      splitedString[1],
      decodeURI(splitedString[2]),
      splitedString[3],
    );
  }
}
