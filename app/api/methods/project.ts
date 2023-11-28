import type {
  PagedProjectRequest,
  ProjectBacklogRequest,
  ProjectBoardRequest,
  ProjectRequest,
  ProjectActiveSprintsRequest,
  isFavouriteProjectRequest,
} from "~/api/types/projectTypes";
import { getApiErrorsFromError, getAxiosInstance } from "~/api/axios";
import type {
  BacklogTaskType,
  BoardTask,
  PagedResponse,
  Project,
  Sprint,
  UserDetails,
} from "~/api/types/baseEntitiesTypes";
import {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "~/api/types/projectTypes";

export async function getBoard({
  projectId,
  sprintId,
  token,
  assigneeId,
}: ProjectBoardRequest): Promise<BoardTask[] | undefined> {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.get(
      `/api/projects/${projectId}/board/${sprintId}
      ${assigneeId ? `?assigneeId=${assigneeId}` : ""}`
    );
    return response.data.tasks;
  } catch (err) {
    return undefined;
  }
}

export async function getPagedProjects({
  pageIndex,
  pageSize,
  search,
  sortColumn,
  sortOrder,
  token,
}: PagedProjectRequest): Promise<PagedResponse<Project> | undefined> {
  const axios = getAxiosInstance(token);
  const params = {
    pageIndex,
    pageSize,
    search,
    sortColumn,
    sortOrder,
  };
  try {
    const response = await axios.get(`/api/projects`, { params });
    return { data: response.data };
  } catch (err) {
    return getApiErrorsFromError(err);
  }
}

export async function getProject({
  projectId,
  token,
}: ProjectRequest): Promise<Project | undefined> {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.get(`api/projects/${projectId}`);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export async function getActiveSprints({
  projectId,
  token,
}: ProjectActiveSprintsRequest): Promise<Sprint[] | undefined> {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.get(
      `/api/projects/${projectId}/sprints/active`
    );
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export async function getBacklog({
  projectId,
  token,
}: ProjectBacklogRequest): Promise<BacklogTaskType[] | undefined> {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.get(`/api/projects/${projectId}/backlog`);
    return response.data.tasks;
  } catch (err) {
    return undefined;
  }
}

export async function getMembers({
  projectId,
  token,
}: ProjectRequest): Promise<UserDetails[] | undefined> {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.get(`/api/projects/${projectId}/members`);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export async function setIsFavourite({
  projectId,
  token,
  isFavourite,
}: isFavouriteProjectRequest) {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.put(`/api/projects/${projectId}/favourite`, {
      isFavourite,
    });
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export async function updateProject({
  projectId,
  token,
  name,
  description,
}: UpdateProjectRequest) {
  const axios = getAxiosInstance(token);

  const apiRequest = {
    name,
    description: {
      shouldUpdate: true,
      value: description,
    },
  };

  try {
    const response = await axios.put(`/api/projects/${projectId}`, apiRequest);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export async function createProject({
  token,
  name,
  description,
}: CreateProjectRequest) {
  const axios = getAxiosInstance(token);

  try {
    const response = await axios.post(`/api/projects`, { name, description });
    return response.data;
  } catch (err) {
    return undefined;
  }
}
