import React, { useState } from 'react';
import Stock from '../Stock/Stock'
import {} from './Search.module.scss';

const Filter = ({ label, value, handleChangeMin, handleChangeMax }) => {

  return (
    <div>
      {label}
      Min: <input value={value.min} onChange={handleChangeMin} />
      Max: <input value={value.max} onChange={handleChangeMax} />
    </div>
  );
};

const Search = ({ stocks }) => {
  const [findWord, setFindWord] = useState('');

	const [CPE, setCTE] = useState({ min: Number.MIN_SAFE_INTEGER,  max: Number.MAX_SAFE_INTEGER });
	const [peter, setPeter] = useState({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
	const [shortRatio, setShortRatio] = useState({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
  const [qRevenueGrowth, setQRevenueGrowth] = useState({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });

	const [filteredStocks, setFilteredStocks] = useState([])
  const [selectedSort, setSelectedSort] = useState(null)

  const handleResetFilter = () => {
    setFindWord('');
    setCTE({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
    setPeter({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
    setShortRatio({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
    setQRevenueGrowth({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER });
    setFilteredStocks([])
  }

	const handleSearch = (event) => {
		event.preventDefault()
		
		const filtered = []
		stocks.forEach((stock) => {
			if ((stock.cPE >= CPE.min && stock.cPE <= CPE.max)
					&& (stock.peter >= peter.min && stock.peter <= peter.max)
					&& (stock.shortRatio >= shortRatio.min && stock.shortRatio <= shortRatio.max)
					&& (stock.qRevenueGrowth >= qRevenueGrowth.min && stock.qRevenueGrowth <= qRevenueGrowth.max)
          && (stock.name.toLowerCase().includes(findWord) || stock.symbol.toLowerCase().includes(findWord))
					) {
						filtered.push(stock)
					}
		})
    filtered.sort((a,b) => {
      if (!selectedSort) {
        return 0
      }
      if (a[selectedSort] < b[selectedSort]) {
        return -1
      }
      if (a[selectedSort] > b[selectedSort]) {
        return 1;
      }
      return 0
    })

		setFilteredStocks(filtered)
		console.log(filtered.length);
	}

  return (
    <React.Fragment>
      <form onSubmit={handleSearch}>
        <input value={findWord} placeholder='Search' onChange={(event) => setFindWord(event.target.value)} />
        <Filter
          label='CPE'
          value={CPE}
          handleChangeMin={(event) => setCTE({ ...CPE, min: Number(event.target.value) })}
          handleChangeMax={(event) => setCTE({ ...CPE, max: Number(event.target.value) })}
        />
        <Filter
          label='peter'
          value={peter}
          handleChangeMin={(event) => setPeter({ ...peter, min: Number(event.target.value) })}
          handleChangeMax={(event) => setPeter({ ...peter, max: Number(event.target.value) })}
        />
        <Filter
          label='shortRatio'
          value={shortRatio}
          handleChangeMin={(event) => setShortRatio({ ...shortRatio, min: Number(event.target.value) })}
          handleChangeMax={(event) => setShortRatio({ ...shortRatio, max: Number(event.target.value) })}
        />
        <Filter
          label='qRevenueGrowth'
          value={qRevenueGrowth}
          handleChangeMin={(event) => setQRevenueGrowth({ ...qRevenueGrowth, min: Number(event.target.value) })}
          handleChangeMax={(event) => setQRevenueGrowth({ ...qRevenueGrowth, max: Number(event.target.value) })}
        />
        <button type='submit'>Search</button>
        <button type='button' onClick={handleResetFilter}>
          Reset
        </button>
      </form>
      <div>
        <button type='button' onClick={() => setSelectedSort('cPE')}>
          Sort: P/E
        </button>
        <button type='button' onClick={() => setSelectedSort('shortRatio')}>
          Sort: Short Ratio
        </button>
        <button type='button' onClick={() => setSelectedSort(null)}>
          Sort: Reset
        </button>
      </div>

      {filteredStocks.map((stock) => (
        <Stock key={stock.id} stock={stock} />
      ))}
    </React.Fragment>
  );
};

export default Search

/*
name/symbol
CPE: min / max								xxxx
institutions: min / max
shortRatio: min / max					xxx
tAnnualDividendYield: min / max
profitMargin: min / max
qRevenueGrowth: min / max
qEarningsGrowth: min / max
peter: min / max							xxx



(country)
(sector/industry)
(market cap : min / max)
*/
