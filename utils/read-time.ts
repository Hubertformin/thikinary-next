
export function getReadTime(text: string): number {
    const wordsPerMinute = 200;
    if (!text) {
        return 0;
    }
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes);
}