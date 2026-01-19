function fatorial(n) {
    if (n <= 1) return 1;

    return n * fatorial(n - 1);
}

function fibonacci(p) {
    if (p == 1) return 0;
    if (p == 2) return 1;

    return fibonacci(p - 1) + fibonacci(p - 2);
}

console.log(fatorial(5));
console.log(fibonacci(9));
