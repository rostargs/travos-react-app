import { TCustomLink } from "../ui/CustomLink";

type TFooterCustomLink = Omit<TCustomLink, "children">;

export const mapLinks = (links: TCustomLink[]): TFooterCustomLink[] => {
  const allLinks: TFooterCustomLink[] = [];

  const searchNestedLinks = (link: TCustomLink) => {
    const { children, ...rest } = link;
    allLinks.push(rest);

    if (children) {
      children.forEach(searchNestedLinks);
    }
  };

  links.forEach(searchNestedLinks);

  return allLinks;
};