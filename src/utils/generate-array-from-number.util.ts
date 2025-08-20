export function generateArrayFromNumber(length: number): number[] {
    return Array.from(
        { length: length }, 
        (_, index) => index + 1
    )
}