import * as React from 'react';
import { Radio, Select, Checkbox, Icon } from 'antd';
import AutoSizer from 'react-virtualized-auto-sizer';
import { RadioChangeEvent } from 'antd/lib/radio';
import {
    TagContainer,
    Table,
    MultiSearchAutocomplete as MultiSearch,
    EditableCell,
    EditableNumberCell,
} from 'components';
import { reorderArray } from 'helpers/data';
import { Tag } from 'styles';
import * as styled from './ProposalList.styles';
import { Filters, ProposalListProps, ProposalListState } from './types';
import { Grouping } from 'scenes/proposal/details/duck';
import TableFilter from './tableFilter/TableFilter';

const { Option } = Select;

class ProposalList extends React.Component<ProposalListProps, ProposalListState> {
    public constructor(props) {
        super(props);
        this.state = {
            dragMode: 'default',
            expandedCategory: [],
            draggingGroup: null,
        };
    }

    public componentDidMount() {
        this.props.actions.fetch();
    }

    public componentWillUnmount() {
        // this.props.actions.cleanData();
    }

    private renderAllGroupToggle = ({
        onClick,
        isOpen,
        isHidden,
    }: {
        onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
        isOpen: boolean;
        isHidden: boolean;
    }) => width =>
        isHidden ? (
            <styled.Cell width={width} />
        ) : (
            <styled.GroupAllCell key="group-all-toggle" width={width} onClick={onClick}>
                <Icon type={isOpen ? 'caret-down' : 'caret-right'} />
            </styled.GroupAllCell>
        );

    private columns = () => [
        {
            key: 'selected',
            dataIndex: 'selected',
            width: '40px',
            render: (value, record, width) =>
                record.isGroup ? null : (
                    <styled.Cell width={width}>
                        <Checkbox
                            checked={value}
                            onChange={e =>
                                this.props.actions.toggleItem({
                                    id: record.coreId,
                                    value: e.target.checked,
                                })
                            }
                        />
                    </styled.Cell>
                ),
            renderHeaderCell: this.renderAllGroupToggle({
                onClick: () => this.props.actions.toggleAllGroup(!this.props.isAllGroupsOpen),
                isHidden: !this.props.group || !this.props.groupedData || this.props.groupedData.length === 0,
                isOpen: this.props.isAllGroupsOpen,
            }),
        },
        {
            key: 'visible',
            width: '40px',
            render: (_, record, width) =>
                record.isGroup ? null : (
                    <styled.Cell width={width}>
                        <styled.IconContainer>
                            <Icon
                                type="eye-invisible"
                                theme="filled"
                                style={{ color: record.hidden ? '#1890FF' : 'lightgrey' }}
                                onClick={() =>
                                    this.props.actions.changeItem({
                                        id: record.coreId,
                                        key: 'hidden',
                                        value: !record.hidden,
                                    })
                                }
                            />
                        </styled.IconContainer>
                    </styled.Cell>
                ),
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
            sortable: true,
            width: 150,
        },
        {
            key: 'quantity',
            dataIndex: 'quantity',
            title: 'Qty',
            width: '60px',
            render: (value, record, width) => (
                <EditableNumberCell
                    pattern={/^(0|[1-9][0-9]{0,5})$/}
                    onChange={value =>
                        this.props.actions.changeItem({
                            id: record.coreId,
                            key: 'quantity',
                            value: parseFloat(value),
                        })
                    }
                    value={value}
                    defaultValue="1"
                    width={width}
                    min={0}
                    max={20000000}
                    editStyle={{ textAlign: 'right' }}
                    regularStyle={{ textAlign: 'right' }}
                    format={v => parseInt(v, 10).toString()}
                    autoSelect={true}
                />
            ),
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Customer Description',
            sortable: true,
            width: 220,
            render: (value, record, width) => (
                <EditableCell
                    onChange={value =>
                        this.props.actions.changeItem({
                            id: record.coreId,
                            key: 'description',
                            value,
                        })
                    }
                    value={value}
                    width={width}
                />
            ),
        },
        {
            key: 'note',
            dataIndex: 'note',
            title: 'Supplier Notes',
            sortable: true,
            width: 100,
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Price',
            width: 85,
            sortable: true,
            render: (value, record, width) => (
                <EditableNumberCell
                    pattern={/^-?(0|[1-9][0-9]{0,8})(\.[0-9]{0,2})?$/}
                    onChange={value =>
                        this.props.actions.changeItem({
                            id: record.coreId,
                            key: 'price',
                            value: parseFloat(value) * 100,
                        })
                    }
                    value={value}
                    width={width}
                    min={0}
                    max={20000000}
                    editStyle={{ textAlign: 'right' }}
                    regularStyle={{ textAlign: 'right' }}
                    format={v => parseInt(v, 10).toFixed(2)}
                    autoSelect={true}
                />
            ),
        },
        {
            key: 'currency',
            dataIndex: 'currency.code',
            title: 'Cur.',
            width: '65px',
        },
        {
            key: 'unit.name',
            dataIndex: 'unit.name',
            title: 'Unit',
            width: '120px',
            sortable: true,
        },
        {
            key: 'cateringCategory.name',
            dataIndex: 'cateringCategory.name',
            title: 'Category',
            width: '120px',
            sortable: true,
        },
        {
            key: 'priceList.name',
            dataIndex: 'priceList.name',
            title: 'Price List',
            width: 110,
            sortable: true,
            renderOnHeaderCellHover: () => (
                <TableFilter
                    searchPlaceholder="Find Price List"
                    searchByField="name"
                    list={this.props.availablePriceLists}
                    selectedIds={this.props.selectedPriceLists}
                    highlightedIds={this.props.standardPriceLists}
                    onSelect={this.props.actions.selectPriceList}
                />
            ),
        },
        {
            key: 'priceList.company.name',
            dataIndex: 'priceList.company.name',
            title: 'Company',
            width: 110,
            sortable: true,
            renderOnHeaderCellHover: () => (
                <TableFilter
                    searchPlaceholder="Find Company"
                    searchByField="name"
                    list={this.props.availableCompanies}
                    selectedIds={this.props.selectedCompanies}
                    indeterminateIds={this.props.indeterminateCompanies}
                    highlightedIds={this.props.standardCompanies}
                    onSelect={this.props.actions.selectCompany}
                />
            ),
        },
        {
            key: 'dietaryPreferences',
            dataIndex: 'dietaryPreferences',
            title: 'Dietary Pref',
            width: '142px',
            render: (value = [], _, width) => (
                <styled.Cell width={width}>
                    <TagContainer tooltipPlacement="topLeft">
                        {value.map(x => (
                            <Tag key={x.coreId}>{x.name}</Tag>
                        ))}
                    </TagContainer>
                </styled.Cell>
            ),
        },
        {
            key: 'cuisine',
            dataIndex: 'cuisine.name',
            title: 'Cuisine',
            width: '127px',
            sortable: true,
        },
        {
            key: 'ingredients.name',
            dataIndex: 'ingredients',
            title: 'Allergens',
            width: '130px',
            render: (value = [], _, width) => (
                <styled.Cell width={width}>
                    <TagContainer tooltipPlacement="topLeft">
                        {value.map(x => (
                            <Tag color="red" key={x.coreId}>
                                {x.name}
                            </Tag>
                        ))}
                    </TagContainer>
                </styled.Cell>
            ),
        },
        {
            key: 'standard',
            dataIndex: 'standard',
            title: 'Stand.',
            width: '60px',
            headerCellStyle: {
                paddingRight: '0',
            },
            render: (value, _, width) => (
                <styled.Cell width={width}>
                    <styled.Switch size="small" checked={value} />
                </styled.Cell>
            ),
        },
        {
            key: 'chargeable',
            dataIndex: 'chargeable',
            title: 'Char.',
            width: '65px',
            render: (value, record, width) =>
                record.isGroup ? null : (
                    <styled.Cell width={width}>
                        <styled.Switch size="small" checked={value} />
                    </styled.Cell>
                ),
        },
    ];

    public handleChangeSearch = value => {
        this.props.actions.changeSearch(value);
    };

    public handleFilterChange = (e: RadioChangeEvent) => {
        this.props.actions.toggleFilter(e.target.value);
    };

    public handleGroupChange = (value: string) => {
        this.props.actions.group(value);
    };

    private handleDragStart = ({ index }) => {
        const { group, groupedData, dataList, actions, expandedCategory } = this.props;
        const dragingRow = (group ? groupedData : dataList)[index];
        if (dragingRow.isGroup) {
            actions.setExpandedCategory([]);
            actions.setDraggingGroup({ group: dragingRow.coreId, index });
            this.setState({ dragMode: 'group', expandedCategory, draggingGroup: dragingRow.coreId });
        } else {
            this.setState({ dragMode: 'in_group' });
        }
    };

    private handleDragEnd = ({ newIndex }) => {
        const { actions, groupNamesOrder, categoryOrger } = this.props;
        const { dragMode, expandedCategory, draggingGroup } = this.state;
        if (dragMode === 'group') {
            this.props.actions.setExpandedCategory(expandedCategory);
            const indexNew = newIndex < groupNamesOrder.length ? newIndex : groupNamesOrder.length - 1;
            const indexOld = categoryOrger.indexOf(draggingGroup);
            actions.setCategoryOrder(
                reorderArray(categoryOrger, indexOld, categoryOrger.indexOf(groupNamesOrder[indexNew]))
            );
            actions.setDraggingGroup({ group: null, index: null, draggingGroup: null });
        }
        this.setState({ dragMode: 'default' });
    };

    public render() {
        const {
            multiSearchOptions,
            actions,
            group,
            priceItemsLoading,
            groupedData,
            sorting,
            search,
            dataList,
        } = this.props;
        const { dragMode } = this.state;
        const columns = this.columns();
        return (
            <styled.LayoutTop>
                <styled.Toolbar>
                    <styled.Block>
                        <MultiSearch
                            placeholder="Search for ..."
                            options={multiSearchOptions}
                            columns={columns}
                            onChange={this.handleChangeSearch}
                            onSearch={actions.fetchMultySearchOptions}
                            clearOptions={actions.clearMultySearchOptions}
                            selectedValue={search}
                            width={360}
                            aqa="pl-search-autocomplete-filter"
                        />
                    </styled.Block>
                    <styled.Block>
                        <Radio.Group
                            // disabled={true}
                            value={this.props.itemFilter}
                            style={{ marginLeft: 24, marginRight: 24 }}
                            onChange={this.handleFilterChange}
                        >
                            <Radio.Button value={Filters.ALL_ITEMS}>All Items</Radio.Button>
                            <Radio.Button value={Filters.SELECTED}>Selected Items</Radio.Button>
                        </Radio.Group>
                        <Select value={group} onChange={this.handleGroupChange} style={{ width: 180 }}>
                            <Option value={Grouping.UNGROUPED}>No Grouped</Option>
                            <Option value={Grouping.CATEGORY}>Grouped By Category</Option>
                        </Select>
                    </styled.Block>
                </styled.Toolbar>
                <styled.TableWrapper>
                    <AutoSizer>
                        {(props: { width: number; height: number }) => {
                            return (
                                <div style={{ width: props.width, height: props.height }}>
                                    <Table
                                        width={props.width}
                                        height={props.height}
                                        dataSource={group ? groupedData : dataList}
                                        onExpand={(_, record) => actions.openCloseGroup(record.coreId)}
                                        onSort={actions.changeSorting}
                                        sorting={sorting}
                                        columns={columns}
                                        rowKey="coreId"
                                        headerHeight={35}
                                        rowHeight={32}
                                        loading={priceItemsLoading}
                                        draggable={true}
                                        dragMode={dragMode}
                                        onDragStart={this.handleDragStart}
                                        onDragEnd={this.handleDragEnd}
                                    />
                                </div>
                            );
                        }}
                    </AutoSizer>
                </styled.TableWrapper>
            </styled.LayoutTop>
        );
    }
}

export default ProposalList;
