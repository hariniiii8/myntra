import React, { useEffect } from 'react'
import { useState } from 'react'

export const Display = () => {


    const [alldesigns, setAllDesigns] = useState([]);
    const fetchInfo = async () => {
        await fetch('http://localhost:4000/getdesign').then((resp) => resp.json()).then((data) => { setAllDesigns(data) })
        console.log(alldesigns)
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <div className="display">
            <h1>All designs</h1>
            {alldesigns.map((design, index) => {
                return <div key={index} className="listdesign">
                    <img src={design.image} alt="" />
                    <p>{design.name}</p>
                    <p>{design.category}</p>
                    <p>{design.gender}</p>
                </div>
            })}
        </div>
    )
}
export default Display
