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
import { hot } from 'react-hot-loader';
import Button from '@mui/material/Button';
import { Link } from '../../component/link/link';
import { Divider } from './metacard-interactions';
var ExpandMetacard = function (props) {
    if (!props.model || props.model.length !== 1) {
        return null;
    }
    var id = props.model[0].plain.id;
    var to = props.model[0].plain.metacardType === 'metacard.query'
        ? "/search/".concat(id)
        : "/metacards/".concat(id);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { fullWidth: true, component: Link, to: to, variant: "text", color: "primary", target: "_blank" }, "Open Metacard View"),
        React.createElement(Divider, null)));
};
export default hot(module)(ExpandMetacard);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vd2ViYXBwL3JlYWN0LWNvbXBvbmVudC9tZXRhY2FyZC1pbnRlcmFjdGlvbnMvZXhwYW5kLWludGVyYWN0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQWFJO0FBQ0osT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFFOUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3RDLE9BQU8sTUFBTSxNQUFNLHNCQUFzQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFFakQsSUFBTSxjQUFjLEdBQUcsVUFBQyxLQUErQjtJQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDNUMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtJQUVoQyxJQUFNLEVBQUUsR0FDTixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssZ0JBQWdCO1FBQ3BELENBQUMsQ0FBQyxrQkFBVyxFQUFFLENBQUU7UUFDakIsQ0FBQyxDQUFDLHFCQUFjLEVBQUUsQ0FBRSxDQUFBO0lBRXhCLE9BQU8sQ0FDTDtRQUNFLG9CQUFDLE1BQU0sSUFDTCxTQUFTLFFBQ1QsU0FBUyxFQUFFLElBQUksRUFDZixFQUFFLEVBQUUsRUFBRSxFQUNOLE9BQU8sRUFBQyxNQUFNLEVBQ2QsS0FBSyxFQUFDLFNBQVMsRUFDZixNQUFNLEVBQUMsUUFBUSx5QkFHUjtRQUNULG9CQUFDLE9BQU8sT0FBRyxDQUNWLENBQ0osQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIENvZGljZSBGb3VuZGF0aW9uXG4gKlxuICogVGhpcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlclxuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbiAqIExpY2Vuc2UsIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXRcbiAqIGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVVxuICogTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy4gQSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGlzIGRpc3RyaWJ1dGVkIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtIGFuZCBjYW4gYmUgZm91bmQgYXRcbiAqIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvbGdwbC5odG1sPi5cbiAqXG4gKiovXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE1ldGFjYXJkSW50ZXJhY3Rpb25Qcm9wcyB9IGZyb20gJy4nXG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbXVpL21hdGVyaWFsL0J1dHRvbidcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi8uLi9jb21wb25lbnQvbGluay9saW5rJ1xuaW1wb3J0IHsgRGl2aWRlciB9IGZyb20gJy4vbWV0YWNhcmQtaW50ZXJhY3Rpb25zJ1xuXG5jb25zdCBFeHBhbmRNZXRhY2FyZCA9IChwcm9wczogTWV0YWNhcmRJbnRlcmFjdGlvblByb3BzKSA9PiB7XG4gIGlmICghcHJvcHMubW9kZWwgfHwgcHJvcHMubW9kZWwubGVuZ3RoICE9PSAxKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBsZXQgaWQgPSBwcm9wcy5tb2RlbFswXS5wbGFpbi5pZFxuXG4gIGNvbnN0IHRvID1cbiAgICBwcm9wcy5tb2RlbFswXS5wbGFpbi5tZXRhY2FyZFR5cGUgPT09ICdtZXRhY2FyZC5xdWVyeSdcbiAgICAgID8gYC9zZWFyY2gvJHtpZH1gXG4gICAgICA6IGAvbWV0YWNhcmRzLyR7aWR9YFxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgIGNvbXBvbmVudD17TGlua31cbiAgICAgICAgdG89e3RvfVxuICAgICAgICB2YXJpYW50PVwidGV4dFwiXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICA+XG4gICAgICAgIE9wZW4gTWV0YWNhcmQgVmlld1xuICAgICAgPC9CdXR0b24+XG4gICAgICA8RGl2aWRlciAvPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGhvdChtb2R1bGUpKEV4cGFuZE1ldGFjYXJkKVxuIl19