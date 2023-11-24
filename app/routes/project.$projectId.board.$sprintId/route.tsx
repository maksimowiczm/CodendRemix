import type { LoaderFunctionArgs } from "@remix-run/node";
import ProjectBoard from "~/components/board/ProjectBoard";
import getToken from "~/actions/getToken";
import { getBacklog, getBoard } from "~/api/methods/project";
import { defer, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const token = await getToken(request);
  if (!token) {
    return redirect("/user/login");
  }

  const projectId = params.projectId!;
  const sprintId = params.sprintId!;

  const boardPromise = getBoard({ projectId, sprintId, token });
  const backlogPromise = getBacklog({ projectId, token: token! });

  return defer({ boardPromise, backlogPromise });
};

export default function SelectedSprintBoardPage() {
  const loaderData = useLoaderData<typeof loader>();
  // @ts-ignore
  const { boardPromise, backlogPromise } = loaderData;

  return (
    <div className="flex h-full grow overflow-y-auto border-t-1 border-emerald-700">
      <div className="h-full overflow-x-auto">
        <ProjectBoard boardPromise={boardPromise} />
      </div>
      <Outlet context={backlogPromise} />
    </div>
  );
}