import styles from './index.module.less';
import JSection, { JSectionProps } from '../JSection';
interface Props extends JSectionProps {
  title?: React.ReactNode;
}
const Index: React.FC<Props> = ({ title, children, style, ...attr }) => {
  return (
    <>
      {!!title && (
        <JSection>
          <div className={styles.title}>{title}</div>
        </JSection>
      )}
      {!!children && (
        <JSection style={Object.assign({ margin: '10px 0' }, style)} {...attr}>
          {children}
        </JSection>
      )}
    </>
  );
};

export default Index;
