import { __assign, __read } from "tslib";
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
import * as React from 'react';
import { useState, useEffect } from 'react';
import MapSettingsPresentation from './presentation';
import { hot } from 'react-hot-loader';
import withListenTo from '../../react-component/backbone-container';
import Paper from '@mui/material/Paper';
import { useMenuState } from '../../component/menu-state/menu-state';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import user from '../../component/singletons/user-instance';
import SettingsIcon from '@mui/icons-material/Settings';
import { Elevations } from '../../component/theme/theme';
import { getUserCoordinateFormat } from '../../component/visualization/settings-helpers';
import { LayoutContext } from '../../component/golden-layout/visual-settings.provider';
var MapSettings = function (props) {
    var _a = React.useContext(LayoutContext), getValue = _a.getValue, setValue = _a.setValue, onStateChanged = _a.onStateChanged, visualTitle = _a.visualTitle, hasLayoutContext = _a.hasLayoutContext;
    var _b = __read(useState('degrees'), 2), coordFormat = _b[0], setCoordFormat = _b[1];
    var _c = __read(useState(user.get('user').get('preferences').get('autoPan')), 2), autoPan = _c[0], setAutoPan = _c[1];
    var menuState = useMenuState();
    var coordFormatKey = "".concat(visualTitle, "-coordFormat");
    useEffect(function () {
        var userDefaultFormat = getUserCoordinateFormat();
        if (hasLayoutContext) {
            setCoordFormat(getValue(coordFormatKey, userDefaultFormat));
            onStateChanged(function () {
                var coordFormat = getValue(coordFormatKey, getUserCoordinateFormat());
                setCoordFormat(coordFormat);
            });
        }
        else {
            setCoordFormat(userDefaultFormat);
            props.listenTo(user.get('user').get('preferences'), 'change:coordinateFormat', function () { return setCoordFormat(getUserCoordinateFormat()); });
        }
        props.listenTo(user.get('user').get('preferences'), 'change:autoPan', function (_prefs, value) { return setAutoPan(value); });
    }, []);
    var updateCoordFormat = function (coordinateFormat) {
        if (hasLayoutContext) {
            setValue(coordFormatKey, coordinateFormat);
        }
        else {
            var preferences = user
                .get('user')
                .get('preferences')
                .set({ coordinateFormat: coordinateFormat });
            preferences.savePreferences();
        }
    };
    var updateAutoPan = function (_event, autoPan) {
        var preferences = user.get('user').get('preferences').set({ autoPan: autoPan });
        preferences.savePreferences();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, __assign({ size: "small", "data-id": "settings-button" }, menuState.MuiButtonProps),
            React.createElement(SettingsIcon, null)),
        React.createElement(Popover, __assign({}, menuState.MuiPopoverProps),
            React.createElement(Paper, { elevation: Elevations.overlays },
                React.createElement(MapSettingsPresentation, { coordFormat: coordFormat, updateCoordFormat: updateCoordFormat, autoPan: autoPan, updateAutoPan: updateAutoPan })))));
};
export default hot(module)(withListenTo(MapSettings));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vd2ViYXBwL3JlYWN0LWNvbXBvbmVudC9tYXAtc2V0dGluZ3MvY29udGFpbmVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7SUFhSTtBQUNKLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQzNDLE9BQU8sdUJBQXVCLE1BQU0sZ0JBQWdCLENBQUE7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3RDLE9BQU8sWUFFTixNQUFNLDBDQUEwQyxDQUFBO0FBQ2pELE9BQU8sS0FBSyxNQUFNLHFCQUFxQixDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQTtBQUNwRSxPQUFPLE1BQU0sTUFBTSxzQkFBc0IsQ0FBQTtBQUN6QyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQTtBQUMzQyxPQUFPLElBQUksTUFBTSwwQ0FBMEMsQ0FBQTtBQUMzRCxPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUE7QUFDeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdEQUF3RCxDQUFBO0FBRXRGLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBd0I7SUFDckMsSUFBQSxLQUNKLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBRHpCLFFBQVEsY0FBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsZ0JBQWdCLHNCQUN4QyxDQUFBO0lBRTNCLElBQUEs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Q0ksQ0FDQSxDQUNULENBQ0osQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIENvZGljZSBGb3VuZGF0aW9uXG4gKlxuICogVGhpcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlclxuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbiAqIExpY2Vuc2UsIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXRcbiAqIGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVVxuICogTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy4gQSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGlzIGRpc3RyaWJ1dGVkIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtIGFuZCBjYW4gYmUgZm91bmQgYXRcbiAqIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvbGdwbC5odG1sPi5cbiAqXG4gKiovXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBNYXBTZXR0aW5nc1ByZXNlbnRhdGlvbiBmcm9tICcuL3ByZXNlbnRhdGlvbidcbmltcG9ydCB7IGhvdCB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXInXG5pbXBvcnQgd2l0aExpc3RlblRvLCB7XG4gIFdpdGhCYWNrYm9uZVByb3BzLFxufSBmcm9tICcuLi8uLi9yZWFjdC1jb21wb25lbnQvYmFja2JvbmUtY29udGFpbmVyJ1xuaW1wb3J0IFBhcGVyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvUGFwZXInXG5pbXBvcnQgeyB1c2VNZW51U3RhdGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnQvbWVudS1zdGF0ZS9tZW51LXN0YXRlJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbXVpL21hdGVyaWFsL0J1dHRvbidcbmltcG9ydCBQb3BvdmVyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvUG9wb3ZlcidcbmltcG9ydCB1c2VyIGZyb20gJy4uLy4uL2NvbXBvbmVudC9zaW5nbGV0b25zL3VzZXItaW5zdGFuY2UnXG5pbXBvcnQgU2V0dGluZ3NJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvU2V0dGluZ3MnXG5pbXBvcnQgeyBFbGV2YXRpb25zIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50L3RoZW1lL3RoZW1lJ1xuaW1wb3J0IHsgZ2V0VXNlckNvb3JkaW5hdGVGb3JtYXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnQvdmlzdWFsaXphdGlvbi9zZXR0aW5ncy1oZWxwZXJzJ1xuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudC9nb2xkZW4tbGF5b3V0L3Zpc3VhbC1zZXR0aW5ncy5wcm92aWRlcidcblxuY29uc3QgTWFwU2V0dGluZ3MgPSAocHJvcHM6IFdpdGhCYWNrYm9uZVByb3BzKSA9PiB7XG4gIGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvblN0YXRlQ2hhbmdlZCwgdmlzdWFsVGl0bGUsIGhhc0xheW91dENvbnRleHQgfSA9XG4gICAgUmVhY3QudXNlQ29udGV4dChMYXlvdXRDb250ZXh0KVxuXG4gIGNvbnN0IFtjb29yZEZvcm1hdCwgc2V0Q29vcmRGb3JtYXRdID0gdXNlU3RhdGUoJ2RlZ3JlZXMnKVxuXG4gIGNvbnN0IFthdXRvUGFuLCBzZXRBdXRvUGFuXSA9IHVzZVN0YXRlKFxuICAgIHVzZXIuZ2V0KCd1c2VyJykuZ2V0KCdwcmVmZXJlbmNlcycpLmdldCgnYXV0b1BhbicpXG4gIClcbiAgY29uc3QgbWVudVN0YXRlID0gdXNlTWVudVN0YXRlKClcbiAgY29uc3QgY29vcmRGb3JtYXRLZXkgPSBgJHt2aXN1YWxUaXRsZX0tY29vcmRGb3JtYXRgXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1c2VyRGVmYXVsdEZvcm1hdCA9IGdldFVzZXJDb29yZGluYXRlRm9ybWF0KClcbiAgICBpZiAoaGFzTGF5b3V0Q29udGV4dCkge1xuICAgICAgc2V0Q29vcmRGb3JtYXQoZ2V0VmFsdWUoY29vcmRGb3JtYXRLZXksIHVzZXJEZWZhdWx0Rm9ybWF0KSlcbiAgICAgIG9uU3RhdGVDaGFuZ2VkKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29vcmRGb3JtYXQgPSBnZXRWYWx1ZShjb29yZEZvcm1hdEtleSwgZ2V0VXNlckNvb3JkaW5hdGVGb3JtYXQoKSlcbiAgICAgICAgc2V0Q29vcmRGb3JtYXQoY29vcmRGb3JtYXQpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRDb29yZEZvcm1hdCh1c2VyRGVmYXVsdEZvcm1hdClcbiAgICAgIHByb3BzLmxpc3RlblRvKFxuICAgICAgICB1c2VyLmdldCgndXNlcicpLmdldCgncHJlZmVyZW5jZXMnKSxcbiAgICAgICAgJ2NoYW5nZTpjb29yZGluYXRlRm9ybWF0JyxcbiAgICAgICAgKCkgPT4gc2V0Q29vcmRGb3JtYXQoZ2V0VXNlckNvb3JkaW5hdGVGb3JtYXQoKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBwcm9wcy5saXN0ZW5UbyhcbiAgICAgIHVzZXIuZ2V0KCd1c2VyJykuZ2V0KCdwcmVmZXJlbmNlcycpLFxuICAgICAgJ2NoYW5nZTphdXRvUGFuJyxcbiAgICAgIChfcHJlZnM6IGFueSwgdmFsdWU6IGJvb2xlYW4pID0+IHNldEF1dG9QYW4odmFsdWUpXG4gICAgKVxuICB9LCBbXSlcblxuICBjb25zdCB1cGRhdGVDb29yZEZvcm1hdCA9IChjb29yZGluYXRlRm9ybWF0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoaGFzTGF5b3V0Q29udGV4dCkge1xuICAgICAgc2V0VmFsdWUoY29vcmRGb3JtYXRLZXksIGNvb3JkaW5hdGVGb3JtYXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZWZlcmVuY2VzID0gdXNlclxuICAgICAgICAuZ2V0KCd1c2VyJylcbiAgICAgICAgLmdldCgncHJlZmVyZW5jZXMnKVxuICAgICAgICAuc2V0KHsgY29vcmRpbmF0ZUZvcm1hdCB9KVxuICAgICAgcHJlZmVyZW5jZXMuc2F2ZVByZWZlcmVuY2VzKClcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVBdXRvUGFuID0gKFxuICAgIF9ldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4sXG4gICAgYXV0b1BhbjogYm9vbGVhblxuICApID0+IHtcbiAgICBjb25zdCBwcmVmZXJlbmNlcyA9IHVzZXIuZ2V0KCd1c2VyJykuZ2V0KCdwcmVmZXJlbmNlcycpLnNldCh7IGF1dG9QYW4gfSlcbiAgICBwcmVmZXJlbmNlcy5zYXZlUHJlZmVyZW5jZXMoKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJ1dHRvblxuICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICBkYXRhLWlkPVwic2V0dGluZ3MtYnV0dG9uXCJcbiAgICAgICAgey4uLm1lbnVTdGF0ZS5NdWlCdXR0b25Qcm9wc31cbiAgICAgID5cbiAgICAgICAgPFNldHRpbmdzSWNvbiAvPlxuICAgICAgPC9CdXR0b24+XG4gICAgICA8UG9wb3ZlciB7Li4ubWVudVN0YXRlLk11aVBvcG92ZXJQcm9wc30+XG4gICAgICAgIDxQYXBlciBlbGV2YXRpb249e0VsZXZhdGlvbnMub3ZlcmxheXN9PlxuICAgICAgICAgIDxNYXBTZXR0aW5nc1ByZXNlbnRhdGlvblxuICAgICAgICAgICAgY29vcmRGb3JtYXQ9e2Nvb3JkRm9ybWF0fVxuICAgICAgICAgICAgdXBkYXRlQ29vcmRGb3JtYXQ9e3VwZGF0ZUNvb3JkRm9ybWF0fVxuICAgICAgICAgICAgYXV0b1Bhbj17YXV0b1Bhbn1cbiAgICAgICAgICAgIHVwZGF0ZUF1dG9QYW49e3VwZGF0ZUF1dG9QYW59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9QYXBlcj5cbiAgICAgIDwvUG9wb3Zlcj5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKSh3aXRoTGlzdGVuVG8oTWFwU2V0dGluZ3MpKVxuIl19