import { useRender } from '../hooks/useRender';
import { useListenTo } from '../selection-checkbox/useBackbone.hook';
import Backbone from 'backbone';
import wreqr from '../../js/wreqr';
import $ from 'jquery';
var lastDrawing = 0;
var DEBOUNCE = 250;
export var Drawing = new (Backbone.Model.extend({
    defaults: {
        drawing: false,
        drawingModel: undefined,
    },
    initialize: function () {
        this.listenTo(wreqr.vent, 'search:drawline', this.turnOnDrawing);
        this.listenTo(wreqr.vent, 'search:drawcircle', this.turnOnDrawing);
        this.listenTo(wreqr.vent, 'search:drawpoly', this.turnOnDrawing);
        this.listenTo(wreqr.vent, 'search:drawbbox', this.turnOnDrawing);
        this.listenTo(wreqr.vent, 'search:drawcancel', this.turnOffDrawing);
        this.listenTo(wreqr.vent, 'search:drawend', this.turnOffDrawing);
    },
    turnOnDrawing: function (model) {
        this.set('drawing', true);
        this.set('drawingModel', model);
        $('html').toggleClass('is-drawing', true);
    },
    turnOffDrawing: function () {
        lastDrawing = Date.now();
        this.set('drawing', false);
        $('html').toggleClass('is-drawing', false);
    },
    timeSinceLastDrawing: function () {
        return Date.now() - lastDrawing;
    },
    getDrawModel: function () {
        return this.get('drawingModel');
    },
    isFuzzyDrawing: function () {
        return this.isDrawing() || this.timeSinceLastDrawing() < DEBOUNCE;
    },
    isDrawing: function () {
        return this.get('drawing');
    },
}))();
export var useIsDrawing = function () {
    var render = useRender();
    useListenTo(Drawing, 'change:drawing', render);
    return Drawing.isDrawing();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC9jb21wb25lbnQvc2luZ2xldG9ucy9kcmF3aW5nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFBO0FBQ3BFLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEtBQUssTUFBTSxnQkFBZ0IsQ0FBQTtBQUNsQyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUE7QUFRdEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO0FBQ25CLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTtBQUNwQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2hELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxLQUFLO1FBQ2QsWUFBWSxFQUFFLFNBQVM7S0FDeEI7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBRSxLQUFhLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFFLEtBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxRQUFRLENBQUUsS0FBYSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxLQUFhLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFFLEtBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxRQUFRLENBQUUsS0FBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUNELGFBQWEsWUFBQyxLQUFxQjtRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBQ0QsY0FBYztRQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUNELG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUE7SUFDakMsQ0FBQztJQUNELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUNELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxRQUFRLENBQUE7SUFDbkUsQ0FBQztJQUNELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUIsQ0FBQztDQUNGLENBQUMsQ0FBQyxFQUFpQixDQUFBO0FBQ3BCLE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRztJQUMxQixJQUFNLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQTtJQUMxQixXQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzlDLE9BQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQzVCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlbmRlciB9IGZyb20gJy4uL2hvb2tzL3VzZVJlbmRlcidcbmltcG9ydCB7IHVzZUxpc3RlblRvIH0gZnJvbSAnLi4vc2VsZWN0aW9uLWNoZWNrYm94L3VzZUJhY2tib25lLmhvb2snXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgd3JlcXIgZnJvbSAnLi4vLi4vanMvd3JlcXInXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG50eXBlIERyYXdpbmdUeXBlID0gQmFja2JvbmUuTW9kZWwgJiB7XG4gIHR1cm5PbkRyYXdpbmc6IChtb2RlbDogQmFja2JvbmUuTW9kZWwpID0+IHZvaWRcbiAgdHVybk9mZkRyYXdpbmc6ICgpID0+IHZvaWRcbiAgaXNGdXp6eURyYXdpbmc6ICgpID0+IGJvb2xlYW5cbiAgaXNEcmF3aW5nOiAoKSA9PiBib29sZWFuXG4gIGdldERyYXdNb2RlbDogKCkgPT4gQmFja2JvbmUuTW9kZWxcbn1cbmxldCBsYXN0RHJhd2luZyA9IDBcbmNvbnN0IERFQk9VTkNFID0gMjUwXG5leHBvcnQgY29uc3QgRHJhd2luZyA9IG5ldyAoQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgZGVmYXVsdHM6IHtcbiAgICBkcmF3aW5nOiBmYWxzZSxcbiAgICBkcmF3aW5nTW9kZWw6IHVuZGVmaW5lZCxcbiAgfSxcbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmxpc3RlblRvKCh3cmVxciBhcyBhbnkpLnZlbnQsICdzZWFyY2g6ZHJhd2xpbmUnLCB0aGlzLnR1cm5PbkRyYXdpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubygod3JlcXIgYXMgYW55KS52ZW50LCAnc2VhcmNoOmRyYXdjaXJjbGUnLCB0aGlzLnR1cm5PbkRyYXdpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubygod3JlcXIgYXMgYW55KS52ZW50LCAnc2VhcmNoOmRyYXdwb2x5JywgdGhpcy50dXJuT25EcmF3aW5nKVxuICAgIHRoaXMubGlzdGVuVG8oKHdyZXFyIGFzIGFueSkudmVudCwgJ3NlYXJjaDpkcmF3YmJveCcsIHRoaXMudHVybk9uRHJhd2luZylcbiAgICB0aGlzLmxpc3RlblRvKCh3cmVxciBhcyBhbnkpLnZlbnQsICdzZWFyY2g6ZHJhd2NhbmNlbCcsIHRoaXMudHVybk9mZkRyYXdpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubygod3JlcXIgYXMgYW55KS52ZW50LCAnc2VhcmNoOmRyYXdlbmQnLCB0aGlzLnR1cm5PZmZEcmF3aW5nKVxuICB9LFxuICB0dXJuT25EcmF3aW5nKG1vZGVsOiBCYWNrYm9uZS5Nb2RlbCkge1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgdHJ1ZSlcbiAgICB0aGlzLnNldCgnZHJhd2luZ01vZGVsJywgbW9kZWwpXG4gICAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdpcy1kcmF3aW5nJywgdHJ1ZSlcbiAgfSxcbiAgdHVybk9mZkRyYXdpbmcoKSB7XG4gICAgbGFzdERyYXdpbmcgPSBEYXRlLm5vdygpXG4gICAgdGhpcy5zZXQoJ2RyYXdpbmcnLCBmYWxzZSlcbiAgICAkKCdodG1sJykudG9nZ2xlQ2xhc3MoJ2lzLWRyYXdpbmcnLCBmYWxzZSlcbiAgfSxcbiAgdGltZVNpbmNlTGFzdERyYXdpbmcoKSB7XG4gICAgcmV0dXJuIERhdGUubm93KCkgLSBsYXN0RHJhd2luZ1xuICB9LFxuICBnZXREcmF3TW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkcmF3aW5nTW9kZWwnKVxuICB9LFxuICBpc0Z1enp5RHJhd2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5pc0RyYXdpbmcoKSB8fCB0aGlzLnRpbWVTaW5jZUxhc3REcmF3aW5nKCkgPCBERUJPVU5DRVxuICB9LFxuICBpc0RyYXdpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkcmF3aW5nJylcbiAgfSxcbn0pKSgpIGFzIERyYXdpbmdUeXBlXG5leHBvcnQgY29uc3QgdXNlSXNEcmF3aW5nID0gKCkgPT4ge1xuICBjb25zdCByZW5kZXIgPSB1c2VSZW5kZXIoKVxuICB1c2VMaXN0ZW5UbyhEcmF3aW5nLCAnY2hhbmdlOmRyYXdpbmcnLCByZW5kZXIpXG4gIHJldHVybiBEcmF3aW5nLmlzRHJhd2luZygpXG59XG4iXX0=