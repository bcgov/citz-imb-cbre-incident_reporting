import { ZodError } from 'zod';

type ErrorWithMessage = { message: string };

export const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
}

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {

  if (isZodError(maybeError)) return { message: maybeError.issues.map(issue => issue.message).join('\n') };

  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  }
  catch {
    return new Error(String(maybeError));
  }
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

const isZodError = (error: unknown): error is ZodError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'issues' in error &&
    Array.isArray((error as Record<string, unknown>).issues)
  )
}
