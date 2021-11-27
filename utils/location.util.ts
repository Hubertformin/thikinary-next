import {IpRegionModel} from "../models/location-model";
import {BookStoreItem} from "../models/book-store-item";
import {formatCurrency} from "./format-currency.util";

export function getUserLocation(): Promise<IpRegionModel> {
    return fetch(`http://api.ipstack.com/check?access_key=823714f7859146560892dce1a8774035`)
        .then(res => res.json());
}

export function formatBookPrice(code: string, book: BookStoreItem) {
    if (typeof window !== 'undefined') {
        let region = book.pricing.regions.filter(rg => rg.countryCode === code)[0];
        if (!region) {
            region = book.pricing.defaultRegion;
            region.amount = region.amount / 100;
        }
        return formatCurrency(region.amount, region.currencyCode);
    }
    return;
}