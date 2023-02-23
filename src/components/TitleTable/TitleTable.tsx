import React, { useEffect, ChangeEvent, useMemo, useCallback  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DownMenu from '../DownMenu';
import queryString from "query-string"

import { Table, Spin, TablePaginationConfig } from 'antd';

import { useFethcCandidates } from '../../utils/hooks/useFetchCandidates';
import { useDeleteCandidate } from '../../utils/hooks/useDeleteCandidate';
import Filter from '../Filter';

import {  columns, TDataType, TFilterData, orderLabels } from './config';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TCandidate } from 'types/types';
import { fetchCandidatesAction, getCandidatesData, getCandidatesLoading, deleteCandidateAction, getFilterData, setFilters } from 'pages/homePage/store';

const TitleTable: React.FC = () => {
  
  const dispatch = useDispatch();
  const candidates = useSelector(getCandidatesData);
  const isLoading = useSelector(getCandidatesLoading);
  const filterData = useSelector(getFilterData);

  const totalCandidate = candidates.length;

  const {  fetchCandidates } = useFethcCandidates();

  const { isLoading: isLoadingDelete } = useDeleteCandidate(() => fetchCandidates
  (queryString.stringify(filterData, { arrayFormat: 'bracket' })));

  const onDeleteCandidate = useCallback( (id: number)=> dispatch(deleteCandidateAction(id)), [dispatch])
  const setFilterData = useCallback( (data: TFilterData) => dispatch(setFilters(data)), [dispatch])

  useEffect(() => {
      dispatch(fetchCandidatesAction(filterData)) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData])

   const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const value = e.target.value;
      setFilterData({ ...filterData, q: value })
    }, 1000)
  }

  const onTableChange = useCallback((
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TDataType> | SorterResult<TDataType>[]
    ) => {
    setFilterData({      
      ...filterData,
      _sort: !Array.isArray(sorter) ? sorter.field : undefined,
      _order: !Array.isArray(sorter) && sorter.order ? orderLabels[sorter.order] : undefined,
      _limit: pagination.pageSize,
      _page: pagination.current,
      tech_like: filters.tech || undefined,
    } as TFilterData)
  }, [filterData, setFilterData]);

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