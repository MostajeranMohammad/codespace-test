import { spliterCharacter } from './consts';

export class FormattedStringParams {
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
      encodeURI(this.title) + // TODO check for URLsafe Characters
      spliterCharacter +
      encodeURI(this.picUrl) +
      spliterCharacter +
      encodeURI(this.value)
    );
  }

  public static decode(formatedString: string): FormattedStringParams {
    const splitedString = formatedString.split(spliterCharacter);
    if (splitedString.length !== 3) throw new Error('invalid format');

    return new FormattedStringParams(
      decodeURI(splitedString[0]),
      decodeURI(splitedString[1]),
      decodeURI(splitedString[2]),
    );
  }
}
