import { __assign, __extends } from "tslib";
//DELETE AFTER CATALOG-UI-SEARCH CUT
import * as React from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment';
import withListenTo from '../backbone-container';
import TimeSettingsPresentation from './presentation';
import momentTimezone from 'moment-timezone';
import user from '../../component/singletons/user-instance';
import Common from '../../js/Common';
import { DateHelpers } from '../../component/fields/date-helpers';
var getUserPreferences = function () {
    return user.get('user').get('preferences');
};
var savePreferences = function (model) {
    var nullOrUndefinedValues = !Object.values(model).every(function (value) { return !!value; });
    if (nullOrUndefinedValues)
        return;
    var preferences = getUserPreferences();
    preferences.set(model);
    preferences.savePreferences();
};
var getCurrentDateTimeFormat = function () {
    return getUserPreferences().get('dateTimeFormat').datetimefmt;
};
var getCurrentTimePrecision = DateHelpers.General.getTimePrecision;
var getCurrentTimeZone = function () { return getUserPreferences().get('timeZone'); };
var getCurrentTime = function (format, timeZone) {
    if (format === void 0) { format = getCurrentDateTimeFormat(); }
    if (timeZone === void 0) { timeZone = getCurrentTimeZone(); }
    return momentTimezone.tz(moment(), timeZone).format(format);
};
var generateZoneObjects = function () {
    var zoneNames = momentTimezone.tz.names();
    var zones = zoneNames.map(function (zoneName) {
        var date = new Date();
        var timestamp = date.getTime();
        var zone = momentTimezone.tz.zone(zoneName);
        var zonedDate = momentTimezone.tz(timestamp, zoneName);
        var offsetAsString = zonedDate.format('Z');
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var abbr = zone.abbr(timestamp);
        return {
            timestamp: timestamp,
            zone: zone,
            zonedDate: zonedDate,
            offsetAsString: offsetAsString,
            abbr: abbr,
            zoneName: zoneName,
        };
    });
    return zones;
};
var TimeSettingsContainer = /** @class */ (function (_super) {
    __extends(TimeSettingsContainer, _super);
    function TimeSettingsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            var updateCurrentTimeClock = function () {
                _this.setState({ currentTime: getCurrentTime() });
            };
            _this.timer = setInterval(updateCurrentTimeClock, 50);
        };
        _this.componentWillUnmount = function () {
            clearInterval(_this.timer);
        };
        _this.render = function () { return (React.createElement(TimeSettingsPresentation, __assign({}, _this.props, { currentTime: _this.state.currentTime, timeZone: _this.state.timeZone, timeZones: _this.state.timeZones, handleTimeZoneUpdate: function (timeZone) {
                savePreferences({ timeZone: timeZone.zoneName });
            }, handleTimeFormatUpdate: function (timeFormat) {
                _this.setState({ timeFormat: timeFormat.value });
                var dateTimeFormat = Common.getDateTimeFormats()[timeFormat.value][_this.state.timePrecision];
                savePreferences({ dateTimeFormat: dateTimeFormat });
            }, timeFormat: _this.state.timeFormat, handleTimePrecisionUpdate: function (timePrecision) {
                _this.setState({ timePrecision: timePrecision });
                var dateTimeFormat = Common.getDateTimeFormats()[_this.state.timeFormat][timePrecision];
                savePreferences({ dateTimeFormat: dateTimeFormat });
            }, timePrecision: _this.state.timePrecision }))); };
        _this.state = {
            currentTime: getCurrentTime(),
            timeZones: generateZoneObjects(),
            timeZone: getCurrentTimeZone(),
            timeFormat: Common.getDateTimeFormatsReverseMap()[getCurrentDateTimeFormat()]
                .format,
            timePrecision: getCurrentTimePrecision(),
        };
        return _this;
    }
    return TimeSettingsContainer;
}(React.Component));
export default hot(module)(withListenTo(TimeSettingsContainer));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vd2ViYXBwL3JlYWN0LWNvbXBvbmVudC90aW1lLXNldHRpbmdzL2NvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9DQUFvQztBQUNwQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDdEMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBQzNCLE9BQU8sWUFBbUMsTUFBTSx1QkFBdUIsQ0FBQTtBQUV2RSxPQUFPLHdCQUF3QixNQUFNLGdCQUFnQixDQUFBO0FBSXJELE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFBO0FBQzVDLE9BQU8sSUFBSSxNQUFNLDBDQUEwQyxDQUFBO0FBQzNELE9BQU8sTUFBTSxNQUFNLGlCQUFpQixDQUFBO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQWdCakUsSUFBTSxrQkFBa0IsR0FBRztJQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQTtBQUVELElBQU0sZUFBZSxHQUFHLFVBQUMsS0FBUztJQUNoQyxJQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFBO0lBQzdFLElBQUkscUJBQXFCO1FBQUUsT0FBTTtJQUVqQyxJQUFNLFdBQVcsR0FBRyxrQkFBa0IsRUFBRSxDQUFBO0lBQ3hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdEIsV0FBVyxDQUFDLGVBQWUsRUFB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R0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RFTEVURSBBRlRFUiBDQVRBTE9HLVVJLVNFQVJDSCBDVVRcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgaG90IH0gZnJvbSAncmVhY3QtaG90LWxvYWRlcidcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IHdpdGhMaXN0ZW5UbywgeyBXaXRoQmFja2JvbmVQcm9wcyB9IGZyb20gJy4uL2JhY2tib25lLWNvbnRhaW5lcidcblxuaW1wb3J0IFRpbWVTZXR0aW5nc1ByZXNlbnRhdGlvbiBmcm9tICcuL3ByZXNlbnRhdGlvbidcbmltcG9ydCB7IFRpbWVab25lLCBUaW1lRm9ybWF0IH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IFRpbWVQcmVjaXNpb24gfSBmcm9tICdAYmx1ZXByaW50anMvZGF0ZXRpbWUnXG5cbmltcG9ydCBtb21lbnRUaW1lem9uZSBmcm9tICdtb21lbnQtdGltZXpvbmUnXG5pbXBvcnQgdXNlciBmcm9tICcuLi8uLi9jb21wb25lbnQvc2luZ2xldG9ucy91c2VyLWluc3RhbmNlJ1xuaW1wb3J0IENvbW1vbiBmcm9tICcuLi8uLi9qcy9Db21tb24nXG5pbXBvcnQgeyBEYXRlSGVscGVycyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudC9maWVsZHMvZGF0ZS1oZWxwZXJzJ1xuXG50eXBlIFVzZXJQcmVmZXJlbmNlcyA9IHtcbiAgZ2V0OiAoa2V5OiBzdHJpbmcpID0+IGFueVxuICBzZXQ6ICh7fSkgPT4gdm9pZFxuICBzYXZlUHJlZmVyZW5jZXM6ICgpID0+IHZvaWRcbn1cblxudHlwZSBTdGF0ZSA9IHtcbiAgY3VycmVudFRpbWU6IHN0cmluZ1xuICB0aW1lWm9uZXM6IFRpbWVab25lW11cbiAgdGltZVpvbmU6IHN0cmluZ1xuICB0aW1lRm9ybWF0OiBzdHJpbmdcbiAgdGltZVByZWNpc2lvbjogVGltZVByZWNpc2lvblxufVxuXG5jb25zdCBnZXRVc2VyUHJlZmVyZW5jZXMgPSAoKTogVXNlclByZWZlcmVuY2VzID0+IHtcbiAgcmV0dXJuIHVzZXIuZ2V0KCd1c2VyJykuZ2V0KCdwcmVmZXJlbmNlcycpXG59XG5cbmNvbnN0IHNhdmVQcmVmZXJlbmNlcyA9IChtb2RlbDoge30pID0+IHtcbiAgY29uc3QgbnVsbE9yVW5kZWZpbmVkVmFsdWVzID0gIU9iamVjdC52YWx1ZXMobW9kZWwpLmV2ZXJ5KCh2YWx1ZSkgPT4gISF2YWx1ZSlcbiAgaWYgKG51bGxPclVuZGVmaW5lZFZhbHVlcykgcmV0dXJuXG5cbiAgY29uc3QgcHJlZmVyZW5jZXMgPSBnZXRVc2VyUHJlZmVyZW5jZXMoKVxuICBwcmVmZXJlbmNlcy5zZXQobW9kZWwpXG4gIHByZWZlcmVuY2VzLnNhdmVQcmVmZXJlbmNlcygpXG59XG5cbmNvbnN0IGdldEN1cnJlbnREYXRlVGltZUZvcm1hdCA9ICgpID0+XG4gIGdldFVzZXJQcmVmZXJlbmNlcygpLmdldCgnZGF0ZVRpbWVGb3JtYXQnKS5kYXRldGltZWZtdFxuXG5jb25zdCBnZXRDdXJyZW50VGltZVByZWNpc2lvbiA9IERhdGVIZWxwZXJzLkdlbmVyYWwuZ2V0VGltZVByZWNpc2lvblxuXG5jb25zdCBnZXRDdXJyZW50VGltZVpvbmUgPSAoKSA9PiBnZXRVc2VyUHJlZmVyZW5jZXMoKS5nZXQoJ3RpbWVab25lJylcblxuY29uc3QgZ2V0Q3VycmVudFRpbWUgPSAoXG4gIGZvcm1hdDogc3RyaW5nID0gZ2V0Q3VycmVudERhdGVUaW1lRm9ybWF0KCksXG4gIHRpbWVab25lOiBzdHJpbmcgPSBnZXRDdXJyZW50VGltZVpvbmUoKVxuKSA9PiBtb21lbnRUaW1lem9uZS50eihtb21lbnQoKSwgdGltZVpvbmUpLmZvcm1hdChmb3JtYXQpXG5cbmNvbnN0IGdlbmVyYXRlWm9uZU9iamVjdHMgPSAoKTogVGltZVpvbmVbXSA9PiB7XG4gIGNvbnN0IHpvbmVOYW1lcyA9IG1vbWVudFRpbWV6b25lLnR6Lm5hbWVzKClcbiAgY29uc3Qgem9uZXMgPSB6b25lTmFtZXMubWFwKCh6b25lTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG4gICAgY29uc3Qgem9uZSA9IG1vbWVudFRpbWV6b25lLnR6LnpvbmUoem9uZU5hbWUpXG4gICAgY29uc3Qgem9uZWREYXRlID0gbW9tZW50VGltZXpvbmUudHoodGltZXN0YW1wLCB6b25lTmFtZSlcbiAgICBjb25zdCBvZmZzZXRBc1N0cmluZyA9IHpvbmVkRGF0ZS5mb3JtYXQoJ1onKVxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdHMtbWlncmF0ZSgyNTMxKSBGSVhNRTogT2JqZWN0IGlzIHBvc3NpYmx5ICdudWxsJy5cbiAgICBjb25zdCBhYmJyID0gem9uZS5hYmJyKHRpbWVzdGFtcClcblxuICAgIHJldHVybiB7XG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgIHpvbmU6IHpvbmUsXG4gICAgICB6b25lZERhdGU6IHpvbmVkRGF0ZSxcbiAgICAgIG9mZnNldEFzU3RyaW5nOiBvZmZzZXRBc1N0cmluZyxcbiAgICAgIGFiYnI6IGFiYnIsXG4gICAgICB6b25lTmFtZTogem9uZU5hbWUsXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB6b25lc1xufVxuXG5jbGFzcyBUaW1lU2V0dGluZ3NDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8V2l0aEJhY2tib25lUHJvcHMsIFN0YXRlPiB7XG4gIHRpbWVyOiBhbnlcbiAgY29uc3RydWN0b3IocHJvcHM6IFdpdGhCYWNrYm9uZVByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFRpbWU6IGdldEN1cnJlbnRUaW1lKCksXG4gICAgICB0aW1lWm9uZXM6IGdlbmVyYXRlWm9uZU9iamVjdHMoKSxcbiAgICAgIHRpbWVab25lOiBnZXRDdXJyZW50VGltZVpvbmUoKSxcbiAgICAgIHRpbWVGb3JtYXQ6XG4gICAgICAgIENvbW1vbi5nZXREYXRlVGltZUZvcm1hdHNSZXZlcnNlTWFwKClbZ2V0Q3VycmVudERhdGVUaW1lRm9ybWF0KCldXG4gICAgICAgICAgLmZvcm1hdCxcbiAgICAgIHRpbWVQcmVjaXNpb246IGdldEN1cnJlbnRUaW1lUHJlY2lzaW9uKCksXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlQ3VycmVudFRpbWVDbG9jayA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50VGltZTogZ2V0Q3VycmVudFRpbWUoKSB9KVxuICAgIH1cblxuICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCh1cGRhdGVDdXJyZW50VGltZUNsb2NrLCA1MClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgfVxuXG4gIHJlbmRlciA9ICgpID0+IChcbiAgICA8VGltZVNldHRpbmdzUHJlc2VudGF0aW9uXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIGN1cnJlbnRUaW1lPXt0aGlzLnN0YXRlLmN1cnJlbnRUaW1lfVxuICAgICAgdGltZVpvbmU9e3RoaXMuc3RhdGUudGltZVpvbmV9XG4gICAgICB0aW1lWm9uZXM9e3RoaXMuc3RhdGUudGltZVpvbmVzfVxuICAgICAgaGFuZGxlVGltZVpvbmVVcGRhdGU9eyh0aW1lWm9uZTogVGltZVpvbmUpID0+IHtcbiAgICAgICAgc2F2ZVByZWZlcmVuY2VzKHsgdGltZVpvbmU6IHRpbWVab25lLnpvbmVOYW1lIH0pXG4gICAgICB9fVxuICAgICAgaGFuZGxlVGltZUZvcm1hdFVwZGF0ZT17KHRpbWVGb3JtYXQ6IFRpbWVGb3JtYXQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWVGb3JtYXQ6IHRpbWVGb3JtYXQudmFsdWUgfSlcbiAgICAgICAgY29uc3QgZGF0ZVRpbWVGb3JtYXQgPVxuICAgICAgICAgIENvbW1vbi5nZXREYXRlVGltZUZvcm1hdHMoKVt0aW1lRm9ybWF0LnZhbHVlXVtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZVByZWNpc2lvblxuICAgICAgICAgIF1cbiAgICAgICAgc2F2ZVByZWZlcmVuY2VzKHsgZGF0ZVRpbWVGb3JtYXQgfSlcbiAgICAgIH19XG4gICAgICB0aW1lRm9ybWF0PXt0aGlzLnN0YXRlLnRpbWVGb3JtYXR9XG4gICAgICBoYW5kbGVUaW1lUHJlY2lzaW9uVXBkYXRlPXsodGltZVByZWNpc2lvbjogVGltZVByZWNpc2lvbikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdGltZVByZWNpc2lvbiB9KVxuICAgICAgICBjb25zdCBkYXRlVGltZUZvcm1hdCA9XG4gICAgICAgICAgQ29tbW9uLmdldERhdGVUaW1lRm9ybWF0cygpW3RoaXMuc3RhdGUudGltZUZvcm1hdF1bdGltZVByZWNpc2lvbl1cbiAgICAgICAgc2F2ZVByZWZlcmVuY2VzKHsgZGF0ZVRpbWVGb3JtYXQgfSlcbiAgICAgIH19XG4gICAgICB0aW1lUHJlY2lzaW9uPXt0aGlzLnN0YXRlLnRpbWVQcmVjaXNpb259XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKSh3aXRoTGlzdGVuVG8oVGltZVNldHRpbmdzQ29udGFpbmVyKSlcbiJdfQ==