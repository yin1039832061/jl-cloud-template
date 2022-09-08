//获取枚举类型的key数组
export const getEnumKey = type => {
  let arr = Object.keys(type);
  arr.length = arr.length / 2;
  return arr;
};
//file转dataurl
export const fileToURL = (file: File): Promise<string> => {
  let fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    if (window.URL || window.webkitURL) {
      resolve(URL.createObjectURL(file));
    } else {
      fileReader.onload = () => {
        fileReader?.result && resolve(fileReader.result as string);
      };
      fileReader.onerror = err => {
        reject(err);
      };
      fileReader.readAsDataURL(file);
    }
  });
};

//URL转Image
export const urlToImage = async (url: string): Promise<HTMLImageElement> => {
  let img = new Image();
  img.src = url;
  return new Promise(resolve => {
    img.onload = function () {
      if (img.complete) resolve(img);
    };
  });
};

//Image转canvas
export const compressImage = async (
  img: HTMLImageElement,
  maxSize: number,
  name: string,
  mimeType: string,
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  let curQuality = 100;
  let compressFinish = false;
  let count = 0;
  let compressBlob;
  const maxQualitySize = { quality: 100, size: maxSize };
  const minQualitySize = { quality: 0, size: 0 };
  while (!compressFinish) {
    compressBlob = await canvaToBlob(canvas, 'image/jpeg', curQuality / 100);
    const compressSize = compressBlob.size / 1024;
    count++;
    if (compressSize === maxSize) {
      compressFinish = true;
      return;
    }
    if (compressSize > maxSize) {
      maxQualitySize.quality = curQuality;
      maxQualitySize.size = compressSize;
    }
    if (compressSize < maxSize) {
      minQualitySize.quality = curQuality;
      minQualitySize.size = compressSize;
    }
    curQuality = Math.ceil((maxQualitySize.quality + minQualitySize.quality) / 2);
    if (maxQualitySize.quality - minQualitySize.quality < 2) {
      if (!minQualitySize.size && curQuality) {
        curQuality = minQualitySize.quality;
      } else if (!minQualitySize.size && !curQuality) {
        compressFinish = true;
        //eslint-disable-next-line
        console.log('无法压缩到指定大小');
      } else if (minQualitySize.size > maxSize) {
        compressFinish = true;
        //eslint-disable-next-line
        console.log('无法压缩到指定大小');
      } else {
        compressFinish = true;
        curQuality = minQualitySize.quality;
      }
    }
  }
  compressBlob = await canvaToBlob(canvas, 'image/jpeg', curQuality / 100);
  const file = new File([compressBlob], name, { type: mimeType });
  return file;
};
const canvaToBlob = async (canvas, type, quality) => {
  return new Promise(resolve => {
    canvas.toBlob(
      blob => {
        resolve(blob);
      },
      type,
      quality,
    );
  });
};
export const useQuery = (): Record<string, string> => {
  let result = {};
  const searchString = window.location.search.replace(/^\?/, '');
  let arr = searchString.split('&');
  for (let item of arr) {
    let splitIndex = item.indexOf('=');
    if (splitIndex > 0) {
      result[item.substring(0, splitIndex)] = item.substring(splitIndex + 1);
    }
  }
  return result;
};

export const createUuid = (): string => {
  let s: string[] = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substring((Number(s[19]) & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  let uuid = s.join('');
  return uuid;
};
