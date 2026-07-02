export interface ErrorResponse {
  statusCode: number;
  message: string | string[]; // string[] cuando viene de class-validator (ValidationPipe)
  error: string; // ej: "Bad Request", "Conflict", "Not Found"
  timestamp?: string;
  path?: string;
}

export interface ExtendedErrorResponse extends ErrorResponse {
  method?: string;
  stack?: string; // solo en dev, nunca en prod
  correlationId?: string;
}

export type MongoErrorCode =
  | 11000 // Duplicate key
  | 11001 // Duplicate key (legacy, versiones viejas)
  | 121 // Document failed validation (schema validation de Mongo, no Mongoose)
  | 2 // BadValue
  | 13 // Unauthorized
  | 18 // AuthenticationFailed
  | 50 // ExceededTimeLimit
  | 89 // NetworkTimeout
  | 91; // ShutdownInProgress

export interface MongoServerErrorLike extends Error {
  code: MongoErrorCode;
  codeName?: string; // ej: "DuplicateKey"
  keyPattern?: Record<string, number>; // ej: { username: 1 }
  keyValue?: Record<string, unknown>; // ej: { username: "gonza" }
  index?: number;
  errmsg?: string;
}

export interface MongooseValidatorError extends Error {
  kind: string; // ej: "required", "minlength", "enum", "unique"
  path: string; // campo que falló, ej: "email"
  value: unknown;
  reason?: Error;
}
export interface MongooseValidationError extends Error {
  name: 'ValidationError';
  errors: Record<string, MongooseValidatorError>;
}
export interface MongooseCastError extends Error {
  name: 'CastError';
  kind: string; // ej: "ObjectId", "Number", "Date"
  path: string;
  value: unknown;
  reason?: Error;
}

export type MongoOperationError =
  MongoServerErrorLike | MongooseValidationError | MongooseCastError;

export function isMongoServerError(
  error: unknown,
): error is MongoServerErrorLike {
  return (
    error instanceof Error &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'number'
  );
}

export function isDuplicateKeyError(
  error: unknown,
): error is MongoServerErrorLike & { code: 11000 } {
  return isMongoServerError(error) && error.code === 11000;
}

export function isMongooseValidationError(
  error: unknown,
): error is MongooseValidationError {
  return error instanceof Error && error.name === 'ValidationError';
}

export function isMongooseCastError(
  error: unknown,
): error is MongooseCastError {
  return error instanceof Error && error.name === 'CastError';
}
