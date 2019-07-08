import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { groupBy, uniqBy, uniq, reverse } from 'lodash';
import ProposalList from './ProposalList';
import { actions } from './duck';
import { createSelector } from 'reselect';
import { mutateData, sortData } from 'helpers/data';
import {
    getSorting,
    getProposalItemsRaw,
    getGroup,
    getExpandedCategory,
    getSearch,
    getAvailablePriceLists,
    getSelectedPriceLists,
    getItemFilter,
    getDraggingGroup,
    getCategoryOrder,
    getDraggingIndex,
} from './selectors';
import { Filters } from './types';

const getStandardPriceLists = createSelector(
    getAvailablePriceLists,
    availablePriceLists => availablePriceLists.filter(i => i.standard).map(i => i.coreId)
);

const getStandardCompanies = createSelector(
    getAvailablePriceLists,
    availablePriceLists => uniq(availablePriceLists.filter(i => i.standard).map(i => i.company.coreId))
);

const getAvailableCompanies = createSelector(
    getAvailablePriceLists,
    availablePriceLists => uniqBy(availablePriceLists.map(i => i.company), 'coreId')
);

const getSelectedCompanies = createSelector(
    getAvailablePriceLists,
    getSelectedPriceLists,
    (priceLists, selectedIds) => {
        const companiesMap = groupBy(priceLists, 'company.coreId');
        return Object.keys(companiesMap).filter(companyId =>
            companiesMap[companyId].every(i => selectedIds.includes(i.coreId))
        );
    }
);

const getIndeterminateCompanies = createSelector(
    getAvailablePriceLists,
    getSelectedPriceLists,
    getSelectedCompanies,
    (priceLists, selectedIds, selectedCompanies) => {
        const companiesMap = groupBy(priceLists, 'company.coreId');
        return Object.keys(companiesMap).filter(companyId =>
            companiesMap[companyId].some(i => selectedIds.includes(i.coreId) && !selectedCompanies.includes(companyId))
        );
    }
);

const getFilters = createSelector(
    getSearch,
    getSelectedPriceLists,
    (search, selectedPriceLists) => {
        const searchParm = search.reduce(
            (acum, ell) => ({ ...acum, [ell.id]: acum[ell.id] ? [...acum[ell.id], ell.value] : [ell.value] }),
            {}
        );
        return Object.keys(searchParm).reduce((acc, cur) => ({ ...acc, [cur]: { OR: searchParm[cur] } }), {
            ['priceList.coreId']: { OR: selectedPriceLists },
        });
    }
);

const getPriceForFilteredList = createSelector(
    getProposalItemsRaw,
    (listItems = []) => listItems.map(el => ({ ...el, price: el.price / 100 }))
);

const getFilteredData = createSelector(
    getPriceForFilteredList,
    getFilters,
    getItemFilter,
    (getPriceItems, filters, itemFilter) => {
        if (!getPriceItems) {
            return [];
        }
        const isFilter = itemFilter === Filters.SELECTED;
        const mutatedData = mutateData(getPriceItems, filters);
        return isFilter ? mutatedData.filter(i => i.selected) : mutatedData;
    }
);

const getSortedData = createSelector(
    getFilteredData,
    getSorting,
    getSelectedPriceLists,
    (dataList, sorting, selectedPriceLists) => {
        if (selectedPriceLists.length === 0) {
            return [];
        }
        if (!sorting) {
            return dataList;
        }
        return sortData(dataList, sorting);
    }
);

const getGroupedData = createSelector(
    getSortedData,
    getGroup,
    (priceItems = [], group) => groupBy(priceItems, group)
);

const getGroupNames = createSelector(
    getGroupedData,
    groupedData => Object.keys(groupedData)
);

const getGroupNamesOrder = createSelector(
    getCategoryOrder,
    getGroupNames,
    (categoryOrder, groupNames) => categoryOrder.filter(i => groupNames.includes(i))
);

const getCurrentCategoryOrder = createSelector(
    getGroupNamesOrder,
    getDraggingGroup,
    getDraggingIndex,
    (groupOrder, draggingGroup, draggingIndex) =>
        draggingGroup && groupOrder[draggingIndex] !== draggingGroup
            ? reverse(uniq(reverse(groupOrder.concat(draggingGroup)))) // TODO: need to be refactured
            : groupOrder
);

const getGroupedList = createSelector(
    getGroupedData,
    getExpandedCategory,
    getCurrentCategoryOrder,
    (groupedData, expandedCategory = [], currentCategoryOrder) => {
        return currentCategoryOrder.reduce((acc, cur) => {
            const isOpen = expandedCategory.includes(cur);
            return [
                ...acc,
                {
                    coreId: cur,
                    isGroup: true,
                    isOpen,
                },
            ].concat(isOpen ? groupedData[cur].map(i => ({ ...i, _group: cur })) : []);
        }, []);
    }
);

const getAllGroupState = createSelector(
    getGroupedList,
    items => items.filter(i => i.isGroup).every(i => i.isOpen)
);

const mapStateToProps = state => ({
    itemFilter: state.hub.proposalList.itemFilter,
    group: state.hub.proposalList.group,
    groupedData: getGroupedList(state),
    expandedCategory: state.hub.proposalList.expandedCategory,
    search: state.hub.proposalList.search,
    priceItemsLoading: state.hub.proposalList.priceItemsLoading,
    sorting: state.hub.proposalList.sorting,
    dataList: getSortedData(state),
    multiSearchOptions: state.hub.proposalList.multiSearchOptions,
    availablePriceLists: state.hub.proposalList.availablePriceLists,
    selectedPriceLists: state.hub.proposalList.selectedPriceLists,
    standardPriceLists: getStandardPriceLists(state),
    availableCompanies: getAvailableCompanies(state),
    standardCompanies: getStandardCompanies(state),
    selectedCompanies: getSelectedCompanies(state),
    indeterminateCompanies: getIndeterminateCompanies(state),
    isAllGroupsOpen: getAllGroupState(state),
    groupNamesOrder: getGroupNamesOrder(state),
    categoryOrger: state.hub.proposalList.categoryOrger,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            ...actions,
            fetch: actions.fetch,
            toggleFilter: actions.toggleFilter,
            selectPriceList: actions.selectPriceList,
            group: actions.group,
            cleanData: actions.cleanData,
            openCloseGroup: actions.openCloseGroup,
            changeItem: actions.changeItem,
            selectCompany: actions.selectCompany,
            setExpandedCategory: actions.setExpandedCategory,
            setDraggingGroup: actions.setDraggingGroup,
            setCategoryOrder: actions.setCategoryOrder,
        },
        dispatch
    ),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ProposalList);
