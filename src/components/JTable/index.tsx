import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table as AntTable } from 'antd';
import type { PaginationProps } from 'antd';
import { isNumber } from 'lodash';

interface Params {
  [key: string]: any;
  pageNum: number;
  pageSize: number;
}
interface IProps {
  columns: Record<string, unknown>[];
  searchParams?: any;
  pagination?: PaginationProps | boolean;
  firstRenderGetData?: boolean; //支持默认不获取table数据
  getData: (
    params: Params,
    {
      setData,
      setTotal,
      setLoading,
    }: {
      setData: (data: readonly object[]) => void;
      setTotal: (total: number) => void;
      setLoading: (loading: boolean) => void;
    },
  ) => void;
  reset?: number;
  reload?: number;
  [key: string]: unknown;
}
const defaultSearchParams = {};
const Table = (props: IProps) => {
  const {
    columns,
    searchParams = defaultSearchParams,
    getData,
    firstRenderGetData = true,
    reset = 0,
    pagination = true,
    reload = 0,
    ...otherProps
  } = props;
  const [page, setPage] = useState(1);
  const defaultPageSize = useMemo(
    () =>
      typeof pagination !== 'boolean' &&
      Array.isArray(pagination?.pageSizeOptions) &&
      pagination.pageSizeOptions[0]
        ? (pagination.pageSizeOptions[0] as number)
        : 10,
    [pagination],
  );
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<readonly object[]>([]);
  const [params, setParams] = useState(searchParams);
  const prevSearchParamsRef = useRef({ pageNum: 0, pageSize: defaultPageSize });
  const isFirstRef = useRef(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    searchParams && setParams(searchParams);
  }, [searchParams]);
  const onChangeHandle = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    prevSearchParamsRef.current = { ...prevSearchParamsRef.current, pageNum: page, pageSize };
    return getData({ ...params, pageNum: page, pageSize }, { setTotal, setData, setLoading });
  };
  useEffect(() => {
    if (reset) {
      setPage(1);
      setPageSize(defaultPageSize);
      setParams({});
    }
  }, [reset]);
  useEffect(() => {
    if (reload) {
      // 处理位于列表最后一页时，删除唯一一条记录，pageNo需前移一页
      const tempSetTotal = (newTotal: number) => {
        setTotal(newTotal);
        if (
          isNumber(prevSearchParamsRef?.current?.pageNum) &&
          isNumber(prevSearchParamsRef?.current?.pageSize) &&
          prevSearchParamsRef?.current.pageNum > 1 &&
          total === newTotal + 1 &&
          total ===
            (prevSearchParamsRef.current.pageNum - 1) * prevSearchParamsRef.current.pageSize + 1
        )
          onChangeHandle(
            prevSearchParamsRef?.current?.pageNum - 1,
            prevSearchParamsRef?.current.pageSize,
          );
      };
      getData(
        {
          ...prevSearchParamsRef.current,
        },
        { setTotal: tempSetTotal, setData, setLoading },
      );
    }
  }, [reload]);
  useEffect(() => {
    if (isFirstRef.current && !firstRenderGetData) return;
    setPage(1);
    setPageSize(pageSize);
    getData({ ...params, pageNum: 1, pageSize }, { setTotal, setData, setLoading });
    prevSearchParamsRef.current = { ...params, pageNum: 1, pageSize };
  }, [params]);
  useEffect(() => {
    isFirstRef.current = false;
  }, []);
  return (
    <AntTable
      bordered
      columns={columns}
      dataSource={data || []}
      loading={loading}
      pagination={
        pagination
          ? {
              total: total || 0,
              showTotal: (total, range) => `${range[0]}-${range[1]} 总共 ${total} 条`,
              pageSize: pageSize,
              current: page,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50],
              onChange: onChangeHandle,
              ...(typeof pagination !== 'boolean' ? pagination : {}),
            }
          : false
      }
      {...otherProps}
    />
  );
};
export default React.memo(Table);
type useReset = () => [number, () => void];
export const useReset: useReset = () => {
  const [resetCount, setResetCount] = useState(0);

  const resetFn = () => {
    setResetCount((resetCount) => resetCount + 1);
  };
  return [resetCount, resetFn];
};
type UseReload = () => [number, () => void];
export const useReload: UseReload = () => {
  const [reload, setReload] = useState<number>(0);
  const reloadFn = () => {
    setReload((reload) => reload + 1);
  };
  return [reload, reloadFn];
};
