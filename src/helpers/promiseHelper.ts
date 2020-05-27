interface Response {}

export const timeoutPromise = (
  milliseconds: number,
  promise: Function,
) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(`Limite da operação excedido (limite: ${milliseconds} ms)`),
      milliseconds,
    )
  );

  return Promise.race([timeout, promise]);
};

export const delay = (milliseconds: number): Promise<Response> =>
  (data: Object) =>
    new Promise((resolve) => setTimeout(() => resolve(data), milliseconds));

export const retry = (
  retries: number,
  milliseconds: number,
  fn: Promise<Response>,
) =>
  fn().catch((err: Object) => {
    return delay(milliseconds)().then(() =>
      retries > 1 ? retry(--retries, milliseconds, fn) : Promise.reject(err)
    );
  });
