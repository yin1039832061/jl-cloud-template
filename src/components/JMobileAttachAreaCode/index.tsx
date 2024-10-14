import { Form, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

type AreaCode = '+86' | '+853';

interface mobileValue {
  mobile?: string | number;
  areaCode?: AreaCode;
}

interface MobileInputProps {
  value?: mobileValue /**传入的手机号和区号 */;
  onChange?: (value: mobileValue) => void;
  name?: string /**校验字段名 */;
  placeholder?: string;
}
const JMobileAttachAreaCode = (
  props: MobileInputProps = { value: { mobile: '', areaCode: '+86' } },
) => {
  const { value, onChange, name, placeholder } = props;
  const [mobile, setMobile] = useState();
  const form = Form.useFormInstance();
  const [areaCode, setAreaCode] = useState<AreaCode>('+86');

  const triggerChange = (
    changedValue: { mobile?: number | string; areaCode?: AreaCode } = {
      mobile: '',
      areaCode: '+86',
    },
  ) => {
    onChange?.({ mobile, areaCode, ...value, ...changedValue });
  };

  /**地区更改 */
  const areaChange = (value) => {
    setAreaCode(value);
    triggerChange({ areaCode: value });
    (form.getFieldValue(name)?.mobile || mobile) && onBlur();
  };

  /**手机号 */
  const onMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    triggerChange({ mobile: value, areaCode: form.getFieldValue(name)?.areaCode || areaCode });
  };

  /**失焦校验 */
  const onBlur = () => {
    form.validateFields([name]);
  };

  return (
    <Input
      prefix={<UserOutlined className="site-form-item-icon" />}
      placeholder={placeholder || '请输入手机号码'}
      value={value?.mobile || mobile}
      onChange={onMobileChange}
      onBlur={onBlur}
      addonBefore={
        <Select value={value?.areaCode || areaCode} onChange={areaChange}>
          <Select.Option value="+86">+86</Select.Option>
          <Select.Option value="+853">+853</Select.Option>
        </Select>
      }
    />
  );
};
export default JMobileAttachAreaCode;
