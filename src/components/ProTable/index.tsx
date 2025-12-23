import type { ProTableProps } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { theme } from 'antd';
import type { Key } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.less';

interface TableRowData {
  uuid: string;
  [key: string]: any; // 支持动态字段
}

/**
 * XYProTable 是一个功能强大且可定制的 ProTable 组件，
 * 它提供了以下功能：
 *  - 实现了 Table 高度自适应和虚拟滚动
 *  - 通过 className xyProTable 使得 Table 的高度可以被 resizeObserver 监听
 *  - 通过 rowKey="uuid" 使得每一行的 key 都是唯一的
 *  - 通过 onRow 使得每一点击行背景高亮
 *  - 通过 tableAlertRender={false} 使得 ProTable 自带的已选中项不再被展示
 *
 *  @param {ProTableProps} props
 *  @return {React.ReactElement}
 */

// 注意：弹窗中的table不要使用xyProTable
const XYProTable: React.FC<ProTableProps<any, any>> = (props) => {
  const { columns, virtual = false, pagination, ...restProps } = props;
  const { token } = theme.useToken();

  const uuid_class = useRef(`ant-table-wrapper-${uuidv4()}`);

  const [selectedRowKey, setSelectedRowKey] = useState<Key | null>(null);
  const [virtualBodyHeight, setVirtualBodyHeight] = useState<number>(0);
  // 确保在数据加载完成后再进行高度计算，避免首次渲染时高度不准确的问题
  const [loading, setLoading] = useState<boolean>(true);

  // 缓存行的样式，避免每次渲染时重新计算背景色
  const getRowStyle = useMemo(() => {
    return (record: TableRowData) => ({
      backgroundColor: selectedRowKey && selectedRowKey === record.id ? token.colorFillSecondary : '', // 动态应用背景色
    });
  }, [selectedRowKey, token]);

  // 给columns第一项添加序号
  const columnsWithIndex = useMemo(() => {
    if (columns && columns.length > 0) {
      return [
        {
          title: '序号',
          dataIndex: 'index',
          // valueType: 'indexBorder',
          width: 60,
          render: (text, record, index) => {
            if (pagination && pagination.current && pagination.pageSize) {
              return (pagination.current - 1) * pagination.pageSize + index + 1;
            }
          },
        },
        ...columns,
      ];
    }
    return columns;
  }, [columns]);

  // 计算 scroll.y 的固定值
  useEffect(() => {
    if (!virtual || loading) return;

    const proTableEl = document.getElementsByClassName(uuid_class.current)[0] as HTMLElement;

    const tableHeaderHeight = 47;
    const paginationHeight = 40;

    if (proTableEl) {
      const tableContentHeight = proTableEl.offsetHeight - paginationHeight - tableHeaderHeight;
      setVirtualBodyHeight(tableContentHeight);
    }

    function handleResize() {
      setVirtualBodyHeight(proTableEl.offsetHeight - paginationHeight - tableHeaderHeight);
    }

    // 使用 ResizeObserver 观察 proTableEl 的高度变化
    const resizeObserver = new ResizeObserver(handleResize);
    if (proTableEl) {
      resizeObserver.observe(proTableEl);
    }

    setLoading(false);

    return () => {
      resizeObserver.disconnect(); // 停止观察高度变化
    };
  }, [virtual, loading]);

  return (
    <div className={styles.xyProTable}>
      <ProTable
        tableClassName={uuid_class.current}
        // 48px是toolbar的高度
        tableStyle={{ height: 'calc(100% - 48px)' }}
        scroll={{
          x: '100%',
          y: virtual ? virtualBodyHeight : '100%',
        }}
        // size="small"
        options={{
          reload: false,
          fullScreen: true,
          density: false,
          setting: true,
        }}
        virtual={virtual}
        pagination={{
          pageSizeOptions: [10, 30, 50, 100],
          showTotal: (total: number) => <span>共 {total} 条</span>,
          // showQuickJumper: true,
          size: 'default',
          showSizeChanger: true,
          ...pagination,
        }}
        columns={columnsWithIndex}
        search={false}
        columnEmptyText={false}
        // tableAlertRender={false} // 关闭已选中项的展示
        rowKey="id"
        {...restProps}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRowKey(record.uuid);
          },
          style: getRowStyle(record),
        })}
      />
    </div>
  );
};

export default XYProTable;
