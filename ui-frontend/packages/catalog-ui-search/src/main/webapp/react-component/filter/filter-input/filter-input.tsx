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
import { getAttributeType as defaultGetAttributeType } from '../filterHelper'
import LocationInput from './filter-location-input'

import { DateField } from '../../../component/fields/date'
import { NearField } from '../../../component/fields/near'
import { NumberRangeField } from '../../../component/fields/number-range'
import { DateRangeField } from '../../../component/fields/date-range'
import { DateRelativeField } from '../../../component/fields/date-relative'
import {
  BasicDatatypeFilter,
  FilterClass,
  ValueTypes,
} from '../../../component/filter-builder/filter.structure'
import { IntegerField } from '../../../component/fields/integer'
import { FloatField } from '../../../component/fields/float'
import { BooleanField } from '../../../component/fields/boolean'
import { DateAroundField } from '../../../component/fields/date-around'
import { CustomInputOrDefault } from './customInputOrDefault'
import BooleanSearchBar from '../../../component/boolean-search-bar/boolean-search-bar'
import { EnterKeySubmitProps } from '../../../component/custom-events/enter-key-submit'
import { EnumInput } from './enum-input'
import { ValidationResult } from '../../location/validators'
import { useMetacardDefinitions } from '../../../js/model/Startup/metacard-definitions.hooks'
import { ReservedBasicDatatype } from '../../../component/reserved-basic-datatype/reserved.basic-datatype'
import { BasicDataTypePropertyName } from '../../../component/filter-builder/reserved.properties'
import { ResourceSizeField } from '../../../component/fields/resource-size'
import { ResourceSizeRangeField } from '../../../component/fields/resource-size-range'
import { useConfiguration } from '../../../js/model/Startup/configuration.hooks'
export type Props = {
  filter: FilterClass
  setFilter: (filter: FilterClass) => void
  errorListener?: (validationResults: {
    [key: string]: ValidationResult | undefined
  }) => void
  getAttributeType?: typeof defaultGetAttributeType
}

export const FilterInputContext = React.createContext({
  resourceSizeIdentifiers: [] as string[],
})

/**
 *  This is how we determine when we should show the resource size input.
 *  The default provider uses the configuration to get the resource size identifiers.
 *
 *  If you want to show the resource size input for a custom filter,
 *  you can create a custom provider and wrap your filter input with it.
 */
export const DefaultFilterInputProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const resourceSizeIdentifiers =
    useConfiguration().getResourceSizeIdentifiers()
  return (
    <FilterInputContext.Provider
      value={{
        resourceSizeIdentifiers,
      }}
    >
      {children}
    </FilterInputContext.Provider>
  )
}

function useResourceSizeIdentifiers() {
  return React.useContext(FilterInputContext)
}

const FilterInput = ({
  filter,
  setFilter,
  errorListener,
  getAttributeType = defaultGetAttributeType,
}: Props) => {
  const resourceSizeIdentifiers =
    useResourceSizeIdentifiers().resourceSizeIdentifiers
  const type = getAttributeType(filter.property)
  const MetacardDefinitions = useMetacardDefinitions()
  const { value } = filter
  const onChange = (val: any) => {
    const { context, ...rest } = filter // most filters don't need context, and if they do they are using setFilter directly, not onChange
    setFilter(
      new FilterClass({
        ...rest,
        value: val,
      })
    )
  }

  if (filter.property === BasicDataTypePropertyName) {
    return (
      <ReservedBasicDatatype
        onChange={onChange}
        value={value as BasicDatatypeFilter['value']}
      />
    )
  }

  if (resourceSizeIdentifiers.includes(filter.property)) {
    switch (filter.type) {
      case 'BETWEEN':
        return <ResourceSizeRangeField filter={filter} setFilter={setFilter} />
      case 'IS NULL':
        return null
      default:
        return <ResourceSizeField filter={filter} setFilter={setFilter} />
    }
  }

  switch (filter.type) {
    case 'IS NULL':
      return null
    case 'BOOLEAN_TEXT_SEARCH':
      return (
        <BooleanSearchBar
          value={value as ValueTypes['booleanText']}
          onChange={onChange}
          property={filter.property}
        />
      )
    case 'FILTER FUNCTION proximity':
      return (
        <NearField
          value={value as ValueTypes['proximity']}
          onChange={onChange}
        />
      )
    case 'DURING':
      return (
        <DateRangeField
          value={value as ValueTypes['during']}
          onChange={onChange}
        />
      )
    case 'RELATIVE':
      return (
        <DateRelativeField
          value={value as ValueTypes['relative']}
          onChange={onChange}
        />
      )
    case 'AROUND':
      return (
        <DateAroundField
          value={value as ValueTypes['around']}
          onChange={onChange}
        />
      )
    case 'BETWEEN':
      return (
        <NumberRangeField
          value={value as ValueTypes['between']}
          type={type === 'INTEGER' ? 'integer' : 'float'}
          onChange={onChange}
        />
      )
  }

  switch (type) {
    case 'BOOLEAN':
      return (
        <BooleanField
          value={value as ValueTypes['boolean']}
          onChange={onChange}
        />
      )
    case 'DATE':
      return <DateField onChange={onChange} value={value as string} />
    case 'LOCATION':
      return (
        <LocationInput
          value={value}
          onChange={onChange}
          errorListener={errorListener}
        />
      )
    case 'FLOAT':
      return (
        <FloatField value={value as ValueTypes['float']} onChange={onChange} />
      )
    case 'INTEGER':
      return (
        <IntegerField
          value={value as ValueTypes['integer']}
          onChange={onChange}
        />
      )
  }
  const textValue = value as string
  const enumForAttr = MetacardDefinitions.getEnum(filter.property)

  if (enumForAttr.length > 0) {
    let allEnumForAttr = [] as string[]
    if (enumForAttr) {
      allEnumForAttr = allEnumForAttr.concat(enumForAttr)
    }
    return (
      <EnumInput
        options={allEnumForAttr}
        onChange={onChange}
        value={textValue}
        {...EnterKeySubmitProps}
      />
    )
  }

  return (
    <CustomInputOrDefault
      value={textValue}
      onChange={onChange}
      props={{
        fullWidth: true,
        variant: 'outlined',
        type: 'text',
        size: 'small',
      }}
    />
  )
}

export default FilterInput
