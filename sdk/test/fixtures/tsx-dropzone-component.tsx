import { CmsDropZoneComponent } from 'crownpeak-dxm-react-sdk';
import HeroContainer from "./heroContainer";
import SecondaryContainer from "./secondaryContainer";

export default class DropZone extends CmsDropZoneComponent {
    constructor(props)
    {
        super(props);
        this.components = {
            "HeroContainer": HeroContainer,
            "SecondaryContainer": SecondaryContainer
        };
    }

    render() {
        // This method used to override default render() method from SDK, as custom className attribute required.
        return React.createElement('div', { className:'row'},
            this.getComponents()
        );
    }
}