import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

interface IProps {
  items: Array<{
    url?: string;
    name: string;
  }>;
}
const JBreadCrumb = (props: IProps) => {
  const { items } = props;
  const navigate = useNavigate();
  const onClickHandle = (url: string | undefined) => () => {
    if (!url) return;
    navigate(url);
  };
  return (
    <div className={styles.breadCrumbContainer}>
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item onClick={onClickHandle(item?.url)} key={index}>
            {item?.url ? <a>{item?.name}</a> : <>{item?.name}</>}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
export default JBreadCrumb;
