export function timeSpent(createdAt: Date): string {
    const date = new Date(Date.now() - createdAt.getTime());
    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    return `${hour} : ${min}`;
}

export function isUpperCase(char: string): boolean {
    return char === char.toUpperCase();
}
