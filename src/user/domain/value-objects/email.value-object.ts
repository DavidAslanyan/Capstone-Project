import { CoreValueObject } from "src/core/domain/value-objects/core.value-object";

export class EmailValueObject extends CoreValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string) {
    return new EmailValueObject(value);
  }
}
