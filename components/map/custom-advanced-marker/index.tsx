import React, { FunctionComponent, useState } from 'react'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import classNames from 'classnames'
import { Car } from 'lucide-react'

import { Details } from './details'
import { Gallery } from './gallery'

import './custom-advanced-marker.css'
import { IPost } from '@/models/Post'

interface Props {
  post: IPost
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({ post }) => {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const position = {
    lat: post.location.latitude,
    lng: post.location.longitude,
  }

  const renderCustomPin = () => {
    return (
      <>
        <div className="custom-pin">
          <button className="close-button">
            <span className="material-symbols-outlined"> close </span>
          </button>

          <div className="image-container">
            <Gallery images={post.media_urls} isExtended={clicked} />
            <span className="icon">
              <Car className="h-4 w-4" />
            </span>
          </div>

          <Details title={post.title} description={post.description} />
        </div>

        <div className="tip" />
      </>
    )
  }

  return (
    <>
      <AdvancedMarker
        position={position}
        title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classNames('real-estate-marker', {
          clicked,
          hovered,
        })}
        onClick={() => setClicked(!clicked)}
      >
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  )
}
