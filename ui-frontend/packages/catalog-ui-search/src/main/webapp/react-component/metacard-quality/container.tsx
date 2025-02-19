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

import * as React from 'react'
import fetch from '../utils/fetch'
import MetacardQualityPresentation from './presentation'
import { LazyQueryResult } from '../../js/model/LazyQueryResult/LazyQueryResult'
import wreqr from '../../js/wreqr'
type Props = {
  result: LazyQueryResult
}
type State = {
  attributeValidation: any
  metacardValidation: any
  loading: boolean
}
class MetacardQuality extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.model = props.result
    this.state = {
      attributeValidation: [],
      metacardValidation: [],
      loading: true,
    }
  }
  model: LazyQueryResult
  componentDidMount() {
    setTimeout(() => {
      const metacardId = this.model.plain.id
      const storeId = this.model.plain.metacard.properties['source-id']
      const attributeValidationRes = fetch(
        `./internal/metacard/${metacardId}/${storeId}/attribute/validation`
      )
      const metacardValidationRes = fetch(
        `./internal/metacard/${metacardId}/${storeId}/validation`
      )
      Promise.all([attributeValidationRes, metacardValidationRes]).then(
        async (responses) => {
          const attributeValidation = await this.getData(
            responses[0],
            'Attribute'
          )
          let metacardValidation = await this.getData(responses[1], 'Metacard')
          this.checkForDuplicate(metacardValidation)
          this.setState({
            attributeValidation,
            metacardValidation,
            loading: false,
          })
        }
      )
    }, 1000)
  }
  getData = (res: any, type: string) => {
    if (!res.ok) {
      ;(wreqr as any).vent.trigger('snack', {
        message: `Unable to retrieve ${type} Validation Issues`,
        snackProps: {
          alertProps: {
            severity: 'warn',
          },
        },
      })
      return []
    } else {
      return res.json()
    }
  }
  checkForDuplicate = (metacardValidation: any) => {
    metacardValidation.forEach((validationIssue: any) => {
      if (
        validationIssue.message.startsWith('Duplicate data found in catalog')
      ) {
        var idRegEx = new RegExp('{(.*?)}')
        var excutedregex = idRegEx.exec(validationIssue.message)
        if (excutedregex) {
          validationIssue.duplicate = {
            ids: excutedregex[1].split(', '),
            message: validationIssue.message.split(excutedregex[1]),
          }
        }
      }
    })
  }
  render() {
    const { attributeValidation, metacardValidation, loading } = this.state
    return (
      <MetacardQualityPresentation
        attributeValidation={attributeValidation}
        metacardValidation={metacardValidation}
        loading={loading}
      />
    )
  }
}
export default MetacardQuality
