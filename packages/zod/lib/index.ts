import {
  ShammerOptions,
  optionsOrDefault,
  randomBoolean,
  randomLength,
  randomNumber,
  randomString,
} from "@tkint/shammer";
import { mapValues, random, range } from "lodash";
import { z } from "zod";

export const schamString = (type: z.ZodString): string => {
  return randomString({
    min: type.minLength,
    max: type.maxLength,
  });
};

export const schamNumber = (type: z.ZodNumber): number => {
  return randomNumber({ min: type.minValue, max: type.maxValue });
};

export const schamEnum = <T extends string>(
  type: z.ZodEnum<[T, ...T[]]>
): T => {
  return type.options[random(0, type.options.length - 1)];
};

export const schamNativeEnum = <TEnum extends z.EnumLike>(
  type: z.ZodNativeEnum<TEnum>
): TEnum[keyof TEnum] => {
  const { values } = type._def;
  const enumValues = Object.entries(values)
    .filter(
      ([key, value]) =>
        value !== undefined && Number.isNaN(parseInt(key.toString()))
    )
    .map(([_, value]) => value as TEnum[keyof TEnum]);

  return enumValues[random(0, enumValues.length - 1)];
};

export const schamObject = <T extends z.ZodAny>(
  schema: z.ZodObject<z.ZodRawShape>,
  options?: Partial<ShammerOptions>
): T =>
  mapValues(schema.shape, (fieldType) => {
    let realType: z.ZodType = fieldType;
    while (realType instanceof z.ZodOptional) {
      realType = realType._def.innerType;
    }

    return scham(realType, options);
  }) as T;

export const schamArray = <T>(
  type: z.ZodArray<z.ZodType<T>>,
  options?: Partial<ShammerOptions>
): T[] => {
  const { arrays } = optionsOrDefault(options);

  let length: number;

  switch (arrays) {
    case "random":
      length = randomLength({
        min: type._def.minLength?.value,
        max: type._def.maxLength?.value,
        defaultMin: 1,
        defaultMax: (min) => min + 5,
        fixed: type._def.exactLength?.value,
      });
      break;
    case "empty":
      length = 0;
      break;
    case "min":
      length = type._def.minLength?.value ?? 0;
      break;
    case "max":
      length = type._def.maxLength?.value ?? 0;
      break;
    case "fixed":
      length = type._def.exactLength?.value ?? 0;
      break;
    default:
      length = arrays;
      break;
  }

  const itemType = type._def.type;

  return range(0, length).reduce((acc) => [...acc, scham(itemType)], [] as T[]);
};

export const schamArrayOf = <T>(
  type: z.ZodType<T>,
  options?: Partial<ShammerOptions>
) => schamArray(z.array(type), options);

export const scham = <T extends any>(
  type: z.ZodType<T>,
  options?: Partial<ShammerOptions>
): T => {
  let result: any;

  if (type instanceof z.ZodString) {
    result = schamString(type);
  } else if (type instanceof z.ZodNumber) {
    result = schamNumber(type);
  } else if (type instanceof z.ZodBoolean) {
    result = randomBoolean();
  } else if (type instanceof z.ZodEnum) {
    result = schamEnum(type);
  } else if (type instanceof z.ZodNativeEnum) {
    result = schamNativeEnum(type);
  } else if (type instanceof z.ZodObject) {
    result = schamObject(type, options);
  } else if (type instanceof z.ZodArray) {
    result = schamArray(type, options);
  }

  return result;
};

export const builderOf = <TReturn>(
  schema: z.ZodType<TReturn>,
  options?: Partial<ShammerOptions>
): ((
  override?: (options?: Partial<ShammerOptions>) => Partial<TReturn>,
  overrideOptions?: Partial<ShammerOptions>
) => TReturn) => {
  return (override, overrideOptions) => {
    const finalOptions = overrideOptions ?? options;

    return {
      ...scham(schema, finalOptions),
      ...override?.(options),
    };
  };
};
