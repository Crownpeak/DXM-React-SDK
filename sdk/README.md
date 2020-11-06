<a href="https://www.crownpeak.com" target="_blank">![Crownpeak Logo](https://github.com/Crownpeak/DXM-React-SDK/raw/master/images/crownpeak-logo.png?raw=true "Crownpeak Logo")</a>

# Crownpeak Digital Experience Management (DXM) Software Development Kit (SDK) for React
Crownpeak Digital Experience Management (DXM) Software Development Kit (SDK) for React has been constructed to assist
the Single Page App developer in developing client-side applications that leverage DXM for content management purposes.

*For all usage instructions, see <a href="https://github.com/Crownpeak/DXM-React-SDK" target="_blank">https://github.com/Crownpeak/DXM-React-SDK</a>*

## Benefits
* **Runtime libraries to handle communication with either Dynamic (DXM Dynamic Content API) or Static (On-disk JSON payload)
Data Sources**

  As a development team runs their build process, the underlying React Application will be minified and likely packed
  into a set of browser-compatible libraries (e.g., ES5). We expect any DXM NPM Packages also to be compressed in this
  manner. To facilitate communication between the React Application and content managed within DXM, a runtime NPM Package
  is provided. The purpose of this package is:
  
  * Read application configuration detail from a global environment file (e.g., Dynamic Content API endpoint and credentials, 
  static content disk location, etc.);
  * Making data models available to the React Application, which a developer can map against
    * **Dynamic Data** - Asynchronously processing data from the DXM Dynamic Content API, using the Search G2 Raw JSON endpoint; and 
    * **Static Data** - Loading JSON payload data directly from local storage.
  
* **DXM Content-Type Scaffolding**

  Developers will continue to work with their Continuous Integration / Delivery and source control tooling to create a
  React application. However, the purpose of the DXM Content-Type Scaffolding build step is to convert the React Components
  in a single direction (React > DXM), into the necessary configuration to support CMS operations. At present, the DXM
  Component Library includes the capability to auto-generate Templates (input.aspx, output.aspx, post_input.aspx) based
  upon a moustache-style syntax (decorating of editable properties). It is not intended that we re-design this process,
  as it is fully supported within DXM, and customer-battle-tested - therefore, in order to create Template configuration,
  the build step:
    * Converts React Components into Crownpeak Components by using the existing Component Builder Process, via the CMS Access
   API (DXM's RESTful Content Manipulation API), and then existing "post_save" process;
    * Creates Templates for each React Page (One of the DXM React Component Types) by using the existing Template Builder
   Process, again via the CMS Access API and existing "post_save" process; and
    * Creates a new Model for the React Page Content-Type, via the CMS Access API, so that authors can create multiple versions
   of a structured Page or Component, without needing to run an entire development/test cycle.
   
## Version History
 
| Version       | Date          | Changes                            |
| ------------- | --------------|----------------------------------- |
| 1.0.2         | 2020APR24     | Initial Release.                   |
| 1.0.3         | 2020MAY05     | Adds Component dependencies.       |
| 1.0.4         | 2020MAY05     | Correct paths in cmsify script.    |
| 1.0.5         | 2020MAY07     | Changed to use crownpeak-dxm-accessapi-helper.    |
| 1.0.7         | 2020MAY11     | Changed to use crownpeak-dxm-sdk-core.    |
| 1.0.8         | 2020MAY12     | cmsify.js now called from Node /.bin.    |
| 1.0.10         | 2020MAY27     | Added CSS parsing/upload support. Added Wrapper selection.    |
| 1.0.11         | 2020JUN02     | Added DropZone support for DXM. Added command line parameters. Bug fixes.    |
| 1.0.12         | 2020JUN03     | Updated crownpeak-dxm-sdk-core version.    |
| 1.0.13         | 2020JUN05     | String for CmsFieldType. HTML components now supported in Wrappers. CSS parser updated for relative files.    |
| 1.0.14         | 2020JUN10     | Verify environment before processing. Manual re-compilation of Component Library. Support attributes & children on DropZone components. Bug fixes.    |
| 1.0.15         | 2020JUN17     | Support for list items. Bug fixes.    |
| 2.0.0         | 2020JUN30     | Migrated to TypeScript.    |
| 2.1.1         | 2020JUL28     | New 'init', 'patch' and 'scaffold' options, improved output, lots of bug fixes. |
| 2.1.3         | 2020JUL29     | Updated crownpeak-dxm-sdk-core version.    |
| 2.2.0         | 2020SEP03     | Add support for indexed fields and cp-scaffold. Bug fixes. |
| 2.3.0         | 2020OCT01     | Preserve paths for uploads, support uploads from pages and wrappers. Bug fixes. |
| 2.4.0         | 2020OCT09     | Improved uploading and relinking, new page and component creation settings, new --only option. Bug fixes. |
| 3.0.0         | 2020NOV06     | Change to asynchronous data loading, drag and drop zone governance, function components, TSX. Bug fixes. |