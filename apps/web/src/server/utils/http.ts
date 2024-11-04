export class HttpErrorResponse extends Response {
  constructor(error: string, status: number) {
    super(JSON.stringify({ error }), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export class HttpSuccessResponse extends Response {
  constructor(data: unknown, status = 200) {
    super(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
