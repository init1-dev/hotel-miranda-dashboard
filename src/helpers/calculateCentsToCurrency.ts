const ONE = 1;
const HUNDRED = 100;

export const calculateCentsToCurrency = (price: number, discount = 0) => {
    const discountInCurrency = discount / HUNDRED;
    const percentage = ONE - discountInCurrency;
    return (price * percentage / HUNDRED).toFixed(2);
}