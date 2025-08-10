export function getErrorMessage(error, fallback = "Something went wrong") {
  return error?.response?.data?.message || fallback;
}
