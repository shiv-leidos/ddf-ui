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

import styled from 'styled-components'

import { Attribute, Coordinates, Format, validCoordinates } from '.'
import { formatAttribute, formatCoordinates } from './formatting'
import DistanceUtils from '../../js/DistanceUtils'

type Props = {
  format: Format
  attributes: Attribute[]
  coordinates: Coordinates
  measurementState: String
  currentDistance: number
}

const Root = styled.div<Props>`
  font-family: 'Inconsolata', 'Lucida Console', monospace;
  background: ${(props) => props.theme.backgroundModal};
  display: block;
  width: auto;
  height: auto;
  font-size: ${(props) => props.theme.minimumFontSize};
  position: absolute;
  left: 0px;
  bottom: 0px;
  text-align: left;
  padding: ${(props) => props.theme.minimumSpacing};
  max-width: 50%;
`
const CoordinateInfo = styled.div`
  white-space: pre;
  display: inline-block;
`
const MetacardInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const metacardInfo = ({ attributes }: Props) =>
  attributes.map(({ name, value }: Attribute) => {
    if (name === 'thumbnail') {
      return (
        <div key={name}>
          <img src={value} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </div>
      )
    } else {
      return (
        <MetacardInfo key={name}>
          {formatAttribute({ name, value })}
        </MetacardInfo>
      )
    }
  })

/*
 * Formats the current distance value to a string with the appropriate unit of measurement.
 */
const getDistanceText = (distance: number) => {
  // use meters when distance is under 1000m and convert to kilometers when ≥1000m
  const distanceText =
    distance < 1000
      ? `${distance.toFixed(2)} m`
      : `${DistanceUtils.getDistanceFromMeters(distance, 'kilometers').toFixed(
          2
        )} km`

  return distanceText
}

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
const distanceInfo = (props: Props) => {
  if (props.measurementState !== 'NONE') {
    return (
      <MetacardInfo>
        distance: {getDistanceText(props.currentDistance)}
      </MetacardInfo>
    )
  }
}

const render = (props: Props) => {
  if (!validCoordinates(props.coordinates)) {
    return null
  }

  const coordinates = formatCoordinates(props)
  return (
    <Root {...props}>
      {metacardInfo(props)}
      {distanceInfo(props)}
      <CoordinateInfo>
        <span data-id="coordinates-label">{coordinates}</span>
      </CoordinateInfo>
    </Root>
  )
}

export default render
