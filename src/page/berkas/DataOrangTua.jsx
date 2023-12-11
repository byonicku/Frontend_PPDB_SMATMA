import React from 'react'
import { useLocation } from 'react-router-dom'

function DataOrangTua() {
    const { state } = useLocation();
    console.log(state);

    return (
        <div>DataOrangTua</div>
    )
}

export default DataOrangTua