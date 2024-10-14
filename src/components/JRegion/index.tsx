import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getRegionApi } from '@/services/common';
import styles from './index.module.less';
type IProps = {
  setCityFlag(arg0: boolean): unknown;
  getRegion: (e: {}) => {};
  regionData: {
    areaData?: { value?: string };
    provinceData: { value?: string };
    cityData: { value?: string };
    district: {};
  };
};
const JRegion: React.FC = (props: IProps) => {
  // console.log(props);
  const [cities, setCities] = useState([]);
  const [district, setDistrict] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [curArea, setCurArea] = useState(null);
  const [curProvince, setCurProvince] = useState(null);
  const [curCity, setCurCity] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);

  useEffect(() => {
    props.getRegion({
      curArea,
      curProvince,
      curCity,
      curDistrict,
    });
  }, [curArea, curProvince, curCity, curDistrict]);

  useEffect(() => {
    if (props.regionData?.provinceData) {
      initSelectedOption(props.regionData);
    }
  }, [props.regionData]);

  // 从接收到的regionData 回显选中的省市区
  const initSelectedOption = async (regionData) => {
    regionData?.areaData && (await handleAreaChange(regionData.areaData));
    await handleProvinceChange(regionData.provinceData);
    await handleCityChange(regionData.cityData);
    setTimeout(() => {
      setCurArea(regionData.areaData);
      setCurProvince(regionData.provinceData);
      setCurCity(regionData.cityData);
      setCurDistrict(regionData.district);
    }, 0);
  };

  // const handleReplaceTxt = (info: {}) => {
  //   const _info = {
  //     key: info.regionId,
  //     label: info.regionName,
  //     value: info.regionId,
  //   };
  //   return _info;
  // };

  const handleAreaChange = async (_curArea) => {
    setCurArea(_curArea);
    const result: any = await getCurRegion('1', _curArea.value);
    setProvinceData(result);
    setCities([]);
    setDistrict([]);
    props.setCityFlag(Array.isArray(result) && result.length > 0);
    setCurProvince(null);
    setCurCity(null);
    setCurDistrict(null);
  };
  // 省
  const handleProvinceChange = async (_curProvince: { value?: string }) => {
    setCurProvince(_curProvince);
    const result: any = await getCurRegion('2', _curProvince?.value);
    setCities(result);
    setDistrict([]);
    props.setCityFlag(Array.isArray(result) && result.length > 0);
    setCurCity(null);
    setCurDistrict(null);
    // const defultData = handleReplaceTxt(result[0]);
    // setCurCity(defultData);
  };
  // 市
  const handleCityChange = async (_curCity: { value?: string }) => {
    setCurCity(_curCity);
    const result: any = await getCurRegion('3', _curCity.value);
    setDistrict(result);
    setCurDistrict(null);
    // const defultData = handleReplaceTxt(result[0]);
    // setCurDistrict(defultData);
  };
  // 区
  const handleDistrictChange = (_district: {}) => {
    setCurDistrict(_district);
  };
  // 获取地址 默认获取第一季
  const getCurRegion = async (regionRank = '0', parentId?: string) => {
    const result = await getRegionApi({ regionRank, parentId });
    return result;
  };

  useEffect(() => {
    // 获取区域列表
    getCurRegion().then((res) => {
      // setProvinceData(res);
      setAreaData(res as any[]);
      // const defultData = handleReplaceTxt(res[0]);
      // setCurProvince(defultData);
    });
  }, []);
  return (
    <>
      <div className={styles.regionBox}>
        <Select
          style={{ width: 200 }}
          onChange={handleAreaChange}
          value={curArea}
          placeholder="区域"
          labelInValue={true}
          options={areaData.map((item) => ({
            label: item.regionName,
            value: item.regionId,
          }))}
        />
        {(provinceData && provinceData.length) || !curArea ? (
          <>
            <Select
              style={{ width: 200 }}
              onChange={handleProvinceChange}
              value={curProvince}
              placeholder="省"
              labelInValue={true}
              options={provinceData.map((item) => ({
                label: item.regionName,
                value: item.regionId,
              }))}
            />
            <Select
              style={{ width: 200 }}
              placeholder="市"
              onChange={handleCityChange}
              value={curCity}
              labelInValue={true}
              options={cities.map((item) => ({ label: item.regionName, value: item.regionId }))}
            />
            <Select
              style={{ width: 160 }}
              placeholder="区"
              value={curDistrict}
              onChange={handleDistrictChange}
              labelInValue={true}
              options={district.map((item) => ({ label: item.regionName, value: item.regionId }))}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default JRegion;
