export const delay = async(minTime = 200, maxTime = 800) => {
    const randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    await new Promise((r) => setTimeout(r, randomDelay));
}