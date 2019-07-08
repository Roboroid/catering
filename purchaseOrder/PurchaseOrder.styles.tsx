import * as React from 'react';
import { Link as _Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout as _Layout, Icon as _Icon, Select as _Select, Radio as _Radio } from 'antd';
import { ButtonTemplate } from 'scenes/hub/task/toolbar/Toolbar.styles';
import { SelectProps } from 'antd/lib/select';
import { RadioGroupProps } from 'antd/lib/radio';
import { RadioProps } from 'antd/lib/radio';

const { Content: _Content } = _Layout;

const _Option = _Select.Option;
const _RadioButton = _Radio.Button;
const _RadioGroup = _Radio.Group;

export const Layout = styled(_Layout)`
    margin: ${p => p.theme.margin.small} ${p => p.theme.margin.small} ${p => p.theme.margin.small} 0;
`;

export const Wrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 416px);
`;

export const WrapperTools = styled('div')`
    display: flex;
    justify-content: flex-start;
`;

export const PDFWrapper = styled('div')`
    width: 823px;
    overflow-y: auto;
`;

export const CheckboxWrapper = styled('div')`
    width: 343px;
    min-height: 40px;
    border-radius: 4px;
    background-color: rgba(245, 246, 248, 0.5);
    margin: 32px 0 0 31px;
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-checkbox-wrapper span {
        color: #002140;
        font-size: 14px;
        line-height: 19px;
    }
    .ant-checkbox-wrapper #hidden-items {
        color: #002140;
        font-size: 14px;
        line-height: 19px;
        opacity: 0.5;
    }
`;

export const ReloadButton = styled('div')`
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    margin: 0 8px 0 14px;
    border-radius: 4px;
    background-color: #f2f2f2;
    cursor: pointer;
`;

export const ReloadIcon = styled(_Icon)`
    height: 16px;
    width: 16px;
    position: relative;
    left: 25%;
    top: 20%;
`;

export const Card = styled('div')`
    border: 1px solid #e8e8e8;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 1px rgba(59, 59, 59, 0.05);
`;

export const Select = styled<SelectProps>(props => <_Select {...props} />)`
    margin-left: 25px;
    height: 20px;
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    color: #000000 !important;
    .ant-select-selection {
        border: none;
    }
    .ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
        border: none;
        box-shadow: none;
    }
    .ant-select-selection__rendered {
        margin: 0 8px 0 25px;
    }
`;
export const Option = styled<any>(props => <_Option {...props} />)``;

export const RadioGroup = styled<RadioGroupProps>(props => <_RadioGroup {...props} />)``;

export const RadioButton = styled<RadioProps>(props => <_RadioButton {...props} />)``;

export const SavePdfButton = styled(ButtonTemplate)`
    margin-left: 6px;
`;

export const Link = styled(_Link)`
    text-decoration: none;
    position: absolute;
    right: 32px;
    padding-top: 8px;
    color: #000000;
`;

export const Text = styled('span')`
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    font-weight: bold;
    opacity: 0.85;
`;

export const SelectText = styled('span')`
    font-size: 12px;
    line-height: 20px;
    color: #000000;
    font-weight: bold;
    opacity: 0.65;
`;

export const Toolbar = styled('div')`
    min-height: ${p => p.theme.size.headerHeight}!important;
    width: 100%;
    padding: 0 16px;
    align-items: center;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1px;
`;

export const Content = styled(_Content)`
    background-color: #fff;
    display: flex;
    flex: auto;
    flex-direction: row;
    justify-content: space-between;
`;

export const CommunicationFormContainer = styled('div')`
    overflow: auto;
    width: 30%;
    border-left: 1px solid #e8e8e8;
`;

export const PDFContainer = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Header = styled('div')`
    height: 200px !important;
`;

export const CardHeader = styled('div')`
    padding: 0 16px;
    height: 69px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
`;
