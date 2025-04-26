export abstract class CoreValueObject {
  protected constructor(private value: string) {}

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }
}
