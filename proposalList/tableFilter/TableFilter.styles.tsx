import * as React from 'react';
import styled from 'styled-components';
import { Input as _Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export const HeaderFilterContainer = styled('div')`
    position: fixed;
    border-radius: 4px;
    width: 200px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
    font-weight: normal;
    background-color: #fff !important;
    z-index: 100;
    * {
        transition: none !important;
    }
`;

export const Search = styled<InputProps>(props => <_Input {...props} />)`
    input {
        border: none !important;
        box-shadow: none !important;
    }
`;

export const HeaderFilterContent = styled('div')`
    padding: 5px 10px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${p => p.theme.colors.lightGray};
`;

export const HeaderFilterRow = styled('div')`
    min-height: 30px;
    line-height: 30px;
    display: flex;
`;

export const HeaderFilterValue = styled('div')<{ highlighted: boolean }>`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 10px;
    font-weight: ${p => (p.highlighted ? 'bold' : 'normal')};
`;

export const HeaderFilterFooter = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-top: 1px solid ${p => p.theme.colors.lightGray};
`;

export const HeaderFilterButton = styled('div')`
    border: white;
    cursor: pointer;
    color: #1890ff;
`;

export const NoData = styled('div')`
    opacity: 0.5;
`;
