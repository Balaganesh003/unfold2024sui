export function TokenRow({ symbol, balance, value, iconUrl }: { symbol: string, balance: number, value: number, iconUrl: string }) {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-900 to-black  border border-gray-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* <div className="relative w-10 h-10">
            <img src={iconUrl} alt={symbol} className="rounded-full" />
          </div> */}
          <div>
            <h4 className="font-semibold text-white">{symbol}</h4>
            <p className="text-sm text-gray-400">{balance}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-white">{balance}</p>
        </div>
      </div>
    );
  }
  