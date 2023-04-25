import React from 'react'

const RenderWhen = ({ condition, children }) => {
    
    if (condition)
        return (<>{children()}</>)
    else
        return (<></>)
}

RenderWhen.Group = ({ children }) => children

export default RenderWhen
