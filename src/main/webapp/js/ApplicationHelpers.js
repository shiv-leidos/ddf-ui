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
/* global define */
import Backbone from 'backbone';
import 'backbone-associations';
// Backbone associations uses "." as its standard sub-object selecting within their framework.
// However since some of our json attribute names have "." characters in the name, this causes
// associations to do undesired sub-object querying when we do simple set operations on models
// model.set("my.attribute.name","foo"). If we ever want utilize this pathing, we need to use
// ">" instead so we don't conflicts with the pathing functionality.
//
// if someone wants to use the Backbone.Association sub-object selecting, they can do
// model.get('object>subObject>deeperSubObject');
//
// This sub object selecting can be see at
// http://dhruvaray.github.io/backbone-associations/specify-associations.html#sa-getsetop
Backbone.Associations.setSeparator('>');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25IZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vd2ViYXBwL2pzL0FwcGxpY2F0aW9uSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQWFJO0FBQ0osbUJBQW1CO0FBQ25CLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLHVCQUF1QixDQUFBO0FBQzlCLDhGQUE4RjtBQUM5Riw4RkFBOEY7QUFDOUYsOEZBQThGO0FBQzlGLDZGQUE2RjtBQUM3RixvRUFBb0U7QUFDcEUsRUFBRTtBQUNGLHFGQUFxRjtBQUNyRixpREFBaUQ7QUFDakQsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyx5RkFBeUY7QUFDekYsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgQ29kaWNlIEZvdW5kYXRpb25cbiAqXG4gKiBUaGlzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuICogTGljZW5zZSwgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dFxuICogZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VXG4gKiBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLiBBIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogaXMgZGlzdHJpYnV0ZWQgYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0gYW5kIGNhbiBiZSBmb3VuZCBhdFxuICogPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9sZ3BsLmh0bWw+LlxuICpcbiAqKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCAnYmFja2JvbmUtYXNzb2NpYXRpb25zJ1xuLy8gQmFja2JvbmUgYXNzb2NpYXRpb25zIHVzZXMgXCIuXCIgYXMgaXRzIHN0YW5kYXJkIHN1Yi1vYmplY3Qgc2VsZWN0aW5nIHdpdGhpbiB0aGVpciBmcmFtZXdvcmsuXG4vLyBIb3dldmVyIHNpbmNlIHNvbWUgb2Ygb3VyIGpzb24gYXR0cmlidXRlIG5hbWVzIGhhdmUgXCIuXCIgY2hhcmFjdGVycyBpbiB0aGUgbmFtZSwgdGhpcyBjYXVzZXNcbi8vIGFzc29jaWF0aW9ucyB0byBkbyB1bmRlc2lyZWQgc3ViLW9iamVjdCBxdWVyeWluZyB3aGVuIHdlIGRvIHNpbXBsZSBzZXQgb3BlcmF0aW9ucyBvbiBtb2RlbHNcbi8vIG1vZGVsLnNldChcIm15LmF0dHJpYnV0ZS5uYW1lXCIsXCJmb29cIikuIElmIHdlIGV2ZXIgd2FudCB1dGlsaXplIHRoaXMgcGF0aGluZywgd2UgbmVlZCB0byB1c2Vcbi8vIFwiPlwiIGluc3RlYWQgc28gd2UgZG9uJ3QgY29uZmxpY3RzIHdpdGggdGhlIHBhdGhpbmcgZnVuY3Rpb25hbGl0eS5cbi8vXG4vLyBpZiBzb21lb25lIHdhbnRzIHRvIHVzZSB0aGUgQmFja2JvbmUuQXNzb2NpYXRpb24gc3ViLW9iamVjdCBzZWxlY3RpbmcsIHRoZXkgY2FuIGRvXG4vLyBtb2RlbC5nZXQoJ29iamVjdD5zdWJPYmplY3Q+ZGVlcGVyU3ViT2JqZWN0Jyk7XG4vL1xuLy8gVGhpcyBzdWIgb2JqZWN0IHNlbGVjdGluZyBjYW4gYmUgc2VlIGF0XG4vLyBodHRwOi8vZGhydXZhcmF5LmdpdGh1Yi5pby9iYWNrYm9uZS1hc3NvY2lhdGlvbnMvc3BlY2lmeS1hc3NvY2lhdGlvbnMuaHRtbCNzYS1nZXRzZXRvcFxuQmFja2JvbmUuQXNzb2NpYXRpb25zLnNldFNlcGFyYXRvcignPicpXG4iXX0=