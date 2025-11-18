import React from 'react'

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default AppProvider