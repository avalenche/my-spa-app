import React, { useCallback, useState } from "react";

import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UploadImage = ({ name, maxSizeMb }) => {
  const form = Form.useFormInstance();
  const imageUrl = Form.useWatch(name, form);

  const [errorMessage, setErrorMessage] = useState();

  const handleRequest = useCallback(
    (opt) => {
      const reader = new FileReader();
      reader.readAsDataURL(opt.file);
      reader.onload = () => {
        form.setFieldValue(name, reader.result);
      };
    },
    [name, form]
  );

  const validateFile = useCallback(
    (file) => {
      const fileType = file.name.split(".").pop().toLowerCase();

      if (file.size > maxSizeMb * 1024 * 1024) {
        setErrorMessage(`Can’t upload. File size exceeds ${maxSizeMb} Mb`);
        return false;
      }
      if (fileType !== "png" && fileType !== "jpg") {
        setErrorMessage("Can’t upload. File format is other than jpg, png");
        return false;
      }
      setErrorMessage(undefined);
      return true;
    },
    [maxSizeMb]
  );

  return (
    <Upload
      accept=".jpg , .png"
      customRequest={handleRequest}
      beforeUpload={validateFile}
      showUploadList={false}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="candidate" />
      ) : (
        <div>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
      )}
    </Upload>
  );
};
