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
import withListenTo from '../backbone-container';
import MapInfoPresentation from './presentation';
import { hot } from 'react-hot-loader';
import { StartupDataStore } from '../../js/model/Startup/startup';
import { LayoutContext } from '../../component/golden-layout/visual-settings.provider';
import { getUserCoordinateFormat } from '../../component/visualization/settings-helpers';
import user from '../../component/singletons/user-instance';
var mapPropsToState = function (props) {
    var map = props.map;
    return {
        coordinates: {
            lat: map.get('mouseLat'),
            lon: map.get('mouseLon'),
        },
        attributes: getAttributes(map),
        measurementState: map.get('measurementState'),
        currentDistance: map.get('currentDistance'),
    };
};
var getAttributes = function (map) {
    if (map.get('targetMetacard') === undefined) {
        return [];
    }
    return StartupDataStore.Configuration.getSummaryShow()
        .map(function (attribute) {
        var value = map.get('targetMetacard').plain.metacard.properties[attribute];
        return { name: attribute, value: value };
    })
        .filter(function (_a) {
        var value = _a.value;
        return value !== undefined;
    });
};
var MapInfo = function (props) {
    var _a = React.useContext(LayoutContext), getValue = _a.getValue, onStateChanged = _a.onStateChanged, visualTitle = _a.visualTitle, hasLayoutContext = _a.hasLayoutContext;
    var _b = __read(React.useState(mapPropsToState(props)), 2), stateProps = _b[0], setStateProps = _b[1];
    var _c = __read(React.useState('degrees'), 2), coordFormat = _c[0], setCoordFormat = _c[1];
    var listenTo = props.listenTo, map = props.map;
    var coordFormatKey = "".concat(visualTitle, "-coordFormat");
    var onChange = function () { return setStateProps(mapPropsToState(props)); };
    React.useEffect(function () {
        var userDefaultFormat = getUserCoordinateFormat();
        if (hasLayoutContext) {
            setCoordFormat(getValue(coordFormat, userDefaultFormat));
            onStateChanged(function () {
                var coordFormat = getValue(coordFormatKey, getUserCoordinateFormat());
                setCoordFormat(coordFormat);
            });
        }
        else {
            setCoordFormat(userDefaultFormat);
            props.listenTo(user.get('user').get('preferences'), 'change:coordinateFormat', function () { return setCoordFormat(getUserCoordinateFormat()); });
        }
        listenTo(map, 'change:mouseLat change:mouseLon change:targetMetacard change:currentDistance', onChange);
    }, []);
    return React.createElement(MapInfoPresentation, __assign({}, stateProps, { format: coordFormat }));
};
export default hot(module)(withListenTo(MapInfo));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vd2ViYXBwL3JlYWN0LWNvbXBvbmVudC9tYXAtaW5mby9jb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7OztJQWFJO0FBQ0osT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDOUIsT0FBTyxZQUFtQyxNQUFNLHVCQUF1QixDQUFBO0FBQ3ZFLE9BQU8sbUJBQW1CLE1BQU0sZ0JBQWdCLENBQUE7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXRDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFBO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3REFBd0QsQ0FBQTtBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQTtBQUN4RixPQUFPLElBQUksTUFBTSwwQ0FBMEMsQ0FBQTtBQU0zRCxJQUFNLGVBQWUsR0FBRyxVQUFDLEtBQVk7SUFDM0IsSUFBQSxHQUFHLEdBQUssS0FBSyxJQUFWLENBQVU7SUFDckIsT0FBTztRQUNMLFdBQVcsRUFBRTtZQUNYLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4QixHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDekI7UUFDRCxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM5QixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO1FBQzdDLGVBQWUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0tBQzVDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFNLGFBQWEsR0FBRyxVQUFDLEdBQW1CO0lBQ3hDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUMzQyxPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFO1NBQ25ELEdBQUcsQ0FBQyxVQUFDLFNBQWlCO1FBQ3JCLElBQU0sS0FBSyxHQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFBO0lBQ25DLENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxVQUFDLEVBQW9CO1lBQWxCLEtBQUssV0FBQTtRQUFrQixPQUFBLEtBQUssS0FBSyxTQUFTO0lBQW5CLENBQW1CLENBQUMsQ0FBQTtBQUMxRCxDQUFDLENBQUE7QUFFRCxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQVk7SUFDckIsSUFBQSxLQUNKLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBRHpCLFFBQVEsY0FBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsZ0JBQWdCLHNCQUM5QixDQUFBO0lBQzNCLElBQUEsS0FBQSxPQUE4QixLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFBLEVBQW5FLFVBQVUsUUFBQSxFQUFFLGFBQWEsUUFBMEMsQ0FBQTtJQUNwRSxJQUFBLEtBQUEsT0FBZ0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBQSxFQUF4RCxXQUFXLFFBQUEsRUFBRSxjQUFjLFFBQTZCLENBQUE7SUFFdkQsSUFBQSxRQUFRLEdBQVUsS0FBSyxTQUFmLEVBQUUsR0FBRyxHQUFLLEtBQUssSUFBVixDQUFVO0lBQy9CLElBQU0sY0FBYyxHQUFHLFVBQUcsV0FBVyxpQkFBYyxDQUFBO0lBRW5ELElBQU0sUUFBUSxHQUFHLGNBQU0sT0FBQSxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXJDLENBQXFDLENBQUE7SUFFNUQsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQU0saUJBQWlCLEdBQUcsdUJBQXVCLEVBQUUsQ0FBQTtRQUNuRCxJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtZQUN4RCxjQUFjLENBQUM7Z0JBQ2IsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUE7Z0JBQ3ZFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUM3QixDQUFDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUNqQyxLQUFLLENBQUMsUUFBUSxDQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNuQyx5QkFBeUIsRUFDekIsY0FBTSxPQUFBLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEVBQXpDLENBQXlDLENBQ2hELENBQUE7U0FDRjtRQUVELFFBQVEsQ0FDTixHQUFHLEVBQ0gsOEVBQThFLEVBQzlFLFFBQVEsQ0FDVCxDQUFBO0lBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sT0FBTyxvQkFBQyxtQkFBbUIsZUFBSyxVQUFVLElBQUUsTUFBTSxFQUFFLFdBQXFCLElBQUksQ0FBQTtBQUMvRSxDQUFDLENBQUE7QUFFRCxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBDb2RpY2UgRm91bmRhdGlvblxuICpcbiAqIFRoaXMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXJcbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4gKiBMaWNlbnNlLCBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0XG4gKiBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlVcbiAqIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuIEEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBpcyBkaXN0cmlidXRlZCBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbSBhbmQgY2FuIGJlIGZvdW5kIGF0XG4gKiA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2xncGwuaHRtbD4uXG4gKlxuICoqL1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgd2l0aExpc3RlblRvLCB7IFdpdGhCYWNrYm9uZVByb3BzIH0gZnJvbSAnLi4vYmFja2JvbmUtY29udGFpbmVyJ1xuaW1wb3J0IE1hcEluZm9QcmVzZW50YXRpb24gZnJvbSAnLi9wcmVzZW50YXRpb24nXG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJ1xuaW1wb3J0IHsgRm9ybWF0LCBBdHRyaWJ1dGUgfSBmcm9tICcuJ1xuaW1wb3J0IHsgU3RhcnR1cERhdGFTdG9yZSB9IGZyb20gJy4uLy4uL2pzL21vZGVsL1N0YXJ0dXAvc3RhcnR1cCdcbmltcG9ydCB7IExheW91dENvbnRleHQgfSBmcm9tICcuLi8uLi9jb21wb25lbnQvZ29sZGVuLWxheW91dC92aXN1YWwtc2V0dGluZ3MucHJvdmlkZXInXG5pbXBvcnQgeyBnZXRVc2VyQ29vcmRpbmF0ZUZvcm1hdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudC92aXN1YWxpemF0aW9uL3NldHRpbmdzLWhlbHBlcnMnXG5pbXBvcnQgdXNlciBmcm9tICcuLi8uLi9jb21wb25lbnQvc2luZ2xldG9ucy91c2VyLWluc3RhbmNlJ1xuXG50eXBlIFByb3BzID0ge1xuICBtYXA6IEJhY2tib25lLk1vZGVsXG59ICYgV2l0aEJhY2tib25lUHJvcHNcblxuY29uc3QgbWFwUHJvcHNUb1N0YXRlID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICBjb25zdCB7IG1hcCB9ID0gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjb29yZGluYXRlczoge1xuICAgICAgbGF0OiBtYXAuZ2V0KCdtb3VzZUxhdCcpLFxuICAgICAgbG9uOiBtYXAuZ2V0KCdtb3VzZUxvbicpLFxuICAgIH0sXG4gICAgYXR0cmlidXRlczogZ2V0QXR0cmlidXRlcyhtYXApLFxuICAgIG1lYXN1cmVtZW50U3RhdGU6IG1hcC5nZXQoJ21lYXN1cmVtZW50U3RhdGUnKSxcbiAgICBjdXJyZW50RGlzdGFuY2U6IG1hcC5nZXQoJ2N1cnJlbnREaXN0YW5jZScpLFxuICB9XG59XG5cbmNvbnN0IGdldEF0dHJpYnV0ZXMgPSAobWFwOiBCYWNrYm9uZS5Nb2RlbCkgPT4ge1xuICBpZiAobWFwLmdldCgndGFyZ2V0TWV0YWNhcmQnKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgcmV0dXJuIFN0YXJ0dXBEYXRhU3RvcmUuQ29uZmlndXJhdGlvbi5nZXRTdW1tYXJ5U2hvdygpXG4gICAgLm1hcCgoYXR0cmlidXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgbWFwLmdldCgndGFyZ2V0TWV0YWNhcmQnKS5wbGFpbi5tZXRhY2FyZC5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV1cbiAgICAgIHJldHVybiB7IG5hbWU6IGF0dHJpYnV0ZSwgdmFsdWUgfVxuICAgIH0pXG4gICAgLmZpbHRlcigoeyB2YWx1ZSB9OiBBdHRyaWJ1dGUpID0+IHZhbHVlICE9PSB1bmRlZmluZWQpXG59XG5cbmNvbnN0IE1hcEluZm8gPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IHsgZ2V0VmFsdWUsIG9uU3RhdGVDaGFuZ2VkLCB2aXN1YWxUaXRsZSwgaGFzTGF5b3V0Q29udGV4dCB9ID1cbiAgICBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpXG4gIGNvbnN0IFtzdGF0ZVByb3BzLCBzZXRTdGF0ZVByb3BzXSA9IFJlYWN0LnVzZVN0YXRlKG1hcFByb3BzVG9TdGF0ZShwcm9wcykpXG4gIGNvbnN0IFtjb29yZEZvcm1hdCwgc2V0Q29vcmRGb3JtYXRdID0gUmVhY3QudXNlU3RhdGUoJ2RlZ3JlZXMnKVxuXG4gIGNvbnN0IHsgbGlzdGVuVG8sIG1hcCB9ID0gcHJvcHNcbiAgY29uc3QgY29vcmRGb3JtYXRLZXkgPSBgJHt2aXN1YWxUaXRsZX0tY29vcmRGb3JtYXRgXG5cbiAgY29uc3Qgb25DaGFuZ2UgPSAoKSA9PiBzZXRTdGF0ZVByb3BzKG1hcFByb3BzVG9TdGF0ZShwcm9wcykpXG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1c2VyRGVmYXVsdEZvcm1hdCA9IGdldFVzZXJDb29yZGluYXRlRm9ybWF0KClcbiAgICBpZiAoaGFzTGF5b3V0Q29udGV4dCkge1xuICAgICAgc2V0Q29vcmRGb3JtYXQoZ2V0VmFsdWUoY29vcmRGb3JtYXQsIHVzZXJEZWZhdWx0Rm9ybWF0KSlcbiAgICAgIG9uU3RhdGVDaGFuZ2VkKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29vcmRGb3JtYXQgPSBnZXRWYWx1ZShjb29yZEZvcm1hdEtleSwgZ2V0VXNlckNvb3JkaW5hdGVGb3JtYXQoKSlcbiAgICAgICAgc2V0Q29vcmRGb3JtYXQoY29vcmRGb3JtYXQpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRDb29yZEZvcm1hdCh1c2VyRGVmYXVsdEZvcm1hdClcbiAgICAgIHByb3BzLmxpc3RlblRvKFxuICAgICAgICB1c2VyLmdldCgndXNlcicpLmdldCgncHJlZmVyZW5jZXMnKSxcbiAgICAgICAgJ2NoYW5nZTpjb29yZGluYXRlRm9ybWF0JyxcbiAgICAgICAgKCkgPT4gc2V0Q29vcmRGb3JtYXQoZ2V0VXNlckNvb3JkaW5hdGVGb3JtYXQoKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBsaXN0ZW5UbyhcbiAgICAgIG1hcCxcbiAgICAgICdjaGFuZ2U6bW91c2VMYXQgY2hhbmdlOm1vdXNlTG9uIGNoYW5nZTp0YXJnZXRNZXRhY2FyZCBjaGFuZ2U6Y3VycmVudERpc3RhbmNlJyxcbiAgICAgIG9uQ2hhbmdlXG4gICAgKVxuICB9LCBbXSlcblxuICByZXR1cm4gPE1hcEluZm9QcmVzZW50YXRpb24gey4uLnN0YXRlUHJvcHN9IGZvcm1hdD17Y29vcmRGb3JtYXQgYXMgRm9ybWF0fSAvPlxufVxuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKSh3aXRoTGlzdGVuVG8oTWFwSW5mbykpXG4iXX0=