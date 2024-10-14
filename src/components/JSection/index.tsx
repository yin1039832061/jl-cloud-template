import { CSSProperties, FC, ReactNode } from 'react';
import styles from './index.module.less';
import Image from 'next/image';
import classNames from 'classnames';
export type JSectionProps = {
  children?: ReactNode;
  style?: CSSProperties;
  backgroundColor?: string;
  backgroundImg?: StaticImageData;
  clasName?: string;
};
const JSection: FC<JSectionProps> = (props) => {
  const { backgroundImg } = props;
  return (
    <div
      className={classNames(styles.content, props.clasName)}
      style={Object.assign(
        {},
        props.backgroundColor && { background: props.backgroundColor },
        props.style,
      )}
    >
      {!!backgroundImg && (
        <Image
          className={styles.backgroundImg}
          src={backgroundImg}
          alt="background"
          layout="fill"
          quality={100}
        />
      )}
      <div className={styles.left}></div>
      <div className={styles.middleBlock}>{props?.children}</div>
      <div className={styles.right}></div>
    </div>
  );
};
export default JSection;
