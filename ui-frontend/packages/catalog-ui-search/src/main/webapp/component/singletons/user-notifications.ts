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
import fetch from '../../react-component/utils/fetch'

import user from './user-instance'
import Backbone from 'backbone'

export default new (Backbone.Collection.extend({
  initialize() {
    const uploads = user.get('user').get('preferences').get('uploads')
    const alerts = user.get('user').get('preferences').get('alerts')
    this.add(uploads.models)
    this.add(alerts.models)
    this.listenTo(uploads, 'add', this.add)
    this.listenTo(uploads, 'remove', this.remove)
    this.listenTo(alerts, 'add', this.add)
    this.listenTo(alerts, 'remove', this.remove)
  },
  comparator(model: any) {
    return -model.getTimeComparator()
  },
  hasUnseen() {
    return this.some((notification: any) => notification.get('unseen'))
  },
  setSeen() {
    const setSeen: any = []
    this.forEach((notification: any) => {
      notification.set('unseen', false)
      if (notification.get('queryId')) {
        setSeen.push(notification)
      }
    })
    if (setSeen.length === 0) {
      return
    }
    fetch('./internal/user/notifications', {
      method: 'put',
      body: JSON.stringify({ alerts: setSeen }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}))()
