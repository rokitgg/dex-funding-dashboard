type User = {
    id: string;
    userName: string;
    phone: string;
    email: string;
    location: string;
    role: 'client' | 'provider';
    status: 'active' | 'inactive';
    image: string;
    rtn?: string;
    otherInformation?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type FundingRate = {
    coin: string;
    hyperliquid: string | null;
    binance: string | null;
    bybit: string | null;
    lighter: string | null;
}
  
type FundingRatesResponse = {
    rates: FundingRate[];
}