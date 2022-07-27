export const _constrain = (num: number, min: number, max: number) => {
    return Math.max(Math.min(num, max), min);
}

export const _remap = (num: number, start1: number, end1: number, start2: number, end2: number) => {
    return (num - start1) / (end1 - start1) * (end2 - start2) + start2
}