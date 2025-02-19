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

import { MetacardInteractionProps } from '.'
import { MetacardInteraction } from './metacard-interactions'

import { LazyQueryResult } from '../../js/model/LazyQueryResult/LazyQueryResult'
import { StartupDataStore } from '../../js/model/Startup/startup'
import { useDialog } from '../../component/dialog'
import { useDownloadComponent } from '../../component/download/download'

const isDownloadable = (model: LazyQueryResult[]): boolean => {
  return model.some((result) => result.getDownloadUrl())
}

const DownloadProduct = ({ model }: MetacardInteractionProps) => {
  const { setProps } = useDialog()
  const DownloadComponent = useDownloadComponent()
  if (!model || model.length === 0) {
    return null
  }
  if (!isDownloadable(model)) {
    return null
  }
  return (
    <MetacardInteraction
      text="Download"
      help="Downloads the result's associated product directly to your machine."
      icon="fa fa-download"
      onClick={() => {
        setProps({
          open: true,
          children: <DownloadComponent lazyResults={model} />,
        })
      }}
    >
      {isRemoteResourceCached(model) && (
        <span
          data-help="Displayed if the remote resource has been cached locally."
          className="download-cached"
        >
          Local
        </span>
      )}
    </MetacardInteraction>
  )
}

const isRemoteResourceCached = (model: LazyQueryResult[]): boolean => {
  if (!model || model.length <= 0) return false

  return (
    model[0].isResourceLocal &&
    model[0].plain.metacard.properties['source-id'] !==
      StartupDataStore.Sources.localSourceId
  )
}

export default DownloadProduct
