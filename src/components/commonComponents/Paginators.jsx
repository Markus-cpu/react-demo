import React, {useState} from "react";
import c from './Paginators.module.css'

const Paginator =({currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10})=> {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize
    return  (
        <div className={c.pagination}>
            {portionNumber > 1 &&
               <button onClick={()=> {setPortionNumber(portionNumber - 1)}}>prev</button>
            }
            {pages.filter(p => p => leftPortionNumber && p <= rightPortionNumber)
                .map((p)=> {
                    return <span className={ ({
                        [c.selectedPage]: currentPage === p
                    }, c.pageNumber)} key={p} onClick={(e)=> {
                    onPageChanged(p)
                    }}>{p}</span>
                })}
            {portionCount > portionSize &&
                <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>next</button>
            }
        </div>
    )
}
export default Paginator