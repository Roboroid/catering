import { get } from 'lodash';

const getSorting = state => state.hub.proposalList.sorting;
const getProposalItemsRaw = state => get(state, 'hub.proposalList.proposalItemsRaw', []);
const getGroup = state => state.hub.proposalList.group;
const getExpandedCategory = state => state.hub.proposalList.expandedCategory;
const getSearch = state => state.hub.proposalList.search;
const getProposalListDetails = state => state.hub.proposalList;
const getAvailablePriceLists = state => get(state, 'hub.proposalList.availablePriceLists', []);
const getSelectedPriceLists = state => get(state, 'hub.proposalList.selectedPriceLists', []);
const getSelectedServiceProviders = state => state.hub.proposalList.selectedServiceProviders;
const getDepartureAirport = state => get(state, 'hub.task.data.flight.departureAirport', {});
const getItemFilter = state => get(state, 'hub.proposalList.itemFilter', 'ALL_ITEMS');
const getDraggingGroup = state => state.hub.proposalList.draggingGroup;
const getDraggingIndex = state => state.hub.proposalList.draggingIndex;
const getCategoryOrder = state => state.hub.proposalList.categoryOrger;

export {
    getSorting,
    getProposalItemsRaw,
    getGroup,
    getExpandedCategory,
    getSearch,
    getAvailablePriceLists,
    getSelectedPriceLists,
    getSelectedServiceProviders,
    getDepartureAirport,
    getItemFilter,
    getProposalListDetails,
    getDraggingGroup,
    getDraggingIndex,
    getCategoryOrder,
};
