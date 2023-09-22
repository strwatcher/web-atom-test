type CombineUrlOptions = {
  resource: string;
  other?: string;
};

export function combineUrl({ resource, other }: CombineUrlOptions) {
  const base = import.meta.env.VITE_API_BASE_URL ?? "https://fakestoreapi.com";

  return `${base}/${resource}/${other ?? ""}`;
}
