import { __assign, __makeTemplateObject } from "tslib";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
export var WrappedGrid = styled(React.forwardRef(function (props, ref) {
    return React.createElement(Grid, __assign({}, props, { ref: ref }));
}))(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var GridItem = styled(WrappedGrid)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  > * {\n    height: 100%;\n  }\n"], ["\n  > * {\n    height: 100%;\n  }\n"])));
export var WrappedCardGridItem = function (_a) {
    var children = _a.children, gridItemProps = _a.gridItemProps;
    return (React.createElement(GridItem, __assign({}, gridItemProps, { item: true, xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }), children));
};
export var WrappedCardGrid = styled(function (_a) {
    var gridProps = _a.gridProps, children = _a.children;
    return (React.createElement(WrappedGrid, __assign({ container: true, spacing: 3, direction: "row", justifyContent: "flex-start", wrap: "wrap" }, gridProps), children));
})(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC9yZWFjdC1jb21wb25lbnQvZ3JpZC9ncmlkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDOUIsT0FBTyxJQUFtQixNQUFNLG9CQUFvQixDQUFBO0FBQ3BELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQy9CLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQyxLQUFnQixFQUFFLEdBQW1CO0lBQ3JELE9BQU8sb0JBQUMsSUFBSSxlQUFLLEtBQUssSUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQ0gscUVBQVcsRUFBRSxJQUEyRCxDQUFBO0FBRXpFLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsd0dBQUEscUNBSW5DLElBQUEsQ0FBQTtBQVFELE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLFVBQUMsRUFHcEI7UUFGZCxRQUFRLGNBQUEsRUFDUixhQUFhLG1CQUFBO0lBRWIsT0FBTyxDQUNMLG9CQUFDLFFBQVEsZUFBSyxhQUFhLElBQUUsSUFBSSxRQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FDakUsUUFBUSxDQUNBLENBQ1osQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxNQUFNLENBQ25DLFVBQUMsRUFBc0M7UUFBcEMsU0FBUyxlQUFBLEVBQUUsUUFBUSxjQUFBO0lBQ3BCLE9BQU8sQ0FDTCxvQkFBQyxXQUFXLGFBQ1YsU0FBUyxRQUNULE9BQU8sRUFBRSxDQUFDLEVBQ1YsU0FBUyxFQUFDLEtBQUssRUFDZixjQUFjLEVBQUMsWUFBWSxFQUMzQixJQUFJLEVBQUMsTUFBTSxJQUNQLFNBQVMsR0FFWixRQUFRLENBQ0csQ0FDZixDQUFBO0FBQ0gsQ0FBQyxDQUNGLHFFQUFlLEVBQUUsSUFFakIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEdyaWQsIHsgR3JpZFByb3BzIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9HcmlkJ1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuZXhwb3J0IGNvbnN0IFdyYXBwZWRHcmlkID0gc3R5bGVkKFxuICBSZWFjdC5mb3J3YXJkUmVmKChwcm9wczogR3JpZFByb3BzLCByZWY6IFJlYWN0LlJlZjxhbnk+KSA9PiB7XG4gICAgcmV0dXJuIDxHcmlkIHsuLi5wcm9wc30gcmVmPXtyZWZ9IC8+XG4gIH0pXG4pPEdyaWRQcm9wcz5gYCBhcyBSZWFjdC5Db21wb25lbnRUeXBlPFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPEdyaWRQcm9wcz4+XG5cbmNvbnN0IEdyaWRJdGVtID0gc3R5bGVkKFdyYXBwZWRHcmlkKWBcbiAgPiAqIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbmBcblxudHlwZSBDYXJkR3JpZFByb3BzID0ge1xuICBncmlkUHJvcHM/OiBHcmlkUHJvcHNcbiAgZ3JpZEl0ZW1Qcm9wcz86IEdyaWRQcm9wc1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZVxufVxuXG5leHBvcnQgY29uc3QgV3JhcHBlZENhcmRHcmlkSXRlbSA9ICh7XG4gIGNoaWxkcmVuLFxuICBncmlkSXRlbVByb3BzLFxufTogQ2FyZEdyaWRQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxHcmlkSXRlbSB7Li4uZ3JpZEl0ZW1Qcm9wc30gaXRlbSB4cz17MTJ9IHNtPXs2fSBtZD17NH0gbGc9ezN9IHhsPXsyfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0dyaWRJdGVtPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVkQ2FyZEdyaWQgPSBzdHlsZWQoXG4gICh7IGdyaWRQcm9wcywgY2hpbGRyZW4gfTogQ2FyZEdyaWRQcm9wcykgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8V3JhcHBlZEdyaWRcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgIHNwYWNpbmc9ezN9XG4gICAgICAgIGRpcmVjdGlvbj1cInJvd1wiXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiZmxleC1zdGFydFwiXG4gICAgICAgIHdyYXA9XCJ3cmFwXCJcbiAgICAgICAgey4uLmdyaWRQcm9wc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9XcmFwcGVkR3JpZD5cbiAgICApXG4gIH1cbik8Q2FyZEdyaWRQcm9wcz5gYCBhcyBSZWFjdC5Db21wb25lbnRUeXBlPFxuICBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxDYXJkR3JpZFByb3BzPlxuPlxuIl19