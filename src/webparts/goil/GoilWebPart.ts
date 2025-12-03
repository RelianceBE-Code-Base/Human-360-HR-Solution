import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "GoilWebPartStrings";
import Goil from "./components/Goil";
import { IGoilProps } from "./components/IGoilProps";

import "../../styles/global.scss";

export interface IGoilWebPartProps {
  description: string;
}

export default class GoilWebPart extends BaseClientSideWebPart<IGoilWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    console.log("[DEBUG] Hiding SharePoint chrome...");
    const element: React.ReactElement<IGoilProps> = React.createElement(Goil, {
      description: this.properties.description,
      isDarkTheme: this._isDarkTheme,
      environmentMessage: this._environmentMessage,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._ensureDefaultChromeIsDisabled();

    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
    return super.onInit();
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
  // private _ensureDefaultChromeIsDisabled(): void {
  //   setTimeout(() => {
  //     console.log("[DEBUG] Hiding SharePoint chrome...");

  //     const safeSelectorsToHide = [
  //       "#SuiteNavWrapper", // Top nav
  //       "#spSiteHeader", // Site title/header
  //       ".commandBarWrapper", // Command bar above
  //       ".CanvasZone > .ControlZone", // Web part wrapper only (not the CanvasZone)
  //       ".SPCanvasToolbox", // Toolbox
  //       ".SPCanvasToolboxRow", // Row selector
  //       ".SPCanvasInsertButton", // Insert button
  //     ];

  //     safeSelectorsToHide.forEach((selector) => {
  //       document.querySelectorAll(selector).forEach((element) => {
  //         (element as HTMLElement).style.setProperty(
  //           "display",
  //           "none",
  //           "important"
  //         );
  //       });
  //     });
  //   }, 500);

  //   // Check if the device is mobile and apply mobile-specific styles
  //   if (this._isMobileDevice()) {
  //     const mobileElements = [
  //       ".spMobileHeader",
  //       ".ms-FocusZone",
  //       ".ms-CommandBar",
  //       ".spMobileNav",
  //       "#O365_MainLink_NavContainer",
  //       ".ms-Nav",
  //       ".ms-Nav-item",
  //     ];
  //     mobileElements.forEach((selector) => {
  //       document.querySelectorAll(selector).forEach((element) => {
  //         (element as HTMLElement).style.display = "none";
  //       });
  //     });
  //   }
  // }

  // private _isMobileDevice(): boolean {
  //   return /Mobi|Android/i.test(navigator.userAgent);
  // }

  // private _ensureDefaultChromeIsDisabled(): void {
  //   const elements = [
  //     "#workbenchPageContent",
  //     "#SuiteNavWrapper",
  //     ".SPCanvas-canvas",
  //     ".CanvasZone",
  //     ".ms-CommandBar",
  //     "#spSiteHeader",
  //     ".commandBarWrapper",
  //   ];
  //   elements.forEach((selector) => {
  //     document.querySelectorAll(selector).forEach((element) => {
  //       (element as HTMLElement).style.display = "none !important";
  //       (element as HTMLElement).style.maxWidth = "none";
  //     });
  //   });

  //   // Check if the device is mobile and apply mobile-specific styles
  //   if (this._isMobileDevice()) {
  //     const mobileElements = [
  //       ".spMobileHeader",
  //       ".ms-FocusZone",
  //       ".ms-CommandBar",
  //       ".spMobileNav",
  //       "#O365_MainLink_NavContainer", // Waffle (App Launcher)
  //       ".ms-Nav", // Additional possible mobile navigation elements
  //       ".ms-Nav-item", // Possible item within the navigation
  //     ];
  //     mobileElements.forEach((selector) => {
  //       document.querySelectorAll(selector).forEach((element) => {
  //         (element as HTMLElement).style.display = "none";
  //       });
  //     });
  //   }
  // }

  // private _isMobileDevice(): boolean {
  //   // Check if the user is on a mobile device based on user agent or screen width
  //   const userAgent = navigator.userAgent.toLowerCase();
  //   const isMobile = /iphone|ipod|ipad|android|blackberry|windows phone/i.test(
  //     userAgent
  //   );
  //   return isMobile || window.innerWidth <= 768; // Custom breakpoint for mobile
  // }

  private _ensureDefaultChromeIsDisabled(): void {
    //'.SuiteNavWrapper','#spSiteHeader','.sp-appBar','#sp-appBar','#workbenchPageContent', '.SPCanvas-canvas', '.CanvasZone', '.ms-CommandBar', '#spSiteHeader', '.commandBarWrapper'
    const displayElements = [
      "#SuiteNavWrapper",
      "#spSiteHeader",
      ".sp-appBar",
      ".ms-CommandBar",
      ".commandBarWrapper",
      "#spCommandBar",
      ".ms-SPLegacyFabric",
      ".ms-footer",
      ".sp-pageLayout-footer",
      ".ms-workbenchFooter",
    ];
    const widthElements = [
      "#workbenchPageContent",
      ".CanvasZone",
      ".SPCanvas-canvas",
    ];
    displayElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        (element as HTMLElement).style.display = "none";
      });
    });

    widthElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        (element as HTMLElement).style.maxWidth = "none";
      });
    });

    //document.querySelector<HTMLElement>('#spCommandBar')?.style.setProperty('min-height', '0', 'important');

    // Check if the device is mobile and apply mobile-specific styles
    if (this._isMobileDevice()) {
      const mobileElements = [
        ".spMobileHeader",
        ".ms-FocusZone",
        ".ms-CommandBar",
        ".spMobileNav",
        "#O365_MainLink_NavContainer", // Waffle (App Launcher)
        ".ms-Nav", // Additional possible mobile navigation elements
        ".ms-Nav-item", // Possible item within the navigation
      ];
      mobileElements.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          (element as HTMLElement).style.display = "none";
        });
      });
    }
  }

  private _isMobileDevice(): boolean {
    // Check if the user is on a mobile device based on user agent or screen width
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|ipad|android|blackberry|windows phone/i.test(
      userAgent
    );
    return isMobile || window.innerWidth <= 768; // Custom breakpoint for mobile
  }
}
