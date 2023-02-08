import React, { useEffect, ChangeEvent, useState, useMemo, useCallback  } from 'react';
import DownMenu from '../DownMenu';
import queryString from "query-string"

import { Table, Spin, TablePaginationConfig } from 'antd';

import { useFethcCandidates } from '../../utils/useFetchCandidates';
import { useDeleteCandidate } from '../../utils/useDeleteCandidate';
import Filter from '../Filter';

import { defaultFilterData, columns, TDataType, TFilterData } from './config';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TCandidate } from 'types/types';



const TitleTable: React.FC = () => {

  const { candidates, isLoading, totalCandidate, fetchCandidates } = useFethcCandidates();
  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(() => fetchCandidates(queryString.stringify(filterData, { arrayFormat: 'bracket' })));

  const [filterData, setFilterData] = useState(defaultFilterData);

  useEffect(() => {
    fetchCandidates(queryString.stringify(filterData, { arrayFormat: 'bracket' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData])

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const value = e.target.value;
      setFilterData((prev) => ({ ...prev, q: value }))
    }, 1000)
  }

  const onTableChange = useCallback((
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TDataType> | SorterResult<TDataType>[]
    ) => {
    setFilterData((prev) => ({
      ...prev,
      _sort: !Array.isArray(sorter) ? sorter.field : undefined,
      _order: !Array.isArray(sorter) ? sorter.order : undefined,
      _limit: pagination.pageSize,
      _page: pagination.current,
      tech_like: filters.tech || undefined,
    } as TFilterData))
  }, []);

const tableColumns  = useMemo(()=>{
 return columns.map((col)=> {
    if (col.key === "action") {
      return {
        ...col,
        render: (_: unknown, el: TCandidate ) => {
          return <DownMenu id={el.id} deleteEl={() => onDeleteCandidate(el.id)} />
        }
      }
    }
       return col;
  } )
}, [onDeleteCandidate])

  return (
    <Spin spinning={isLoading || isLoadingDelete}>

      <Filter onFilterCandidate={onFilter} />
      <Table
        pagination={{
          total: totalCandidate,
          current: filterData._page,
          pageSize: filterData._limit,
          pageSizeOptions: ["10", "20", "30"],
          showSizeChanger: true,
        }}
        rowKey="id"
        sortDirections={["ascend", "descend", "ascend"]}
        dataSource={candidates}
        columns={tableColumns}
        onChange={onTableChange}
      />

    </Spin>
  );
};

export default TitleTable;