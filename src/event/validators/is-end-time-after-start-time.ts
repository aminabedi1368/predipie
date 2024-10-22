import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEndTimeAfterStartTime(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEndTimeAfterStartTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const startTime = (args.object as any)[relatedPropertyName];
          return value > startTime; // چک می‌کند که زمان پایان بعد از زمان شروع باشد
        },
      },
    });
  };
}
