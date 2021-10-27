import React from 'react'
import Loader from 'react-loader-spinner'

export const Loading = () => {
    return (
        <div className=" flex justify-center items-center  ">
            <Loader type="Puff" color="#FF0000" height={550} width={80} />
        </div>
    )
}
