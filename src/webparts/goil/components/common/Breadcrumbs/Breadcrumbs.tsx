/**
 * Breadcrumbs component for displaying the current navigation path.
 *
 * Uses the current location from `react-router-dom` to dynamically generate
 * a breadcrumb trail. Each segment of the URL becomes a breadcrumb item.
 *
 * Features:
 * - Always includes a Home icon link as the first item.
 * - Converts URL segments into readable labels (e.g., "user-profile" → "User Profile").
 * - Renders the last segment as plain text with `aria-current="page"`.
 * - Handles empty paths by displaying "Dashboard".
 *
 * @component
 * @returns {TSX.Element} A navigational breadcrumb trail.
 *
 * @example
 * <Breadcrumbs />
 */

import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./Breadcrumb.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();

  // Get the path segments, filtering out any empty strings from leading/trailing slashes
  const pathnames = location.pathname.split("/").filter((x) => x);

  let currentLink = "";

  return (
    <nav aria-label="breadcrum">
      <ol className={styles.breadcrumb}>
        {/* Always include the Home link */}
        <li
          className={styles.breadcrumbItem}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <Link to="/">
            <Icon iconName="HomeSolid"></Icon>
          </Link>
          {pathnames.length === 0 ? (
            // If it's the last item, render it as text, not a link
            <span>Dashboard</span>
          ) : (
            ""
          )}
        </li>

        {/* Map over the path segments to create the breadcrumb trail */}
        {pathnames.map((name, index) => {
          // Build the cumulative path for each segment
          currentLink += `/${name}`;

          // Check if this is the last segment in the path
          const isLast = index === pathnames.length - 1;

          // A simple way to make the path segment more readable (e.g., 'hello-world' -> 'Hello World')
          const displayName =
            name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

          return (
            <li className={styles.breadcrumbItem} key={currentLink}>
              {isLast ? (
                // If it's the last item, render it as text, not a link
                <span aria-current="page">{displayName}</span>
              ) : (
                // Otherwise, render it as a link
                <Link to={currentLink}>{displayName}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
