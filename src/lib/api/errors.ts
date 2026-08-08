export class ApiError extends Error {
  status: number;
  statusText: string;
  details?: unknown;

  constructor(status: number, statusText: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.details = details;
  }
}

export const handleApiError = async (response: Response, payload?: unknown) => {
  const message =
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
      ? payload.message
      : "Ocurrió un error al procesar la solicitud.";

  throw new ApiError(response.status, response.statusText, message, payload);
};
