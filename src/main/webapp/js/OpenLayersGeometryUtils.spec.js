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
import { expect } from 'chai';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
import { mock as mockJquery, unmock as unmockJquery, } from '../test/mock-api/mock-jquery';
import { mock as mockProperties, unmock as unmockProperties, } from '../test/mock-api/mock-properties';
import olUtils from './OpenLayersGeometryUtils';
describe('Common', function () {
    before(function () {
        mockJquery();
        mockProperties();
    });
    after(function () {
        unmockJquery();
        unmockProperties();
    });
    describe('wrapCoordinatesFromGeometry', function () {
        var MockGeometry = /** @class */ (function () {
            function MockGeometry(props) {
                this.props = props;
            }
            MockGeometry.prototype.getType = function () {
                return this.props.type;
            };
            MockGeometry.prototype.getCoordinates = function () {
                return this.props.coordinates;
            };
            MockGeometry.prototype.getCenter = function () {
                return this.props.center;
            };
            MockGeometry.prototype.setCenter = function () {
                throw new Error();
            };
            MockGeometry.prototype.setCoordinates = function () {
                throw new Error();
            };
            return MockGeometry;
        }());
        var sandbox = sinon.createSandbox();
        afterEach(function () {
            sandbox.restore();
        });
        it('LineString wraps coordinates', function () {
            var coordinates = [
                [210, 50],
                [0, 0],
                [-240, -15],
            ].map(olUtils.lonLatToMapCoordinate);
            var line = new MockGeometry({
                type: 'LineString',
                coordinates: coordinates,
            });
            var stub = sandbox.stub(line, 'setCoordinates');
            olUtils.wrapCoordinatesFromGeometry(line);
            var calls = stub.getCalls();
            var results = calls[0].args[0].map(olUtils.mapCoordinateToLonLat);
            expect(results[0][0]).to.be.closeTo(-150, 0.001);
            expect(results[0][1]).to.be.closeTo(50, 0.001);
            expect(results[1][0]).to.be.closeTo(-0, 0.001);
            expect(results[1][1]).to.be.closeTo(0, 0.001);
            expect(results[2][0]).to.be.closeTo(120, 0.001);
            expect(results[2][1]).to.be.closeTo(-15, 0.001);
            expect(results.length).to.equal(3);
        });
        it('Polygon wraps coordinates', function () {
            var coordinates = [
                [210, 50],
                [0, 0],
                [-240, -15],
                [210, 50],
            ].map(olUtils.lonLatToMapCoordinate);
            var line = new MockGeometry({
                type: 'Polygon',
                coordinates: [coordinates],
            });
            var stub = sandbox.stub(line, 'setCoordinates');
            olUtils.wrapCoordinatesFromGeometry(line);
            var calls = stub.getCalls();
            var results = calls[0].args[0][0].map(olUtils.mapCoordinateToLonLat);
            expect(results[0][0]).to.be.closeTo(-150, 0.001);
            expect(results[0][1]).to.be.closeTo(50, 0.001);
            expect(results[1][0]).to.be.closeTo(-0, 0.001);
            expect(results[1][1]).to.be.closeTo(0, 0.001);
            expect(results[2][0]).to.be.closeTo(120, 0.001);
            expect(results[2][1]).to.be.closeTo(-15, 0.001);
            expect(results[3][0]).to.equal(results[0][0]);
            expect(results[3][1]).to.equal(results[0][1]);
            expect(results.length).to.equal(4);
        });
        it('Circle wraps coordinates', function () {
            var coordinates = olUtils.lonLatToMapCoordinate([210, 50]);
            var line = new MockGeometry({
                type: 'Circle',
                center: coordinates,
            });
            var stub = sandbox.stub(line, 'setCenter');
            olUtils.wrapCoordinatesFromGeometry(line);
            var calls = stub.getCalls();
            var results = olUtils.mapCoordinateToLonLat(calls[0].args[0]);
            expect(results[0]).to.be.closeTo(-150, 0.001);
            expect(results[1]).to.be.closeTo(50, 0.001);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlbkxheWVyc0dlb21ldHJ5VXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC9qcy9PcGVuTGF5ZXJzR2VvbWV0cnlVdGlscy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lBYUk7QUFDSixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQzdCLG1KQUFtSjtBQUNuSixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUNMLElBQUksSUFBSSxVQUFVLEVBQ2xCLE1BQU0sSUFBSSxZQUFZLEdBQ3ZCLE1BQU0sOEJBQThCLENBQUE7QUFDckMsT0FBTyxFQUNMLElBQUksSUFBSSxjQUFjLEVBQ3RCLE1BQU0sSUFBSSxnQkFBZ0IsR0FDM0IsTUFBTSxrQ0FBa0MsQ0FBQTtBQUN6QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQTtBQUUvQyxRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2pCLE1BQU0sQ0FBQztRQUNMLFVBQVUsRUFBRSxDQUFBO1FBQ1osY0FBYyxFQUFFLENBQUE7SUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDRixLQUFLLENBQUM7UUFDSixZQUFZLEVBQUUsQ0FBQTtRQUNkLGdCQUFnQixFQUFFLENBQUE7SUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDRixRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFDdEM7WUFFRSxzQkFBWSxLQUFVO2dCQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUNwQixDQUFDO1lBQ0QsOEJBQU8sR0FBUDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBO1lBQ3hCLENBQUM7WUFDRCxxQ0FBYyxHQUFkO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUE7WUFDL0IsQ0FBQztZQUNELGdDQUFTLEdBQVQ7Z0JBQ0Us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QyxDQUFBO1lBQzVDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDN0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMvRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgQ29kaWNlIEZvdW5kYXRpb25cbiAqXG4gKiBUaGlzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuICogTGljZW5zZSwgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dFxuICogZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VXG4gKiBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLiBBIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogaXMgZGlzdHJpYnV0ZWQgYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0gYW5kIGNhbiBiZSBmb3VuZCBhdFxuICogPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9sZ3BsLmh0bWw+LlxuICpcbiAqKi9cbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknXG4vLyBAdHMtZXhwZWN0LWVycm9yIHRzLW1pZ3JhdGUoNzAxNikgRklYTUU6IENvdWxkIG5vdCBmaW5kIGEgZGVjbGFyYXRpb24gZmlsZSBmb3IgbW9kdWxlICdzaW5vLi4uIFJlbW92ZSB0aGlzIGNvbW1lbnQgdG8gc2VlIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2VcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbidcbmltcG9ydCB7XG4gIG1vY2sgYXMgbW9ja0pxdWVyeSxcbiAgdW5tb2NrIGFzIHVubW9ja0pxdWVyeSxcbn0gZnJvbSAnLi4vdGVzdC9tb2NrLWFwaS9tb2NrLWpxdWVyeSdcbmltcG9ydCB7XG4gIG1vY2sgYXMgbW9ja1Byb3BlcnRpZXMsXG4gIHVubW9jayBhcyB1bm1vY2tQcm9wZXJ0aWVzLFxufSBmcm9tICcuLi90ZXN0L21vY2stYXBpL21vY2stcHJvcGVydGllcydcbmltcG9ydCBvbFV0aWxzIGZyb20gJy4vT3BlbkxheWVyc0dlb21ldHJ5VXRpbHMnXG5cbmRlc2NyaWJlKCdDb21tb24nLCAoKSA9PiB7XG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgbW9ja0pxdWVyeSgpXG4gICAgbW9ja1Byb3BlcnRpZXMoKVxuICB9KVxuICBhZnRlcigoKSA9PiB7XG4gICAgdW5tb2NrSnF1ZXJ5KClcbiAgICB1bm1vY2tQcm9wZXJ0aWVzKClcbiAgfSlcbiAgZGVzY3JpYmUoJ3dyYXBDb29yZGluYXRlc0Zyb21HZW9tZXRyeScsICgpID0+IHtcbiAgICBjbGFzcyBNb2NrR2VvbWV0cnkge1xuICAgICAgcHJvcHM6IGFueVxuICAgICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICAgIH1cbiAgICAgIGdldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnR5cGVcbiAgICAgIH1cbiAgICAgIGdldENvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb29yZGluYXRlc1xuICAgICAgfVxuICAgICAgZ2V0Q2VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jZW50ZXJcbiAgICAgIH1cbiAgICAgIHNldENlbnRlcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgIH1cbiAgICAgIHNldENvb3JkaW5hdGVzKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpXG4gICAgfSlcbiAgICBpdCgnTGluZVN0cmluZyB3cmFwcyBjb29yZGluYXRlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW1xuICAgICAgICBbMjEwLCA1MF0sXG4gICAgICAgIFswLCAwXSxcbiAgICAgICAgWy0yNDAsIC0xNV0sXG4gICAgICBdLm1hcChvbFV0aWxzLmxvbkxhdFRvTWFwQ29vcmRpbmF0ZSlcbiAgICAgIGNvbnN0IGxpbmUgPSBuZXcgTW9ja0dlb21ldHJ5KHtcbiAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICBjb29yZGluYXRlcyxcbiAgICAgIH0pXG4gICAgICBjb25zdCBzdHViID0gc2FuZGJveC5zdHViKGxpbmUsICdzZXRDb29yZGluYXRlcycpXG4gICAgICBvbFV0aWxzLndyYXBDb29yZGluYXRlc0Zyb21HZW9tZXRyeShsaW5lKVxuICAgICAgY29uc3QgY2FsbHMgPSBzdHViLmdldENhbGxzKClcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBjYWxsc1swXS5hcmdzWzBdLm1hcChvbFV0aWxzLm1hcENvb3JkaW5hdGVUb0xvbkxhdClcbiAgICAgIGV4cGVjdChyZXN1bHRzWzBdWzBdKS50by5iZS5jbG9zZVRvKC0xNTAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMF1bMV0pLnRvLmJlLmNsb3NlVG8oNTAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMV1bMF0pLnRvLmJlLmNsb3NlVG8oLTAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMV1bMV0pLnRvLmJlLmNsb3NlVG8oMCwgMC4wMDEpXG4gICAgICBleHBlY3QocmVzdWx0c1syXVswXSkudG8uYmUuY2xvc2VUbygxMjAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMl1bMV0pLnRvLmJlLmNsb3NlVG8oLTE1LCAwLjAwMSlcbiAgICAgIGV4cGVjdChyZXN1bHRzLmxlbmd0aCkudG8uZXF1YWwoMylcbiAgICB9KVxuICAgIGl0KCdQb2x5Z29uIHdyYXBzIGNvb3JkaW5hdGVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgIFsyMTAsIDUwXSxcbiAgICAgICAgWzAsIDBdLFxuICAgICAgICBbLTI0MCwgLTE1XSxcbiAgICAgICAgWzIxMCwgNTBdLFxuICAgICAgXS5tYXAob2xVdGlscy5sb25MYXRUb01hcENvb3JkaW5hdGUpXG4gICAgICBjb25zdCBsaW5lID0gbmV3IE1vY2tHZW9tZXRyeSh7XG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtjb29yZGluYXRlc10sXG4gICAgICB9KVxuICAgICAgY29uc3Qgc3R1YiA9IHNhbmRib3guc3R1YihsaW5lLCAnc2V0Q29vcmRpbmF0ZXMnKVxuICAgICAgb2xVdGlscy53cmFwQ29vcmRpbmF0ZXNGcm9tR2VvbWV0cnkobGluZSlcbiAgICAgIGNvbnN0IGNhbGxzID0gc3R1Yi5nZXRDYWxscygpXG4gICAgICBjb25zdCByZXN1bHRzID0gY2FsbHNbMF0uYXJnc1swXVswXS5tYXAob2xVdGlscy5tYXBDb29yZGluYXRlVG9Mb25MYXQpXG4gICAgICBleHBlY3QocmVzdWx0c1swXVswXSkudG8uYmUuY2xvc2VUbygtMTUwLCAwLjAwMSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzBdWzFdKS50by5iZS5jbG9zZVRvKDUwLCAwLjAwMSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzFdWzBdKS50by5iZS5jbG9zZVRvKC0wLCAwLjAwMSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzFdWzFdKS50by5iZS5jbG9zZVRvKDAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMl1bMF0pLnRvLmJlLmNsb3NlVG8oMTIwLCAwLjAwMSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzJdWzFdKS50by5iZS5jbG9zZVRvKC0xNSwgMC4wMDEpXG4gICAgICBleHBlY3QocmVzdWx0c1szXVswXSkudG8uZXF1YWwocmVzdWx0c1swXVswXSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzNdWzFdKS50by5lcXVhbChyZXN1bHRzWzBdWzFdKVxuICAgICAgZXhwZWN0KHJlc3VsdHMubGVuZ3RoKS50by5lcXVhbCg0KVxuICAgIH0pXG4gICAgaXQoJ0NpcmNsZSB3cmFwcyBjb29yZGluYXRlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gb2xVdGlscy5sb25MYXRUb01hcENvb3JkaW5hdGUoWzIxMCwgNTBdKVxuICAgICAgY29uc3QgbGluZSA9IG5ldyBNb2NrR2VvbWV0cnkoe1xuICAgICAgICB0eXBlOiAnQ2lyY2xlJyxcbiAgICAgICAgY2VudGVyOiBjb29yZGluYXRlcyxcbiAgICAgIH0pXG4gICAgICBjb25zdCBzdHViID0gc2FuZGJveC5zdHViKGxpbmUsICdzZXRDZW50ZXInKVxuICAgICAgb2xVdGlscy53cmFwQ29vcmRpbmF0ZXNGcm9tR2VvbWV0cnkobGluZSlcbiAgICAgIGNvbnN0IGNhbGxzID0gc3R1Yi5nZXRDYWxscygpXG4gICAgICBjb25zdCByZXN1bHRzID0gb2xVdGlscy5tYXBDb29yZGluYXRlVG9Mb25MYXQoY2FsbHNbMF0uYXJnc1swXSlcbiAgICAgIGV4cGVjdChyZXN1bHRzWzBdKS50by5iZS5jbG9zZVRvKC0xNTAsIDAuMDAxKVxuICAgICAgZXhwZWN0KHJlc3VsdHNbMV0pLnRvLmJlLmNsb3NlVG8oNTAsIDAuMDAxKVxuICAgIH0pXG4gIH0pXG59KVxuIl19