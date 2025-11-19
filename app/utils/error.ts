export function errorToStrings(err: any): string[] {
  if (typeof err == "string") return [err]

  let errors = (err?.data?.errors ?? err?.body?.errors) as { [fieldName: string]: string[] };
  if (errors && Object.keys(errors).length > 0) {
    let errorMessages = [];

    for (let key in errors) {
      let value = errors[key];
      if (Array.isArray(value) && value.length > 0) {
        errorMessages.push(`${key}: ${value.join(", ")}`);
      }
    }

    if (errorMessages.length > 0) {
      return errorMessages;
    }
  }

  if (err?.data?.title) return [err.data.title];
  if (err?.body?.title) return [err.body.title];
  if (typeof err?.data == "string") return [err.data];
  if (typeof err?.body == "string") return [err.body];

  if (err?.message) return [err.message];

  return ["Ошибка"];
}

export function errorToString(err: any): string {
  return errorToStrings(err)?.join(", ")
}