import React, { useEffect } from 'react';
import DownMenu from '../DownMenu';
import queryString from "query-string"

import { Table, Spin, Tag } from 'antd';
import { useState } from 'react';
import { useFethcCandidates } from '../../utils/useFetchCandidates';
import { useDeleteCandidate } from '../../utils/useDeleteCandidate';
import Filter from '../Filter';
import { useCallback } from 'react';
import { orderLabels, techLabels } from './config';


const TitleTable = () => {

  const { candidates, isLoading, totalCandidate, fetchCandidates } = useFethcCandidates();
  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(() => fetchCandidates(queryString.stringify(filterData, { arrayFormat: 'bracket' })));

  const [filterData, setFilterData] = useState({
    q: undefined,
    _sort: "id",
    _order: "desc",
    _limit: 10,
    _page: 1,
    tech_like: undefined,
  });

  useEffect(() => {
    fetchCandidates(queryString.stringify(filterData, { arrayFormat: 'bracket' }));
  }, [filterData])

  const onFilter = (e) => {
    setTimeout(() => {
      const value = e.target.value;
      setFilterData((prev) => ({ ...prev, q: value }))
    }, 1000)
  }

  const onTableChange = useCallback((pagination, filters, sorter) => {
    setFilterData((prev) => ({
      ...prev,
      _sort: sorter.field,
      _order: orderLabels[sorter.order],
      _limit: pagination.pageSize,
      _page: pagination.current,
      tech_like: filters.tech || undefined,
    }))
  }, []);

  const columns = [
    {
      width: "5%",
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      defaultSortOrder: 'descend'
    },
    {
      width: "15%",
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      width: "15%",
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      sorter: true,
    },
    {
      title: 'Tech',
      dataIndex: 'tech',
      key: 'tech',
      filters: [
        {
          text: 'CSS',
          value: 'css',
        },
        {
          text: 'HTML',
          value: 'html',
        },
        {
          text: 'ReastJS',
          value: 'reactjs',
        },
      ],
      render: (tech) => {
        if (tech)
          return tech.map((item) => <Tag key={item} color={item === "reactjs" ? "green" : "volcano"} > {techLabels[item]}</Tag >)
      }
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title: 'Date',
      dataIndex: 'addDate',
      key: 'addDate',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, el) => {
        return <DownMenu id={el.id} deleteEl={() => onDeleteCandidate(el.id)} />
      }

    }

  ];

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
        columns={columns}
        onChange={onTableChange}
      />

    </Spin>
  );
};

export default TitleTable;