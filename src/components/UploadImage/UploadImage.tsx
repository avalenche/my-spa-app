import React, { useCallback, useState } from 'react';
import { Upload, Button, Form } from 'antd';

import type {  UploadRequestOption  } from 'rc-upload/lib/interface';

import { UploadOutlined } from '@ant-design/icons';
import styles from './UploadImage.module.scss'

interface IProps {
  name: string;
  maxSizeMb: number;
}

export const UploadImage: React.FC<IProps>  = ({ name, maxSizeMb }) => {
  const form = Form.useFormInstance();
  const imageUrl = Form.useWatch(name, form);

  const [errorMessage, setErrorMessage] = useState<string>();

  const handleRequest = useCallback(
    (opt: UploadRequestOption) => {
      const reader = new FileReader();
      reader.readAsDataURL(opt.file as Blob);
      reader.onload = () => {
        form.setFieldValue(name, reader.result);
      };
    },
    [name, form],
  );

  const validateFile = useCallback(
    (file: Blob) => {
      const fileType = file.name.split('.').pop()?.toLowerCase();

      if (file.size > maxSizeMb * 1024 * 1024) {
        setErrorMessage(`Can’t upload. File size exceeds ${maxSizeMb} Mb`);
        return false;
      }
      if (fileType !== 'png' && fileType !== 'jpg') {
        setErrorMessage('Can’t upload. File format is other than jpg, png');
        return false;
      }
      setErrorMessage(undefined);
      return true;
    },
    [maxSizeMb],
  );

  return (
    <Upload
      accept=".jpg , .png"
      customRequest={handleRequest}
      beforeUpload={validateFile}
      showUploadList={false}
      className={styles.uploadImage}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="candidate" width="200px" />
      ) : (
        <div>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
      )}
    </Upload>
  );
};
