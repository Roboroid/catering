import styled from 'styled-components';
import {
    Button as _Button,
    Icon as _Icon,
    Layout as _Layout,
    Table as _Table,
    Tabs as _Tabs,
    Switch as _Switch,
} from 'antd';
import { MultiSearch as _MultiSearch } from 'components';
import { NativeButtonProps } from 'antd/lib/button/button';
import { IconProps } from 'antd/lib/icon';
import { TabsProps } from 'antd/lib/tabs';
import * as React from 'react';
import { SelectProps } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';

const { Header: _Header, Content: _Content, Sider: _Sider } = _Layout;

const _TabPane = _Tabs.TabPane;

export const Layout = styled(_Layout)``;

export const LayoutTop = styled(Layout)``;

export const Tabs = styled<TabsProps>(props => <_Tabs {...props} />)`
    height: 100%;
    & {
        div.ant-tabs-content-animated {
            height: calc(100% - 64px) !important;
        }
    }
`;

export const Switch = styled<SwitchProps>(props => <_Switch {...props} />)`
    pointer-events: none;
`;

export const TabPane = styled(_TabPane)``;

export const Block = styled.div`
    display: flex;
    align-items: center;
`;

export const MultiSearch = styled(_MultiSearch).attrs<SelectProps>({
    style: {
        placeholderColor: 'rgba(0,0,0,0.25)',
        borderColor: p => p.theme.colors.lightGray,
    },
})``;

export const Button = styled<NativeButtonProps>(props => <_Button {...props} />)`
    margin-left: ${p => p.theme.margin.tiny};
`;

export const Header = styled(_Header)`
    display: flex;
    height: ${p => p.theme.size.headerHeight}!important;
    padding: 0;
    background: #fff !important;
    align-items: center;
    justify-content: flex-end;
`;

export const Content = styled(_Content)`
    margin: 16px;
    display: flex;
    flex: auto;
`;

export const Sider = styled(_Sider)`
    background-color: #fff !important;
    margin: ${p => p.theme.margin.small};
    overflow: hidden;
    .ant-tabs-nav.ant-tabs-nav-animated {
        height: ${p => p.theme.size.headerHeight};
    }
`;

export const Toolbar = styled('div')`
    height: ${p => p.theme.size.headerHeight}!important;
    width: 100%;
    padding: 0 16px;
    align-items: center;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-right: ${p => p.theme.margin.small};
`;

export const TableWrapper = styled.div`
    display: flex;
    flex: auto;
    background-color: #fff;
`;

export const Icon = styled<IconProps>(props => <_Icon {...props} />)`
    cursor: pointer;
`;

// -------------------- Price Items Table -----------------

export const Cell = styled('div')<{ width: number }>`
    min-width: ${p => p.width}px;
    width: ${p => p.width}px;
    display: flex;
    align-items: center;
    padding: 0 5px 0 15px;
`;

export const IconContainer = styled('div')`
    cursor: pointer;
    width: 15px;
`;

export const GroupAllCell = styled('div')<{ width: number }>`
    min-width: ${p => p.width}px;
    max-width: ${p => p.width}px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;
