import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesView");

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'study',
      include: 2
    }).then(res => res.items);
  };
}

export default StudiesContainer;
