import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import { consideredLoading } from 'state/actions';

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesView");

  model = () => {
    consideredLoading(true);

    return ContentfulData.getEntries({
      content_type: 'study',
      include: 2
    }).then(res => {
      consideredLoading(false);
      return res.items;
    }).catch(() => {
      consideredLoading(false);
    });
  };
}

export default StudiesContainer;
