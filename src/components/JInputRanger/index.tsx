import { Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { CloseCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';

interface IProps {
  value?: [string, string];
  type?: 'text' | 'number';
  min?: number;
  max?: number;
  onChange?: (e: [string, string], prev?: [string | undefined, string | undefined]) => void;
  onBlur?: (e) => void;
  allowClear?: boolean;
  placeholder?: [string, string];
}
const JInputRanger = (props: IProps) => {
  const { allowClear, placeholder, value, type, min, max, onChange, onBlur } = props;
  const [rangerValue, setRangerValue] = useState([]);
  const [isFocus, setIsFocus] = useState<[boolean, boolean]>([false, false]);
  const CInput = type === 'number' ? InputNumber : Input;
  useEffect(() => {
    setRangerValue(value);
  }, [value]);
  const onInputChange = (type1: 'start' | 'end') => (e) => {
    let val = type === 'number' ? e : e?.target?.value;
    let tempValue = (type1 === 'start' ? [val, rangerValue?.[1]] : [rangerValue?.[0], val]) as [
      string,
      string,
    ];
    let prevValue = (rangerValue ? [...rangerValue] : [undefined, undefined]) as [
      string | undefined,
      string | undefined,
    ];
    typeof onChange === "function" && onChange(tempValue, prevValue);
    setRangerValue(tempValue);
  };
  const onClearHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isInputFocus = isFocus.some((item) => item);
    // 如果输入框聚焦状态，需要等到输入框失焦再执行清空逻辑
    if (isInputFocus) {
      setTimeout(() => {
        setRangerValue([]);
        typeof onChange === "function" && onChange([undefined, undefined]);
      }, 300);
    } else {
      setRangerValue([]);
      typeof onChange === "function" && onChange([undefined, undefined]);
    }
  };
  const onFocusHandle = (index: 0 | 1) => () => {
    setIsFocus((isFocus) => {
      isFocus[index] = true;
      return [...isFocus];
    });
  };
  const onBlurHandle = (index: 0 | 1) => (e) => {
    // 在ranger中切换输入位置会先失焦再另一个input聚焦，需延时执行失焦事件
    let timer = setTimeout(() => {
      setIsFocus((isFocus) => {
        isFocus[index] = false;
        let isBlur = isFocus.every((item) => !item);
        isBlur &&
          onBlur &&
          typeof onBlur === 'function' &&
          onBlur({ target: { value: rangerValue } });
        return [...isFocus];
      });
      timer = null;
    }, 200);
  };
  return (
    <div className={styles.cusRangerContainer}>
      <div
        className={classNames({
          [styles.numberWrapper]: type === 'number',
        })}
      >
        <CInput
          placeholder={placeholder?.[0] || ''}
          value={rangerValue?.[0]}
          bordered={false}
          onChange={onInputChange('start')}
          onFocus={onFocusHandle(0)}
          onBlur={onBlurHandle(0)}
          style={{ width: '100%' }}
          min={min}
          max={max}
        />
      </div>
      <div className="ant-picker-range-separator">
        <span aria-label="to" className="ant-picker-separator">
          <span role="img" aria-label="swap-right" className="anticon anticon-swap-right">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="swap-right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
            </svg>
          </span>
        </span>
      </div>
      <div>
        <CInput
          bordered={false}
          suffix={
            !!allowClear ? (
              rangerValue?.[0] || rangerValue?.[1] ? (
                <CloseCircleFilled onClick={onClearHandle} style={{ color: 'rgba(0,0,0,.25)' }} />
              ) : (
                <span className={styles.clearIcon} />
              )
            ) : null
          }
          placeholder={placeholder?.[1] || ''}
          value={rangerValue?.[1]}
          onChange={onInputChange('end')}
          onFocus={onFocusHandle(1)}
          onBlur={onBlurHandle(1)}
          style={{ width: '100%' }}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};
export default JInputRanger;
