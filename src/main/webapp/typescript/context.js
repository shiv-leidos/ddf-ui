import * as React from 'react';
// create context with no upfront defaultValue
// without having to do undefined check all the time
export function createCtx(defaults) {
    var ctx = React.createContext(defaults);
    function useCtx() {
        var c = React.useContext(ctx);
        if (!c)
            throw new Error('useCtx must be inside a Provider with a value');
        return c;
    }
    return [useCtx, ctx.Provider]; // make TypeScript infer a tuple, not an array of union types
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3dlYmFwcC90eXBlc2NyaXB0L2NvbnRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQzlCLDhDQUE4QztBQUM5QyxvREFBb0Q7QUFDcEQsTUFBTSxVQUFVLFNBQVMsQ0FBSSxRQUFxQjtJQUNoRCxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFnQixRQUF5QixDQUFDLENBQUE7SUFDekUsU0FBUyxNQUFNO1FBQ2IsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQTtRQUN4RSxPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQVUsQ0FBQSxDQUFDLDZEQUE2RDtBQUN0RyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBjcmVhdGUgY29udGV4dCB3aXRoIG5vIHVwZnJvbnQgZGVmYXVsdFZhbHVlXG4vLyB3aXRob3V0IGhhdmluZyB0byBkbyB1bmRlZmluZWQgY2hlY2sgYWxsIHRoZSB0aW1lXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ3R4PEE+KGRlZmF1bHRzPzogUGFydGlhbDxBPikge1xuICBjb25zdCBjdHggPSBSZWFjdC5jcmVhdGVDb250ZXh0PEEgfCB1bmRlZmluZWQ+KGRlZmF1bHRzIGFzIEEgfCB1bmRlZmluZWQpXG4gIGZ1bmN0aW9uIHVzZUN0eCgpIHtcbiAgICBjb25zdCBjID0gUmVhY3QudXNlQ29udGV4dChjdHgpXG4gICAgaWYgKCFjKSB0aHJvdyBuZXcgRXJyb3IoJ3VzZUN0eCBtdXN0IGJlIGluc2lkZSBhIFByb3ZpZGVyIHdpdGggYSB2YWx1ZScpXG4gICAgcmV0dXJuIGNcbiAgfVxuICByZXR1cm4gW3VzZUN0eCwgY3R4LlByb3ZpZGVyXSBhcyBjb25zdCAvLyBtYWtlIFR5cGVTY3JpcHQgaW5mZXIgYSB0dXBsZSwgbm90IGFuIGFycmF5IG9mIHVuaW9uIHR5cGVzXG59XG4iXX0=