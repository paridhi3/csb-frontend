// service.ts
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";  // Change this to your backend URL

// Use File[] type for files parameter
export const uploadFiles = async (files: File[]): Promise<any> => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const response = await axios.post(`${BASE_URL}/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { metadata, validation }
};

export const chatWithBackend = async (query: string): Promise<string> => {
  const response = await axios.post(
    `${BASE_URL}/chat`,
    { query }, // send as JSON
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data.response
};

export const searchMetadata = async (
  category?: string,
  domain?: string
): Promise<any[]> => {
  const params: Record<string, string> = {};
  if (category) params.category = category;
  if (domain) params.domain = domain;

  const response = await axios.get(`${BASE_URL}/search`, { params });
  return response.data.results; // filtered metadata array
};
