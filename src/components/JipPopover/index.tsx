import React from 'react';
import { InfoOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Popover } from 'antd';

const JTipPopover = (props: {
  title?: string;
  des?: string;
  otherInfo?: Array<{
    title: string;
    des: string;
  }>;
}) => {
  const { title, des, otherInfo } = props;
  return (
    <Popover
      content={
        <div className={styles.contentWrapper}>
          {(otherInfo || []).map((item) => (
            <div className={styles.itemWrapper} key={item?.title}>
              <div className={styles.title}>{item?.title}</div>
              <div className={styles.desc}>{item?.des}</div>
            </div>
          ))}
        </div>
      }
      title={
        title || des ? (
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{title}</div>
            {des && <div className={styles.desc}>{des}</div>}
          </div>
        ) : null
      }
      trigger="hover"
      overlayClassName={styles.popoverWrapper}
      placement="bottom"
    >
      <div className={'tip-icon'}>
        <InfoOutlined style={{ width: '12px', height: '12px', fontSize: '12px', color: '#FFF' }} />
      </div>
    </Popover>
  );
};

export default JTipPopover;
