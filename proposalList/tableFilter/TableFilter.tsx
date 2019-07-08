import * as React from 'react';
import * as styled from './TableFilter.styles';
import { Checkbox, Icon } from 'antd';

interface OnSelectArguments {
    ids: string[];
    selected: boolean;
}

interface Props {
    searchPlaceholder: string;
    searchByField: string;
    list: any[];
    selectedIds?: string[];
    highlightedIds?: string[];
    indeterminateIds?: string[];
    onSelect?: (data: OnSelectArguments) => void;
    onSelectAll?: () => void;
}

interface State {
    searchValue: string;
}

class TableFilter extends React.Component<Props, State> {
    public static defaultProps = {
        indeterminateIds: [],
        selectedIds: [],
        list: [],
        searchByField: 'name',
    };

    public state = {
        searchValue: '',
    };

    public handleOnSearch = e => {
        this.setState({ searchValue: e.target.value });
    };

    public handleClearSearch = () => {
        this.setState({ searchValue: '' });
    };

    public render() {
        const { searchPlaceholder, list, searchByField, selectedIds, highlightedIds, indeterminateIds } = this.props;
        const filteredList = list.filter(i =>
            i[searchByField].toLowerCase().includes(this.state.searchValue.toLowerCase())
        );
        const isAllSelected = list.length === selectedIds.length;
        return (
            <styled.HeaderFilterContainer onClick={e => e.stopPropagation()}>
                <styled.Search
                    placeholder={searchPlaceholder}
                    value={this.state.searchValue}
                    onChange={this.handleOnSearch}
                    suffix={
                        this.state.searchValue ? (
                            <Icon type="close-circle" onClick={this.handleClearSearch} />
                        ) : (
                            <Icon type="search" />
                        )
                    }
                />
                <styled.HeaderFilterContent>
                    {filteredList.length !== 0 ? (
                        filteredList.map(i => (
                            <styled.HeaderFilterRow key={i.coreId}>
                                <Checkbox
                                    checked={selectedIds.includes(i.coreId)}
                                    indeterminate={indeterminateIds.includes(i.coreId)}
                                    onChange={e => this.props.onSelect({ ids: [i.coreId], selected: e.target.checked })}
                                />
                                <styled.HeaderFilterValue
                                    title={i.name}
                                    highlighted={highlightedIds && highlightedIds.includes(i.coreId)}
                                >
                                    {i.name}
                                </styled.HeaderFilterValue>
                            </styled.HeaderFilterRow>
                        ))
                    ) : (
                        <styled.NoData>No data</styled.NoData>
                    )}
                </styled.HeaderFilterContent>
                {filteredList.length > 1 && (
                    <styled.HeaderFilterFooter>
                        <styled.HeaderFilterButton
                            onClick={() =>
                                this.props.onSelect({
                                    ids: filteredList.map(i => i.coreId),
                                    selected: !isAllSelected,
                                })
                            }
                        >
                            {isAllSelected ? 'Deselect All' : 'Select All'}
                        </styled.HeaderFilterButton>
                    </styled.HeaderFilterFooter>
                )}
            </styled.HeaderFilterContainer>
        );
    }
}

export default TableFilter;
