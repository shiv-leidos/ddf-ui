import { __read } from "tslib";
import { useState, useEffect } from 'react';
import { convertWktToPreferredCoordFormat } from './coordinateConverter';
import { useBackbone } from '../../selection-checkbox/useBackbone.hook';
import user from '../../singletons/user-instance';
var FLOATING_POINT_PAIR_REGEX = /[-+]?\d*\.?\d+\s[-+]?\d*\.?\d+/g;
/**
 * Returns a function responsible for converting wkts to the user's preferred
 * coordinate format
 */
var conversionHigherOrderFunction = function () { return function (value) {
    return value.replace(FLOATING_POINT_PAIR_REGEX, convertWktToPreferredCoordFormat);
}; };
/**
 * Provides a hook for converting wkts to the user's preferred
 * coordinate format
 */
var useCoordinateFormat = function () {
    var _a = __read(useState(conversionHigherOrderFunction), 2), convert = _a[0], setConverter = _a[1];
    var listenTo = useBackbone().listenTo;
    useEffect(function () {
        var callback = function () { return setConverter(conversionHigherOrderFunction); };
        listenTo(user.get('user').get('preferences'), 'change:coordinateFormat', callback);
    }, []);
    return convert;
};
export default useCoordinateFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29vcmRpbmF0ZUZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC9jb21wb25lbnQvdGFicy9tZXRhY2FyZC91c2VDb29yZGluYXRlRm9ybWF0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDM0MsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJDQUEyQyxDQUFBO0FBQ3ZFLE9BQU8sSUFBSSxNQUFNLGdDQUFnQyxDQUFBO0FBRWpELElBQU0seUJBQXlCLEdBQUcsaUNBQWlDLENBQUE7QUFFbkU7OztHQUdHO0FBQ0gsSUFBTSw2QkFBNkIsR0FBRyxjQUFNLE9BQUEsVUFBQyxLQUFhO0lBQ3hELE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxnQ0FBZ0MsQ0FBQztBQUExRSxDQUEwRSxFQURoQyxDQUNnQyxDQUFBO0FBRTVFOzs7R0FHRztBQUNILElBQU0sbUJBQW1CLEdBQUc7SUFDcEIsSUFBQSxLQUFBLE9BQTBCLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFBLEVBQWhFLE9BQU8sUUFBQSxFQUFFLFlBQVksUUFBMkMsQ0FBQTtJQUMvRCxJQUFBLFFBQVEsR0FBSyxXQUFXLEVBQUUsU0FBbEIsQ0FBa0I7SUFFbEMsU0FBUyxDQUFDO1FBQ1IsSUFBTSxRQUFRLEdBQUcsY0FBTSxPQUFBLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxFQUEzQyxDQUEyQyxDQUFBO1FBRWxFLFFBQVEsQ0FDTixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFDbkMseUJBQXlCLEVBQ3pCLFFBQVEsQ0FDVCxDQUFBO0lBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBRUQsZUFBZSxtQkFBbUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbnZlcnRXa3RUb1ByZWZlcnJlZENvb3JkRm9ybWF0IH0gZnJvbSAnLi9jb29yZGluYXRlQ29udmVydGVyJ1xuaW1wb3J0IHsgdXNlQmFja2JvbmUgfSBmcm9tICcuLi8uLi9zZWxlY3Rpb24tY2hlY2tib3gvdXNlQmFja2JvbmUuaG9vaydcbmltcG9ydCB1c2VyIGZyb20gJy4uLy4uL3NpbmdsZXRvbnMvdXNlci1pbnN0YW5jZSdcblxuY29uc3QgRkxPQVRJTkdfUE9JTlRfUEFJUl9SRUdFWCA9IC9bLStdP1xcZCpcXC4/XFxkK1xcc1stK10/XFxkKlxcLj9cXGQrL2dcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNvbnZlcnRpbmcgd2t0cyB0byB0aGUgdXNlcidzIHByZWZlcnJlZFxuICogY29vcmRpbmF0ZSBmb3JtYXRcbiAqL1xuY29uc3QgY29udmVyc2lvbkhpZ2hlck9yZGVyRnVuY3Rpb24gPSAoKSA9PiAodmFsdWU6IHN0cmluZykgPT5cbiAgdmFsdWUucmVwbGFjZShGTE9BVElOR19QT0lOVF9QQUlSX1JFR0VYLCBjb252ZXJ0V2t0VG9QcmVmZXJyZWRDb29yZEZvcm1hdClcblxuLyoqXG4gKiBQcm92aWRlcyBhIGhvb2sgZm9yIGNvbnZlcnRpbmcgd2t0cyB0byB0aGUgdXNlcidzIHByZWZlcnJlZFxuICogY29vcmRpbmF0ZSBmb3JtYXRcbiAqL1xuY29uc3QgdXNlQ29vcmRpbmF0ZUZvcm1hdCA9ICgpID0+IHtcbiAgY29uc3QgW2NvbnZlcnQsIHNldENvbnZlcnRlcl0gPSB1c2VTdGF0ZShjb252ZXJzaW9uSGlnaGVyT3JkZXJGdW5jdGlvbilcbiAgY29uc3QgeyBsaXN0ZW5UbyB9ID0gdXNlQmFja2JvbmUoKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiBzZXRDb252ZXJ0ZXIoY29udmVyc2lvbkhpZ2hlck9yZGVyRnVuY3Rpb24pXG5cbiAgICBsaXN0ZW5UbyhcbiAgICAgIHVzZXIuZ2V0KCd1c2VyJykuZ2V0KCdwcmVmZXJlbmNlcycpLFxuICAgICAgJ2NoYW5nZTpjb29yZGluYXRlRm9ybWF0JyxcbiAgICAgIGNhbGxiYWNrXG4gICAgKVxuICB9LCBbXSlcblxuICByZXR1cm4gY29udmVydFxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VDb29yZGluYXRlRm9ybWF0XG4iXX0=