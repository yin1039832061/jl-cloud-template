import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFilePrefixUrl } from "../../utils";
import JTable from "../../components/JTable";
import styles from './index.module.less';
import { Form } from "antd";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }
]

function Test() {
    const filePrefixUrl = useFilePrefixUrl();
    const { value } = useSelector((state: RootState) => ({
        value: state?.common?.value
    }))
    console.log(filePrefixUrl, 'filePrefixUrl')

    const getDataHandle = async (params, { setData, setTotal, setLoading }) => {
        setLoading(true);
        const res = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { name: '1', age: 1, address: '1' },
                    { name: '2', age: 2, address: '2' },
                    { name: '3', age: 3, address: '3' },
                ])
            }, 1500)
        })
        setData(res);
        setTotal(3);
        setLoading(false);
    }
    return (
        <div className={styles.content}>
            <JTable
                columns={columns}
                getData={getDataHandle}
                rowKey="name"
            />
        </div>
    )
}
export default Test;