export function parseError(err) {
  return Object.keys(err.error.errors).map((key) => `${key} ${err.error.errors[key]}`);
}
