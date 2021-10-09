import { spliterCharacter } from './consts';

export class StringParams {
  constructor(title: string, picUrl: string, value: string) {
    this.title = title;
    this.picUrl = picUrl;
    this.value = value;
  }
  private title: string;
  private picUrl: string;
  private value: string;

  public encode(): string {
    return (
      this.title + // TODO check for URLsafe Characters
      spliterCharacter +
      encodeURI(this.picUrl) +
      spliterCharacter +
      this.value
    );
  }

  public static decode(formatedString: string): StringParams {
    const splitedString = formatedString.split(spliterCharacter);
    if (splitedString.length !== 3) throw new Error('invalid format');

    return new StringParams(
      splitedString[0],
      decodeURI(splitedString[1]),
      splitedString[2],
    );
  }
}
