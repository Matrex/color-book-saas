import apiService from "../services/apiService";

export interface StorageUploadPayload {
  file: File;
}

interface StorageUploadResult {
  url: string;
}

const storageApi = {
  upload(payload: StorageUploadPayload) {
    return apiService.form<StorageUploadResult>("/storage/upload", payload);
  },
};

export default storageApi;
