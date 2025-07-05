import React, { Ref, useCallback, useEffect } from 'react'
import Supercluster, { ClusterProperties } from 'supercluster'
import { useMap } from '@vis.gl/react-google-maps'
import { FeaturesClusterMarker } from '../cluster-marker'
import { FeatureMarker } from '../marker'
import { useSupercluster } from '@/hooks/use-supercluster'
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson'
import { IPost } from '@/models/Post'

type ClusteredMarkersProps = {
  geojson: FeatureCollection<Point>
  setNumClusters: (n: number) => void
}

const superclusterOptions: Supercluster.Options<
  GeoJsonProperties,
  ClusterProperties
> = {
  extent: 256,
  radius: 80,
  maxZoom: 12,
}

export const ClusteredMarkers = ({
  geojson,
  setNumClusters
}: ClusteredMarkersProps) => {
  const map = useMap()
  const { clusters, getClusterExpansionZoom } = useSupercluster(geojson, superclusterOptions)

  useEffect(() => {
    setNumClusters(clusters.length)
  }, [setNumClusters, clusters.length])

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      if (!map) return;

      const expansionZoom = getClusterExpansionZoom(clusterId)
      const cluster = clusters.find(c => c.id === clusterId)

      if (expansionZoom && cluster) {
        map.setZoom(expansionZoom);
        map.panTo({lat: cluster.geometry.coordinates[1], lng: cluster.geometry.coordinates[0]})
      }
    },
    [map, clusters, getClusterExpansionZoom],
  )

  return (
    <>
      {clusters.map((feature, index) => {
        const [lng, lat] = feature.geometry.coordinates

        const clusterProperties = feature.properties as ClusterProperties
        const isCluster: boolean = clusterProperties.cluster

        return isCluster ? (
          <FeaturesClusterMarker
            key={`cluster-${index}`}
            clusterId={clusterProperties.cluster_id}
            position={{ lat, lng }}
            size={clusterProperties.point_count}
            sizeAsText={String(clusterProperties.point_count_abbreviated)}
            onMarkerClick={handleClusterClick}
          />
        ) : (
          <FeatureMarker
            key={`feature-${index}`}
            feature={feature as Feature<Point, IPost>}
            position={{ lat, lng }}
          />
        )
      })}
    </>
  )
}
