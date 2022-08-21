import React, { useState } from 'react';

const ItemSchedule = ({ onClick, isAvailable, isReserve }) => {
    const [isSelect, setIsSelect] = useState(false)

    var className = "w-full border-2 border-gray-400"
    var text= ""
    if (isAvailable) {
        className += " hover:border-4"
        if (isReserve) {
            className += " bg-green-500 hover:border-black" 
            text= "disponible"
            if (isSelect) {
                className += " "
            }
        } else {
            className += " hover:border-[#26DB84]"
            if (isSelect) {
                className += " bg-[#26DB84]"
            }
        }
    }
    return (
        <button
            disabled={!isAvailable}
            onClick={() => {
                onClick()
                setIsSelect(!isSelect)
            }} className={className} onSelect={() => { setIsSelect(!isSelect) }}>
            {
                text
            }
        </button>
    );
}

export default ItemSchedule;