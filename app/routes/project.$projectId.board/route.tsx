import type { LoaderFunctionArgs } from "@remix-run/node";
import ProjectBoard from "~/components/board/ProjectBoard";
import getToken from "~/actions/getToken";
import { getBoard } from "~/api/methods/project";
import { defer, redirect } from "@remix-run/node";
import { getProjectTaskStatuses } from "~/api/methods/projectTaskStauses";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const token = await getToken(request);
  if (token === undefined) {
    redirect("/user/login");
  }
  const boardPromise = getBoard({
    projectId: params.projectId!,
    token: token!,
  });

  const statusesPromise = getProjectTaskStatuses({
    projectId: params.projectId!,
    token: token!,
  });

  return defer({ boardPromise, statusesPromise });
};

export default function BoardPage() {
  const loaderData = useLoaderData<typeof loader>();
  // @ts-ignore
  const { boardPromise, statusesPromise } = loaderData;

  return (
    <ProjectBoard
      boardPromise={boardPromise}
      statusesPromise={statusesPromise}
    />
  );
}