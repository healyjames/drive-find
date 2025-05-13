import React, { FunctionComponent } from 'react'

import './details.css'

interface Props {
  title: string
  description: string
}

export const Details: FunctionComponent<Props> = ({ title, description }) => {
  return (
    <div className="details-container">
      <div className="listing-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
