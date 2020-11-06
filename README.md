<a href="https://www.crownpeak.com" target="_blank">![Crownpeak Logo](images/crownpeak-logo.png?raw=true "Crownpeak Logo")</a>

# Crownpeak Digital Experience Management (DXM) Software Development Kit (SDK) for React
Crownpeak Digital Experience Management (DXM) Software Development Kit (SDK) for React has been constructed to assist
the Single Page App developer in developing client-side applications that leverage DXM for content management purposes.

---
## Upgrading
* If you're upgrading from a version before 2.1.0, please run the following before installing the new patch.
    ```
    yarn crownpeak upgrade
    # or 
    npx crownpeak upgrade
    ```
* If you're upgrading to version 3.0.0 or higher, please note the change to asynchronous data loading, and include a check for `this.state.isLoaded` in your `render()` method. See the examples below.
---

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


## Install
```
yarn add crownpeak-dxm-react-sdk
# or 
npm install crownpeak-dxm-react-sdk
```

## Usage - Runtime Data Libraries
 Review example project at <a href="https://github.com/Crownpeak/DXM-SDK-Examples/tree/master/React" target="_blank">https://github.com/Crownpeak/DXM-SDK-Examples/tree/master/React</a>
 for complete usage options. The example project includes the following capabilities:
  * Routing using ```React-Router``` and JSON payload, delivered from DXM to map AssetId to requested path. Although
  not part of the SDK itself, the example can be used if desired. For routes.json structure, see example at the foot of this README.
  * ```CmsStaticPage``` type to load payload data from JSON file on filesystem, delivered by DXM;
  * ```CmsDynamicPage``` type to load payload data from DXM Dynamic Content API.


### CmsStaticPage Type
Loads payload data from JSON file on filesystem - expects knowledge of DXM AssetId in order to find file with corresponding
name (e.g., 12345.json). CmsStaticPage is the data equivalent of a DXM Asset when used as a page. Example at /examples/bootstrap-blog/pages/blogPage.js:
```
import React from 'react'
import Header from "../components/header";
import TopicList from "../components/topicList";
import FeaturedPost from "../components/featuredPost";
import SecondaryPost from "../components/secondaryPost";
import BlogPost from "../components/blogPost";
import PostArchives from "../components/postArchives";
import Footer from "../components/footer";
import { CmsStaticPage, CmsDynamicPage } from 'crownpeak-dxm-react-sdk';
import Routing from "../js/routing";

export default class BlogPage extends CmsStaticPage
{
    constructor(props)
    {
        super(props);
        this.cmsWrapper = "";           //insert Wrapper Name from data-cms-wrapper-name in HTML, or don't include property to accept defaults.
        this.cmsUseTmf = false;         //set to true to create templates that use the Translation Model Framework.
        this.cmsSuppressModel = false;  //set to true to suppress model and content folder creation when scaffolding.
        this.cmsSuppressFolder = false; //set to true to suppress content folder creation when scaffolding.
        if(this.props && this.props.location) this.cmsAssetId = Routing.getCmsAssetId(this.props.location.pathname);
    }

    render() {
        super.render();
        return (
            this.state.isLoaded &&
            <div>
                <div className="container">
                    <Header month={this.props.match.params.month}/>
                    <TopicList/>
                    <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                        <FeaturedPost/>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                    </div>
                </div>
                <main role="main" className="container">
                    <div className="row">
                        <div className="col-md-8 blog-main">
                            <h3 className="pb-3 mb-4 font-italic border-bottom">
                                From the Firehose
                            </h3>
                            <BlogPost/>
                        </div>
                        <aside className="col-md-4 blog-sidebar">
                            <PostArchives/>
                        </aside>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}
```

### CmsDynamicPage Type
Loads payload data from DXM Dynamic Content API upon request - expects knowledge of DXM AssetId.
 ```
import React from 'react'
import Header from "../components/header";
import TopicList from "../components/topicList";
import FeaturedPost from "../components/featuredPost";
import SecondaryPost from "../components/secondaryPost";
import BlogPost from "../components/blogPost";
import PostArchives from "../components/postArchives";
import Footer from "../components/footer";
import { CmsStaticPage, CmsDynamicPage } from 'crownpeak-dxm-react-sdk';
import Routing from "../js/routing";

export default class BlogPage extends CmsDynamicPage
{
    constructor(props)
    {
        super(props);
        this.cmsWrapper = "";           //insert Wrapper Name from data-cms-wrapper-name in HTML, or don't include property to accept defaults.
        this.cmsUseTmf = false;         //set to true to create templates that use the Translation Model Framework.
        this.cmsSuppressModel = false;  //set to true to suppress model and content folder creation when scaffolding.
        this.cmsSuppressFolder = false; //set to true to suppress content folder creation when scaffolding.
        if(this.props && this.props.location) this.cmsAssetId = Routing.getCmsAssetId(this.props.location.pathname);
    }

    render() {
        super.render();
        return (
            this.state.isLoaded &&
            <div>
                <div className="container">
                    <Header month={this.props.match.params.month}/>
                    <TopicList/>
                    <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                        <FeaturedPost/>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                    </div>
                </div>
                <main role="main" className="container">
                    <div className="row">
                        <div className="col-md-8 blog-main">
                            <h3 className="pb-3 mb-4 font-italic border-bottom">
                                From the Firehose
                            </h3>
                            <BlogPost/>
                        </div>
                        <aside className="col-md-4 blog-sidebar">
                            <PostArchives/>
                        </aside>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}
```

If you are using React function components, you must call out to a load() method on the page type for your page to be recognised and scaffolded correctly.

```
import React, { useState, useEffect } from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
// [ ... ]

export default function BlogPage()
{
    let isLoaded = CmsStaticPage.load(12345, useState, useEffect); // Or use CmsDynamicPage
    const cmsWrapper = "";           //insert Wrapper Name from data-cms-wrapper-name in HTML, or don't include property to accept defaults.
    const cmsUseTmf = false;         //set to true to create templates that use the Translation Model Framework.
    const cmsSuppressModel = false;  //set to true to suppress model and content folder creation when scaffolding.
    const cmsSuppressFolder = false; //set to true to suppress content folder creation when scaffolding.

    return (
        isLoaded && 
        <div>
            <!-- [...] -->
        </div>
    )
}
```

### CmsComponent
Includes CmsField references for content rendering from DXM within a React Component.:
```
import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import ReactHtmlParser from 'react-html-parser';

export default class BlogPost extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.post_title = new CmsField("Post_Title", CmsFieldTypes.TEXT);
        this.post_date = new CmsField("Post_Date", CmsFieldTypes.DATE);
        this.post_content = new CmsField("Post_Content", CmsFieldTypes.WYSIWYG);
        this.post_category = new CmsField("Post_Category", CmsFieldTypes.DOCUMENT);
        this.cmsFolder = ""; //set the subfolder in which the component will be created when scaffolding.
        this.cmsZones = []; //set the zones into which the component is permitted to be dropped.
    }

    render() {
        return (
            <div className="blog-post">
                <h2 className="blog-post-title">{ this.post_title }</h2>
                <p className="blog-post-meta">Date: { new Date(this.post_date).toLocaleDateString() }</p>
                { ReactHtmlParser(this.post_content) }
                { /*this.post_category*/ }
            </div>
        )
    }
}
```

If you are using React function components, you must call out to the CmsDataCache.setComponent() method for your component to be recognised and scaffolded correctly.

```
import React from 'react';
import { CmsField, CmsFieldTypes, CmsDataCache } from 'crownpeak-dxm-react-sdk';
import ReactHtmlParser from 'react-html-parser';

export default function BlogPost(props)
{
    CmsDataCache.setComponent("BlogPost");
    const cmsFolder = ""; //set the subfolder in which the component will be created when scaffolding.
    const cmsZones = []; //set the zones into which the component is permitted to be dropped.

    var heading = new CmsField("Heading", CmsFieldTypes.TEXT);
    var description = new CmsField("Description", CmsFieldTypes.WYSIWYG);

    return (
        <div className="container">
            <h1>{ heading }</h1>
            { ReactHtmlParser(description) }
        </div>
    )
}
```

### CmsDropZoneComponent
Enables implementation of draggable components via DXM. Example usage below:
```
import { CmsDropZoneComponent } from 'crownpeak-dxm-react-sdk';

import PrimaryCTA from "../components/primaryCta";
import SecondaryCTA from "../components/secondaryCta";

export default class DropZone extends CmsDropZoneComponent {
    constructor(props)
    {
        super(props);
        this.components = {
            "PrimaryCTA": PrimaryCTA,
            "SecondaryCTA": SecondaryCTA
        };
    }
}
```
Example implementation upon a ```CmsStaticPage``` or ```CmsDynamicPage```:
```
<DropZone name="Test"/>
```
For further details, see examples/bootstrap-homepage project.

### List Items
Enables implementation of list items within DXM. Example usage below (note comment, which is requirement for DXM scaffolding):
```
import React from 'react';
import {CmsComponent, CmsField, CmsFieldTypes, CmsDataCache } from 'crownpeak-dxm-react-sdk';
import SecondaryContainer from './secondaryContainer';
​
export default class SecondaryList extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.SecondaryContainers = new CmsField("SecondaryContainer", "Widget", CmsDataCache.get(CmsDataCache.cmsAssetId).SecondaryList);
    }
​
    render () {
        let i = 0;
        return (
            <div className="row">
                {/* <List name="SecondaryContainers" type="Widget" itemName="_Widget"> */}
                {this.SecondaryContainers.value.map(sc => {
                    return <SecondaryContainer data={sc.SecondaryContainer} key={i++}/>
                })}
                {/* </List> */}
            </div>
        )
    }
}
```

### More Complex Replacements
If your application code is too complex for the parser to be able to extract your fields, it is possible to provide your own markup for the Component Library to use instead of your component code:
```
{/* cp-scaffold 
<h2>{Heading:Text}</h2>
else */}
<h2>{{ heading.value.length > MAX_LENGTH ? heading.value.substr(0, MAX_LENGTH) + "..." : heading }}</h2>
{/* /cp-scaffold */}
```
It is also possible to add extra markup that is not used directly in your application, for example to support extra data capture:
```
{/* cp-scaffold 
{SupplementaryField:Text}
/cp-scaffold */}
```

### CmsFieldType
Enumeration containing field types supported within the SDK.

| CmsFieldType  | DXM Mapping     |
| ------------- | --------------- |
| TEXT          | Text            |
| WYSIWYG       | Wysiwyg         |
| DATE          | Date            |
| DOCUMENT      | Document        |
| IMAGE         | Src             |
| HREF          | Href            |

### Indexed Fields
Enables fields to be extracted from content and published as separate fields into Search G2, to support easier sorting and filtering:
```
this.title = new CmsField("Title", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
```
A number of different values are available in the `CmsIndexedField` enumerated type to support different data types:
| Enum value | Search G2 Prefix | Comment |
| ---------- | ---------------- | ------- |
| STRING     | custom_s_        | String, exact match only.
| TEXT       | custom_t_        | Text, substring matches allowed, tokenised so not usefully sortable.
| DATETIME   | custom_dt_       | DateTime, must be ISO-8601.
| INTEGER    | custom_i_        | 32-bit signed integer, must be valid.
| LONG       | custom_l_        | 64-bit signed integer, must be valid.
| FLOAT      | custom_f_        | 32-bit IEEE floading point, must be valid.
| DOUBLE     | custom_d_        | 64-bit IEEE floating point, must be valid.
| BOOLEAN    | custom_b_        | Boolean, must be true or false.
| LOCATION   | custom_p_        | Point, must be valid _lat,lon_.
| CURRENCY   | custom_c_        | Currency, supporting exchange rates.
If an invalid value for the specific data type is sent to Search G2, the entire statement is liable to fail silently.

### Querying Custom Data from Dynamic Content API
Used to run a one-time dynamic query from DXM's Dynamic Content API.
```
import React from 'react';
import { Link } from 'react-router-dom';
import { CmsComponent, CmsDynamicDataProvider } from 'crownpeak-dxm-react-sdk';

export default class PostArchives extends CmsComponent
{
    constructor(props)
    {
        super (props);
        const data = new CmsDynamicDataProvider().getDynamicQuery("q=*:*&fq=custom_s_type:\"Blog%20Page\"&rows=0&facet=true&facet.mincount=1&facet.range=custom_dt_created&f.custom_dt_created.facet.range.start=NOW/YEAR-1YEAR&f.custom_dt_created.facet.range.end=NOW/YEAR%2B1YEAR&f.custom_dt_created.facet.range.gap=%2B1MONTH");
        this.months = data.facet_counts.facet_ranges.custom_dt_created.counts.filter((_c, i) => i%2 === 0);
    }

    render() {
        return (
            <div className="p-3">
                <h4 className="font-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                    {this.months.map((month) => {
                        return <li key={month.substr(0,7)}><Link to={`/posts/months/${month.substr(0,7)}`}>{ [new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })] }</Link></li>
                    })}
                </ol>
            </div>
        )
    }
}
```

### Using Custom Data from Named JSON Object on Filesystem
Used to load content from a JSON Object on Filesystem and populate fields in CmsComponent.
```
import React from 'react';
import { CmsComponent, CmsStaticDataProvider } from 'crownpeak-dxm-react-sdk';

export default class TopicList extends CmsComponent
{
    constructor(props)
    {
        super (props);
        this.topics = new CmsStaticDataProvider().getCustomData("topics.json");
    }

    render() {
        return (
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {this.topics.map((topic) => {
                        return <a key={topic.toString()} className="p-2 text-muted" href="#">{ topic }</a>
                    })}
                </nav>
            </div>
        )
    }
}
```

### Content creation options
There are a number of options that can be specified on the constructor of an item that extends CmsPage.
These are set as properties on the extending class. For example:
```
this.useTmf = true;
```
| Property       | Description |
| -------------- | ----------- |
| useTmf         | If set, the resulting template will use the Translation Model Framework (TMF). Defaults to false. |
| suppressModel  | If set, no model will be created for the resulting template. Defaults to false. |
| suppressFolder | If set (or if suppressModel is set), no content folder will be created for the resulting model. Defaults to false. |

---

## Installation - DXM Content-Type Scaffolding (cmsify)
* Requires update to DXM Component Library, by installing <a href="https://raw.githubusercontent.com/Crownpeak/DXM-SDK-Core/master/dxm/dxm-cl-patch-for-sdk-latest.xml" target="_blank">dxm-cl-patch-for-sdk-latest.xml</a>.

* Requires .env file located in root of the React project to be scaffolded. Values required within .env file are:
 
| Key           | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| CMS_INSTANCE  | DXM Instance Name.                                                        |
| CMS_USERNAME  | DXM Username with access to create Assets, Models, Templates, etc.        |
| CMS_PASSWORD  | Pretty obvious.                                                           |
| CMS_API_KEY   | DXM Developer API Key - Can be obtained by contacting Crownpeak Support.  |
| CMS_SITE_ROOT | DXM Site Root Asset Id.                                                   |
| CMS_PROJECT   | DXM Project Asset Id.                                                     |
| CMS_WORKFLOW  | DXM Workflow Id (to be applied to created Models).                        |
| CMS_SERVER    | (Optional) Allows base Crownpeak DXM URL to be overridden.                |

```
# Crownpeak DXM Configuration
CMS_INSTANCE={Replace with CMS Instance Name}
CMS_USERNAME={Replace with CMS Username}
CMS_PASSWORD={Replace with CMS Password}
CMS_API_KEY={Replace with CMS Developer API Key}
CMS_SITE_ROOT={Replace with Asset Id of Site Root}
CMS_PROJECT={Replace with Asset Id of Project}
CMS_WORKFLOW={Replace with Workflow Id}
CMS_STATIC_CONTENT_LOCATION=/content/json
CMS_DYNAMIC_CONTENT_LOCATION=//searchg2.crownpeak.net/{Replace with Search G2 Collection Name}/select/?wt=json
```

Installation instructions:
1. Create new DXM Site Root and check "Install Component Project using Component Library 2.2"; or
```
$ yarn crownpeak init --folder <parent-folder-id> --name "New Site Name"
```

2. After site creation, set the values for `CMS_SITE_ROOT` and `CMS_PROJECT` in your `.env` file to be the
relevant asset IDs from DXM;

3. Install the manifest (detailed above);
```
$ yarn crownpeak patch
```

4. Verify that all your settings are correct.
```
$ yarn crownpeak scaffold --verify
```

## Usage - DXM Content-Type Scaffolding

From the root of the project to be React scaffolded:

```
$ yarn crownpeak scaffold
yarn run v1.22.4
$ ../../sdk/crownpeak scaffold
Uploaded [holder.min.js] as [/Skunks Works/React SDK/_Assets/js/holder.min.js] (261402)
Unable to find source file [/Users/paul.taylor/Documents/Repos/Crownpeak/DXM-React-SDK/examples/bootstrap/js/bundle.js] for upload
Uploaded [blog.css] as [/Skunks Works/React SDK/_Assets/css/blog.css] (261400)
Saved wrapper [Blog] as [/Skunks Works/React SDK/Component Project/Component Library/Nav Wrapper Definitions/Blog Wrapper] (261771)
Saved component [BlogPost] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Blog Post] (261776)
Saved component [FeaturedPost] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Featured Post] (261777)
Saved component [Footer] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Footer] (261778)
Saved component [Header] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Header] (261779)
Saved component [PostArchives] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Post Archives] (261780)
Saved component [SecondaryPost] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Secondary Post] (261781)
Saved component [TopicList] as [/Skunks Works/React SDK/Component Project/Component Library/Component Definitions/Topic List] (261782)
Saved template [BlogPage] as [/Skunks Works/React SDK/Component Project/Component Library/Template Definitions/Blog Page Template] (261370)
Saved model [BlogPage] as [/Skunks Works/React SDK/Component Project/Models/Blog Page Folder/Blog Page] (261784)
Saved content folder [Blog Pages] as [/Skunks Works/React SDK/Blog Pages/] (261376)
✨  Done in 62.61s.
```

The scaffolding can be run multiple times as additional capabilities are added to the React project. Asset data within DXM will not
be destroyed by future runs.

The `crownpeak scaffold` script supports a number of optional command-line parameters:

| Parameter        | Effect        |
| ---------------- | --------------|
| `--dry-run`      | Report on the items that would be imported into the CMS, but do not import them. |
| `--verbose`      | Show verbose output where applicable. |
| `--verify`       | Verify that the Crownpeak DXM environment is configured correctly. |
| `--no-components` | Do not import any components. |
| `--no-pages`      | Do not import any pages, templates, or models. |
| `--no-uploads`    | Do not import any uploads; for example CSS, JavaScript or images. |
| `--no-wrappers`   | Do not import any wrappers. |
| `--only <name>`   | Only import items matching the specified name. Can be used multiple times. |
| `--ignore <name>` | Ignore a single unmet dependency with the specified name. Can be used multiple times. |

These are intended to improve performance for multiple runs, and you should expect to see errors if the items being skipped have not already been created within the CMS; for example, if you provide the `--no--components` parameter where the components have not previously been imported.

## routes.json File Structure Example
```
[
  {
    "path": "/",
    "exact": true,
    "component": "BlogPage",
    "cmsassetid": "261377"
  },
  {
    "path": "/posts/months/:month",
    "component": "BlogPage",
    "cmsassetid": "23456"
  }
]
```

## Videos & Tutorials
Walk through of creating /examples/bootstrap-homepage from scratch, starting with an empty folder.
<a href="https://view.vzaar.com/21495120/player" target="_blank">![Crownpeak DXM SDK for React Video](./images/crownpeak-dxm-sdk-for-react-title-frame.png?raw=true "Crownpeak DXM SDK for React Video")</a>


## Credit
Thanks to:
* <a href="https://github.com/richard-lund" target="_blank">Richard Lund</a> for the refactoring;
* <a href="https://github.com/ptylr" target="_blank">Paul Taylor</a> for a few edits ;)
 
 
## License
MIT License

Copyright (c) 2020 Crownpeak Technology, inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
