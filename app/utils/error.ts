export function errorToStrings(err: any): string[] {
  if (typeof err == "string") {
    return [err]
  }

  if (typeof err?.body == "string") {
    return [err?.body]
  }

  let requestErrors = err?.body?.errors as { [fieldName: string]: string[] };

  let errors = [];
  for (let key in requestErrors ?? []) {
    let value = requestErrors[key];

    errors.push(`${key} ${value?.join(", ")}`);
  }

  return errors;
}

export function errorToString(err: any): string {
  return errorToStrings(err)?.join(", ")
}