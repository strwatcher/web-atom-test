import {
  Event,
  Effect,
  createStore,
  createEvent,
  sample,
  combine,
} from "effector";
import { persist } from "effector-storage";
import { cookie } from "../lib/storage/cookie-adapter";
import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";
import { not } from "patronum";
import { useUnit } from "effector-react";

export const $token = createStore<string | null>(null);
export const $isAuth = $token.map(Boolean);
export const killSession = createEvent();

persist({ store: $token, adapter: cookie, key: "token" });

sample({
  clock: killSession,
  fn: () => null,
  target: $token,
});

export function useSession() {
  return useUnit({
    token: $token,
    isAuth: $isAuth,
    killSession,
  });
}

type ChainParams = {
  otherwise?: Event<void> | Effect<void, any, any>;
  anonymousRoute: boolean;
};

export function chainAuth<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise, anonymousRoute }: ChainParams
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const authed = sample({
    clock: sessionCheckStarted,
    filter: $isAuth,
  });

  const anonymous = sample({
    clock: sessionCheckStarted,
    filter: not($isAuth),
  });

  sample({
    clock: $token,
    source: combine(route.$params, route.$query, (params, query) => ({
      params,
      query,
    })),
    target: sessionCheckStarted,
  });

  if (otherwise) {
    if (anonymousRoute) {
      sample({
        clock: authed,
        filter: () => anonymousRoute,
        target: otherwise as Event<void>,
      });
    } else {
      sample({
        clock: anonymous,
        filter: () => !anonymousRoute,
        target: otherwise as Event<void>,
      });
    }
  }

  if (!anonymousRoute) {
    return chainRoute({
      route,
      beforeOpen: sessionCheckStarted,
      openOn: authed,
      cancelOn: anonymous,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: anonymous,
    cancelOn: authed,
  });
}
