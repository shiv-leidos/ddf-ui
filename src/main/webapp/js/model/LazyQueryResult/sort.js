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
import { StartupDataStore } from '../Startup/startup';
function parseMultiValue(value) {
    if (value && Array.isArray(value)) {
        return value[0];
    }
    return value;
}
function isEmpty(value) {
    return value === undefined || value === null;
}
function parseValue(value, attribute) {
    var attributeDefinition = StartupDataStore.MetacardDefinitions.getAttributeMap()[attribute];
    if (!attributeDefinition) {
        return value.toString().toLowerCase();
    }
    switch (attributeDefinition.type) {
        case 'DATE':
        case 'BOOLEAN':
            return value;
        case 'STRING':
            return value.toString().toLowerCase();
        default:
            return parseFloat(value);
    }
}
function compareValues(aVal, bVal, sorting) {
    var sortOrder = sorting.direction === 'descending' ? -1 : 1;
    aVal = parseValue(aVal, sorting.attribute);
    bVal = parseValue(bVal, sorting.attribute);
    if (aVal < bVal) {
        return sortOrder * -1;
    }
    if (aVal > bVal) {
        return sortOrder;
    }
    return 0;
}
function checkSortValue(a, b, sorting) {
    var aVal = parseMultiValue(a.plain.metacard.properties[sorting.attribute]);
    var bVal = parseMultiValue(b.plain.metacard.properties[sorting.attribute]);
    if (isEmpty(aVal) && isEmpty(bVal)) {
        return 0;
    }
    if (isEmpty(aVal)) {
        return 1;
    }
    if (isEmpty(bVal)) {
        return -1;
    }
    return compareValues(aVal, bVal, sorting);
}
export var generateCompareFunction = function (sorting) {
    if (!sorting) {
        throw new Error("Sorting can't be undefined!");
    }
    return function (a, b) {
        var sortValue = 0;
        for (var i = 0; i <= sorting.length - 1; i++) {
            var sortField = sorting[i].attribute;
            var sortOrder = sorting[i].direction === 'descending' ? -1 : 1;
            switch (sortField) {
                case 'RELEVANCE':
                    sortValue = sortOrder * (a.plain.relevance - b.plain.relevance);
                    break;
                case 'DISTANCE':
                    // this says distance could be null, could be a bug we need to address
                    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                    sortValue = sortOrder * (a.plain.distance - b.plain.distance);
                    break;
                default:
                    sortValue = checkSortValue(a, b, sorting[i]);
            }
            if (sortValue !== 0) {
                break;
            }
        }
        return sortValue;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC9qcy9tb2RlbC9MYXp5UXVlcnlSZXN1bHQvc29ydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUFhSTtBQUVKLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBSXJELFNBQVMsZUFBZSxDQUFDLEtBQVU7SUFDakMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoQjtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLEtBQVU7SUFDekIsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUE7QUFDOUMsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQVUsRUFBRSxTQUFpQjtJQUMvQyxJQUFNLG1CQUFtQixHQUN2QixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7S0FDdEM7SUFDRCxRQUFRLG1CQUFtQixDQUFDLElBQUksRUFBRTtRQUNoQyxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssU0FBUztZQUNaLE9BQU8sS0FBSyxDQUFBO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDdkM7WUFDRSxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUMzQjtBQUNILENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFTLEVBQUUs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O1FBQ0QsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIENvZGljZSBGb3VuZGF0aW9uXG4gKlxuICogVGhpcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlclxuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbiAqIExpY2Vuc2UsIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXRcbiAqIGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVVxuICogTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy4gQSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGlzIGRpc3RyaWJ1dGVkIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtIGFuZCBjYW4gYmUgZm91bmQgYXRcbiAqIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvbGdwbC5odG1sPi5cbiAqXG4gKiovXG5cbmltcG9ydCB7IFN0YXJ0dXBEYXRhU3RvcmUgfSBmcm9tICcuLi9TdGFydHVwL3N0YXJ0dXAnXG5pbXBvcnQgeyBMYXp5UXVlcnlSZXN1bHQgfSBmcm9tICcuL0xhenlRdWVyeVJlc3VsdCdcbmltcG9ydCB7IFF1ZXJ5U29ydFR5cGUgfSBmcm9tICcuL3R5cGVzJ1xuXG5mdW5jdGlvbiBwYXJzZU11bHRpVmFsdWUodmFsdWU6IGFueSkge1xuICBpZiAodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWVbMF1cbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogYW55KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsXG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWU6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgY29uc3QgYXR0cmlidXRlRGVmaW5pdGlvbiA9XG4gICAgU3RhcnR1cERhdGFTdG9yZS5NZXRhY2FyZERlZmluaXRpb25zLmdldEF0dHJpYnV0ZU1hcCgpW2F0dHJpYnV0ZV1cbiAgaWYgKCFhdHRyaWJ1dGVEZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICB9XG4gIHN3aXRjaCAoYXR0cmlidXRlRGVmaW5pdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnREFURSc6XG4gICAgY2FzZSAnQk9PTEVBTic6XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wYXJlVmFsdWVzKGFWYWw6IGFueSwgYlZhbDogYW55LCBzb3J0aW5nOiBRdWVyeVNvcnRUeXBlKSB7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnRpbmcuZGlyZWN0aW9uID09PSAnZGVzY2VuZGluZycgPyAtMSA6IDFcbiAgYVZhbCA9IHBhcnNlVmFsdWUoYVZhbCwgc29ydGluZy5hdHRyaWJ1dGUpXG4gIGJWYWwgPSBwYXJzZVZhbHVlKGJWYWwsIHNvcnRpbmcuYXR0cmlidXRlKVxuICBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICByZXR1cm4gc29ydE9yZGVyICogLTFcbiAgfVxuICBpZiAoYVZhbCA+IGJWYWwpIHtcbiAgICByZXR1cm4gc29ydE9yZGVyXG4gIH1cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY2hlY2tTb3J0VmFsdWUoXG4gIGE6IExhenlRdWVyeVJlc3VsdCxcbiAgYjogTGF6eVF1ZXJ5UmVzdWx0LFxuICBzb3J0aW5nOiBRdWVyeVNvcnRUeXBlXG4pIHtcbiAgY29uc3QgYVZhbCA9IHBhcnNlTXVsdGlWYWx1ZShhLnBsYWluLm1ldGFjYXJkLnByb3BlcnRpZXNbc29ydGluZy5hdHRyaWJ1dGVdKVxuICBjb25zdCBiVmFsID0gcGFyc2VNdWx0aVZhbHVlKGIucGxhaW4ubWV0YWNhcmQucHJvcGVydGllc1tzb3J0aW5nLmF0dHJpYnV0ZV0pXG4gIGlmIChpc0VtcHR5KGFWYWwpICYmIGlzRW1wdHkoYlZhbCkpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmIChpc0VtcHR5KGFWYWwpKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuICBpZiAoaXNFbXB0eShiVmFsKSkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIHJldHVybiBjb21wYXJlVmFsdWVzKGFWYWwsIGJWYWwsIHNvcnRpbmcpXG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUNvbXBhcmVGdW5jdGlvbiA9IChzb3J0aW5nOiBRdWVyeVNvcnRUeXBlW10pID0+IHtcbiAgaWYgKCFzb3J0aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTb3J0aW5nIGNhbid0IGJlIHVuZGVmaW5lZCFgKVxuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoYTogTGF6eVF1ZXJ5UmVzdWx0LCBiOiBMYXp5UXVlcnlSZXN1bHQpIHtcbiAgICBsZXQgc29ydFZhbHVlID0gMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNvcnRpbmcubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBzb3J0RmllbGQgPSBzb3J0aW5nW2ldLmF0dHJpYnV0ZVxuICAgICAgY29uc3Qgc29ydE9yZGVyID0gc29ydGluZ1tpXS5kaXJlY3Rpb24gPT09ICdkZXNjZW5kaW5nJyA/IC0xIDogMVxuICAgICAgc3dpdGNoIChzb3J0RmllbGQpIHtcbiAgICAgICAgY2FzZSAnUkVMRVZBTkNFJzpcbiAgICAgICAgICBzb3J0VmFsdWUgPSBzb3J0T3JkZXIgKiAoYS5wbGFpbi5yZWxldmFuY2UgLSBiLnBsYWluLnJlbGV2YW5jZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdESVNUQU5DRSc6XG4gICAgICAgICAgLy8gdGhpcyBzYXlzIGRpc3RhbmNlIGNvdWxkIGJlIG51bGwsIGNvdWxkIGJlIGEgYnVnIHdlIG5lZWQgdG8gYWRkcmVzc1xuXG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0cy1taWdyYXRlKDI1MzEpIEZJWE1FOiBPYmplY3QgaXMgcG9zc2libHkgJ251bGwnLlxuICAgICAgICAgIHNvcnRWYWx1ZSA9IHNvcnRPcmRlciAqIChhLnBsYWluLmRpc3RhbmNlIC0gYi5wbGFpbi5kaXN0YW5jZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHNvcnRWYWx1ZSA9IGNoZWNrU29ydFZhbHVlKGEsIGIsIHNvcnRpbmdbaV0pXG4gICAgICB9XG4gICAgICBpZiAoc29ydFZhbHVlICE9PSAwKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3J0VmFsdWVcbiAgfVxufVxuIl19