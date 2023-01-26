import React, { useEffect } from 'react';
import DownMenu from '../DownMenu';
import queryString from "query-string"

import { Table, Spin } from 'antd';
import { useState } from 'react';
import { useFethcCandidates } from '../../utils/useFetchCandidates';
import { useDeleteCandidate } from '../../utils/useDeleteCandidate';
import Filter from '../Filter';
import { useCallback } from 'react';

const defaultPagination = {
  total: 0,
  current: 1,
  pageSize: 10,
  pageSizeOptions: ["10", "20", "30"],
  showSizeChanger: true
}

const orderLabels = { ascend: "asc", descend: "desc" }

const TitleTable = () => {

  const [pagination, setPagination] = useState(defaultPagination)


  const [filterData, setFilterData] = useState({
    q: undefined,
    _sort: undefined,
    _order: undefined,
    _limit: undefined,
    _page: undefined

  });


  const { candidates, isLoading, fetchCandidates } = useFethcCandidates();
  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(fetchCandidates);

  useEffect(() => {
    const query = queryString.stringify(filterData)
    fetchCandidates(`?${query}`);
  }, [filterData])


  const onFilter = (e) => {
    setTimeout(() => {
      const value = e.target.value;
      setFilterData((prev) => ({ ...prev, q: value }))
    }, 1000)
  }

  const onTableChange = useCallback((pagination, filters, sorter) => {
    console.log('pagination: ', pagination)
    console.log('filter: ', filters)
    console.log('sorter: ', sorter)
    setFilterData((prev) => ({
      ...prev,
      _sort: sorter.field,
      _order: orderLabels[sorter.order]
    }))
    setPagination(pagination)

  }, []);
  /*
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() =>
              (handleSearch(selectedKeys, confirm, dataIndex))}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  */
  //-2-

  const columns = [
    {
      width: "5%",
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,

    },
    {
      width: "15%",
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      //    render: (text, el) => <Link to={`/about/${el.id}`}>{text}</Link>,
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
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
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
      <Table pagination={pagination} rowKey="id" sortDirections={["ascend", "descend", "ascend"]} dataSource={candidates} columns={columns} onChange={onTableChange} />

    </Spin>
  );
};

export default TitleTable;