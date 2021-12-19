import axios from 'axios';

enum StockUpDownStatus {
  Down = 1,
  Up = 0,
}

type StockSummary = {
  Symbol: string;
  Link: string;
  Price: number;
  Change: string;
  UpDown: StockUpDownStatus;
  Status: boolean;
};

export async function getStockSummaryFromSymbol(
  symbol: string
): Promise<StockSummary> {
  const resp = await axios.get<StockSummary>(
    `https://e.cafef.vn/info.ashx?type=cp&symbol=${symbol}`
  );
  return resp.data;
}
