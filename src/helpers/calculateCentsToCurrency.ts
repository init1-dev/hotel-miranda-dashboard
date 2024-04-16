const ONE = 1;
const HUNDRED = 100;

export const calculateCentsToCurrency = (price: number, discount = 0): number => {
    const discountInCurrency = discount / HUNDRED;
    const percentage = ONE - discountInCurrency;
    return Number((price * percentage / HUNDRED).toFixed(2));
}

export const calculateBookingDiscount = (roomPrice: number, bookingDiscount: number) => {
    let bookingPrice;
    if(bookingDiscount > 0){
        bookingPrice = roomPrice * (1 - (bookingDiscount / 100));
    } else {
        bookingPrice = roomPrice;
    }
    return bookingPrice.toFixed(2);
}