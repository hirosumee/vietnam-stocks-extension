import React from 'react';
import styled from 'styled-components';
import Stocks from './Stocks';
import { getStockSummaryFromSymbol } from '../../apis/overview';
import classNames from 'classnames';
import SearchInput from './SearchInput';
import AlertError from './AlertError';
import { useDebounce } from 'use-debounce';
import {
  deleteStock,
  getSavedStocks,
  pinStock,
  saveNewStock,
  unpinStock,
  watchSavedStocksChange,
} from '../../../utils/stock';

function StocksContainer(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchData, setSearchData] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [savedStocks, setSavedStocks] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    getSavedStocks()
      .then((v) => setSavedStocks(v))
      .catch((e) => setErrorMsg(e.toString))
      .finally(() => setLoading(false));
  }, []);
  React.useEffect(() => {
    setLoading(true);
    const promises = savedStocks.map((v) =>
      getStockSummaryFromSymbol(v.symbol)
    );
    (async () => {
      try {
        const result = await Promise.all(promises);
        setData(result);
      } catch (e) {
        setErrorMsg(e.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [savedStocks]);
  const callSearch = React.useCallback((v) => {
    if (!v) return setSearchData(null);
    setLoading(true);
    getStockSummaryFromSymbol(v)
      .then((v) => setSearchData(v))
      .catch((e) => setErrorMsg(e.toString()))
      .finally(() => setLoading(false));
  }, []);
  React.useEffect(() => {
    callSearch(debouncedSearchValue);
  }, [debouncedSearchValue, callSearch]);
  React.useEffect(() => {
    return watchSavedStocksChange((v) => setSavedStocks(v.newValue));
  }, []);
  const onSearch = (value) => callSearch(value);
  const onChange = (e) => setSearchValue(e.target.value);
  const onAdd = (symbol) => {
    setSearchValue('');
    return saveNewStock(symbol);
  };
  const onPin = (symbol) => {
    return pinStock(symbol);
  };
  const onUnpin = (symbol) => {
    return unpinStock(symbol);
  };
  const onDelete = (symbol) => {
    return deleteStock(symbol);
  };

  return (
    <div className={classNames(props.className, 'h-full w-full flex flex-col')}>
      <SearchInput
        value={searchValue}
        onChange={onChange}
        onSearch={onSearch}
      />
      <AlertError description={errorMsg} />
      <Stocks
        stocks={data}
        loading={loading}
        searchStock={searchData}
        onAdd={onAdd}
        onPin={onPin}
        onUnpin={onUnpin}
        savedStocks={savedStocks}
        onDelete={onDelete}
      />
    </div>
  );
}

export default styled(StocksContainer)`
  > * {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
