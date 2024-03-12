export const delay = async(time = 1000) => {
    await new Promise((r) => setTimeout(r, time));
}