import React, {ReactElement} from 'react'
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { TCandidate, TECH} from 'types/types';

export const orderLabels = { ascend: "asc", descend: "desc" }; 
export const techLabels = { [TECH.CSS]: "CSS", [TECH.HTML]: "HTML", [TECH.REACTJS]: "ReactJS" };
export const techColors = { [TECH.CSS]: "green", [TECH.HTML]: "grey", [TECH.REACTJS]: "red" };


export const columns: ColumnsType<TDataType> = [
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
        text: techLabels[TECH.CSS],
        value: TECH.CSS,
      },
      {
        text: techLabels[TECH.HTML],
        value: TECH.HTML,
      },
      {
        text: techLabels[TECH.REACTJS],
        value: TECH.REACTJS,
      },
    ],
    render: (tech: TCandidate["tech"]) => (
       tech?.map((item) => <Tag key={item} color={techColors[item]}>{techLabels[item]}</Tag >)
    )
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
   }
];

export type TFilterData = {
  q?: string,
  _sort?: string,
  _order?: string,
  _limit: number,
  _page: number,
  tech_like?: string[],
}


export type TDataType = TCandidate & {
  key: React.Key;
  action: ReactElement;
}

