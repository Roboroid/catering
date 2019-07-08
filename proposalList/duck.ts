import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { call, put, select } from 'redux-saga/effects';
import { safeTakeEvery, safeTakeLatest } from 'helpers/saga';
import { getPriceListsByAirport, getPriceListForProposal } from 'queries/priceList';
import { toggleStatus } from 'helpers/data';
import { uniq, uniqBy, get, flatten, sortBy } from 'lodash';
import { TaskInitialState, Filters, Grouping, MultiSearchOption, SelectedValueType } from './types';
import { Sorting, ServiceProviderType } from 'global-types';
import { getDepartureAirport, getAvailablePriceLists, getProposalItemsRaw, getProposalListDetails } from './selectors';

const actionCreator = actionCreatorFactory('hub/proposalList');

const TOGGLE_ITEMS_FILTER = 'TOGGLE_ITEMS_FILTER';
const FETCH = 'FETCH';
const SET_AVAILABLE_PRICE_LISTS = 'SET_AVAILABLE_PRICE_LISTS';
const SELECT_PRICE_LIST = 'SELECT_PRICE_LIST';
const FETCH_PRICE_ITEMS_SUCCESS = 'FETCH_PRICE_ITEMS_SUCCESS';
const SET_PRICE_ITEMS_LOADING = 'SET_PRICE_ITEMS_LOADING';
const SAVE_CATERING_DETAILS = 'SAVE_CATERING_DETAILS';
const CLEAN_DATA = 'CLEAN_DATA';
const CLEAR_EDITED_DELIVERIES = 'CLEAR_EDITED_DELIVERIES';
const OPEN_CLOSE_GROUP = 'OPEN_CLOSE_GROUP';
const PRESELECT_STANDARD_PRICE_LISTS = 'PRESELECT_STANDARD_PRICE_LISTS';
const PRESELECT_ITEMS = 'PRESELECT_ITEMS';
const CHANGE_ITEM = 'CHANGE_ITEM';
const TOGGLE_ITEM = 'TOGGLE_ITEM';
const GROUP = 'GROUP';
const CHANGE_SORTING = 'CHANGE_SORTING';
const CHANGE_SEARCH = 'CHANGE_SEARCH';
const CLEAR_MULTI_SEARCH_OPTIONS = 'CLEAR_MULTI_SEARCH_OPTIONS';
const FETCH_MULTI_SEARCH_OPTIONS = 'FETCH_MULTI_SEARCH_OPTIONS';
const FETCH_MULTI_SEARCH_OPTIONS_SUCCESS = 'FETCH_MULTI_SEARCH_OPTIONS_SUCCESS';
const SELECT_COMPANY = 'SELECT_COMPANY';
const SAVE_SELECTED_SERVICE_PROVIDERS = 'SAVE_SELECTED_SERVICE_PROVIDERS';
const TOGGLE_ALL_GROUP = 'TOGGLE_ALL_GROUP';
const FETCH_PRICE_LIST_SUCCESS = 'FETCH_PRICE_LIST_SUCCESS';
const REFRESH_PROPOSAL_LIST = 'REFRESH_PROPOSAL_LIST';
const SET_EXPANDED_CATEGORY = 'SET_EXPANDED_CATEGORY';
const SET_DRAGGING_GROUP = 'SET_DRAGGING_GROUP';
const SET_CATEGORY_ORDER = 'SET_CATEGORY_ORDER';

export const actions = {
    toggleFilter: actionCreator<Filters>(TOGGLE_ITEMS_FILTER),
    fetch: actionCreator<any>(FETCH),
    setAvailablePriceLists: actionCreator<any[]>(SET_AVAILABLE_PRICE_LISTS),
    selectPriceList: actionCreator<{ ids: string[]; selected: boolean }>(SELECT_PRICE_LIST),
    selectCompany: actionCreator<{ ids: string[]; selected: boolean }>(SELECT_COMPANY),
    fetchPriceItemsSuccess: actionCreator<any[]>(FETCH_PRICE_ITEMS_SUCCESS),
    setPriceItemsLoading: actionCreator<boolean>(SET_PRICE_ITEMS_LOADING),
    saveCateringDetails: actionCreator(SAVE_CATERING_DETAILS),
    clearEditedDeliveries: actionCreator(CLEAR_EDITED_DELIVERIES),
    cleanData: actionCreator<void>(CLEAN_DATA),
    group: actionCreator<Grouping>(GROUP),
    openCloseGroup: actionCreator<string>(OPEN_CLOSE_GROUP),
    preselectStandardPriceLists: actionCreator<void>(PRESELECT_STANDARD_PRICE_LISTS),
    preselectItems: actionCreator<void>(PRESELECT_ITEMS),
    changeItem: actionCreator<{ id: string; key: string; value: string }>(CHANGE_ITEM),
    toggleItem: actionCreator<{ id: string; value: boolean }>(TOGGLE_ITEM),
    changeSorting: actionCreator<Sorting>(CHANGE_SORTING),
    changeSearch: actionCreator<SelectedValueType[]>(CHANGE_SEARCH),
    clearMultySearchOptions: actionCreator<void>(CLEAR_MULTI_SEARCH_OPTIONS),
    fetchMultySearchOptions: actionCreator<string>(FETCH_MULTI_SEARCH_OPTIONS),
    fetchMultySearchOptionsSuccess: actionCreator<MultiSearchOption>(FETCH_MULTI_SEARCH_OPTIONS_SUCCESS),
    saveSelectedServiceProviders: actionCreator<ServiceProviderType[]>(SAVE_SELECTED_SERVICE_PROVIDERS),
    toggleAllGroup: actionCreator<boolean>(TOGGLE_ALL_GROUP),
    fetchPriceListSuccess: actionCreator<{ id: string; items: any[] }>(FETCH_PRICE_LIST_SUCCESS),
    refreshProposalList: actionCreator<void>(REFRESH_PROPOSAL_LIST),
    setExpandedCategory: actionCreator<string[]>(SET_EXPANDED_CATEGORY),
    setDraggingGroup: actionCreator<{ group: string | null; index: number }>(SET_DRAGGING_GROUP),
    setCategoryOrder: actionCreator<string[]>(SET_CATEGORY_ORDER),
};

const initialState: TaskInitialState = {
    itemFilter: Filters.ALL_ITEMS,
    expandedCategory: [],
    search: [],
    group: Grouping.CATEGORY,
    priceItemsLoading: true,
    proposalItemsRaw: [],
    sorting: undefined,
    multiSearchOptions: {},
    availablePriceLists: [],
    selectedPriceLists: [],
    selectedServiceProviders: [],
    fetchedPriceLists: {},
    draggingGroup: null,
    draggingIndex: null,
    categoryOrger: [],
};

export default reducerWithInitialState<TaskInitialState>(initialState)
    .case(actions.toggleFilter, (state, data) => ({
        ...state,
        itemFilter: data,
    }))
    .case(actions.setAvailablePriceLists, (state, data) => ({
        ...state,
        availablePriceLists: data,
    }))
    .case(actions.preselectStandardPriceLists, state => ({
        ...state,
        selectedPriceLists: state.availablePriceLists.filter(i => i.standard).map(i => i.coreId),
    }))
    .case(actions.preselectItems, state => ({
        ...state,
        proposalItemsRaw: state.proposalItemsRaw.map(i => ({
            ...i,
            selected: i.standard,
            quantity: 1,
            _updated: true,
        })),
    }))
    .case(actions.changeItem, (state, { id, key, value }) => ({
        ...state,
        proposalItemsRaw: state.proposalItemsRaw.map(i =>
            i.coreId === id
                ? {
                      ...i,
                      [key]: value,
                      _updated: true,
                  }
                : i
        ),
    }))
    .case(actions.toggleItem, (state, { id, value }) => ({
        ...state,
        proposalItemsRaw: state.proposalItemsRaw.map(i =>
            i.coreId === id
                ? {
                      ...i,
                      selected: value,
                      _updated: true,
                  }
                : i
        ),
    }))
    .case(actions.selectPriceList, (state, data) => ({
        ...state,
        selectedPriceLists: data.selected
            ? uniq([...state.selectedPriceLists, ...data.ids])
            : state.selectedPriceLists.filter(i => !data.ids.includes(i)),
    }))
    .case(actions.fetchPriceItemsSuccess, (state, data) => ({
        ...state,
        proposalItemsRaw: uniqBy(state.proposalItemsRaw.filter(i => i._updated).concat(data), 'coreId'),
    }))
    .case(actions.refreshProposalList, state => {
        const { proposalItemsRaw, fetchedPriceLists, selectedPriceLists } = state;
        const list = flatten(selectedPriceLists.map(id => fetchedPriceLists[id]));
        return {
            ...state,
            proposalItemsRaw: uniqBy(proposalItemsRaw.filter(i => i._updated).concat(list), 'coreId'),
        };
    })
    .case(actions.setPriceItemsLoading, (state, data) => ({
        ...state,
        priceItemsLoading: data,
    }))
    .case(actions.cleanData, () => initialState)
    .case(actions.fetchMultySearchOptionsSuccess, (state, data) => ({ ...state, multiSearchOptions: data }))
    .case(actions.changeSorting, (state, sorting) => ({ ...state, sorting }))
    .case(actions.changeSearch, (state, data) => ({ ...state, search: data }))
    .case(actions.clearMultySearchOptions, state => ({ ...state, multiSearchOptions: {} }))
    .case(actions.fetchPriceListSuccess, (state, { id, items }) => ({
        ...state,
        fetchedPriceLists: {
            ...state.fetchedPriceLists,
            [id]: items,
        },
    }))
    .case(actions.openCloseGroup, (state, data) => ({
        ...state,
        expandedCategory: toggleStatus(state.expandedCategory, data),
    }))
    .case(actions.group, (state, payload) => ({
        ...state,
        group: payload,
        expandedCategory: uniq(state.proposalItemsRaw.filter(x => x.cateringCategory).map(i => get(i, payload))),
    }))
    .case(actions.saveSelectedServiceProviders, (state, payload) => ({
        ...state,
        selectedServiceProviders: payload,
    }))
    .case(actions.toggleAllGroup, (state, payload) => ({
        ...state,
        expandedCategory: payload
            ? uniq(state.proposalItemsRaw.filter(x => x.cateringCategory).map(i => get(i, state.group)))
            : [],
    }))
    .case(actions.setExpandedCategory, (state, payload) => ({
        ...state,
        expandedCategory: payload,
    }))
    .case(actions.setDraggingGroup, (state, payload) => ({
        ...state,
        draggingGroup: payload.group,
        draggingIndex: payload.index,
    }))
    .case(actions.setCategoryOrder, (state, payload) => ({
        ...state,
        categoryOrger: payload,
    }));

function* preselectPriceLists() {
    yield put(actions.setPriceItemsLoading(true));
    const departureAirport = yield select(getDepartureAirport);
    const {
        data: { getCPriceListsByAirport: availablePriceLists },
    } = yield call(getPriceListsByAirport, { airportId: departureAirport.coreId });
    yield put(actions.setAvailablePriceLists(availablePriceLists));
    yield put(actions.preselectStandardPriceLists());
    yield call(fetchPriceLists);
    yield call(setCategoryOrder);
    yield put(actions.refreshProposalList());
    yield put(actions.preselectItems());
    yield put(actions.toggleAllGroup(true));
    yield put(actions.setPriceItemsLoading(false));
}

function* fetchPriceList(priceListId) {
    const {
        data: { getCPriceList: priceList },
    } = yield call(getPriceListForProposal, { priceListId });
    yield put(actions.fetchPriceListSuccess({ id: priceListId, items: priceList.priceItems }));
}

function* fetchPriceLists() {
    const { selectedPriceLists, fetchedPriceLists } = yield select(getProposalListDetails);
    yield put(actions.setPriceItemsLoading(true));
    for (let i = 0; i < selectedPriceLists.length; i++) {
        const priceListId = selectedPriceLists[i];
        if (!fetchedPriceLists[priceListId]) {
            yield call(fetchPriceList, priceListId);
        }
    }
}

function* selectPriceList() {
    yield put(actions.setPriceItemsLoading(true));
    yield call(fetchPriceLists);
    yield put(actions.refreshProposalList());
    yield put(actions.toggleAllGroup(true));
    yield put(actions.setPriceItemsLoading(false));
}

function* selectCompany({ payload: { ids, selected } }) {
    const availablePriceLists = yield select(getAvailablePriceLists);
    const priceListIds = availablePriceLists.filter(i => ids.includes(i.company.coreId)).map(i => i.coreId);
    yield put(actions.selectPriceList({ ids: priceListIds, selected }));
}

function* fetchSearchOptions({ payload }) {
    const priceItemsList = yield select(getProposalItemsRaw);
    const availablePriceLists = yield select(getAvailablePriceLists);
    const availableCompanies: string[] = uniq(availablePriceLists.map(i => i.company.name));
    const searchValue = payload.toLowerCase();

    const multiSearchOptions: MultiSearchOption = {
        name: priceItemsList
            .map(el => el.name)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
        description: priceItemsList
            .map(el => el.description)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
        note: priceItemsList
            .map(el => el.note)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
        ['cateringCategory.name']: priceItemsList
            .map(el => el.cateringCategory.name)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
        ['priceList.name']: availablePriceLists
            .map(el => el.name)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
        ['priceList.company.name']: availableCompanies
            .filter(el => el && el.toLocaleLowerCase().includes(payload))
            .slice(0, 10),
        cuisine: priceItemsList
            .map(el => el.cuisine)
            .filter(el => el && el.toLocaleLowerCase().includes(searchValue))
            .slice(0, 10),
    };
    yield put(actions.fetchMultySearchOptionsSuccess(multiSearchOptions));
}

function* checkDeliveies() {
    const proposalItemsRaw = yield select(getProposalItemsRaw);
    const selectedCompaniesId = proposalItemsRaw.filter(x => x.selected).map(x => x.priceList.company.coreId);

    const uniqSelectedCompaniesId = [...new Set(selectedCompaniesId)];

    const availablePriceLists = yield select(getAvailablePriceLists);
    const availableServiceProviders = availablePriceLists.map(x => x.company.serviceProviders[0]);
    const selectedServiceProviders = uniqSelectedCompaniesId.map(coreId =>
        availableServiceProviders.find(x => x.company.coreId === coreId)
    );

    yield put(actions.saveSelectedServiceProviders(selectedServiceProviders));
}
const getCategoryList = state => state.dictionary.categoryList;

function* setCategoryOrder() {
    const categoryList = yield select(getCategoryList);
    const categoryOrder = sortBy(categoryList, i => i.rank).map(i => i.name);
    yield put(actions.setCategoryOrder(categoryOrder));
}

export function* saga() {
    yield safeTakeEvery(actions.fetch.type, preselectPriceLists);
    yield safeTakeLatest(actions.selectPriceList.type, selectPriceList);
    yield safeTakeEvery(actions.fetchMultySearchOptions.type, fetchSearchOptions);
    yield safeTakeLatest(actions.selectCompany.type, selectCompany);
    yield safeTakeLatest([actions.preselectItems.type, actions.toggleItem.type], checkDeliveies);
}
