import React from 'react';
import Stock from './Stock';
import Loading from './Loading';

function Stocks({
  stocks = [],
  loading = false,
  searchStock,
  onPin,
  onUnpin,
  onAdd,
  onDelete,
  savedStocks = [],
}) {
  const isPinnedMap = React.useMemo(() => {
    const result = new Set();
    savedStocks.forEach((v) => {
      if (v.pinned) {
        result.add(v.symbol);
      }
    });
    return result;
  }, [savedStocks]);
  const sortedStocks = React.useMemo(() => {
    const v = [...stocks];
    return v.sort((a, b) => {
      const aPin = isPinnedMap.has(a.Symbol);
      const bPin = isPinnedMap.has(b.Symbol);
      if (aPin && !bPin) {
        return -1;
      }
      if (!aPin && bPin) {
        return 1;
      }
      return a.Symbol.localeCompare(b.Symbol);
    });
  }, [stocks, isPinnedMap]);
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="grow-1 overflow-auto">
      {searchStock && <Stock key="-1" {...searchStock} onAdd={onAdd} />}
      {sortedStocks.map((v) => (
        <Stock
          key={v.Symbol}
          {...v}
          isShowPin={true}
          isPinned={isPinnedMap.has(v.Symbol)}
          onPin={onPin}
          onUnpin={onUnpin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Stocks;
