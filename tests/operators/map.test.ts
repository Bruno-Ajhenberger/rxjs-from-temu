import { describe, expect, it, vi } from "vitest";
import { map, Observable } from "../../index";

describe("Observable piped with map operator", () => {
  it("should map source value to a new type", () => {
    const observable = new Observable<{ test: string }>();
    const next = vi.fn();

    observable
      .pipe(
        map((value) => {
          return { test2: value.test };
        })
      )
      .subscribe(next);
    observable.next({
      test: "test",
    });

    expect(next).toHaveBeenCalledWith({ test2: "test" });
  });
});
