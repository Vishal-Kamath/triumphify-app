type Tagged<A, T> = A & { __tag: T };
type E164Number = Tagged<string, "E164Number">;
