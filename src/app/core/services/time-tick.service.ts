import { DestroyRef, Injectable, inject, signal } from "@angular/core";

const TICK_INTERVAL_MS = 60_000;

@Injectable({ providedIn: "root" })
export class TimeTickService {
  private readonly destroyRef = inject(DestroyRef);

  private nowSignal = signal(Date.now());

  readonly now = this.nowSignal.asReadonly();

  constructor() {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => this.nowSignal.set(Date.now()), TICK_INTERVAL_MS);
    this.destroyRef.onDestroy(() => window.clearInterval(id));
  }
}
