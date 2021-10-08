import React from 'react'

export const NothingSelected = () => {
    return (
        <div className='nothing__main-content animate__animated animate__fadeIn'>
            <p>
                Select Something
                <br />
                or Create an Entry
            </p>

            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}
