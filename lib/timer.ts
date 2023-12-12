export default class Timer {
  private interval?: number;

  static get key() {
    return new Date().toDateString();
  }

  static get value() {
    return Number(window.localStorage.getItem(Timer.key) ?? 0);
  }

  static set value(value: number) {
    window.localStorage.setItem(Timer.key, value.toString());
  }

  constructor() {}

  start(callback: () => void, limit?: number) {
    this.interval = window.setInterval(() => {
      Timer.value += 1;
      console.log(Timer.value);
      if (limit && Timer.value >= limit) {
        callback();
        this.stop();
      }

      if (!limit) {
        callback();
      }
    }, 1000);
  }

  stop(): void {
    window.clearInterval(this.interval);
  }

  static clear(): void {
    window.localStorage.removeItem(Timer.key);
  }
}
