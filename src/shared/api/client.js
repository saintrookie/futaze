/**
 * Simulated network layer. Stands in for `packages/api-client` from the
 * architecture doc — every entity/feature `api/` module calls through this
 * instead of touching timers/fetch directly, so swapping in a real backend
 * later only touches this one file.
 */

export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network unavailable') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ServerError extends Error {
  constructor(message = 'Server unavailable') {
    super(message);
    this.name = 'ServerError';
  }
}

const DEFAULT_DELAY = [280, 620];

function randomBetween([min, max]) {
  return Math.floor(min + Math.random() * (max - min));
}

/**
 * @param {() => T} producer - returns the resolved payload
 * @param {{ delay?: [number, number], failRate?: number, errorType?: 'network' | 'server' }} options
 */
export function request(producer, options = {}) {
  const { delay = DEFAULT_DELAY, failRate = 0 } = options;
  const ms = randomBetween(delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(options.errorType === 'network' ? new NetworkError() : new ServerError());
        return;
      }
      try {
        resolve(producer());
      } catch (err) {
        reject(err);
      }
    }, ms);
  });
}
