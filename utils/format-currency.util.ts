export function formatCurrency(amount: number, currencyCode = 'USD'): string {
    return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode })
        .format(amount);
}