export function removeEmptyStringValues<T extends {}>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      ...(value !== "" && typeof value !== "undefined" && value !== null
        ? {
            [key]: value,
          }
        : null),
    };
  }, {} as T);
}
