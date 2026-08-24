// Minimal localStorage-backed store, read via useSyncExternalStore so
// client components can hydrate persisted state without triggering
// setState-in-effect renders or SSR/client hydration mismatches.
type Listener = () => void;

export function createLocalStore<T>(key: string, initial: T) {
  let cache: T = initial;
  let hydrated = false;
  const listeners = new Set<Listener>();

  function read(): T {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  }

  function getSnapshot(): T {
    if (!hydrated) {
      cache = read();
      hydrated = true;
    }
    return cache;
  }

  function getServerSnapshot(): T {
    return initial;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function set(value: T) {
    cache = value;
    hydrated = true;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore unavailable storage (private browsing, quota, etc.)
    }
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, set };
}
