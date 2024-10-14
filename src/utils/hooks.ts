import { RootState } from '../store';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';


export function useReduxAuthMap() {
  const { authMap } = useSelector((state: RootState) => ({
    authMap: state.common.authMap,
  }));
  return { authMap };
}

const SPEED = 2000;
export const useRank = (renderTime: RefObject<number>) => {
  const [rankAnimationConfig, setRankAnimationConfig] = useState<any>({ Speed: SPEED });
  const requestAnimationFrameRef = useRef(null);
  const rankAnimationHandle = useCallback(
    (data: any[] = [], containerClass: string, Speed = SPEED) => {
      setRankAnimationConfig({ Speed, containerClass, data });
      renderTime.current = new Date().getTime();
      const rankListEle = document.getElementsByClassName(containerClass)[0];
      rankListEle && (rankListEle.style.transform = 'translateY(0px)');
    },
    [],
  );
  useEffect(() => {
    // 存在动画则暂停动画，并执行新的动画
    if (requestAnimationFrameRef?.current) {
      window.cancelAnimationFrame(requestAnimationFrameRef.current);
    }
    const animationHandle = () => {
      const { containerClass, data, Speed } = rankAnimationConfig;
      const rankListEle = document.getElementsByClassName(containerClass)[0];
      if (!data || !data?.length || data.length <= 11) {
        // rankListEle && (rankListEle.style.transform = 'translateY(0px)');
        return;
      }
      const now = new Date().getTime();
      let delta = now - renderTime.current;
      if (delta >= Speed) {
        const firstChild = rankListEle?.firstChild;
        rankListEle && firstChild && rankListEle.removeChild(firstChild!);
        rankListEle && firstChild && rankListEle.appendChild(firstChild!);
        delta -= Speed;
        renderTime.current = now;
        // rankListEle && (rankListEle.style.transform = 'translateY(0)');
        // requestAnimationFrameRef.current = window.requestAnimationFrame(
        //   animationHandle.bind(this, data, containerClass, Speed),
        // );
        // return;
      }
      rankListEle && (rankListEle.style.transform = `translateY(-${40 * (delta / Speed)}px)`);
      requestAnimationFrameRef.current = window.requestAnimationFrame(
        animationHandle.bind(this, data, containerClass, Speed),
      );
    };
    animationHandle();
    return () => {
      requestAnimationFrameRef?.current &&
        window.cancelAnimationFrame(requestAnimationFrameRef.current);
    };
  }, [rankAnimationConfig]);
  return [rankAnimationHandle];
};

