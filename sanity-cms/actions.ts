import { type DocumentActionComponent, type DocumentActionProps, useCurrentUser } from "sanity";

export function originalActionWithRevalidate(originalAction: DocumentActionComponent) {
  return function originalResultWithRevalidate(props: DocumentActionProps) {
    const originalResult = originalAction(props);
    //Exposed inside the studio
    const secret = "16887078354285934";
    const user = useCurrentUser();
    console.log("studio user", user);

    if (!originalResult) {
      return null;
    }

    const shouldRevalidate =
      originalAction.action !== undefined &&
      ["publish", "unpublish", "delete", "duplicate"].includes(originalAction.action);

    return {
      ...originalResult,
      onHandle: async () => {
        if (typeof originalResult.onHandle === "function") {
          originalResult.onHandle();
          if (shouldRevalidate) {
            await fetch(`/api/revalidate/tag?tag=${props.type}&secret=${secret}`);
          }
        }
      },
    };
  };
}
