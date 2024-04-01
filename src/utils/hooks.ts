export const convertTime = (duration: string) => {
    const time = parseInt(duration);
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return hours > 0 ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`
}