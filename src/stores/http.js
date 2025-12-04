import axios from "axios";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import {getGatewayUrl} from "@/stores/app.js";
import {getAuthUser} from "@/stores/user.js";

// --- Вспомогательная функция для создания полной нагрузки (UUID + payload) ---
function createRequestData(payload = {}) {
  const authUUID = getAuthUser()?.uuid;
  return {
    ...(authUUID && {userUUID: authUUID}), // Добавляем только если UUID существует
    ...payload
  };
}

// --- Вспомогательная функция для обработки запроса ---
async function handleRequest(requestConfig) {
  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    exceptionHandler.handle(error);
    return false;
  }
}

// ------------------------------------------------------------------

export async function getRequest(apiRoute, payload = {}) {
  const url = getGatewayUrl() + apiRoute;
  const requestData = createRequestData(payload);

  return handleRequest({
    method: 'get',
    url: url,
    params: requestData
  });
}

export async function postRequest(apiRoute, payload = {}) {
  const url = getGatewayUrl() + apiRoute;
  const requestData = createRequestData(payload);

  return handleRequest({
    method: 'post',
    url: url,
    data: requestData
  });
}

export async function putRequest(apiRoute, payload = {}) {
  const url = getGatewayUrl() + apiRoute;
  const requestData = createRequestData(payload);

  return handleRequest({
    method: 'put',
    url: url,
    data: requestData
  });
}

export async function deleteRequest(apiRoute, payload = {}) {
  const url = getGatewayUrl() + apiRoute;
  const requestData = createRequestData(payload);

  return handleRequest({
    method: 'delete',
    url: url,
    data: requestData
  });
}