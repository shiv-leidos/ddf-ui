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
import wkx from 'wkx'

import { computeCircle, toKilometers } from './geo-helper'
import errorMessages from './errors'

const dmsRegex = new RegExp('^([0-9_]*)°([0-9_]*)\'([0-9_]*\\.?[0-9_]*)"$')
const minimumDifference = 0.0001

const LAT_DEGREES_DIGITS = 2
const LON_DEGREES_DIGITS = 3
const DEFAULT_SECONDS_PRECISION = 3

const Direction = Object.freeze({
  North: 'N',
  South: 'S',
  East: 'E',
  West: 'W',
})

function dmsCoordinateIsBlank(coordinate: any) {
  return coordinate.coordinate.length === 0
}

function dmsPointIsBlank(point: any) {
  return (
    dmsCoordinateIsBlank(point.latitude) &&
    dmsCoordinateIsBlank(point.longitude)
  )
}

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
function inputIsBlank(dms: any) {
  switch (dms.shape) {
    case 'point':
      return dmsPointIsBlank(dms.point)
    case 'circle':
      return dmsPointIsBlank(dms.circle.point)
    case 'line':
      return dms.line.list.length === 0
    case 'polygon':
      return dms.polygon.list.length === 0
    case 'boundingbox':
      return (
        dmsCoordinateIsBlank(dms.boundingbox.north) &&
        dmsCoordinateIsBlank(dms.boundingbox.south) &&
        dmsCoordinateIsBlank(dms.boundingbox.east) &&
        dmsCoordinateIsBlank(dms.boundingbox.west)
      )
  }
}

function parseDmsCoordinate(coordinate: any) {
  if (coordinate === undefined) {
    return coordinate
  }

  const matches = dmsRegex.exec(coordinate)
  if (!matches) {
    return coordinate
  }
  const degrees = replacePlaceholderWithZeros(matches[1])
  const minutes = replacePlaceholderWithZeros(matches[2])
  const seconds = replacePlaceholderWithZeros(matches[3])
  return { degrees, minutes, seconds }
}

function dmsCoordinateToDD(coordinate: any) {
  const seconds = parseFloat(coordinate.seconds)
  if (isNaN(seconds)) {
    return null
  }

  const dd =
    parseInt(coordinate.degrees) +
    parseInt(coordinate.minutes) / 60 +
    seconds / 3600
  if (
    coordinate.direction === Direction.North ||
    coordinate.direction === Direction.East
  ) {
    return dd
  } else {
    return -dd
  }
}

/*
 *  DMS -> WKT conversion utils
 */
function dmsPointToWkt(point: any) {
  const latitude = parseDmsCoordinate(point.latitude.coordinate)
  const longitude = parseDmsCoordinate(point.longitude.coordinate)
  const _latitude = dmsCoordinateToDD({
    ...latitude,
    direction: point.latitude.direction,
  })
  const _longitude = dmsCoordinateToDD({
    ...longitude,
    direction: point.longitude.direction,
  })
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number | null' is not assignable... Remove this comment to see the full error message
  return new wkx.Point(_longitude, _latitude)
}

function dmsToWkt(dms: any) {
  if (inputIsBlank(dms)) {
    return null
  }

  let wkt = null
  const points: any = []
  switch (dms.shape) {
    case 'point':
      wkt = dmsPointToWkt(dms.point).toWkt()
      break
    case 'circle':
      const distance = toKilometers(dms.circle.radius, dms.circle.units)
      wkt = computeCircle(
        dmsPointToWkt(dms.circle.point),
        distance,
        36
      )?.toWkt()
      break
    case 'line':
      if (dms.line.list.length > 0) {
        dms.line.list.map((point: any) => points.push(dmsPointToWkt(point)))
        wkt = new wkx.LineString(points).toWkt()
      }
      break
    case 'polygon':
      if (dms.polygon.list.length > 0) {
        dms.polygon.list.map((point: any) => points.push(dmsPointToWkt(point)))
        const p1 = points[0]
        const p2 = points[points.length - 1]
        if (p1.x !== p2.x || p1.y !== p2.y) {
          points.push(new wkx.Point(p1.x, p1.y))
        }
        wkt = new wkx.Polygon(points).toWkt()
      }
      break
    case 'boundingbox':
      const nw = {
        latitude: dms.boundingbox.north,
        longitude: dms.boundingbox.west,
      }
      const ne = {
        latitude: dms.boundingbox.north,
        longitude: dms.boundingbox.east,
      }
      const se = {
        latitude: dms.boundingbox.south,
        longitude: dms.boundingbox.east,
      }
      const sw = {
        latitude: dms.boundingbox.south,
        longitude: dms.boundingbox.west,
      }
      const _nw = dmsPointToWkt(nw)
      const _ne = dmsPointToWkt(ne)
      const _se = dmsPointToWkt(se)
      const _sw = dmsPointToWkt(sw)
      wkt = new wkx.Polygon([_nw, _ne, _se, _sw, _nw]).toWkt()
      break
  }
  return wkt
}

/*
 *  DMS validation utils
 */
function inValidRange(coordinate: any, maximum: any) {
  const degrees = parseInt(coordinate.degrees)
  const minutes = parseInt(coordinate.minutes)
  const seconds = parseFloat(coordinate.seconds)
  if (isNaN(seconds)) {
    return false
  }
  if (degrees > maximum || minutes > 60 || seconds > 60) {
    return false
  }
  if (degrees === maximum && (minutes > 0 || seconds > 0)) {
    return false
  }
  return true
}

function validateDmsPoint(point: any) {
  const latitude = parseDmsCoordinate(point.latitude.coordinate)
  const longitude = parseDmsCoordinate(point.longitude.coordinate)
  if (latitude && longitude) {
    return inValidRange(latitude, 90) && inValidRange(longitude, 180)
  }
  return false
}

function validateDmsBoundingBox(boundingbox: any) {
  const north = parseDmsCoordinate(boundingbox.north.coordinate)
  const south = parseDmsCoordinate(boundingbox.south.coordinate)
  const east = parseDmsCoordinate(boundingbox.east.coordinate)
  const west = parseDmsCoordinate(boundingbox.west.coordinate)

  if (!north || !south || !east || !west) {
    return false
  }

  if (
    !inValidRange(north, 90) ||
    !inValidRange(south, 90) ||
    !inValidRange(east, 180) ||
    !inValidRange(west, 180)
  ) {
    return false
  }

  const ddNorth = dmsCoordinateToDD({
    ...north,
    direction: boundingbox.north.direction,
  })
  const ddSouth = dmsCoordinateToDD({
    ...south,
    direction: boundingbox.south.direction,
  })
  const ddEast = dmsCoordinateToDD({
    ...east,
    direction: boundingbox.east.direction,
  })
  const ddWest = dmsCoordinateToDD({
    ...west,
    direction: boundingbox.west.direction,
  })
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (ddNorth < ddSouth || ddEast < ddWest) {
    return false
  }

  if (
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    ddNorth - ddSouth < minimumDifference ||
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    ddEast - ddWest < minimumDifference
  ) {
    return false
  }

  return true
}

function validateDms(dms: any) {
  if (inputIsBlank(dms)) {
    return { valid: true, error: null }
  }

  let valid = true
  let error = null
  switch (dms.shape) {
    case 'point':
      if (!validateDmsPoint(dms.point)) {
        valid = false
        error = errorMessages.invalidCoordinates
      }
      break
    case 'circle':
      const radius = parseFloat(dms.circle.radius)
      if (
        isNaN(radius) ||
        radius <= 0 ||
        toKilometers(radius, dms.circle.units) > 10000
      ) {
        valid = false
        error = errorMessages.invalidRadius
      } else if (!validateDmsPoint(dms.circle.point)) {
        valid = false
        error = errorMessages.invalidCoordinates
      }
      break
    case 'line':
      if (!dms.line.list.every(validateDmsPoint)) {
        valid = false
        error = errorMessages.invalidList
      } else if (dms.line.list.length < 2) {
        valid = false
        error = errorMessages.tooFewPointsLine
      }
      break
    case 'polygon':
      if (!dms.polygon.list.every(validateDmsPoint)) {
        valid = false
        error = errorMessages.invalidList
      } else if (dms.polygon.list.length < 3) {
        valid = false
        error = errorMessages.tooFewPointsPolygon
      }
      break
    case 'boundingbox':
      if (
        !validateDmsPoint({
          latitude: dms.boundingbox.north,
          longitude: dms.boundingbox.east,
        }) ||
        !validateDmsPoint({
          latitude: dms.boundingbox.south,
          longitude: dms.boundingbox.west,
        })
      ) {
        valid = false
        error = errorMessages.invalidCoordinates
      } else if (!validateDmsBoundingBox(dms.boundingbox)) {
        valid = false
        error = errorMessages.invalidBoundingBoxDms
      }
      break
  }
  return { valid, error }
}

/*
 *  Decimal degrees -> DMS conversion utils
 */
function roundTo(num: any, sigDigits: any) {
  const scaler = 10 ** sigDigits
  return Math.round(num * scaler) / scaler
}

function padWithZeros(num: any, width: any) {
  return num.toString().padStart(width, '0')
}

function padDecimalWithZeros(num: any, width: any) {
  const decimalParts = num.toString().split('.')
  if (decimalParts.length > 1) {
    return decimalParts[0].padStart(width, '0') + '.' + decimalParts[1]
  } else {
    return padWithZeros(num, width)
  }
}

function buildDmsString(components: any) {
  if (!components) {
    return components
  }
  return `${components.degrees}°${components.minutes}'${components.seconds}"`
}

function replacePlaceholderWithZeros(numString = '') {
  while (numString.includes('_')) {
    if (numString.includes('.')) {
      numString = numString.replace('_', '0')
    } else {
      numString = numString.replace('_', '')
      numString = '0' + numString
    }
  }
  return numString
}

function ddToDmsCoordinate(
  dd: any,
  direction: any,
  degreesPad: any,
  secondsPrecision = DEFAULT_SECONDS_PRECISION
) {
  const ddAbsoluteValue = Math.abs(dd)
  const degrees = Math.trunc(ddAbsoluteValue)
  const degreeFraction = ddAbsoluteValue - degrees
  const minutes = Math.trunc(60 * degreeFraction)
  const seconds = 3600 * degreeFraction - 60 * minutes
  const secondsRounded = roundTo(seconds, secondsPrecision)
  return {
    coordinate: buildDmsString({
      degrees: padWithZeros(degrees, degreesPad),
      minutes: padWithZeros(minutes, 2),
      seconds: padDecimalWithZeros(secondsRounded, 2),
    }),
    direction,
  }
}

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
function ddToDmsCoordinateLat(
  dd: any,
  secondsPrecision = DEFAULT_SECONDS_PRECISION
) {
  if (!isNaN(dd)) {
    const direction = dd >= 0 ? Direction.North : Direction.South
    return ddToDmsCoordinate(
      dd,
      direction,
      LAT_DEGREES_DIGITS,
      secondsPrecision
    )
  }
}

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
function ddToDmsCoordinateLon(
  dd: any,
  secondsPrecision = DEFAULT_SECONDS_PRECISION
) {
  if (!isNaN(dd)) {
    const direction = dd >= 0 ? Direction.East : Direction.West
    return ddToDmsCoordinate(
      dd,
      direction,
      LON_DEGREES_DIGITS,
      secondsPrecision
    )
  }
}

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
function getSecondsPrecision(dmsCoordinate: any) {
  if (dmsCoordinate === undefined) {
    return
  }
  const decimalIndex = dmsCoordinate.indexOf('.')
  // Must subtract 2 instead of 1 because the DMS coordinate ends with "
  const lastNumberIndex = dmsCoordinate.length - 2
  if (decimalIndex > -1 && lastNumberIndex > decimalIndex) {
    return lastNumberIndex - decimalIndex
  }
}

export {
  dmsToWkt,
  validateDms,
  validateDmsPoint,
  dmsCoordinateToDD,
  parseDmsCoordinate,
  ddToDmsCoordinateLat,
  ddToDmsCoordinateLon,
  getSecondsPrecision,
  buildDmsString,
  Direction,
}
