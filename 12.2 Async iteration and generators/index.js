let range1 = {
    from: 1,
    to: 5,
    [Symbol.asyncIterator]() { // (1)
        return {
            current: this.from,
            last: this.to,

            async next() {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};
(async () => {
    for await (let value of range1) { // (4)
        console.log(value); // 1,2,3,4,5
    }
})()

let range2 = {
    from: 1,
    to: 5,
    // this line is same as [Symbol.asyncIterator]: async function*() {
    async *[Symbol.asyncIterator]() {
        for (let value = this.from; value <= this.to; value++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield value;
        }
    }
};
(async () => {
    for await (let value of range2) {
        console.log(value); // 1, then 2, then 3, then 4, then 5
    }
})();

async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}
(async () => {
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
        console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
    }
})();

