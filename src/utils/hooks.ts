export const convert_Time = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return hours > 0 ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`
}
export const convertTime = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return hours > 0 ? `${hours}h${minutes}m` : `${minutes} minutes`
}
