import React from 'react'

const Currency = (props) => {
    const { currencyGenre, selectCurrency, changeCurrency, amount, onChangeAmount } = props;
    return (
        <div className='currency'>
            <select value={selectCurrency} onChange={changeCurrency} >
                {currencyGenre && currencyGenre.map((item, index) => (
                    <option key={index} value={item} >{item}</option>
                ))}

            </select>
            <input type='number' value={amount} onChange={onChangeAmount} />
        </div>
    )
}

export default Currency