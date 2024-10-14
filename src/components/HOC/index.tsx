import React from 'react';
import ErrorPage from '../ErrorPage';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import withRouter from '../withRouter';
import { ICommonState } from '../../reducers/common/type';


interface IState {
  hasError: boolean;
}

const HOC = <
  P extends {
    dispatch: (params: any) => any;
  },
>(
  WrappedComponent: React.ComponentType<P>,
) => {
  class wrapperCom extends React.PureComponent<P & ReturnState, IState> {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
      };
    }
    listener: null | (() => void) = null;
    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }
    componentDidMount() {
      this.listener = function (location: Location) {
        if (window.__MICRO_APP_ENVIRONMENT__) {
            // 发送全局数据，通知侧边栏修改菜单展示
            window.microApp.setGlobalData({ appName: window.__MICRO_APP_NAME__, type: 'url_change', path: location.pathname, search: location.search })
        }
      }

    }
    componentDidUpdate(prevProps: Readonly<P & { common: ICommonState; }>, prevState: Readonly<IState>, snapshot?: any): void {
      if (`${prevProps?.router?.location?.pathname}${prevProps?.router?.location?.search}` !== `${this.props?.router?.location?.pathname}${this.props?.router?.location?.search}`) {
        this.listener?.call(this, this.props?.router?.location);
      }
    }
    componentWillUnmount(): void {
      if (this.listener) {
        this.listener = null;
      }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      // window?.__bl?.error &&
      //   typeof window.__bl?.error === 'function' &&
      //   window.__bl?.error(error, errorInfo?.componentStack);
    }
    render(): React.ReactNode {
      if (this.state.hasError) return <ErrorPage />;
      return (
        <div className="hoc">
          {/* <Spin spinning={!!globalLoadingCount} style={{ zIndex: 1000 }}> */}
          <WrappedComponent {...this.props} />
          {/* </Spin> */}
        </div>
      );
    }
  }
  type ReturnState = ReturnType<typeof mapStateToProps>;
  const mapStateToProps = (state: RootState) => ({
    common: state.common,
  });
  return withRouter(connect(mapStateToProps)(wrapperCom));
};
export default HOC;
