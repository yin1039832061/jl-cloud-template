import localeCom from '@/components/localeCom';
import { getGoodsList } from '@/services/goods';
import ServiceType from '@/services/goods/type';
import React, { useEffect, useState } from 'react';


const GoodsList = () => {
    const [list, setList] = useState<GetTypeByKey<ServiceType.GetGoodsListResponse, 'data.dataList'>>([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let res = await getGoodsList({ pageNo: 1, pageSize: 10 });
        if (res?.code === 0 && Array.isArray(res.data.dataList)) {
            setList(res.data.dataList)
        } else {
            setList([])
        }
    }
    return (
        <div>
            goods list page
        </div>
    )
}
export default localeCom(GoodsList);