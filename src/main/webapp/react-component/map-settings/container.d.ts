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
import { WithBackboneProps } from '../../react-component/backbone-container';
declare const _default: {
    new (props: import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps> | Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>): {
        backbone: any;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>, context: any): {
        backbone: any;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("../../typescript/subtract").default<WithBackboneProps, WithBackboneProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export default _default;