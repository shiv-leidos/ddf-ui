/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import React from 'react'
import { LineString, Circle } from 'ol/geom'
import { transform as projTransform } from 'ol/proj'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import Feature from 'ol/Feature'
import { Stroke, Style } from 'ol/style'
import Map from 'ol/Map'
import _ from 'underscore'
import { useListenTo } from '../../../selection-checkbox/useBackbone.hook'
import { removeOldDrawing } from './drawing-and-display'
import DistanceUtils from '../../../../js/DistanceUtils'
import { getIdFromModelForDisplay } from '../drawing-and-display'
import * as Turf from '@turf/turf'
import TurfCircle from '@turf/circle'
import { StartupDataStore } from '../../../../js/model/Startup/startup'
import { Translation } from '../interactions.provider'
import { contrastingColor } from '../../../../react-component/location/location-color-selector'
export function translateFromOpenlayersCoordinate(coord: any) {
  return projTransform(
    [Number(coord[0]), Number(coord[1])],
    StartupDataStore.Configuration.getProjection(),
    'EPSG:4326'
  )
}
function translateToOpenlayersCoordinate(coord: any) {
  return projTransform(
    [Number(coord[0]), Number(coord[1])],
    'EPSG:4326',
    StartupDataStore.Configuration.getProjection()
  )
}
function translateToOpenlayersCoordinates(coords: any) {
  const coordinates = [] as any[]
  coords.forEach((item: any) => {
    coordinates.push(translateToOpenlayersCoordinate(item))
  })
  return coordinates
}
const modelToCircle = ({ model, map }: { model: any; map: any }) => {
  if (model.get('lon') === undefined || model.get('lat') === undefined) {
    return undefined
  }
  const rectangle = new Circle(
    translateToOpenlayersCoordinate([model.get('lon'), model.get('lat')]),
    DistanceUtils.getDistanceInMeters(
      model.get('radius'),
      model.get('radiusUnits')
    ) / map.getMap().getView().getProjection().getMetersPerUnit()
  )
  return rectangle
}
export const drawCircle = ({
  map,
  model,
  rectangle,
  id,
  isInteractive,
  translation,
}: {
  map: any
  model: any
  rectangle: any
  id: string
  isInteractive?: boolean
  translation?: Translation
}) => {
  if (!rectangle) {
    // handles case where model changes to empty vars and we don't want to draw anymore
    return
  }
  if (translation) {
    rectangle.translate(translation.longitude, translation.latitude)
  }
  const point = Turf.point(
    translateFromOpenlayersCoordinate(rectangle.getCenter())
  )
  const turfCircle = TurfCircle(
    point,
    rectangle.getRadius() *
      map.getMap().getView().getProjection().getMetersPerUnit(),
    { steps: 64, units: 'meters' }
  )
  const geometryRepresentation = new LineString(
    translateToOpenlayersCoordinates(turfCircle.geometry.coordinates[0])
  )
  const billboard = new Feature({
    geometry: geometryRepresentation,
  })
  billboard.setId(id)
  billboard.set('locationId', model.get('locationId'))
  const color = model.get('color')
  const iconStyle = new Style({
    stroke: new Stroke({
      color: isInteractive ? contrastingColor : color ? color : '#914500',
      width: isInteractive ? 6 : 4,
    }),
  })
  billboard.setStyle(iconStyle)
  const vectorSource = new VectorSource({
    features: [billboard],
  })
  let vectorLayer = new VectorLayer({
    source: vectorSource,
  })
  vectorLayer.set('id', id)
  const mapRef = map.getMap() as Map
  removeOldDrawing({ map: mapRef, id })
  mapRef.addLayer(vectorLayer)
}
const updatePrimitive = ({
  map,
  model,
  id,
  isInteractive,
  translation,
}: {
  map: any
  model: any
  id: string
  isInteractive?: boolean
  translation?: Translation
}) => {
  const circle = modelToCircle({ model, map })
  // make sure the current model has width and height before drawing
  if (circle && !_.isUndefined(circle)) {
    drawCircle({
      model,
      rectangle: circle,
      map,
      id,
      isInteractive,
      translation,
    })
  }
}
const useListenToBboxModel = ({
  model,
  map,
  isInteractive,
  translation,
}: {
  model: any
  map: any
  isInteractive?: boolean
  translation?: Translation
}) => {
  const callback = React.useMemo(() => {
    return () => {
      if (model && map) {
        updatePrimitive({
          map,
          model,
          id: getIdFromModelForDisplay({ model }),
          isInteractive,
          translation,
        })
      }
    }
  }, [model, map, isInteractive, translation])
  useListenTo(model, 'change:lat change:lon change:radius', callback)
  callback()
}
export const OpenlayersCircleDisplay = ({
  map,
  model,
  isInteractive,
  translation,
}: {
  map: any
  model: any
  isInteractive?: boolean
  translation?: Translation
}) => {
  useListenToBboxModel({ map, model, isInteractive, translation })
  React.useEffect(() => {
    return () => {
      if (map && model) {
        removeOldDrawing({
          map: map.getMap(),
          id: getIdFromModelForDisplay({ model }),
        })
      }
    }
  }, [map, model])
  return <></>
}
