interface TMap {
    a: (a: number) => any;
    b: (b: number | string) => any;
    c: (c: Date) => any;
}

function fn3<T extends keyof TMap>(a: T, fn: TMap[T]) {

}
