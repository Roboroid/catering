import { PriceItemType, Sorting, ServiceProviderType } from 'global-types';
import { ActionCreatorsMapObject } from 'redux';
import { DeliveryState } from '../tabs/delivery/types';

export enum Filters {
    ALL_ITEMS = 'ALL_ITEMS',
    SELECTED = 'SELECTED',
}

export enum Grouping {
    UNGROUPED = '',
    CATEGORY = 'cateringCategory.name',
}

export interface TaskInitialState {
    itemFilter: Filters;
    expandedCategory: any;
    group: string;
    availablePriceLists: any[];
    selectedPriceLists: any[];
    priceItemsLoading: boolean;
    proposalItemsRaw: ProposalItemRaw[];
    sorting: any;
    search: SelectedValueType[];
    multiSearchOptions: MultiSearchOption;
    fetchedPriceLists: object;
    selectedServiceProviders: ServiceProviderType[];
    draggingGroup: string | null;
    categoryOrger: string[];
    draggingIndex: number;
}

export interface ProposalItemRaw extends PriceItemType {
    selected: boolean;
    quantity: number;
    _updated?: boolean;
}

export interface MultiSearchOption {
    name?: string[];
    description?: string[];
    note?: string[];
    'cateringCategory.name'?: string[];
    'priceList.name'?: string[];
    'priceList.company.name'?: string[];
    cuisine?: string[];
}

export interface SelectedValueType {
    id: string;
    value: string;
}

export interface ProposalListState {
    expandedCategory: string[];
    dragMode: string;
    draggingGroup: string;
}

export interface ProposalListProps {
    actions: ActionCreatorsMapObject;
    itemFilter: Filters;
    cateringDetailsInfo: Object;
    flightDetailsInfo: Object;
    deliveries: DeliveryState[];
    group: string;
    groupedData: any;
    itemGrouping: Grouping;
    availablePriceLists: any[];
    selectedPriceLists: string[];
    standardPriceLists: string[];
    standardCompanies: string[];
    selectedCompanies: string[];
    indeterminateCompanies: string[];
    priceItemsLoading: boolean;
    columns: any[];
    sorting: Sorting;
    multiSearchOptions: MultiSearchOption;
    search: SelectedValueType[];
    dataList: any[];
    availableCompanies: any[];
    companyFilter: any;
    isAllGroupsOpen: boolean;
    expandedCategory: string[];
    groupNamesOrder: string[];
    categoryOrger: string[];
}
