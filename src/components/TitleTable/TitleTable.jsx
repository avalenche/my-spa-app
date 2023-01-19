import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DownMenu from '../DownMenu';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Spin } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useFethcCandidates } from '../../utils/useFetchCandidates';
import { useDeleteCandidate } from '../../utils/useDeleteCandidate';


const TitleTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const { candidates, isLoading, fetchCandidates } = useFethcCandidates();
  const { isLoading: isLoadingDelete, onDeleteCandidate } = useDeleteCandidate(fetchCandidates);

  useEffect(() => {
    fetchCandidates();
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
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

  //-2-

  const sortNumber = (el1, el2) => {
    return el1.id - el2.id
  }


  const columns = [
    {
      title: 'Number',
      dataIndex: 'id',
      key: 'id',
      sortOrder: "descend",
      sortDirections: ["ascend", "descend"],
      sorter: sortNumber,
    },
    {
      width: "20%",
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sortDirections: ["ascend", "descend"],
      //sorter: (value),
      //-3--
      ...getColumnSearchProps('name'),
      //-3--
      render: (text, el) => <Link to={`/about/${el.id}`}>{text}</Link>,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      ...getColumnSearchProps('surname'),
    },
    {
      title: 'Tech',
      dataIndex: 'tech',
      key: 'tech',
      ...getColumnSearchProps('tech'),
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
      <Table rowKey="id" dataSource={candidates} columns={columns} />
    </Spin>
  );
};

export default TitleTable;