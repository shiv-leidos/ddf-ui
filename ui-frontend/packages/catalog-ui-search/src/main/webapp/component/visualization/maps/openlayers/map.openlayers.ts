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
/* global require, window */
import wrapNum from '../../../../react-component/utils/wrap-num/wrap-num'
import $ from 'jquery'
import _ from 'underscore'
import utility from './utility'
import DrawingUtility from '../DrawingUtility'
import { MultiLineString, LineString, Polygon, Point } from 'ol/geom'
import { get, transform as projTransform } from 'ol/proj'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import Feature from 'ol/Feature'
import { Stroke, Icon, Text as olText, Fill } from 'ol/style'
import Style from 'ol/style/Style'
import { Image as ImageLayer } from 'ol/layer'
import { ImageStatic as ImageStaticSource } from 'ol/source'
import { DragPan } from 'ol/interaction'
import { OpenlayersLayers } from '../../../../js/controllers/openlayers.layers'
import wreqr from '../../../../js/wreqr'
import { validateGeo } from '../../../../react-component/utils/validation'
import { ClusterType } from '../react/geometries'
import { LazyQueryResult } from '../../../../js/model/LazyQueryResult/LazyQueryResult'
import { StartupDataStore } from '../../../../js/model/Startup/startup'
import _debounce from 'lodash.debounce'
import { ProjectionLike } from 'ol/proj'
import Group from 'ol/layer/Group'
import { Coordinate } from 'ol/coordinate'
import Map from 'ol/Map'
import { boundingExtent, createEmpty, extend } from 'ol/extent'
import { getLength } from 'ol/sphere'

const defaultColor = '#3c6dd5'
const rulerColor = '#506f85'
function createMap(insertionElement: any, mapLayers: any) {
  const layerCollectionController = new OpenlayersLayers({
    collection: mapLayers,
  })
  const map = layerCollectionController.makeMap({
    zoom: 2.7,
    minZoom: 2.3,
    center: [0, 0],
    element: insertionElement,
  })
  return map as Map
}
function determineIdFromPosition(position: any, map: any) {
  const features: any = []
  map.forEachFeatureAtPixel(position, (feature: any) => {
    features.push(feature)
  })
  if (features.length > 0) {
    return features[0].getId()
  }
}
function determineIdsFromPosition(position: any, map: any) {
  const features: any = []
  let id, locationId
  map.forEachFeatureAtPixel(position, (feature: any) => {
    features.push(feature)
  })
  if (features.length > 0) {
    id = features[0].getId()
    locationId = features[0].get('locationId')
  }
  return { id, locationId }
}
function convertPointCoordinate(point: [number, number]) {
  const coords = [point[0], point[1]]
  return projTransform(
    coords as Coordinate,
    'EPSG:4326',
    StartupDataStore.Configuration.getProjection()
  )
}
function unconvertPointCoordinate(point: [number, number]) {
  return projTransform(
    point,
    StartupDataStore.Configuration.getProjection(),
    'EPSG:4326'
  )
}
// @ts-expect-error ts-migrate(6133) FIXME: 'longitude' is declared but its value is never rea... Remove this comment to see the full error message
function offMap([longitude, latitude]) {
  return latitude < -90 || latitude > 90
}
// The extension argument is a function used in panToExtent
// It allows for customization of the way the map pans to results
export default function (
  insertionElement: any,
  _selectionInterface: any,
  _notificationEl: any,
  _componentElement: any,
  mapModel: any,
  mapLayers: any
) {
  let overlays = {}
  let shapes: any = []
  const map = createMap(insertionElement, mapLayers)

  setupTooltip(map)
  function setupTooltip(map: any) {
    map.on('pointermove', (e: any) => {
      const point = unconvertPointCoordinate(e.coordinate)
      if (!offMap(point as any)) {
        mapModel.updateMouseCoordinates({
          lat: point[1],
          lon: point[0],
        })
      } else {
        mapModel.clearMouseCoordinates()
      }
    })
  }
  function resizeMap() {
    map.updateSize()
  }
  const debouncedResizeMap = _debounce(resizeMap, 250)
  function listenToResize() {
    ;(wreqr as any).vent.on('resize', debouncedResizeMap)
    window.addEventListener('resize', debouncedResizeMap)
  }
  function unlistenToResize() {
    ;(wreqr as any).vent.off('resize', debouncedResizeMap)
    window.removeEventListener('resize', debouncedResizeMap)
  }
  listenToResize()
  /*
   * Returns a visible label that is in the same location as the provided label (geometryInstance) if one exists.
   * If findSelected is true, the function will also check for hidden labels in the same location but are selected.
   */
  function findOverlappingLabel(findSelected: any, geometryInstance: any) {
    return _.find(
      mapModel.get('labels'),
      (label) =>
        label.getSource().getFeatures()[0].getGeometry().getCoordinates()[0] ===
          geometryInstance.getCoordinates()[0] &&
        label.getSource().getFeatures()[0].getGeometry().getCoordinates()[1] ===
          geometryInstance.getCoordinates()[1] &&
        ((findSelected && label.get('isSelected')) || label.getVisible())
    )
  }
  /*
        Only shows one label if there are multiple labels in the same location.
  
        Show the label in the following importance:
          - it is selected
          - there is no other label displayed at the same location
          - it is the label that was found by findOverlappingLabel
  
        Arguments are:
          - the label to show/hide (geometry, feature)
          - if the label is selected
          - if the search for overlapping label should include hidden selected labels
        */
  function showHideLabel({ geometry, feature, findSelected = false }: any) {
    const isSelected = geometry.get('isSelected')
    const geometryInstance = feature.getGeometry()
    const labelWithSamePosition = findOverlappingLabel(
      findSelected,
      geometryInstance
    )
    if (
      isSelected &&
      labelWithSamePosition &&
      !labelWithSamePosition.get('isSelected')
    ) {
      labelWithSamePosition.setVisible(false)
    }
    const otherLabelNotSelected = labelWithSamePosition
      ? !labelWithSamePosition.get('isSelected')
      : true
    const visible =
      (isSelected && otherLabelNotSelected) ||
      !labelWithSamePosition ||
      geometry.get('id') === labelWithSamePosition.get('id')
    geometry.setVisible(visible)
  }
  /*
        Shows a hidden label. Used when deleting a label that is shown.
        */
  function showHiddenLabel(geometry: any) {
    if (!geometry.getVisible()) {
      return
    }
    const geometryInstance = geometry.getSource().getFeatures()[0].getGeometry()
    const hiddenLabel = _.find(
      mapModel.get('labels'),
      (label) =>
        label.getSource().getFeatures()[0].getGeometry().getCoordinates()[0] ===
          geometryInstance.getCoordinates()[0] &&
        label.getSource().getFeatures()[0].getGeometry().getCoordinates()[1] ===
          geometryInstance.getCoordinates()[1] &&
        label.get('id') !== geometry.get('id') &&
        !label.getVisible()
    )
    if (hiddenLabel) {
      hiddenLabel.setVisible(true)
    }
  }
  let geoDragDownListener: any
  let geoDragMoveListener: any
  let geoDragUpListener: any
  let leftClickMapAPIListener: any
  const exposedMethods = {
    onMouseTrackingForGeoDrag({
      moveFrom,
      down,
      move,
      up,
    }: {
      moveFrom?: any
      down: any
      move: any
      up: any
    }) {
      // disable panning of the map
      map.getInteractions().forEach((interaction: any) => {
        if (interaction instanceof DragPan) {
          interaction.setActive(false)
        }
      })

      // enable dragging individual features
      geoDragDownListener = function (event: any) {
        const { locationId } = determineIdsFromPosition(event.pixel, map)
        const coordinates = map.getCoordinateFromPixel(event.pixel)
        const position = { latitude: coordinates[1], longitude: coordinates[0] }
        down({ position: position, mapLocationId: locationId })
      }
      map.on('pointerdown' as any, geoDragDownListener)

      geoDragMoveListener = function (event: any) {
        const { locationId } = determineIdsFromPosition(event.pixel, map)
        const coordinates = map.getCoordinateFromPixel(event.pixel)
        const translation = moveFrom
          ? {
              latitude: coordinates[1] - moveFrom.latitude,
              longitude: coordinates[0] - moveFrom.longitude,
            }
          : null
        move({ translation: translation, mapLocationId: locationId })
      }
      map.on('pointerdrag', geoDragMoveListener)

      geoDragUpListener = up
      map.on('pointerup' as any, geoDragUpListener)
    },
    clearMouseTrackingForGeoDrag() {
      // re-enable panning
      map.getInteractions().forEach((interaction: any) => {
        if (interaction instanceof DragPan) {
          interaction.setActive(true)
        }
      })
      if (geoDragDownListener) {
        map.un('pointerdown' as any, geoDragDownListener)
      }
      if (geoDragMoveListener) {
        map.un('pointerdrag', geoDragMoveListener)
      }
      if (geoDragUpListener) {
        map.un('pointerup' as any, geoDragUpListener)
      }
    },
    onLeftClickMapAPI(callback: any) {
      leftClickMapAPIListener = function (event: any) {
        const { locationId } = determineIdsFromPosition(event.pixel, map)
        callback(locationId)
      }
      map.on('singleclick', leftClickMapAPIListener)
    },
    clearLeftClickMapAPI() {
      map.un('singleclick', leftClickMapAPIListener)
    },
    onLeftClick(callback: any) {
      $(map.getTargetElement()).on('click', (e) => {
        const boundingRect = map.getTargetElement().getBoundingClientRect()
        callback(e, {
          mapTarget: determineIdFromPosition(
            [e.clientX - boundingRect.left, e.clientY - boundingRect.top],
            map
          ),
        })
      })
    },
    onRightClick(callback: any) {
      $(map.getTargetElement()).on('contextmenu', (e) => {
        callback(e)
      })
    },
    clearRightClick() {
      $(map.getTargetElement()).off('contextmenu')
    },
    onDoubleClick() {
      $(map.getTargetElement()).on('dblclick', (e) => {
        const boundingRect = map.getTargetElement().getBoundingClientRect()
        const { locationId } = determineIdsFromPosition(
          [e.clientX - boundingRect.left, e.clientY - boundingRect.top],
          map
        )
        if (locationId) {
          ;(wreqr as any).vent.trigger('location:doubleClick', locationId)
        }
      })
    },
    clearDoubleClick() {
      $(map.getTargetElement()).off('dblclick')
    },
    onMouseTrackingForPopup(
      downCallback: any,
      moveCallback: any,
      upCallback: any
    ) {
      $(map.getTargetElement()).on('mousedown', () => {
        downCallback()
      })
      $(map.getTargetElement()).on('mousemove', () => {
        moveCallback()
      })
      this.onLeftClick(upCallback)
    },
    onMouseMove(callback: any) {
      $(map.getTargetElement()).on('mousemove', (e) => {
        const boundingRect = map.getTargetElement().getBoundingClientRect()
        const position = [
          e.clientX - boundingRect.left,
          e.clientY - boundingRect.top,
        ]
        const { locationId } = determineIdsFromPosition(position, map)
        callback(e, {
          mapTarget: determineIdFromPosition(position, map),
          mapLocationId: locationId,
        })
      })
    },
    clearMouseMove() {
      $(map.getTargetElement()).off('mousemove')
    },
    timeoutIds: [] as number[],
    onCameraMoveStart(callback: any) {
      this.timeoutIds.forEach((timeoutId: any) => {
        window.clearTimeout(timeoutId)
      })
      this.timeoutIds = []
      map.addEventListener('movestart', callback)
    },
    offCameraMoveStart(callback: any) {
      map.removeEventListener('movestart', callback)
    },
    onCameraMoveEnd(callback: any) {
      const timeoutCallback = () => {
        this.timeoutIds.push(
          window.setTimeout(() => {
            callback()
          }, 300)
        )
      }
      map.addEventListener('moveend', timeoutCallback)
    },
    offCameraMoveEnd(callback: any) {
      map.removeEventListener('moveend', callback)
    },
    doPanZoom(coords: [number, number][]) {
      const that = this
      that.panZoomOut({ duration: 1000 }, () => {
        setTimeout(() => {
          that.zoomToExtent(coords, { duration: 2000 })
        }, 0)
      })
    },
    panZoomOut(_opts: any, next: any) {
      next()
    },
    panToResults(results: any) {
      const coordinates = _.flatten(
        results.map((result: any) => result.getPoints('location')),
        true
      )
      this.panToExtent(coordinates)
    },
    panToExtent(coords: [number, number][]) {
      if (Array.isArray(coords) && coords.length > 0) {
        const lineObject = coords.map((coordinate) =>
          convertPointCoordinate(coordinate)
        )
        const extent = boundingExtent(lineObject)
        map.getView().fit(extent, {
          size: map.getSize(),
          maxZoom: map.getView().getZoom(),
          duration: 500,
        })
      }
    },
    getExtentOfIds(ids: string[]) {
      var extent = createEmpty()
      map.getLayers().forEach((layer: any) => {
        // might need to handle groups later, but no reason to yet
        if (layer instanceof VectorLayer && ids.includes(layer.get('id'))) {
          extend(extent, layer.getSource().getExtent())
        }
      })
      if (extent[0] === Infinity) {
        throw new Error('No extent found for ids')
      }
      return extent
    },
    zoomToIds({ ids, duration = 500 }: { ids: string[]; duration?: number }) {
      map.getView().fit(this.getExtentOfIds(ids), {
        duration,
      })
    },
    panToShapesExtent({ duration = 500 }: { duration?: number } = {}) {
      var extent = createEmpty()
      map.getLayers().forEach((layer: any) => {
        if (layer instanceof Group) {
          layer.getLayers().forEach(function (groupLayer: any) {
            //If this is a vector layer, add it to our extent
            if (layer instanceof VectorLayer)
              extend(extent, (groupLayer as any).getSource().getExtent())
          })
        } else if (layer instanceof VectorLayer && layer.get('id')) {
          extend(extent, layer.getSource().getExtent())
        }
      })
      if (extent[0] !== Infinity) {
        map.getView().fit(extent, {
          duration,
        })
      }
    },
    getShapes() {
      return shapes
    },
    zoomToExtent(coords: [number, number][], opts = {}) {
      const lineObject = coords.map((coordinate: any) =>
        convertPointCoordinate(coordinate)
      )
      const extent = boundingExtent(lineObject)
      map.getView().fit(extent, {
        size: map.getSize(),
        maxZoom: map.getView().getZoom(),
        duration: 500,
        ...opts,
      })
    },
    zoomToBoundingBox({ north, east, south, west }: any) {
      this.zoomToExtent([
        [west, south],
        [east, north],
      ])
    },
    limit(value: any, min: any, max: any) {
      return Math.min(Math.max(value, min), max)
    },
    getBoundingBox() {
      const extent = map.getView().calculateExtent(map.getSize())
      let longitudeEast = wrapNum(extent[2], -180, 180)
      const longitudeWest = wrapNum(extent[0], -180, 180)
      //add 360 degrees to longitudeEast to accommodate bounding boxes that span across the anti-meridian
      if (longitudeEast < longitudeWest) {
        longitudeEast += 360
      }
      return {
        north: this.limit(extent[3], -90, 90),
        east: longitudeEast,
        south: this.limit(extent[1], -90, 90),
        west: longitudeWest,
      }
    },
    overlayImage(model: LazyQueryResult) {
      const metacardId = model.plain.id
      this.removeOverlay(metacardId)
      const coords = model.getPoints('location')
      const array = _.map(coords, (coord) => convertPointCoordinate(coord))
      const polygon = new Polygon([array])
      const extent = polygon.getExtent()
      const projection = get(StartupDataStore.Configuration.getProjection())
      const overlayLayer = new ImageLayer({
        source: new ImageStaticSource({
          url: model.currentOverlayUrl || '',
          projection: projection as ProjectionLike,
          imageExtent: extent,
        }),
      })
      map.addLayer(overlayLayer)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      overlays[metacardId] = overlayLayer
    },
    removeOverlay(metacardId: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (overlays[metacardId]) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        map.removeLayer(overlays[metacardId])
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        delete overlays[metacardId]
      }
    },
    removeAllOverlays() {
      for (const overlay in overlays) {
        if (overlays.hasOwnProperty(overlay)) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          map.removeLayer(overlays[overlay])
        }
      }
      overlays = {}
    },
    getCartographicCenterOfClusterInDegrees(cluster: ClusterType) {
      return utility.calculateCartographicCenterOfGeometriesInDegrees(
        cluster.results
      )
    },
    getWindowLocationsOfResults(results: any) {
      return results.map((result: any) => {
        const openlayersCenterOfGeometry =
          utility.calculateOpenlayersCenterOfGeometry(result)
        const center = map.getPixelFromCoordinate(openlayersCenterOfGeometry)
        if (center) {
          return center
        } else {
          return undefined
        }
      })
    },
    /*
     * Calculates the distance (in meters) between the two positions in the given array of
     * Coordinates.
     */
    calculateDistanceBetweenPositions(coords: any) {
      const line = new LineString(coords)
      const sphereLength = getLength(line)
      return sphereLength
    },
    /*
     * Draws a marker on the map designating a start/end point for the ruler measurement. The given
     * coordinates should be an object with 'lat' and 'lon' keys with degrees values. The given
     * marker label should be a single character or digit that is displayed on the map marker.
     */
    addRulerPoint(coordinates: any, markerLabel: any) {
      const { lat, lon } = coordinates
      const point = [lon, lat]
      const options = {
        id: markerLabel,
        color: rulerColor,
      }
      return this.addPoint(point, options)
    },
    /*
     * Removes the given point Layer from the map.
     */
    removeRulerPoint(pointLayer: any) {
      map.removeLayer(pointLayer)
    },
    rulerLine: null as null | VectorLayer<
      VectorSource<Feature<LineString>>,
      Feature<LineString>
    >,
    /*
     * Draws a line on the map between the points in the given array of point Vectors.
     */
    addRulerLine(point: any) {
      const options = {
        id: 'ruler-line',
        title: 'Line for ruler measurement',
        color: '#506F85',
      }
      const startingCoordinates = mapModel.get('startingCoordinates')
      const linePoints = [
        [startingCoordinates['lon'], startingCoordinates['lat']],
        [point['lon'], point['lat']],
      ]
      this.rulerLine = this.addLine(linePoints, options)
      return this.rulerLine
    },
    /*
     * Update the position of the ruler line
     */
    setRulerLine(point: any) {
      this.removeRulerLine()
      this.addRulerLine(point)
    },
    /*
     * Removes the given line Layer from the map.
     */
    removeRulerLine() {
      if (this.rulerLine) {
        map.removeLayer(this.rulerLine)
      }
    },
    /*
            Adds a billboard point utilizing the passed in point and options.
            Options are a view to relate to, and an id, and a color.
        */
    addPointWithText(point: any, options: any) {
      const pointObject = convertPointCoordinate(point)
      const feature = new Feature({
        geometry: new Point(pointObject),
      })
      const badgeOffset = options.badgeOptions ? 8 : 0
      const imgWidth = 44 + badgeOffset
      const imgHeight = 44 + badgeOffset

      feature.setId(options.id)
      feature.set(
        'unselectedStyle',
        new Style({
          image: new Icon({
            img: DrawingUtility.getCircleWithText({
              fillColor: options.color,
              text: options.id.length,
              badgeOptions: options.badgeOptions,
            }),
            width: imgWidth,
            height: imgHeight,
          }),
        })
      )
      feature.set(
        'partiallySelectedStyle',
        new Style({
          image: new Icon({
            img: DrawingUtility.getCircleWithText({
              fillColor: options.color,
              text: options.id.length,
              strokeColor: 'black',
              textColor: 'white',
              badgeOptions: options.badgeOptions,
            }),
            width: imgWidth,
            height: imgHeight,
          }),
        })
      )
      feature.set(
        'selectedStyle',
        new Style({
          image: new Icon({
            img: DrawingUtility.getCircleWithText({
              fillColor: 'orange',
              text: options.id.length,
              strokeColor: 'white',
              textColor: 'white',
              badgeOptions: options.badgeOptions,
            }),
            width: imgWidth,
            height: imgHeight,
          }),
        })
      )
      switch (options.isSelected) {
        case 'selected':
          feature.setStyle(feature.get('selectedStyle'))
          break
        case 'partially':
          feature.setStyle(feature.get('partiallySelectedStyle'))
          break
        case 'unselected':
          feature.setStyle(feature.get('unselectedStyle'))
          break
      }
      const vectorSource = new VectorSource({
        features: [feature],
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1,
      })
      map.addLayer(vectorLayer)
      return vectorLayer
    },
    /*
              Adds a billboard point utilizing the passed in point and options.
              Options are a view to relate to, and an id, and a color.
            */
    addPoint(point: any, options: any) {
      const pointObject = convertPointCoordinate(point)
      const feature = new Feature({
        geometry: new Point(pointObject),
        name: options.title,
      })
      feature.setId(options.id)
      const badgeOffset = options.badgeOptions ? 8 : 0
      let x = 39 + badgeOffset,
        y = 40 + badgeOffset
      if (options.size) {
        x = options.size.x
        y = options.size.y
      }
      feature.set(
        'unselectedStyle',
        new Style({
          image: new Icon({
            img: DrawingUtility.getPin({
              fillColor: options.color,
              icon: options.icon,
              badgeOptions: options.badgeOptions,
            }),
            width: x,
            height: y,
            anchor: [x / 2 - badgeOffset / 2, 0],
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
          }),
        })
      )
      feature.set(
        'selectedStyle',
        new Style({
          image: new Icon({
            img: DrawingUtility.getPin({
              fillColor: 'orange',
              icon: options.icon,
              badgeOptions: options.badgeOptions,
            }),
            width: x,
            height: y,
            anchor: [x / 2 - badgeOffset / 2, 0],
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
          }),
        })
      )
      feature.setStyle(
        options.isSelected
          ? feature.get('selectedStyle')
          : feature.get('unselectedStyle')
      )
      const vectorSource = new VectorSource({
        features: [feature],
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1,
      })
      map.addLayer(vectorLayer)
      return vectorLayer
    },
    /*
              Adds a label utilizing the passed in point and options.
              Options are an id and text.
            */
    addLabel(point: any, options: any) {
      const pointObject = convertPointCoordinate(point)
      const feature = new Feature({
        geometry: new Point(pointObject),
        name: options.text,
        isLabel: true,
      })
      feature.setId(options.id)
      feature.setStyle(
        new Style({
          text: new olText({
            text: options.text,
            overflow: true,
          }),
        })
      )
      const vectorSource = new VectorSource({
        features: [feature],
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1,
        // @ts-ignore
        id: options.id,
        isSelected: false,
      })
      map.addLayer(vectorLayer)
      mapModel.addLabel(vectorLayer)
      return vectorLayer
    },
    /*
              Adds a polyline utilizing the passed in line and options.
              Options are a view to relate to, and an id, and a color.
            */
    addLine(line: any, options: any) {
      const lineObject = line.map((coordinate: any) =>
        convertPointCoordinate(coordinate)
      )
      const feature = new Feature({
        geometry: new LineString(lineObject),
        name: options.title,
      })
      feature.setId(options.id)
      const commonStyle = new Style({
        stroke: new Stroke({
          color: options.color || defaultColor,
          width: 4,
        }),
      })
      ;(feature as any).unselectedStyle = [
        new Style({
          stroke: new Stroke({
            color: 'white',
            width: 8,
          }),
        }),
        commonStyle,
      ]
      ;(feature as any).selectedStyle = [
        new Style({
          stroke: new Stroke({
            color: 'black',
            width: 8,
          }),
        }),
        commonStyle,
      ]
      feature.setStyle(
        options.isSelected
          ? (feature as any).selectedStyle
          : (feature as any).unselectedStyle
      )
      const vectorSource = new VectorSource({
        features: [feature],
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      })
      map.addLayer(vectorLayer)
      return vectorLayer
    },
    /*
              Adds a polygon fill utilizing the passed in polygon and options.
              Options are a view to relate to, and an id.
            */
    addPolygon() {},
    /*
             Updates a passed in geometry to reflect whether or not it is selected.
             Options passed in are color and isSelected.
             */
    updateCluster(geometry: any, options: any) {
      if (Array.isArray(geometry)) {
        geometry.forEach((innerGeometry) => {
          this.updateCluster(innerGeometry, options)
        })
      } else {
        const feature = geometry.getSource().getFeatures()[0]
        const geometryInstance = feature.getGeometry()
        if (geometryInstance.constructor === Point) {
          geometry.setZIndex(options.isSelected ? 2 : 1)
          switch (options.isSelected) {
            case 'selected':
              feature.setStyle(feature.get('selectedStyle'))
              break
            case 'partially':
              feature.setStyle(feature.get('partiallySelectedStyle'))
              break
            case 'unselected':
              feature.setStyle(feature.get('unselectedStyle'))
              break
          }
        } else if (geometryInstance.constructor === LineString) {
          const styles = [
            new Style({
              stroke: new Stroke({
                color: 'rgba(255,255,255, .1)',
                width: 8,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: 'rgba(0,0,0, .1)',
                width: 4,
              }),
            }),
          ]
          feature.setStyle(styles)
        }
      }
    },
    /*
              Updates a passed in geometry to reflect whether or not it is selected.
              Options passed in are color and isSelected.
            */
    updateGeometry(geometry: any, options: any) {
      if (Array.isArray(geometry)) {
        geometry.forEach((innerGeometry) => {
          this.updateGeometry(innerGeometry, options)
        })
      } else {
        const feature = geometry.getSource().getFeatures()[0]
        const geometryInstance = feature.getGeometry()
        if (geometryInstance.constructor === Point) {
          geometry.setZIndex(options.isSelected ? 2 : 1)
          feature.setStyle(
            options.isSelected
              ? feature.get('selectedStyle')
              : feature.get('unselectedStyle')
          )
        } else if (geometryInstance.constructor === LineString) {
          feature.setStyle(
            options.isSelected
              ? feature.get('selectedStyle')
              : feature.get('unselectedStyle')
          )
        }
      }
    },
    setGeometryStyle(geometry: any, options: any, feature: any) {
      const geometryInstance = feature.getGeometry()
      if (geometryInstance.getType() === 'Point') {
        let pointWidth = 39
        let pointHeight = 40
        if (options.size) {
          pointWidth = options.size.x
          pointHeight = options.size.y
        }
        geometry.setZIndex(options.isSelected ? 2 : 1)
        if (!feature.getProperties().isLabel) {
          feature.setStyle(
            new Style({
              image: new Icon({
                img: DrawingUtility.getPin({
                  fillColor: options.isSelected ? 'orange' : options.color,
                  strokeColor: 'white',
                  icon: options.icon,
                }),
                width: pointWidth,
                height: pointHeight,
                anchor: [pointWidth / 2, 0],
                anchorOrigin: 'bottom-left',
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
              }),
            })
          )
        } else {
          feature.setStyle(
            new Style({
              text: this.createTextStyle(
                feature,
                map.getView().getResolution()
              ),
            })
          )
          geometry.set('isSelected', options.isSelected)
          showHideLabel({
            geometry,
            feature,
          })
        }
      } else if (geometryInstance.getType() === 'LineString') {
        const styles = [
          new Style({
            stroke: new Stroke({
              color: 'white',
              width: 8,
            }),
          }),
          new Style({
            stroke: new Stroke({
              color: options.color || defaultColor,
              width: 4,
            }),
          }),
        ]
        feature.setStyle(styles)
      }
    },
    createTextStyle(feature: any, resolution: any) {
      const fillColor = '#000000'
      const outlineColor = '#ffffff'
      const outlineWidth = 3
      return new olText({
        text: this.getText(feature, resolution),
        fill: new Fill({ color: fillColor }),
        stroke: new Stroke({
          color: outlineColor,
          width: outlineWidth,
        }),
        offsetX: 20,
        offsetY: -15,
        placement: 'point',
        maxAngle: 45,
        overflow: true,
        rotation: 0,
        textAlign: 'left',
        padding: [5, 5, 5, 5],
      })
    },
    getText(feature: any, resolution: any) {
      const maxResolution = 1200
      const text =
        resolution > maxResolution ? '' : this.trunc(feature.get('name'), 20)
      return text
    },
    trunc(str: any, n: any) {
      return str.length > n ? str.substr(0, n - 1) + '...' : str.substr(0)
    },
    /*
             Updates a passed in geometry to be hidden
             */
    hideGeometry(geometry: any) {
      geometry.setVisible(false)
    },
    /*
             Updates a passed in geometry to be shown
             */
    showGeometry(geometry: any) {
      const feature = geometry.getSource().getFeatures()[0]
      if (feature.getProperties().isLabel) {
        showHideLabel({
          geometry,
          feature,
          findSelected: true,
        })
      } else {
        geometry.setVisible(true)
      }
    },
    removeGeometry(geometry: any) {
      const feature = geometry.getSource().getFeatures()[0]
      if (feature.getProperties().isLabel) {
        mapModel.removeLabel(geometry)
        showHiddenLabel(geometry)
      }
      map.removeLayer(geometry)
    },
    showMultiLineShape(locationModel: any) {
      let lineObject = locationModel.get('multiline')
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (validateGeo('multiline', JSON.stringify(lineObject)).error) {
        return
      }
      lineObject = lineObject.map((line: any) =>
        line.map((coords: any) => convertPointCoordinate(coords))
      )
      let feature = new Feature({
        geometry: new MultiLineString(lineObject),
      })
      feature.setId(locationModel.cid)
      const styles = [
        new Style({
          stroke: new Stroke({
            color: locationModel.get('color') || defaultColor,
            width: 4,
          }),
        }),
      ]
      feature.setStyle(styles)
      return this.createVectorLayer(locationModel, feature)
    },
    createVectorLayer(locationModel: any, feature: any) {
      let vectorSource = new VectorSource({
        features: [feature],
      })
      let vectorLayer = new VectorLayer({
        source: vectorSource,
      })
      map.addLayer(vectorLayer)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      overlays[locationModel.cid] = vectorLayer
      return vectorLayer
    },
    destroyShape(cid: any) {
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'shape' implicitly has an 'any' type.
      const shapeIndex = shapes.findIndex((shape) => cid === shape.model.cid)
      if (shapeIndex >= 0) {
        shapes[shapeIndex].destroy()
        shapes.splice(shapeIndex, 1)
      }
    },
    destroyShapes() {
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'shape' implicitly has an 'any' type.
      shapes.forEach((shape) => {
        shape.destroy()
      })
      shapes = []
    },
    getMap() {
      return map
    },
    zoomIn() {
      const view = map.getView()
      const zoom = view.getZoom()
      if (zoom) {
        view.setZoom(zoom + 1)
      }
    },
    zoomOut() {
      const view = map.getView()
      const zoom = view.getZoom()
      if (zoom) {
        view.setZoom(zoom - 1)
      }
    },
    destroy() {
      unlistenToResize()
    },
  }
  return exposedMethods
}
