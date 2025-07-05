import React from 'react'
import { IPost } from '@/models/Post'

interface MarkerDetailsProps {
  feature: IPost
}

export const MarkerDetails: React.FC<MarkerDetailsProps> = ({ feature }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
      <p className="text-gray-700 mb-4">{feature.description}</p>
    </div>
  )
}
